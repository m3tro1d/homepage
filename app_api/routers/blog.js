const express = require('express');

// Router for the blog API routes
const router = express.Router();

// Get all posts
router.get('/blog', (req, res, next) => {
  res.end('All posts.');
});
// Get certain post
router.get('/blog/:posturl', (req, res, next) => {
  res.end(req.params.posturl + ' post.');
});
// Create a post
router.post('/blog', (req, res, next) => {
  res.json({ msg: 'Create post.' });
});
// Update a post
router.put('/blog/:posturl', (req, res, next) => {
  res.json({ msg: 'Update post ' + req.params.posturl });
});
// Delete a post
router.delete('/blog/:posturl', (req, res, next) => {
  res.json({ msg: 'Delete post ' + req.params.posturl });
});

module.exports = router;