/*
======================================================
Permission API router
======================================================
*/

// Module dependencies
const express = require('express');
const asyncHandler = require('express-async-handler');

// Controller dependencies
const authController = require('../controllers/auth');
const controller = require('../controllers/permission');

const router = express.Router();

router.get('/',
  authController.requireAuth,
  asyncHandler(controller.getPermissions)
);

module.exports = router;