// controllers/myBooksController.js
const Book = require('../models/Book');

const fetchMyBooks = async (req, res) => {
  const { searchTerm } = req.query;

  try {
    let query = {};
    if (searchTerm) {
      query = { 'volumeInfo.title': { $regex: new RegExp(searchTerm, 'i') } };
    }

    const books = await Book.find(query);
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error.message);
    res.status(500).json({ error: 'Error fetching books' });
  }
};

module.exports = {
  fetchMyBooks,
};
