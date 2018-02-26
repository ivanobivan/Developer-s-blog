const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;

export default new PassportLocalStrategy(
    (username, password, done) => {
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
                level: "user"
            });
            userData.save((err) => {
                if (err) {
                    return done(err);
                }
                return done(null, userData, {message: 'Successful sign in'});
            });
        })
    });
