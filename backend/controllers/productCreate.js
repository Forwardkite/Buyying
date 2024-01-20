//ProductCreation
const ProductDB = require('../models/productDB');

const createProduct = async (req, res) => {
  const { productName, stockNumber, productDiscription, productPrice, startingDate, endingDate } = req.body;

  const productData = {
    productName,
    productDiscription,
    stockNumber,
    productPrice,
    startingDate,
    endingDate,
  };

  try {
    await ProductDB.create(productData);
    res.status(200).send('Product created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating product CODE:ADMINERROR');
  }
};

module.exports = {
  createProduct,
};
