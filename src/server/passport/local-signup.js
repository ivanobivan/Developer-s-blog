//import mongoose from 'mongoose';
//const User = require('mongoose').model('User');
const mongoose = require('mongoose');
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({
        passReqToCallback: true
    },
    (req, username, password, done) => {
        if(username.length < 6 || password.length < 6) {
          return done(null, false, {message: "Please, enter user name and password more then 6 symbols"})
        }
        const User = mongoose.model("User");
        User.findOne({username: username}, (err, user) => {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, false, {message: 'The user with this name exist already'});
            }
            const userData = new User({
                password: password.trim(),
                username: username.trim(),
                level: "user",
                date: new Date(),
                ip: req.connection.remoteAddress
            });
            userData.save((err) => {
                if (err) {
                    return done(err);
                }
                return done(null, userData, {path: '/'});
            });
        })
    });
