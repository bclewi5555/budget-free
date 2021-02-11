const express = require('express');
const db = require("../db/db");

const router = express.Router();

/* POST / Create new user. */
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
      const result = await db.query(
          "INSERT INTO person (id, username, email, password) VALUES (gen_random_uuid(), $1, $2, $3) RETURNING *",
          [req.body.username, req.body.email, req.body.password]
      );
      console.log(result);
      res.status(201).json({
          status: "success",
          data: {
              user: result.rows[0]
          }
      });
  } catch (e) {
      console.log(e);
  }
});

/* GET / Read all users. */
router.get('/', async (req, res) => {
    try {
      const result = await db.query("SELECT * FROM person");
      res.status(200).json({
        status: "success",
        results: result.rows.length,
        data: {
          user: result.rows
        }
      });
    } catch (e) {
      console.log(e);
    }
  });

/* PUT / Update user by id. */
router.put('/:id', async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  try {
    let result;
    if (req.body.username && req.body.email) {
      result = await db.query(
        "UPDATE person SET username = $1, email = $2 WHERE id = $3 RETURNING *",
        [req.body.username, req.body.email, req.params.id]
      );
    } else if (req.body.username) {
      result = await db.query(
        "UPDATE person SET username = $1 WHERE id = $2 RETURNING *",
        [req.body.username, req.params.id]
      );
    } else if (req.body.email) {
      result = await db.query(
        "UPDATE person SET email = $1 WHERE id = $2 RETURNING *",
        [req.body.email, req.params.id]
      );
    } else if (req.body.password) {
      result = await db.query(
        "UPDATE person SET password = $1 WHERE id = $2 RETURNING *",
        [req.body.password, req.params.id]
      );
    }

    res.status(200).json({
      status: "sucess",
    });
  } catch (e) {
    console.log(e);
  }
});

/* DELETE / Delete user by id. */
router.delete('/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const result = await db.query(
      "DELETE FROM person WHERE id = $1",
      [req.params.id]
    );
    res.status(204).json({
      status: "sucess",
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
