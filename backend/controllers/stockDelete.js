//SlotDatabase
const express = require('express');
const Product = require('../models/productDB'); // Assuming you have a Product model

const router = express.Router();

// Route to delete stock
router.delete('/products/:productId/stock', async (req, res) => {
  try {
    const { productId } = req.params;
    const { amount } = req.body;

    // Find the product by ID
    const product = await Product.findById(productId);
    

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Subtract the stock
    product.stockNumber -= amount;

    // Save the updated product
    
    await product.save();

    return res.json({ message: 'Stock updated successfully' });
  } catch (error) {
    console.error('Error updating stock:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
