const express = require('express');
const passport = require('passport');
const router = new express.Router();

router.post('/signup', (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json({
                message: info.message
            });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.json({
                    message: err.name
                });
            }
            return res.json({
                message: 'success',
                name: user.username
            });
        });
    })(req, res, next);
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json({
                message: info.message
            });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.json({
                    message: err.name
                });
            }
            return res.json({
                message: 'success',
                name: user.username
            });
        });
    })(req, res, next);
});

module.exports = router;
