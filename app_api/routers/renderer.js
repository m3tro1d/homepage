const express = require('express');

const ctrlRenderer = require('../controllers/renderer');

// Router for the blog API routes
const router = express.Router();

// Render the input
router.post('/render', ctrlRenderer.render);

module.exports = router;
