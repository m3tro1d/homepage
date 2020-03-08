const express = require('express');

const ctrlBlog = require('../controllers/blog');

// Router for the blog API routes
const router = express.Router();

// Get an amount of posts (or all)
router.get('/blog', ctrlBlog.getSeveralPosts);
// Get certain post
router.get('/blog/:posturl', ctrlBlog.getOnePost);
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