const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/items');

// Sample route
router.get('/items', itemsController.getItems);

module.exports = router;