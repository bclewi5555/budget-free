/*
======================================================
Envelope (of transactions) table model
======================================================
*/

module.exports = (sequelize, Sequelize) => {
  const Envelope = sequelize.define('envelopes', {
    id: {
      primaryKey: true,
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    type: { // is this a fund?
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    label: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    amount_planned: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    is_starred: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    due_date: {
      type: Sequelize.DataTypes.DATEONLY,
      allowNull: true
    },
    starting_balance: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true
    },
    savings_goal: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true
    },
    notes: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true
    }
  });

  return Envelope;
};