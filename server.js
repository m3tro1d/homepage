const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

const app = express()

// Middleware
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Routes go here
app.use('*', (req, res, next) => {
  res.end('Response.');
});

// Handle 404 error
app.use((req, res, next) => {
  next(createError(404));
});

// Handle errors
app.use((err, req, res, next) => {
  let status = err.status || 500;

  res.locals.message = err.message;
  res.locals.status = status;

  res.status(status);
  res.end(err.message);
});

app.listen(1337, () => console.log('Server listening on port 1337.'));