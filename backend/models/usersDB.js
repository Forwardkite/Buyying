const mongoose = require('mongoose');

// USER SCHEMA NAME == userDatabase
const userDatabase = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// creating model and assigning to User , [callback]
const User = mongoose.model('User', userDatabase);

module.exports = User;
