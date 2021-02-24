/*
======================================================
Access (of users added to a Budget) join-table model
======================================================
*/

// Module dependencies
const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Permission = sequelize.define('permissions', {
    isOwner: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      default: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      default: false
    }
  });

  return Permission;
};