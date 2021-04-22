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
  //logging: false
  logging: console.log
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

// join table for budgets-users
Budget.belongsToMany(User, { through: Permission, foreignKey: 'budget_id' });
User.belongsToMany(Budget, { through: Permission, foreignKey: 'user_id' });

//Budget.hasMany(BudgetMonth);
BudgetMonth.hasOne(Budget, {
  foreignKey: {
    name: 'default_budget_month_id',
    type: Sequelize.DataTypes.UUID,
    allowNull: true,
    defaultValue: null
  },
  constraints: false,
  onDelete: 'SET NULL', // When the budgetMonth is deleted, set default_budget_month_id reference to null
  onUpdate: 'CASCADE'
});
BudgetMonth.belongsTo(Budget, { 
  foreignKey: {
    name: 'budget_id',
    type: Sequelize.DataTypes.UUID,
    allowNull: false
  },
  onDelete: 'CASCADE', // When the budget is deleted, delete all of its budgetMonths
  onUpdate: 'CASCADE'
});


//BudgetMonth.hasMany(Group);
Group.belongsTo(BudgetMonth, { 
  foreignKey: {
    name: 'budget_month_id',
    type: Sequelize.DataTypes.UUID,
    allowNull: false
  },
  onDelete: 'CASCADE', // When the budgetMonth is deleted, delete all of its groups
  onUpdate: 'CASCADE'
});

//Group.hasMany(Envelope);
Envelope.belongsTo(Group, { 
  foreignKey: {
    name: 'group_id',
    type: Sequelize.DataTypes.UUID,
    allowNull: false
  },
  onDelete: 'CASCADE', // When the group is deleted, delete all of its envelopes
  onUpdate: 'CASCADE'
});

//Envelope.hasMany(Transaction);
Transaction.belongsTo(Envelope, { 
  foreignKey: {
    name: 'envelope_id',
    type: Sequelize.DataTypes.UUID,
    allowNull: false
  },
  onDelete: 'CASCADE', // When the envelope is deleted, delete all of its transactions
  onUpdate: 'CASCADE'
});

module.exports = db;
