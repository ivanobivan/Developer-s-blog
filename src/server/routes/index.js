import React from 'react';
import express from 'express'
import universalLoader from './universal';

const router = new express.Router();

export default router.get('*', universalLoader);
