/*
======================================================
Passport authentication API router
======================================================
*/

// Module dependencies
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Controller dependencies
const controller = require('../controllers/auth');

router.post('/login',
  passport.authenticate('local', {
    //successRedirect: '/',
    //failureRedirect: '/login',
    failureFlash: true
  }),
  controller.login
);

router.post('/logout',
  controller.logout
);

router.post('/signup',
  controller.signup
);

module.exports = router;