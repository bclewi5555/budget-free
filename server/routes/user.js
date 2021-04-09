/*
======================================================
User API router
======================================================
*/

// Module dependencies
const express = require('express');
const asyncHandler = require('express-async-handler');

// Controller dependencies
const controller = require('../controllers/user');
const authController = require('../controllers/auth');
const permController = require('../controllers/permission');

const router = express.Router();


router.get("/",
  asyncHandler(authController.requireAuth),
  asyncHandler(permController.getPerms),
  asyncHandler(controller.getUsers)
);

//router.put("/:id", controller.update);
//router.delete("/:id", controller.delete);

module.exports = router;