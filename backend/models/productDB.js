const mongoose = require("mongoose");

const productDatabase = new mongoose.Schema({
  productName: String,
  stockNumber: Number,
  productDiscription: String,
  productPrice: Number,
  startingDate: String, // Change the type to String for formatted dates
  endingDate: String, // Change the type to String for formatted dates
  imageProduct: String,
});

// Convert the dates to dd-mm-yyyy format before saving
productDatabase.pre("save", function (next) {
  if (this.startingDate instanceof Date && this.endingDate instanceof Date) {
    this.startingDate = formatDate(this.startingDate);
    this.endingDate = formatDate(this.endingDate);
  }
  next();
});

// Function to format dates to dd-mm-yyyy
function formatDate(date) {
  const formattedDate = new Date(date);
  const day = formattedDate.getDate().toString().padStart(2, "0");
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = formattedDate.getFullYear();
  return `${day}-${month}-${year}`;
}

const ProductDB = mongoose.model("Product", productDatabase);

module.exports = ProductDB;
