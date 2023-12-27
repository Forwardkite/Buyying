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
  productPrice: Number,
  variableproduct: Boolean,
  startingDate: Date,
  endingDate: Date,
  LotteryToken: String
  // other fields as needed
});


/*____________________________________ADD_PRODUCT_CREATE___________________________________________*/


const productController = require('../controllers/productCreate');


router.post('/create', productController.createProduct);

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

router.put('/update/:ProId', async (req, res) => {
  const { ProId } = req.params; // Extracting the product ID from the URL
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
      ProId,
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

/*______________________________________PRODUCT_DELETE______________________________________________*/

const adminController = require('../controllers/productDelete');

router.delete('/delete/:productIdToDelete', adminController.deleteProduct);

/*______________________________________EXPORT_BUTTON_______________________________________________*/

const exportController = require('../controllers/exportController');

router.get('/export', exportController.exportDataAsCSV);

/*___________________________________________________________________________________________________*/

module.exports = router;
