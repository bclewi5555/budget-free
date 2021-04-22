/*
======================================================
Session table model
======================================================
*/

module.exports = (sequelize, Sequelize) => {
  const Session = sequelize.define('sessions', {
    sid: {
      primaryKey: true,
      type: Sequelize.DataTypes.STRING
    },
    user_id: Sequelize.DataTypes.UUID,
    expires: Sequelize.DataTypes.DATE,
    data: Sequelize.DataTypes.JSON
  });

  return Session;
};