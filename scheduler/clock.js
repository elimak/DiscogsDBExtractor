require('dotenv').config({ silent: true });
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://scheduler%40elimak.com:' + process.env.MAIL_PWD + '@smtp.gmail.com');

//OnInterval
//var threeSecondInterval = function() {
//    console.log(process.env.MAIL_PWD);
//    console.log("Another 3 seconds have gone by. What did you do in them?");
//}
//setInterval(threeSecondInterval, 3000);
//
////For specific times, use a chron job
//var fifteenSeconsAfterMinute = function() {
//    // setup e-mail data with unicode symbols
//    var mailOptions = {
//        from: '"Val 👥" <info@elimak.com>', // sender address
//        to: 'info@elimak.com', // list of receivers
//        subject: 'Testing', // Subject line
//        text: 'Hello world 🐴', // plaintext body
//        html: '<b>Hello world 🐴</b>' // html body
//    };
//
//    // send mail with defined transport object
//    transporter.sendMail(mailOptions, function(error, info){
//        if(error){
//            return console.log(error);
//        }
//        console.log('Message sent: ' + info.response);
//    });
//    console.log("Another minute is gone forever. Hopefully, you made the most of it...");
//}
//var CronJob = require('cron').CronJob;
//new CronJob({
//    cronTime: "15 * * * * *",//15 seconds after every minute
//    onTick: fifteenSeconsAfterMinute,
//    start: true,
//    timeZone: "America/Los_Angeles"
//});
