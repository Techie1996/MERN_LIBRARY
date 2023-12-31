// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController.js'); // Create a new controller if needed
const myBooksController = require('../controllers/MyBooksController.js'); // Ensure correct path

// Define routes for book operations
router.get('/my-books', myBooksController.fetchMyBooks);
router.get('/fetch', BookController.fetchBooks);
router.put('/:id/updateAvailability', BookController.updateAvailability);

module.exports = router;
