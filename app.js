var createError = require('http-errors'); // it library for handling code
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('express-async-errors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var countryRouter = require('./routes/country-route');
var customerRouter = require('./routes/customer-route');
var filmRouter = require('./routes/film-route')
const {request} = require("express");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/countries', countryRouter);
app.use('/customer', customerRouter);
app.use('/films', filmRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// if comment this default must show html error
// error handler
app.use(function (err, req, res, next) {
    const status = err.status || 500;
    const errorCode = err.code || (err.message.toUpperCase().replace(/ /g, '_'));
    res.status(status);
    res.json({
        error: errorCode,
        status: status,
        message: err.message,
        resource: req.originalUrl,
        timestamp: new Date().toLocaleString(),
        ...(err.errors && {errors: err.errors}),
    });
});


module.exports = app;
