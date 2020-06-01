const controller = require('../controller/category.controller')

module.exports = function (app) {
  app.post('/api/category', controller.createCategory)
}
