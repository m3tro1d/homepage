// Middleware function for authorizing access to API
module.exports = (req, res, next) => {
  // Check for password match
  if (req.body.api_pass == process.env.API_PASS) {
    next();
  } else {
    sendJsonResponse(res, 401, { message: 'Unauthorized.' });
  }
};


// Useful functions
// Ends res with given status and json content
function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
}
