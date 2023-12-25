const express = require('express');
const mongoose = require('mongoose');
const connectionDB = require('../config/connection');
const LotteryGenerator = require('../components/LotteryGenerator')
const ProductDB = require('../models/productDB')
const router = express.Router();
const app = express();
const authMiddleware = require('../middleware/authMiddleware')
connectionDB();

router.get('/', (req, res) => {
  res.render('admin/batch');
});

// Define the Batch schema
const batchSchema = new mongoose.Schema({

  productName: String,
  productDiscription: String,
  productprice: Number,
  variableproduct: Boolean,
  startingdate: Date,
  endingdate: Date,
  LotteryToken: String
  // other fields as needed
});


/*____________________________________ADD_PRODUCT_CREATE_______________________________________________________*/


// Endpoint to handle batch creation
router.post('/create', async (req, res) => {
  const { productName, stockNumber, productDiscription, productprice, startingdate, endingdate, } = req.body;

  const productData = { productName: productName, productDiscription: productDiscription, stockNumber: stockNumber, productprice: productprice, startingdate: startingdate, endingdate: endingdate }

  try {

    await ProductDB.create(productData);
    res.status(200).send('Batch created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating batch CODE:ADMINERROR');
  }
});

/*_______________________________________PRODUCT_DISPLAY___________________________________________*/

router.get('/view', async (req, res) => {
  try {
    const RenderData = await ProductDB.find({});
    res.send(RenderData);
  } catch (error) {
    console.log("Error in Server");
    res.status(500).send("Internal Server Error");
  }
});

/*_________________________________________PRODUCT_UPDATE___________________________________________*/

router.put('/update', async (req, res) => {
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

/*_____________________________________PRODUCT_DELETE_______________________________________________________*/

router.delete('/delete/:productIdToDelete', async (req, res) => {
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
});

module.exports = router;
