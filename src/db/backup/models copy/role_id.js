'use strict';
module.exports = (sequelize, DataTypes) => {
  const role_Id = sequelize.define('role_Id', {
    name: DataTypes.STRING
  }, {});
  role_Id.associate = function(models) {
    // associations can be defined here
  };
  return role_Id;
};