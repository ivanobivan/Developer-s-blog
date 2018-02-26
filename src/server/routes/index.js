const React = require('react');
const router = require('express').Router();
const universalLoader = require('./universal');

router.get('*',universalLoader);

module.exports = router;
