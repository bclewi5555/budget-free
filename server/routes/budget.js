/*
======================================================
Budget API router
======================================================
*/

// Module dependencies
const express = require('express');
const asyncHandler = require('express-async-handler');

// Controller dependencies
const authController = require('../controllers/auth');
const permController = require('../controllers/permission');
const controller = require('../controllers/budget');

const router = express.Router();

router.get('/',
  authController.requireAuth,
  asyncHandler(permController.getPerms),
  asyncHandler(controller.getBudgets)
);

module.exports = router;