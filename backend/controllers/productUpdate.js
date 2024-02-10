// productController.js

const ProductDB = require('../models/productDB'); // Import your ProductDB model

const updateProduct = async (req, res) => {
  const { ProId } = req.params;
  const {
    productName,
    stockNumber,
    productDiscription,
    productPrice,
    startingDate,
    endingDate,
  } = req.body;

  try {
    const updatedProduct = await ProductDB.findByIdAndUpdate(
      ProId,
      {
        productName,
        stockNumber,
        productDiscription,
        productPrice,
        startingDate,
        endingDate,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  updateProduct,
};
