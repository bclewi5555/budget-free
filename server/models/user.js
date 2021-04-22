/*
======================================================
User table model
======================================================
*/

// Module dependencies
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: Sequelize.STRING,
      allowNull: false
    },
    subscription: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    default_budget_id: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null,
      references: {
        model: 'budgets',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
  });

  return User;
};