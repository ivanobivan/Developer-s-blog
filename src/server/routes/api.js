const express = require('express');
const router = new express.Router();

router.post('/checkUser', (req, res) => {
    if (req.user && req.user.level) {
        switch (req.user.level) {
            case 'admin' :
                res.json({
                    level: 'admin',
                    username: req.user.username
                });
                break;
            case 'user' :
                res.json({
                    level: 'user',
                    username: req.user.username
                });
                break;
            default :
                res.json({
                    level: 'unknown',
                    username: null
                });
        }
    } else {
        res.json({
            level: 'unknown',
            username: null
        });
    }
});

router.get('/dashboard', (req, res) => {
    if (req.user && req.user.level) {
        switch (req.user.level) {
            case 'admin' :
                res.status(200).json({
                    message: 'available'
                });
                break;
            case 'user' :
                res.status(200).json({
                    message: "not available"
                });
                break;
            default :
                res.status(200).json({
                    message: 'error'
                });
        }
    } else {
        res.status(200).json({
            message: 'error'
        });
    }

});

module.exports = router;
