const db = require('../src/db/models')
const Task = db.ztask
const Categories = db.category
const User = db.users
const { authJwt } = require('../middleware')

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.')
}

exports.employeeBoard = (req, res) => {
  res.status(200).send('Tasks for Employee Content.')
}

exports.ManagerBoard = (req, res) => {
  res.status(200).send('Manager Content.')
}

exports.taskBoard = (req, res) => {
  Task.create({
    title: req.body.title,
    subtitle: req.body.subtitle,
    description: req.body.description,
    dateStart: req.body.dateStart,
    dateEnd: req.body.dateEnd,
    isCompleted: req.body.isCompleted,
    categoryId: req.body.categoryId,
    userId: req.body.userId,
  })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Category',
      })
    })
}
