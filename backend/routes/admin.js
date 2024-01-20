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

/*____________________________________PRODUCT_CREATE_______________________________________________*/

const productCreate = require('../controllers/productCreate');

router.post('/create', productCreate.createProduct);

/*_______________________________________PRODUCT_DISPLAY___________________________________________*/

const productDisplay = require('../controllers/productDisplay');

router.get('/view', productDisplay.viewProducts);

/*______________________________________PRODUCT_UPDATE______________________________________________*/

const productUpdate = require('../controllers/productUpdate'); // Import the product controller

router.put('/update/:ProId', productUpdate.updateProduct);

/*______________________________________PRODUCT_DELETE______________________________________________*/

const adminController = require('../controllers/productDelete');

router.delete('/delete/:productIdToDelete', adminController.deleteProduct);

/*_______________________________________EXPORT_BUTTON______________________________________________*/

const exportController = require('../controllers/exportController');

router.get('/export', exportController.exportDataAsCSV);

/*__________________________________________________________________________________________________*/

module.exports = router;
