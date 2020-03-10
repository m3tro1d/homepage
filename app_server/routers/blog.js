const express = require('express');

const ctrlBlog = require('../controllers/blog');

// Router for client-side blog routes
const router = express.Router();

// Blog index page
router.get('/', ctrlBlog.index);
// Post page
router.get('/:posturl', ctrlBlog.post);
// Posting page
router.get('/createpost', ctrlBlog.createPost);

module.exports = router;