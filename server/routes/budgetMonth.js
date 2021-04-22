/*
======================================================
budgetMonth API router
======================================================
*/

// Module dependencies
const express = require('express');
const asyncHandler = require('express-async-handler');

// Controller dependencies
const authController = require('../controllers/auth');
const permController = require('../controllers/permission');
const controller = require('../controllers/budgetMonth');

const router = express.Router();

router.post('/',
  asyncHandler(authController.requireAuth),
  asyncHandler(permController.requirePerms),
  asyncHandler(controller.createBudgetMonth)
);

router.get('/',
  asyncHandler(authController.requireAuth),
  asyncHandler(permController.requirePerms),
  asyncHandler(controller.getBudgetMonths)
);

router.put('/:budgetMonthId',
  asyncHandler(authController.requireAuth),
  asyncHandler(permController.requirePerms),
  asyncHandler(controller.updateBudgetMonth)
);

router.delete('/:budgetMonthId',
  asyncHandler(authController.requireAuth),
  asyncHandler(permController.requirePerms),
  asyncHandler(controller.deleteBudgetMonth)
);

module.exports = router;