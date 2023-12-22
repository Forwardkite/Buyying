const express = require('express');
const mongoose = require('mongoose');
const connectionDB = require('../config/connection');
const LotteryGenerator = require('../components/LotteryGenerator')
const ProductDB = require('../models/productDB')
const router = express.Router();
const app = express();
const authMiddleware = require('../middleware/authMiddleware')
connectionDB();

router.get('/',authMiddleware.isLoggedIn, (req, res) => {
  res.render('admin/batch');
});

// Define the Batch schema
const batchSchema = new mongoose.Schema({
  
  productName: String,
  productDiscription : String,
  productprice: Number,
  variableproduct : Boolean,
  startingdate : Date,
  endingdate : Date,
  LotteryToken: String
  // other fields as needed
});





// Endpoint to handle batch creation
router.post('/', async (req, res) => {
  const { batchName, productName, stockNumber , productDiscription, productprice, startingdate, endingdate ,  } = req.body;

  const productData = {productName : productName, productDiscription: productDiscription, stockNumber: stockNumber, productprice: productprice ,startingdate: startingdate, endingdate: endingdate  }
  
  // Create a Mongoose model dynamically with the batchName as collection name
  // const BatchModel = mongoose.model(batchName.replace(/\s/g, ''), batchSchema);

  try {

    // // Create 'stockNumber' objects inside the collection
    // const objectsToCreate = [];
    // for (let i = 0; i < stockNumber; i++) {
    //   // const serialNumber = count + i + 1;
    //   LotteryToken = LotteryGenerator();
    //   objectsToCreate.push({ productName , productDiscription, productprice, startingdate, endingdate, LotteryToken });
    // }

    // await BatchModel.insertMany(objectsToCreate);

    await ProductDB.create(productData);
    res.status(200).send('Batch created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating batch CODE:ADMINERROR');
  }
});



router.get('/view', async (req, res) => {
  try {
    const RenderData = await ProductDB.find({});
    res.send(RenderData);
  } catch (error) {
    console.log("Error in Server");
    res.status(500).send("Internal Server Error");
  }
});


/*________________________________________________________________________________________________________________________*/





//  Route to fetch and display data based on batch name
router.get('/:batchName', async (req, res) => {
  try {
    // Extract the batchName from the URL params
    const { batchName } = req.params;

    // Create a Mongoose model dynamically with the batchName as the collection name
    const BatchModel = mongoose.model(batchName.replace(/\s/g, ''), batchSchema);

    // Fetch data from the corresponding collection based on batchName
    const batches = await BatchModel.find({});

    // console.log(batches)
    // Render the HBS template with fetched data
    // res.render('products', { batchName, batches });

    res.send(batches)


  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching batches');
  }
});

module.exports = router;
