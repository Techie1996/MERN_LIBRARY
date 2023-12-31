const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookController');

// Define routes here
router.post('/books', isAdmin, controller.createBook);
router.get('/books', isAdmin, controller.getBooks);
// Add more routes as needed

module.exports = router;
