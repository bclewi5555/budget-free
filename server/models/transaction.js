/*
======================================================
Transaction table model
======================================================
*/

// Module dependencies
const { DataTypes, Deferrable } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define('transactions', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    envelopeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'envelopes',
        key: 'id',
        deferrable: Deferrable.INITIALLY_IMMEDIATE
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false
    },
    referenceNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return Transaction;
};