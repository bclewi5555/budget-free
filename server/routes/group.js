/*
======================================================
EnvelopeGroups API router
======================================================
*/

// Module dependencies
const express = require('express');
const asyncHandler = require('express-async-handler');

// Controller dependencies
const authController = require('../controllers/auth');
const permController = require('../controllers/permission');
const controller = require('../controllers/group');

const router = express.Router();

router.post('/',
  asyncHandler(authController.requireAuth),
  asyncHandler(permController.requirePerms),
  asyncHandler(controller.createGroup)
);

router.get('/',
  asyncHandler(authController.requireAuth),
  asyncHandler(permController.requirePerms),
  asyncHandler(controller.getGroups)
);

router.put('/:groupId',
  asyncHandler(authController.requireAuth),
  asyncHandler(permController.requirePerms),
  asyncHandler(controller.updateGroup)
);

router.delete('/:groupId',
  asyncHandler(authController.requireAuth),
  asyncHandler(permController.requirePerms),
  asyncHandler(controller.deleteGroup)
);

module.exports = router;