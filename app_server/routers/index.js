const express = require('express');

const ctrlIndex = require('../controllers/index');

// Router for index routes (basic homepage info)
const router = express.Router();

// Index page
router.get('/', ctrlIndex.index);
// Software info page
router.get('/software', ctrlIndex.software);
// Scripts page
router.get('/scripts', ctrlIndex.scripts);

module.exports = router;