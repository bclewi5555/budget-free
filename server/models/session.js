/*
======================================================
Session table model
======================================================
*/

// Module dependencies
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Session = sequelize.define('sessions', {
    sid: {
      primaryKey: true,
      type: Sequelize.STRING
    },
    user_id: Sequelize.STRING,
    expires: Sequelize.DATE,
    data: Sequelize.TEXT
  });

  return Session;
};