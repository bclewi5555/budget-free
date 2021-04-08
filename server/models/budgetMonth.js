/*
======================================================
Budget Month table model
======================================================
*/

// Module dependencies
const { DataTypes, Deferrable } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const BudgetMonth = sequelize.define('budget_months', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    budget_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
          model: 'budgets',
          key: 'id',
          deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return BudgetMonth;
};