/*
======================================================
Transaction table model
======================================================
*/

module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define('transactions', {
    id: {
      primaryKey: true,
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    type: { // transfer?
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: Sequelize.DataTypes.DATEONLY,
      allowNull: false
    },
    label: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    reference_number: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true
    },
    notes: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true
    }
  });

  return Transaction;
};