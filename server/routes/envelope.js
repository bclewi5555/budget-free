/*
======================================================
Envelope API router
======================================================
*/

// Module dependencies
const express = require('express');

// Controller dependencies
const authController = require('../controllers/auth');
const controller = require('../controllers/envelope');

const router = express.Router();

router.get('/',
  authController.requireAuth,
  controller.getEnvelopes
);

module.exports = router;