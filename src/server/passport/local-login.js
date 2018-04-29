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
            user.comparePassword(password, (err, match) => {
                if (err) {
                    return done(err);
                }
                if (!match) {
                    return done(null, false, {message: 'Incorrect password.'});
                } else {
                    return done(null, user, {path: '/'});
                }
            });
        });
    });