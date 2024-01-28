// // models/slotDB.js
// const mongoose = require('mongoose');

// const slotSchema = new mongoose.Schema({
//   numbers: [{ type: Number }] // Define numbers as an array of numbers
// }); 

// const Slot = mongoose.model('Slot', slotSchema);

// module.exports = Slot;

// models/slotDB.js
const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  numbers: { type: String, required: true } // Define numbers as a string
}); 

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
