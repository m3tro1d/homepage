const express = require('express');

const ctrlBlog = require('../controllers/blog');
const auth = require('../../middleware/auth');

// Router for the blog API routes
const router = express.Router();

// Get an amount of posts (or all)
router.get('/', ctrlBlog.getSeveralPosts);
// Get certain post
router.get('/:posturl', ctrlBlog.getOnePost);
// Create a post (requires authorization)
router.post('/', auth, ctrlBlog.createPost);
// Update a post (requires authorization)
router.put('/:posturl', auth, ctrlBlog.updatePost);
// Delete a post (requires authorization)
router.delete('/:posturl', auth, ctrlBlog.deletePost);

module.exports = router;