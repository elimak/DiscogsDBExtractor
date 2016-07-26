"use strict";
const nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport('smtps://scheduler%40elimak.com:' + process.env.MAIL_PWD + '@smtp.gmail.com');

const http = require('http');
const zlib = require('zlib');
const fs = require('fs');
const saxpath = require('saxpath');
const sax = require('sax');
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const monthStr = month > 9 ? `${month}` : `0${month}`;
const date = `${year}${monthStr}01`;

const dataFolder = './scheduler/data/';
let largerFileSize = 0;

function sendEmail(logs) {
    let mailOptions = {
        from: '"Val" <info@elimak.com>', // sender address
        to: 'info@elimak.com', // list of receivers
        subject: 'Testing', // Subject line
        text: 'Heroku process', // plaintext body
        html: logs // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

const options = {
    host: process.env.DISCOGS_DATA_HOST,
    connection: 'keep-alive',
    headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.37 Safari/537.36',
        'accept-language': 'en,en-US;*',
        'accept': 'text/html,*/*;q=0.8',
        'accept-encoding': 'gzip,deflate'
    },
    method: 'GET'
};

function getFileSize(file) {
    const stats = fs.statSync(file);
    const fileSizeInBytes = stats.size;
    // Convert the file size to megabytes (optional)
    return fileSizeInBytes / 1000000.0;
}

module.exports = {
    // type = 'release';
    loadResources: function(type) {
        fs.exists(`${dataFolder}${date}_${type}.txt`, function(exists) {
            if (exists) {
                const fileSize = getFileSize(`${dataFolder}discogs_${date}_${type}.gz`);
                sendEmail(`scheduler running, but file for ${type} already existing and is: ${fileSize} megabytes`);
                console.log('The file already exists');
                return;
            } else {
                sendEmail(`scheduler running, starting to load ${type}`);

                if (!fs.existsSync(`${dataFolder}`)) {
                    fs.mkdirSync(`${dataFolder}`);
                }

                const exist = fs.existsSync(${dataFolder});
                console.log(`Folder should exist now: ${dataFolder} - ${exist}`);

                let count = 0;
                const maxTimeout = 10;
                let timeoutCount = 0;
                const streams = {
                    Xml: fs.createWriteStream(`${dataFolder}discogs_${date}_${type}.xml`),
                    GZ: fs.createWriteStream(`${dataFolder}discogs_${date}_${type}.gz`)
                };

                let request;
                let hasTimedOut = false;

                options.path = `/data/discogs_20160601_${type}.xml.gz`;

                function startLoading() {
                    hasTimedOut = false;
                    request = getRequest();

                    request.on('error', function(err) {
                        console.log('err', err);
                    });

                    request.setTimeout(40000, function() {
                        request.abort();
                        timeoutCount ++;
                        hasTimedOut = true;
                    });

                    request.end();
                }

                function getRequest() {
                    return http.get(options, function(res) {
                        res.pipe(streams.GZ, {end: false});
                        res.pipe(zlib.createGunzip(), {end: false}).pipe(streams.Xml);

                        res.on('data', function() {
                            count++;
                            if (count % 100 === 0) {
                                console.log('downloading ' + count / 100);
                            }
                        });

                        res.on('error', function(err) {
                            console.log('err', err);
                        });

                        res.on('end', function(err) {
                            if (err) {
                                fs.unlink(`${dataFolder}discogs_${date}_${type}.gz`);
                                fs.unlink(`${dataFolder}discogs_${date}_${type}.xml`);
                                sendEmail(`An error has happened while loading the ${type}`);
                                console.log(err);
                            } else if (hasTimedOut) {
                                const fileSize = getFileSize(`${dataFolder}discogs_${date}_${type}.gz`);
                                largerFileSize = fileSize > largerFileSize ? fileSize : largerFileSize;
                                console.log(`timed out and aborted restart, fileSize: ${fileSize} and larger fileSize: ${largerFileSize}`);
                                if (timeoutCount < maxTimeout) {
                                    count = 0;
                                    startLoading();
                                } else {
                                    fs.unlink(`${dataFolder}discogs_${date}_${type}.gz`);
                                    fs.unlink(`${dataFolder}discogs_${date}_${type}.xml`);
                                    sendEmail(`Every attempts to download the ${type} timed out :( - larger fileSize was ${largerFileSize}`);
                                }
                            } else {
                                fs.writeFile(`${dataFolder}${date}_${type}.txt`, 'completed', function(err) {
                                    if (err) {
                                        sendEmail('Could not write the completed log file');
                                        return console.log(err);
                                    }
                                });
                                sendEmail(`loading of ${type} successfully completed`);
                                console.log(`loading of ${type} successfully completed`);
                            }

                            // processXml();
                        });
                    });
                }

                startLoading();
            }
        });

    }
};
