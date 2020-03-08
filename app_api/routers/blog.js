const express = require('express');

const ctrlBlog = require('../controllers/blog');

// Router for the blog API routes
const router = express.Router();

// Get an amount of posts (or all)
router.get('/', ctrlBlog.getSeveralPosts);
// Get certain post
router.get('/:posturl', ctrlBlog.getOnePost);
// Create a post
router.post('/', ctrlBlog.createPost);
// Update a post
router.put('/:posturl', ctrlBlog.updatePost);
// Delete a post
router.delete('/:posturl', ctrlBlog.deletePost);

module.exports = router;