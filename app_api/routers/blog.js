const express = require('express');

// Router for the blog API routes
const router = express.Router();

// Get all posts
router.get('/posts', (req, res, next) => {
  res.end('All posts.');
});
// Get certain post
router.get('/posts/:posturl', (req, res, next) => {
  res.end(req.params.posturl + ' post.');
});
// Create a post
router.post('/posts', (req, res, next) => {
  res.end({ msg: 'Create post.' });
});
// Update a post
router.put('/posts/:posturl', (req, res, next) => {
  res.end({ msg: 'Update post ' + req.params.posturl });
});
// Delete a post
router.delete('/posts/:posturl', (req, res, next) => {
  res.end({ msg: 'Delete post ' + req.params.posturl });
});

module.exports = router;