// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const Book = require('./models/Book');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // After connecting to MongoDB, seed the dummy data
    seedDummyData();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const seedDummyData = async () => {
  try {
    // Define your dummy data
    const dummyData = [
      {
        name: 'Book 1',
        author: 'Author 1',
        availabilityStatus: true,
      },
      {
        name: 'Book 2',
        author: 'Author 2',
        availabilityStatus: true,
      },
      // Add more books as needed
    ];

    // Insert dummy data into the "books" collection
    await Book.insertMany(dummyData);

    console.log('Dummy data seeded successfully');
    mongoose.connection.close(); // Close the MongoDB connection after seeding
  } catch (error) {
    console.error('Error seeding dummy data:', error);
  } finally {
    process.exit(); // Exit the script after seeding
  }
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
