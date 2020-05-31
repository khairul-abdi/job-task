const db = require('../src/db/models')
const Category = db.category
const Task = db.ztask

// Create and Save new Category
exports.createCategory = (category) => {
  return Category.create({
    name: category.name,
  })
    .then((category) => {
      console.log('>> Created Category: ' + JSON.stringify(category, null, 4))
      return category
    })
    .catch((ere) => {
      console.log('>> Error while creating category: ', err)
    })
}

// Create and Save new Comments
