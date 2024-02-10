const express = require('express');
const router = express.Router();
const {BatchModel} = require('../routes/admin');

// Route to fetch product and stock data
router.get('/', async (req, res) => {
    try {
        // const products = await productName.find();
        // const stocks = await LotteryToken.find();
        const batches = await BatchModel.find({});
        res.render('products', { products, stocks });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error 556644');
    }
});
module.exports = router;




