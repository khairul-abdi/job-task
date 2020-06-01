const { authJwt } = require('../middleware')
const controller = require('../controller/user.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.post(
    '/api/task/create',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.taskBoard
  )

  app.post(
    '/api/task/create',
    [authJwt.verifyToken, authJwt.isManager],
    controller.ManagerBoard
  )
}
