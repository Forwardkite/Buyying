// Require necessary modules
const mongoose = require('mongoose');

// Create a schema for the image
const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
});

// Create a model based on the schema
const Image = mongoose.model('Image', ImageSchema);

// Export the model
module.exports = Image;
