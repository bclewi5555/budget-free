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
    },
    default_budget_month_id: {
      // this fk is set up to avoid cyclical dependency between budgets and budgetMonths
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
      defaultValue: null,
      // when a budgetMonth is deleted, set the default_budget_month_id to null
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      references: {
        model: 'budgetMonths',
        key: 'id',
        // Defer all foreign key constraint check to the end of a transaction
        deferrable: Sequelize.Deferrable.INITIALLY_DEFERRED,
      }
    }
  });

  return Budget;
};