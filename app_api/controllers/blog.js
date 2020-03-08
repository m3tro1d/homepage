const mongoose = require('mongoose');

// Get model
const Post = mongoose.model('Post');

module.exports.getSeveralPosts = (req, res, next) => {
  // Get post amount
  let amount = parseInt(req.query.amount);
  // Check for proper amount
  if (req.query.amount && amount > 0) { // Get <amount> posts if the amount is presented and positive
      Post
      .find()             // Get post
      .sort({ date: -1 }) // Sort newest to latest
      .limit(amount)      // Limit post amount
      .exec((err, posts) => {
        if (!posts) {     // Check for actual posts
          sendJsonRepsonse(res, 404, {
            message: 'No post found.'
          });
        } else if (err) { // Check for error
          sendJsonRepsonse(res, 404, err);
        } else {          // Send 'em!
          sendJsonRepsonse(res, 200, posts);
        }
      });
    } else { // If amount is negative or not presented, get all posts
      Post
      .find()             // Get post
      .sort({ date: -1 }) // Sort newest to latest
      .exec((err, posts) => {
        if (!posts) {     // Check for actual posts
          sendJsonRepsonse(res, 404, {
            message: 'No posts found.'
          });
        } else if (err) { // Check for error
          sendJsonRepsonse(res, 404, err);
        } else {          // Send 'em!
          sendJsonRepsonse(res, 200, posts);
        }
      });
    }
}


// Useful functions
// Ends res with given status and json content
function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
}