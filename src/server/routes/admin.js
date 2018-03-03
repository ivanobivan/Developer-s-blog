import mongoose from 'mongoose'
const express = require('express');
const router = new express.Router();
//const User = require('mongoose').model('User');
router.post('/user', (req,res,next) => {
    const User = mongoose.model("User");
    User.findOne({username:req.body.username}, (err, user) => {
        if(err) {
            throw err;
        }
        if(!user) {
            return res.json({
                message: "Incorrect username"
            })
        }
        return res.json({
            username: user.username,
            level: user.level,
            date: user.date,
            ip: user.ip
        })
    })
});

module.exports = router;
