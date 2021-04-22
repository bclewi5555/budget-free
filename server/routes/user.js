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
const budgetController = require('../controllers/budget');
const permController = require('../controllers/permission');

// Middleware denendencies
const { validateResource } = require('../middleware/validateResource');

// Validation dependencies
const { userUpdateSchema } = require('../validationSchemas/userUpdate');
const { userCreateSchema } = require('../validationSchemas/userCreate');

const router = express.Router();

// signup user endpoint is duplicated at '/api/v1/auth/signup' in auth controller
router.post("/signup",
  validateResource(userCreateSchema),
  asyncHandler(controller.createUser)
);

router.get("/me",
  asyncHandler(authController.requireAuth),
  asyncHandler(permController.getPerms),
  asyncHandler(controller.getUser)
);

router.put("/me",
  asyncHandler(authController.requireAuth),
  validateResource(userUpdateSchema),
  asyncHandler(permController.getPerms),
  asyncHandler(controller.updateUser)
);

// TODO
router.delete("/me/:userIdConfirmation",
  asyncHandler(authController.requireAuth),
  asyncHandler(permController.getPerms),
  asyncHandler(controller.deleteUser)
);

module.exports = router;