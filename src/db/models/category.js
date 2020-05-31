'use strict'
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    'category',
    {
      name: DataTypes.STRING,
    },
    {}
  )
  category.associate = function (models) {
    // user hasMany task
    category.hasMany(models.ztask, {
      foreignKey: 'categoryId',
    })
  }
  return category
}
