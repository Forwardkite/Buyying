const mongoose = require('mongoose');

const winnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  image: String, // Field for storing image filename
});

const Winner = mongoose.model('Winner', winnerSchema);

module.exports = Winner;
