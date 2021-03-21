/*
======================================================
User API router
======================================================
*/

// Module dependencies
const express = require('express');

// Controller dependencies
const controller = require('../controllers/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.get("/", 
  authController.requireApiAuthentication,
  controller.getUser
);
//router.put("/:id", controller.update);
//router.delete("/:id", controller.delete);

module.exports = router;