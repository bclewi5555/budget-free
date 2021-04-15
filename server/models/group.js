/*
======================================================
Group (of envelopes) table model
======================================================
*/

module.exports = (sequelize, Sequelize) => {
  const Group = sequelize.define('groups', {
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

  return Group;
};