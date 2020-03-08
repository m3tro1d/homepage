const mongoose = require('mongoose');

// Get model
const Post = mongoose.model('Post');

module.exports.getSeveralPost = (req, res, next) => {
  // Get post amount
  let amount = parseInt(req.query.amount);
}


// Useful functions
function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
}