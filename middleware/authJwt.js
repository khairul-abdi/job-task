const jwt = require('jsonwebtoken')
const config = require('../src/db/config/auth.config')
const db = require('../src/db/models')
const User = db.user

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    })
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthhorized!',
      })
    }
    req.userId = decoded.id
    next()
  })
}

isManager = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRole_ids().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'manager') {
          next()
          return
        }
      }

      res.status(403).send({
        message: 'Require Manager Role!',
      })
      return
    })
  })
}

isEmployee = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRole_ids().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name.toLowerCase() === 'employee') {
          next()
          return
        }
      }
      res.status(403).send({
        message: 'Require Employee Role!',
      })
    })
  })
}

isManagerOrEmployee = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRole_ids().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'manager') {
          next()
          return
        }

        if (roles[i].name === 'employee') {
          next()
          return
        }
      }

      res.status(403).send({
        message: 'Require Role!',
      })
    })
  })
}

const authJwt = {
  verifyToken,
  isEmployee,
  isManager,
  isManagerOrEmployee,
}

module.exports = authJwt
