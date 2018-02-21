const express = require('express');
const passport = require('passport');
const router = new express.Router();

router.post('/signup',
    passport.authenticate('local-signup',{
        failureFlash: true
    })
);

router.post('/login',
    passport.authenticate('local-login',{
        failureFlash: true
    })
);

module.exports = router;
