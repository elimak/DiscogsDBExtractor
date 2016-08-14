import nodemailer from 'nodemailer';
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport('smtps://scheduler%40elimak.com:' + process.env.MAIL_PWD + '@smtp.gmail.com');

const mailOptionSuccess = {
    from: '"Val" <info@elimak.com>', // sender address
    to: 'info@elimak.com', // list of receivers
    subject: 'Success' // Subject line
};

const mailOptionError = {
    from: '"Val" <info@elimak.com>', // sender address
    to: 'info@elimak.com', // list of receivers
    subject: 'Error' // Subject line
};

let logs = [];
function logProcess(log) {
    logs.push(log);
}

function emailSuccess(msg) {
    const options = Object.assign({}, mailOptionSuccess, { text: 'Heroku process', html: msg });
    transporter.sendMail(options, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

function emailError(msg) {
    const options = Object.assign({}, mailOptionError, { text: 'Heroku process', html: msg });
    transporter.sendMail(options, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}


export default {
    success: emailSuccess,
    error: emailError,
    log: logProcess,
    getLogs: () => {
        return logs;
    },
    clearLogs: () => {
        logs = [];
    }
};
