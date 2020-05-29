'use strict'
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      username: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      password: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
    },
    {}
  )
  user.associate = function (models) {
    // user hasMany task
    user.hasMany(models.task, {
      foreignKey: 'userId',
    })
  }
  return user
}
