const express = require('express');

// Router for index routes (basic homepage info)
const router = express.Router();

// Index page
router.get('/', (req, res, next) => {
  res.end('Index page.');
});

module.exports = router;