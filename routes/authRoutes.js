const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Route to handle user registration (signup)
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document in the database
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Route to handle user login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // If the user is not found or the password doesn't match, return an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If authentication succeeds, create a JWT token
    const token = jwt.sign({ id: user._id }, 'your-secret-key', {
      expiresIn: '1h',
    });

    return res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Route to fetch the username
router.get('/username', async (req, res) => {
  try {
    // Get the user id from the token and search the database
    const user = await User.findById(req.user.id);

    // If user not found, return an error
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // If user found, return the username
    return res.json({ username: user.username });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
