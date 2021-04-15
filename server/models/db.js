/*
======================================================
Database Model
======================================================
*/

// Module dependencies
const Sequelize = require("sequelize");

// Database configuration dependencies
const config = require("../config/db.js");

// Instantiate sequelize object
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  },
  logging: false
  //logging: console.log
  //logging: (...msg) => console.log(msg)
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
db.sessions = require('./session')(sequelize, Sequelize);
db.budgets = require('./budget')(sequelize, Sequelize);
db.budgetMonths = require('./budgetMonth')(sequelize, Sequelize);
db.permissions = require('./permission')(sequelize, Sequelize);
db.groups = require('./group')(sequelize, Sequelize);
db.envelopes = require('./envelope')(sequelize, Sequelize);
db.transactions = require('./transaction')(sequelize, Sequelize);

const User = db.users;
const Budget = db.budgets;
const BudgetMonth = db.budgetMonths;
const Permission = db.permissions;
const Group = db.groups;
const Envelope = db.envelopes;
const Transaction = db.transactions;

// Define associations
Budget.belongsToMany(User, { through: Permission });
User.belongsToMany(Budget, { through: Permission });
Budget.hasMany(BudgetMonth, { 
  foreignKey: {
    name: 'budget_id',
    type: Sequelize.DataTypes.UUID,
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
BudgetMonth.hasMany(Group, { 
  foreignKey: {
    name: 'budget_month_id',
    type: Sequelize.DataTypes.UUID,
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Group.hasMany(Envelope, { 
  foreignKey: {
    name: 'group_id',
    type: Sequelize.DataTypes.UUID,
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Envelope.hasMany(Transaction, { 
  foreignKey: {
    name: 'envelope_id',
    type: Sequelize.DataTypes.UUID,
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

module.exports = db;
