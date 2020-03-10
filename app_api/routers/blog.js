const express = require('express');

const ctrlBlog = require('../controllers/blog');
const auth = require('../../middleware/auth');

// Router for the blog API routes
const router = express.Router();

// Get an amount of posts (or all)
router.get('/', ctrlBlog.getSeveralPosts);
// Get certain post
router.get('/:posturl', ctrlBlog.getOnePost);
// Create a post
router.post('/', auth, ctrlBlog.createPost);
// Update a post
router.put('/:posturl', auth, ctrlBlog.updatePost);
// Delete a post
router.delete('/:posturl', auth, ctrlBlog.deletePost);

module.exports = router;