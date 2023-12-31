// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
//const isAdmin = require('../../frontend/src/components/Library')
// Define routes for user operations
router.post('/register', UserController.registerUser); // Require admin privileges for registration
router.post('/login', UserController.loginUser); // Make sure you have this line for login

module.exports = router;
    