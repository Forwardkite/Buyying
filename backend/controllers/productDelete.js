// ProductDeleting
const ProductDB = require('../models/productDB'); // Assuming the ProductDB model

const deleteProduct = async (req, res) => {
  try {
    const productIdToDelete = req.params.productIdToDelete; // Get productId from route parameters

    // Find the product by ID and delete it from the database
    const deletedProduct = await ProductDB.findByIdAndDelete(productIdToDelete);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  deleteProduct,
};
