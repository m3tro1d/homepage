const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const http = require('http');
const path = require('path');

// Connect to database and initialize the models
require('./app_api/models/db');

// Client-side routers
const indexRouter = require('./app_server/routers/index');
const blogRouter = require('./app_server/routers/blog');
// API routers
const blogApiRouter = require('./app_api/routers/blog');
const rendererApiRouter = require('./app_api/routers/renderer');


const app = express();

// App settings
app.set('port', resolvePort(process.env.PORT || '3000'));
app.set('env', process.env.NODE_ENV);

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
app.use('/blog', blogRouter);
// API routes
app.use('/api/blog', blogApiRouter);
app.use('/api/renderer', rendererApiRouter);

// Handle 404 error
app.use((req, res, next) => {
  next(createError(404));
});

// Handle errors
app.use((err, req, res, next) => {
  // err.response.status is for axios error objects
  let status = err.status || err.response.status || 500;

  res.locals.message = err.message;
  res.locals.status = status;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(status);

  // Handle 404 error in a special way
  if (status === 404) {
    res.render('not_found', {
      title: '404 Not Found',
      page_name: 'Not Found'
    });
  } else {
    res.end(err.message);
  }
});

// Start the server
const server = http.createServer(app);
server.listen(app.get('port'));
server.on('error', onError);
server.on('listening', onListening);


// Functions

// Returns a proper port value
function resolvePort(value) {
  const port = parseInt(value, 10);
  if (isNaN(port)) {
    return value; // Pipe
  }
  if (port >= 0) {
    return port; // Number
  }
  return false; // None of the above
}

// Handler for the 'error' server event
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof app.get('port') === 'string'
    ? 'Pipe ' + app.get('port')
    : 'Port ' + app.get('port');

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

// Handler for the 'listening' server event
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
