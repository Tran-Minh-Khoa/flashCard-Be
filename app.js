var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require("express-ejs-layouts");
require("dotenv").config();

// connect to mongodb
var connect = require("./config/mongodbconect");
connect();
// ADD THIS
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// import user routers
const userDeckRouter = require("./components/user/Deck/deck.router");
const userAuthRouter = require("./components/user/Auth/auth.router");
const userCourseRouter = require("./components/user/Course/course.router");

//import admin routers
const adminDeckRouter = require("./components/admin/Deck/deck.router");
const adminAuthRouter = require("./components/admin/auth/auth.router");
const adminUserListRouter = require("./components/admin/userManagement/user-management.router");
const adminCourseRouter = require("./components/admin/course/course.router");
var ensureAuthenticated = require("./middleware/accountAuth");
var checkAdminAuth = require("./middleware/adminAuth");
var app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport middleware
const passport = require("passport");
const session = require("express-session");
app.use(
  session({
    secret: "Cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./config/passportConfig");


app.use('/', indexRouter);
app.use('/users', usersRouter);
//admin routers
app.use("/admin", adminAuthRouter);

app.use("/admin/user", checkAdminAuth, adminUserListRouter);
app.use("/admin/deck", checkAdminAuth, adminDeckRouter);
app.use("/admin/course", checkAdminAuth, adminCourseRouter);

//user routers
app.use('/decks', userDeckRouter);
app.use('/auth', userAuthRouter);
app.use('/courses', userCourseRouter);
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
