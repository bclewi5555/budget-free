/*
======================================================
Passport authentication API router
======================================================
*/

// Module dependencies
const express = require('express');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const router = express.Router();

// Controller dependencies
const controller = require('../controllers/auth');

router.post('/signup',
  asyncHandler(controller.signup)
);

router.post('/login',
  passport.authenticate('local', {
    //successRedirect: '/',
    //failureRedirect: '/login',
    failureFlash: true
  }),
  controller.login
);

router.post('/session',
  asyncHandler(controller.validateSession)
);

router.post('/logout',
  controller.logout
);

module.exports = router;