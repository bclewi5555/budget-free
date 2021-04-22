/*
======================================================
User table model
======================================================
*/

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    id: {
      primaryKey: true,
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    first_name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    subscription: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false
    },
    default_budget_id: { 
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
      defaultValue: null,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      references: {
        model: 'budgets',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_DEFERRED,
      }
    },
  });

  return User;
};