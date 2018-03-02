const express = require('express');
const passport = require('passport');
const router = new express.Router();
const User = require('mongoose').model('User');

router.post('/signup', (req, res, next) => {
    passport.authenticate('local-signup',{
        badRequestMessage: "User name and password has been not empty"
    }, (err, user, info) => {
        if (err) {
            return res.json({
                err: err
            })
        }
        if (!user) {
            return res.json({
                message: info.message
            })
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.json({
                    err: err
                })
            }
            return res.json({
                path: info.path
            })
        });
    })(req, res, next);
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local-login',{
        badRequestMessage: "User name and password has been not empty"
    }, (err, user, info) => {
        if (err) {
            return res.json({
                err: err
            })
        }
        if (!user) {
            return res.json({
                message: info.message
            })
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.json({
                    err: err
                })
            }
            return res.json({
                path: info.path
            })
        });
    })(req, res, next);
});

module.exports = router;
