// controllers/bookController.js
const axios = require('axios');

const apiUrl = 'https://www.googleapis.com/books/v1/volumes';
const Book = require('../models/Book'); // Adjust the path based on your project structure

const fetchBooks = async (req, res) => {
  const { searchTerm } = req.query;

  try {
    const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY; // Use the environment variable
    const response = await axios.get(apiUrl, {
      params: {
        key: apiKey,
        q: searchTerm,
      },
    });

    const books = response.data.items; // Adjust based on the API response structure
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error.message);
    res.status(500).json({ error: 'Error fetching books' });
  }
};
const updateAvailability = async (req, res) => {
  const { id } = req.params;
  const { availability } = req.body;

  try {
    // Use Mongoose to update the availability in the MongoDB collection
    await Book.updateOne({ id }, { availabilityStatus: availability });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating availability:', error);
    res.status(500).json({ error: 'Error updating availability' });
  }
};

module.exports = {
  fetchBooks,
  updateAvailability,
};
