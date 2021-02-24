/*
======================================================
Database Model
======================================================
*/

// Module dependencies
const Sequelize = require("sequelize");

// Database configuration dependencies
const dbConfig = require("../config/db.js");

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

// Test connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Create database model
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Create database tables from models (order matters here)
db.users = require('./user')(sequelize, Sequelize);
db.budgets = require('./budget')(sequelize, Sequelize);
db.budgetMonths = require('./budgetMonth')(sequelize, Sequelize);
db.permissions = require('./permission')(sequelize, Sequelize);
db.groups = require('./group')(sequelize, Sequelize);
db.envelopes = require('./envelope')(sequelize, Sequelize);
db.transactions = require('./transaction')(sequelize, Sequelize);

// Define associations
db.budgets.belongsToMany(db.users, { through: db.permissions });
db.users.belongsToMany(db.budgets, { through: db.permissions });

module.exports = db;
