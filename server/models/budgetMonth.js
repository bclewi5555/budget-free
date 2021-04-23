/*
======================================================
Budget Month table model
======================================================
*/

module.exports = (sequelize, Sequelize) => {
  const BudgetMonth = sequelize.define('budget_months', {
    id: {
      primaryKey: true,
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    date_integer: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    }
  });

  return BudgetMonth;
};