const mongoose = require('mongoose');

const productDatabase = new mongoose.Schema({
  PurUserName: String,
  PurTicketNo: Number,
  ProEmail: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true, // Optional: If you want emails to be unique
    required: true, // Optional: If you want the email field to be mandatory
    match: /^\S+@\S+\.\S+$/, // Optional: Simple email validation using regex
  },
  PurMobile: Number,
  PurProduct: String,
});
const PurchaseDB = mongoose.model('Product', productDatabase);

module.exports = PurchaseDB;