const db = require('../src/db/models')
const config = require('../src/db/config/auth.config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = db.user
const Role = db.role_id
const Op = db.Sequelize.Op

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findOne({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRole_ids(roles).then(() => {
            // req.session.message = {
            //   type: 'success',
            //   intro: 'Success',
            //   message: 'User was registered successfuly!',
            // }
            // res.redirect('/')
            res.send({ message: 'User was registered successfuly!' })
          })
        })
      } else {
        // user role = undefined
        user.setRoles([1]).then(() => {
          res.send({ message: 'Please choose role!' })
        })
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }))
}

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        // req.session.message = {
        //   type: 'info',
        //   intro: 'Info',
        //   message: `User Not Found!`,
        // }

        // return res.redirect('/')
        return res.status(404).send({ message: 'User Not found.' })
      }

      let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

      if (!passwordIsValid) {
        // req.session.message = {
        //   type: 'danger',
        //   intro: 'Error',
        //   message: 'Please insert the password correct!',
        // }

        // return res.redirect('/')

        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        })
      }

      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, //24hours
      })

      user.getRole_ids().then((roles) => {
        // res.render('page/home', {
        //   id: user.id,
        //   username: user.username,
        //   email: user.email,
        //   roles: roles[0].name.toUpperCase(),
        //   accessToken: token,
        // })
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: roles[0].name.toUpperCase(),
          accessToken: token,
        })
      })
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}
