//ProductCreation
const ProductDB = require('../models/productDB');

const createProduct = async (req, res) => {
  const { productName, stockNumber, productDiscription, productprice, startingdate, endingdate } = req.body;

  const productData = {
    productName,
    productDiscription,
    stockNumber,
    productprice,
    startingdate,
    endingdate,
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
