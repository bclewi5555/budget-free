/*
======================================================
Database ORM instantiation
======================================================
*/

// Module dependencies
const Sequelize = require("sequelize");

// Database configuration dependencies
const dbConfig = require("../config/db-config.js");

// Instantiate sequelize object
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// Create databse model
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./users.js")(sequelize, Sequelize);

module.exports = db;
