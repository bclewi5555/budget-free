/*
======================================================
Group (of envelopes) table model
======================================================
*/

// Module dependencies
const { DataTypes, Deferrable } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Group = sequelize.define('groups', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    budget_month_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'budget_months',
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Group;
};