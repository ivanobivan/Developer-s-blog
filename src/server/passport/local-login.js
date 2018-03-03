import mongoose from 'mongoose';
//const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy(
    (username, password, done) => {
        const User = mongoose.model('User');
        User.findOne({username: username}, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }
            if (!user.comparePassword(password)) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            return done(null, user,{path: '/'});
        });
    });
