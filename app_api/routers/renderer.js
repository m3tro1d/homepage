const express = require('express');

const ctrlRenderer = require('../controllers/renderer');


const router = express.Router();

// Render the input
router.post('/render', ctrlRenderer.render);

module.exports = router;
