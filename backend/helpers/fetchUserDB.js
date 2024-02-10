const connectionDB = require('../config/connection');
const User = require('../models/userDB');

// Connecting Database

connectionDB();

// Function to fetch and display all users

const displayUsers = async () => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Display user details
    console.log('All Users:');
    users.forEach((user, index) => {
      console.log(`User ${index + 1}:`);
      console.log(`Name: ${user.name}`);
      console.log(`Email: ${user.email}`);
      console.log('------------------');
    });
  } catch (error) {
    console.error('Error fetching users:', error.message);
  }
};

// Usage: Display all users
displayUsers();
