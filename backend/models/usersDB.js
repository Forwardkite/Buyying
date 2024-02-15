const mongoose = require('mongoose');

//user database schema
const userDatabase = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// creating model and assigning to User
const User = mongoose.model('User', userDatabase);

module.exports = User;
