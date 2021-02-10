/*  
WARNING! ---------------- WARNING! ---------------- WARNING!
This database is not secured for production deployment! The
current configuration is only suitable for local development.
WARNING! ---------------- WARNING! ---------------- WARNING!
*/

const Pool = require("pg").Pool;

const pool = new Pool({
  
 user: "brandonlewis",
  password: "secret",
  host: "localhost",
  port: 5432,
  database: "budgetfree"
});

module.exports = pool;