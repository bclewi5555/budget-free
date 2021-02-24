/*
======================================================
Budget table model
======================================================
*/

// Module dependencies
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Budget = sequelize.define('budgets', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Budget;
};