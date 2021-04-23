/*
======================================================
Access (of users added to a Budget) join-table model
======================================================
*/

module.exports = (sequelize, Sequelize) => {
  const Permission = sequelize.define('permissions', {
    is_owner: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: true,
      default: false
    },
    is_admin: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: true,
      default: false
    }
  });

  return Permission;
};