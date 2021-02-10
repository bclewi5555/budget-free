const express = require('express');
const db = require("../db/db");

const router = express.Router();

/* GET all users. */
router.get('/', async (req, res) => {
  try {
    //console.log("Querying database...");
    const allUsers = await db.query("SELECT * FROM person");
    //console.log("Finished database query");
    res.status(200).json({
      status: "success",
      results: allUsers.rows.length,
      data: {
        users: allUsers.rows
      }
    });
  } catch (e) {
    //console.log(e.message);
    console.log(e);
  }
});

module.exports = router;
