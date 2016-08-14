import http from 'http';
import zlib from 'zlib';
import path from 'path';
import fs from 'fs';

const dataFolder = './scheduler/data/';
let largerFileSize = 0;

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

// walk through folder
// function walkSync(currentDirPath, callback) {
//    fs.readdirSync(currentDirPath).forEach((name) => {
//        const filePath = path.join(currentDirPath, name);
//        const stat = fs.statSync(filePath);
//        if (stat.isFile()) {
//            callback(filePath, stat);
//        } else if (stat.isDirectory()) {
//            walkSync(filePath, callback);
//        }
//    });
// }
//
// function logFiles() {
//    let stats = '';
//    walkSync('./scheduler', (filePath, stat) => {
//        const statToString = JSON.stringify(stat);
//        stats += `${filePath} ----- <br>`;
//        stats += `${statToString} <br>`;
//    });
//
//    return `${stats}`;
// }

function _checkCreateFolder() {
    if (!fs.existsSync(`${dataFolder}`)) {
        fs.mkdirSync(`${dataFolder}`);
    }
}

function _fileLoaded(fileName) {
    return fs.existsSync(`${dataFolder}${fileName}`);
}

function _unlink(fileName) {
    const fileNameWithoutEx = fileName.split('.gz').join('');
    fs.unlink(`${dataFolder}${fileName}`);
    fs.unlink(`${dataFolder}${fileNameWithoutEx}.xml`);
}

function load(fileName) {
    return new Promise((resolve, reject) => {
        const fileNameWithoutEx = fileName.split('.gz').join('');
        let count = 0;
        const maxTimeout = 10;
        let hasTimedOut = false;
        let timeoutCount = 0;
        const streams = {
            Xml: fs.createWriteStream(`${dataFolder}${fileNameWithoutEx}.xml`),
            GZ: fs.createWriteStream(`${dataFolder}${fileName}`)
        };

        options.path = `/data/${fileName}`;

        const getRequest = () => http.get(options, (res) => {
            res.pipe(streams.GZ, {end: false});
            res.pipe(zlib.createGunzip(), {end: false}).pipe(streams.Xml);

            res.on('data', () => {
                count++;
                if (count % 100 === 0) {
                    console.log('downloading ' + count / 100);
                }
            });

            res.on('error', (err) => {
                reject(err);
            });

            res.on('end', (err) => {
                if (err) {
                    _unlink(fileName);
                    reject(err);
                } else if (hasTimedOut) {
                    const fileSize = getFileSize(`${dataFolder}${fileName}`);
                    largerFileSize = fileSize > largerFileSize ? fileSize : largerFileSize;
                    console.log(`timed out and aborted restart, fileSize: ${fileSize} and larger fileSize: ${largerFileSize}`);
                    if (timeoutCount < maxTimeout) {
                        count = 0;
                        startLoading();
                    } else {
                        _unlink(fileName);
                        reject(`Every attempts to download the ${fileName} timed out :( - larger fileSize was ${largerFileSize}`);
                    }
                } else {
                    const fileSize = getFileSize(`${dataFolder}${fileName}`);
                    resolve(`loading of ${fileName} successfully completed and file size is ${fileSize}}`);
                }
            });
        });

        const startLoading = () => {
            hasTimedOut = false;
            const request = getRequest();

            request.on('error', (err) => {
                reject(err);
            });

            request.setTimeout(40000, () => {
                request.abort();
                timeoutCount ++;
                hasTimedOut = true;
            });

            request.end();
        };

        startLoading();
    });
}

export default function(type, fileName) {
    return new Promise((res, rej) => {
        _checkCreateFolder();

        if (_fileLoaded(fileName)) {
            const fileSize = getFileSize(`${dataFolder}${fileName}`);
            res({
                fileName,
                resolvedMsg: `scheduler running, but file ${fileName} already existing and is: ${fileSize} megabytes`
            });
        } else {
            load(fileName)
                .then((resolvedMsg, rejectedMsg) => {
                    if (resolvedMsg) {
                        res({
                            fileName,
                            resolvedMsg
                        });
                    } else if (rejectedMsg) {
                        rej({
                            fileName,
                            rejectedMsg
                        });
                    }
                });
        }
    });
};
