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
  controller.redirectAuthenticatedUsers,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);

router.delete('/logout',
  controller.logout
);

router.post('/signup',
  controller.redirectAuthenticatedUsers,
  controller.signup
);

module.exports = router;