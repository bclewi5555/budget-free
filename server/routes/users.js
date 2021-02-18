/*
======================================================
Users API router
======================================================
*/

// Module dependencies
const express = require('express');

// Controller dependencies
const users = require("../controllers/users.js");

const router = express.Router();

router.post("/", users.create);
router.get("/:id", users.findOne);
router.put("/:id", users.update);
router.delete("/:id", users.delete);

module.exports = router;