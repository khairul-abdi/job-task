'use strict'
module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define(
    'ztask',
    {
      title: DataTypes.STRING,
      subtitle: DataTypes.STRING,
      description: DataTypes.STRING,
      dateStart: DataTypes.DATEONLY,
      dateEnd: DataTypes.DATEONLY,
      isCompleted: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'category',
          key: 'id',
        },
      },
    },
    {}
  )
  task.associate = function (models) {
    task.belongsTo(models.user, {
      foreignKey: 'id',
      target_Key: 'userId',
    })

    task.belongsTo(models.category, {
      foreignKey: 'id',
      target_Key: 'categoryId',
    })
  }

  return task
}
