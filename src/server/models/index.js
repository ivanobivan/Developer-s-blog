const mongoose = require('mongoose');
module.exports.connect = (uri) => {
    mongoose.connect(uri);
    mongoose.connection.on('error', (err) => {
        console.error(`Mongoose connection error: ${err}`);
        process.exit(1);
    });
    /*mongoose.connect("mongodb://mongo:27017/blog");
    mongoose.connection.on('error', (err) => {
        console.error(`Mongoose connection error: ${err}`);
        //process.exit(1);
    });
    mongoose.connect("mongodb://mongo/blog");
    mongoose.connection.on('error', (err) => {
        console.error(`Mongoose connection error: ${err}`);
        //process.exit(1);
    });*/
    require('./user');
};
