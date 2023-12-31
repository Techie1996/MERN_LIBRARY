const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  volumeInfo: {
    title: {
      type: String,
      required: true,
    },
    authors: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  availabilityStatus: {
    type: String, // Assuming availabilityStatus is a string based on your dummy data
    required: true,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
