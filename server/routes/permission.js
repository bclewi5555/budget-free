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
  asyncHandler(authController.requireAuth),
  asyncHandler(controller.getPermissions)
);

/*
router.put('/:permissionId/user/:userId',
  asyncHandler(authController.requireAuth),
  asyncHandler(controller.updatePermission)
);

router.delete('/:permissionId/user/:userId',
  asyncHandler(authController.requireAuth),
  asyncHandler(controller.deletePermission)
);
*/

module.exports = router;