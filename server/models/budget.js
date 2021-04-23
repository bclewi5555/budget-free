/*
======================================================
Budget table model
======================================================
*/

module.exports = (sequelize, Sequelize) => {
  const Budget = sequelize.define('budgets', {
    id: {
      primaryKey: true,
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    label: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    }
  });

  return Budget;
};