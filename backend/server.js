require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Add this line for path
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const Book = require('./models/Book');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from the 'build' folder
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Handle other routes or API endpoints as needed
app.use('/api/user', userRoutes);
app.use('/api/book', bookRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    //seedDummyData(); // Call the seeding function
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Send the 'index.html' file for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
