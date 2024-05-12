const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, required: true },
  image: String, // Field for storing image filename
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
