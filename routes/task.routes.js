const controller = require('../controller/user.controller')

module.exports = function (app) {
  app.post('/api/task', controller.employeeBoard)
}
