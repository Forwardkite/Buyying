const mongoose = require('mongoose');

const jackpotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  image: String, // Field for storing image filename
});

const Jackpot = mongoose.model('Jackpot', jackpotSchema);

module.exports = Jackpot;
