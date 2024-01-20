// Backend code using Express.js and Mongoose (assuming MongoDB)

const express = require('express');
const router = express.Router();
const ProductDB = require('../models/Product'); // Assuming you have a Product model
const connectionDB = require('../config/connection');
connectionDB();


// Route to handle updating product data
router.put('update/:productId', async (req, res) => {
  const { productId } = req.params; // Extracting the product ID from the URL
  const {
    productName,
    stockNumber,      
    productDiscription,
    productPrice,
    startingDate,
    endingDate,
  } = req.body; // Extracting updated data from the request body

  try {
    // Find the product by ID and update its fields
    const updatedProduct = await ProductDB.findByIdAndUpdate(
      productId,
      {
        productName,
        stockNumber,
        productDiscription,
        productPrice,
        startingDate,
        endingDate,
      },
      { new: true } // To return the updated product after the update operation
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
