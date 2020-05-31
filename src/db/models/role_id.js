'use strict'
module.exports = (sequelize, DataTypes) => {
  const role_id = sequelize.define(
    'role_id',
    {
      name: DataTypes.STRING,
    },
    {}
  )
  role_id.associate = function (models) {
    role_id.belongsToMany(models.user, {
      through: 'user_roles',
      foreignKey: 'roleId',
      otherKey: 'userId',
    })
  }
  return role_id
}
