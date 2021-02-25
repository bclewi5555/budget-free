/*
======================================================
Passport authentication API router
======================================================
*/

// Module dependencies
const express = require('express');
const passport = require('passport');

// Controller dependencies
const controller = require('../controllers/auth.js');

// Configuration dependencies
require('../config/auth');

const router = express.Router();

router.post('/signup', controller.signup);
router.post('/login',
  controller.preAuth,
  passport.authenticate('local', {
    //successRedirect: '/',
    successFlash: true,
    //failureRedirect: '/login',
    failureFlash: true
  }),
  controller.postAuth
);
router.get('/logout', controller.logout);

module.exports = router;