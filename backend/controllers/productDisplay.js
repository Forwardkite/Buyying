const ProductDB = require('../models/productDB');

// Function to handle '/admin/view' route
const viewProducts = async (req, res) => {
  try {
    const RenderData = await ProductDB.find({});
    res.send(RenderData);
  } catch (error) {
    console.log("Error in Server");
    res.status(500).send("Internal Server Error");
  }
};

// Function to handle '/admin/view/:id' route
const viewProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductDB.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  viewProducts,
  viewProductById,
};