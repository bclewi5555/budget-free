const express = require('express');
const router = express.Router();

const users = require("../controllers/users.js");

router.post("/", users.create);
router.get("/:id", users.read);
router.put("/:id", users.update);
router.delete("/:id", users.delete);

module.exports = router;