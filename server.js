const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const path = require('path');

// Client-side routers
const indexRouter = require('./app_server/routers/index');
// API routers
const blogRouter = require('./app_api/routers/blog');


// Connect to database
require('./app_api/models/db');

const app = express()

// App settings
app.set('port', process.env.PORT);

// Set up view engine
app.set('views', path.join(__dirname, 'app_server/views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Client routes
app.use('/', indexRouter);
// API routes
app.use('/api', blogRouter);

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

app.listen(app.get('port'), () => console.log(`Server listening on port ${app.get('port')}.`));
