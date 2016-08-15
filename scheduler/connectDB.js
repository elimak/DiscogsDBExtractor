import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
let maxRetries = 5;
let retries = 0;

function connect() {
    mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://heroku_pjg80b3j:egrn9o86an0ktpgcjqkvn3vi6h@ds023603.mlab.com:23603/heroku_pjg80b3j');
}

// Error handler
mongoose.connection.on('error', (err) => {
    console.info('-------------- Mongo Error: ' + err);
});

// Error handler
mongoose.connection.on('connected', () => {
    console.info('------------  ==> 💻Mongo connected');
});

// Reconnect when closed
mongoose.connection.on('disconnected', () => {
    console.log('------------ Mongo disconnected');
    if (retries < maxRetries) {
        connect();
        retries++;
    }
});

module.exports = {
    // type = 'release';
    connectMongo: connect
};
