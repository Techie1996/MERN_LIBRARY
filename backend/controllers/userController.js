// controllers/userController.js

const User = require('../models/user');

// Controller function for user registration
const registerUser = async (req, res) => {
  try {
    // Extract user details from the request body
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If user already exists, send a 400 Bad Request response
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const newUser = await User.create({ name, email, password });

    // Send a 201 Created response with the new user data
    res.status(201).json(newUser);
  } catch (error) {
    // If an error occurs, log it and send a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function for user login
const loginUser = async (req, res) => {
  try {
    // Extract user credentials from the request body
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      // If user doesn't exist, send a 401 Unauthorized response
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      // If the password is incorrect, send a 401 Unauthorized response
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if the user is an admin (you need to modify your User model accordingly)
    const isAdmin = user.isAdmin; // This depends on how your User model is structured

    // Send a 200 OK response with a success message, user data, and admin status
    res.status(200).json({ message: 'Login successful', user, isAdmin });
  } catch (error) {
    // If an error occurs, log it and send a 500 Internal Server Error response
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const logoutUser = (req, res) => {
  // Destroy the session or clear the token
  // Here, we'll clear the token from the client-side (assuming you use tokens)
  res.clearCookie('token'); // Clear the token cookie

  // Send a response indicating successful logout
  res.status(200).json({ message: 'Logout successful' });
};
// controllers/userController.js

const createAdminUser = async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });

    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin user already exists' });
    }

    const salt = await .genSalt(10);
    const hashedPassword = await bcrypt.hash('adminpassword', salt);

    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      isAdmin: true,
    });

    await adminUser.save();

    res.status(201).json(adminUser);
  } catch (error) {
    console.error('Error during createAdminUser:', error); // Log the error
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Export the controller functions
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  createAdminUser,
  // Add more user-related controller functions as needed
};
