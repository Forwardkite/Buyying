// const Product = require('')
const Stock = require('../helpers/newBatchCreate')
const getProductAndStockData = async (req, res) => {
    try {
        const products = await Product.find();
        const stocks = await Stock.find();
        res.render('products',{ products, stocks });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = getProductAndStockData;