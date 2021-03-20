/*
======================================================
Envelope (of transactions) table model
======================================================
*/

// Module dependencies
const { DataTypes, Deferrable } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Envelope = sequelize.define('envelopes', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
          model: 'groups',
          key: 'id',
          deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    type: { // is this a fund?
      type: DataTypes.STRING,
      allowNull: false
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amountPlanned: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    isStarred: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    startingBalance: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    savingsGoal: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return Envelope;
};