/*
======================================================
Access (of users added to a Budget) join-table model
======================================================
*/

// Module dependencies
const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Permission = sequelize.define('permissions', {
    is_owner: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      default: false
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      default: false
    }
  });

  return Permission;
};