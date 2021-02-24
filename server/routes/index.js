/*
======================================================
Index API router
======================================================
*/

// Module dependencies
const express = require('express');

// Controller dependencies
const controller = require('../controllers/index');

const router = express.Router();

router.get('/', controller.serveIndex);

module.exports = router;
