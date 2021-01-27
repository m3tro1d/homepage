const mongoose = require('mongoose');
const UrlSafeString = require('url-safe-string');

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
          sendJsonResponse(res, 404, {
            message: 'No post found.'
          });
        } else if (err) { // Check for error
          sendJsonResponse(res, 404, err);
        } else {          // Send 'em!
          sendJsonResponse(res, 200, posts);
        }
      });
    } else { // If amount is negative or not presented, get all posts
      Post
      .find()             // Get post
      .sort({ date: -1 }) // Sort newest to latest
      .exec((err, posts) => {
        if (!posts) {     // Check for actual posts
          sendJsonResponse(res, 404, {
            message: 'No posts found.'
          });
        } else if (err) { // Check for error
          sendJsonResponse(res, 404, err);
        } else {          // Send 'em!
          sendJsonResponse(res, 200, posts);
        }
      });
    }
}

module.exports.getOnePost = (req, res, next) => {
  Post
    .findOne({ url: req.params.posturl })
    .exec((err, post) => {
      if (!post) {      // Check for post
        sendJsonResponse(res, 404, {
          message: 'Post not found.'
        });
      } else if (err) { // Check for error
        sendJsonResponse(res, 404, err);
      } else {          // Send it
        sendJsonResponse(res, 200, post);
      }
    });
}

module.exports.createPost = (req, res, next) => {
  // Get current date for post
  let postDate = Date.now();
  Post
    .create({
      heading: req.body.heading,
      text: req.body.text,
      url: generateUrl(req.body.heading, postDate),
      date: postDate
    }, (err, post) => {
      if (err) { // Check for error
        sendJsonResponse(res, 400, err);
      } else {   // Response with created post
        sendJsonResponse(res, 201, post);
      }
    });
}

module.exports.updatePost = (req, res, next) => {
  Post
    .findOne({ url: req.params.posturl })
    .exec((err, post) => {
      if (!post) {      // Check for post
        sendJsonResponse(res, 404, {
          message: 'Post not found.'
        });
      } else if (err) { // Check for error
        sendJsonResponse(res, 400, err);
      } else {          // update post
        post.heading = req.body.heading;
        post.text = req.body.text;
        post.save((err, post) => {
          if (err) { // Check for error
            sendJsonResponse(res, 400, err);
          } else {   // Response with edited post
            sendJsonResponse(res, 200, post);
          }
        });
      }
    });
}

module.exports.deletePost = (req, res, next) => {
  Post
    .findOneAndDelete({ url: req.params.posturl }) // Find and delete the post
    .exec((err, post) => {
      if (err) { // Check for error
        sendJsonResponse(res, 404, err);
      } else {   // Send null response if everything is alrighty
        sendJsonResponse(res, 204, null);
      }
    });
}


// Useful functions
// Ends res with given status and json content
function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
}

// Generate pretty URL for post
function generateUrl(heading, dateNumber) {
  // Generate safe url
  const urlGenerator = new UrlSafeString();
  let urlStart = urlGenerator.generate(heading);

  let date = new Date(dateNumber);
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  return `${urlStart}-${day}-${month}-${year}`;
}
