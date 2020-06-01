const db = require('../src/db/models')
const Category = db.category

// Create and Save new Category
exports.createCategory = (req, res) => {
  //Create & Save a Category in the database
  Category.create({
    name: req.body.name,
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
