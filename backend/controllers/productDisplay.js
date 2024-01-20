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

module.exports = {
  viewProducts,
};
