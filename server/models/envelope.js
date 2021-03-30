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
    group_id: {
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
    amount_planned: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    is_starred: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    starting_balance: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    savings_goal: {
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