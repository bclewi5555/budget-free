/*
======================================================
Index API router
======================================================
*/

// Module dependencies
const express = require('express');
const router = express.Router();

// Controller dependencies
const controller = require('../controllers/index');
const authController = require('../controllers/auth');

router.get('/', 
  authController.requireAuthentication,
  controller.serveIndex
);

router.get('/login', 
  authController.redirectAuthenticatedUsers,
  controller.serveLogin
);

router.get('/signup', 
  authController.redirectAuthenticatedUsers,
  controller.serveSignup
);

module.exports = router;