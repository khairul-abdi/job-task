const db = require('../src/db/models')
const Task = db.ztask
const Categories = db.category
const User = db.users
const { authJwt } = require('../middleware')

// Create and Save new Task
exports.createTask = (req, res) => {
  if (authJwt.verifyToken && authJwt.isManagerOrEmployee) {
    //Create & Save a Task in the database
    Task.create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      isCompleted: req.body.isCompleted,
    })
      .then((task) => {
        if (req.body.userId) {
          User.findOne({
            where: {
              id: {
                [Op.or]: req.body.userId,
              },
            },
          })
            // .then((user) => {
            //   task.setUsers(user).then(() => {
            //     console.log('Success UserID')
            //   })
            // })
            // .then((category) => {
            //   Categories.findOne({
            //     where: {
            //       name: {
            //         [Op.or]: req.body.name,
            //       },
            //     },
            //   })
            // })
            .then((category) => {
              task.setCategories(category).then(() => {
                res.send({ message: 'Task was added successfuly!' })
              })
            })
        } else {
          res.status(400).send({ message: err.message })
        }

        // res.send(data)
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the Task',
        })
      })
  }
}
