const mongoose = require('mongoose');

const slotsSchema = new mongoose.Schema({
  numbers: { type: [String], required: true }, // Define numbers as an array of strings
  name: String,
  email: String,
}); 

const Slote = mongoose.model('Slote', slotsSchema);

module.exports = Slote;

