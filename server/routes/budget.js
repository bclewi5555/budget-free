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

router.post('/',
  asyncHandler(authController.requireAuth),
  asyncHandler(controller.createBudget)
);

// TODO Test
router.post('/template',
  asyncHandler(authController.requireAuth),
  asyncHandler(controller.createBudgetFromTemplate)
);

// TODO
router.post('/:budgetId/permissions',
  asyncHandler(authController.requireAuth),
  asyncHandler(permController.requirePerms),
  asyncHandler(controller.createBudgetPermission)
);

router.get('/',
  asyncHandler(authController.requireAuth),
  asyncHandler(permController.getPerms),
  asyncHandler(controller.getBudgets)
);

// TODO
router.get('/:budgetId/permissions',
  asyncHandler(authController.requireAuth),
  asyncHandler(permController.requirePerms),
  asyncHandler(controller.getBudgetPermissions)
);

// TODO
router.get('/:budgetId/details',
  asyncHandler(authController.requireAuth),
  asyncHandler(permController.requirePerms),
  asyncHandler(controller.getBudgetDetails)
);

router.put('/:budgetId',
  asyncHandler(authController.requireAuth),
  asyncHandler(permController.requirePerms),
  asyncHandler(controller.updateBudget)
);

// TODO
router.put('/:budgetId/permissions/:userId',
  asyncHandler(authController.requireAuth),
  asyncHandler(permController.requirePerms),
  asyncHandler(controller.updateBudgetPermission)
);

router.delete('/:budgetId',
  asyncHandler(authController.requireAuth),
  asyncHandler(permController.requirePerms),
  asyncHandler(controller.deleteBudget)
);

// TODO
router.delete('/:budgetId/permissions/:userId',
  asyncHandler(authController.requireAuth),
  asyncHandler(permController.requirePerms),
  asyncHandler(controller.deleteBudgetPermission)
);

module.exports = router;