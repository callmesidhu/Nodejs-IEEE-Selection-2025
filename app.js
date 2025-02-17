var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
const session = require('express-session');

var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var adminRouter = require('./routes/admin');
var managerRouter = require('./routes/manager');
var employeeRouter = require('./routes/employee');
var indexRouter = require('./routes/index');
var db = require('./configs/dbconnection');

var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'callmesidhu', // Change this to a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set `true` in production with HTTPS
  })
);

// ✅ Move this middleware ABOVE routes
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/admin', adminRouter);
app.use('/manager', managerRouter);
app.use('/employee', employeeRouter);

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login');
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
