const express = require('express');
const pool = require("../db");

const router = express.Router();

/* GET all users. */
router.get('/', async (req, res, next) => {
  try {
    console.log("Querying database");
    const dbResponse = await pool.query("SELECT * FROM person");
    /* Simulate database response
    const allUsers = [
      {id: 1, un: "AlexaAllistair1", email: "aa1@example.com"},
      {id: 2, un: "BobBurns2", email: "bb2@example.com"},
      {id: 3, un: "CourtneyCopeland3", email: "cc3@example.com"}
    ];
    */
    console.log("Finished database query");
    res.json(dbResponse.rows);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
