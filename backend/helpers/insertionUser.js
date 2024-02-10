const mongoose = require('mongoose');
const User = require('../models/userDB'); // Import the User model
const connectionDB = require('../config/connection');
// Establish MongoDB connection
connectionDB();

// Function to add a new user to the database - with recieving arguments [name&email]
const addUser = async (name, email) => {
  try {
    // Create a new instance of the User model with provided data
    const newUser = new User({
      name: name,
      email: email,
    });

    // Save the new user to the database
    await newUser.save();

    console.log('User added successfully!');
  } catch (error) {
    console.error('Error adding user:', error.message);
  }
};

// Usage example: Add a new user
addUser('test6', 'test6@gmail.com');
