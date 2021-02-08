const express = require('express');

const ctrlBlog = require('../controllers/blog');
const auth = require('../../middleware/auth');


const router = express.Router();

// Get an amount of posts (or all)
router.get('/', ctrlBlog.getSeveralPosts);
// Get certain post
router.get('/post/:posturl', ctrlBlog.getOnePost);
// Create a post (requires authorization)
router.post('/', auth, ctrlBlog.createPost);
// Update a post (requires authorization)
router.put('/post/:posturl', auth, ctrlBlog.updatePost);
// Delete a post (requires authorization)
router.delete('/post/:posturl', auth, ctrlBlog.deletePost);

module.exports = router;
