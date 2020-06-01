const db = require('../src/db/models')
const Task = db.ztask
const Categories = db.category
const User = db.users
const { authJwt } = require('../middleware')

// Create and Save new Task
// exports.createTask = (req, res) => {
//   if (authJwt.verifyToken && authJwt.isManagerOrEmployee) {
//     Task.create({
//       title: req.body.title,
//       subtitle: req.body.subtitle,
//       description: req.body.description,
//       dateStart: req.body.dateStart,
//       dateEnd: req.body.dateEnd,
//       isCompleted: req.body.isCompleted,
//       categoryId: req.body.categoryId,
//       userId: req.body.userId,
//     })
//       .then((data) => {
//         res.send(data)
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message:
//             err.message || 'Some error occurred while creating the Category',
//         })
//       })
//   }
// }
