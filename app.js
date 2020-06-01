const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const flash = require('req-flash')
const session = require('express-session')

const app = express()

const corsOptions = {
  origin: 'http://localhost:3000',
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  session({
    secret: 'express bcrypt',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 1000 * 30,
    },
  })
)

app.use(flash())

const db = require('./src/db/models')
const Role = db.role_id
const Category = db.category

db.sequelize.sync()
// db.sequelize.sync().then(() => {
//   console.log('Drop and Resync Database with { force: true }')
//   initial()
// })

app.use('/', indexRouter)
app.use('/users', usersRouter)

//routes
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)
require('./routes/category.routes')(app)
// require('./routes/task.routes')(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

function initial() {
  Role.create({
    id: 1,
    name: 'employee',
  })

  Role.create({
    id: 2,
    name: 'manager',
  })

  Category.create({
    id: 1,
    name: 'Front End',
  })

  Category.create({
    id: 2,
    name: 'Back End',
  })
}

module.exports = app
