const express = require('express');

// Router for client-side blog routes
const router = express.Router();

// Blog index page
router.get('/', (req, res, next) => {
  res.end('Blog index page.');
});
// Post page
router.get('/:posturl', (req, res, next) => {
  res.end('Post page.');
});

module.exports = router;