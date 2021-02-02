const express = require('express');

const ctrlIndex = require('../controllers/index');

// Router for index routes (basic homepage info)
const router = express.Router();

// Index page
router.get('/', ctrlIndex.index);
// Software info page
router.get('/software', ctrlIndex.software);
// Why Vim article
router.get('/whyvim', ctrlIndex.whyVim);
// Renderer
router.get('/renderer', ctrlIndex.renderer);

module.exports = router;
