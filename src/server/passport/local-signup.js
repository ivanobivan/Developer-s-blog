const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({
        usernameField: 'name',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
    },
    (req, name, password, done) => {
        const userData = {
            password: password.trim(),
            name: req.body.name.trim()
        };
        const newUser = new User(userData);
        newUser.save((err) => {
            if (err) {
                return done(err);
            }
            return done(null);
        });
    });
