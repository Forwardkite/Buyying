const mongoose = require('mongoose');
const LotteryGenerator = require('../components/LotteryGenerator');
const connectionDB = require('../config/connection');

// Connecting Database from config/connectionDB 
connectionDB();

// Define Product Schema
const productSchema = new mongoose.Schema({
    productName: String,
    batchId: String,
    price: Number
});

const Product = mongoose.model('Product', productSchema);

// Define Stock Schema
const stockSchema = new mongoose.Schema({
    batchId: String,
    productName: String,
    stockNumber: Number,
    lotteryTicketToken: String,
    username: String
});

const Stock = mongoose.model('Stock', stockSchema);

// Saving Product Details
const saveProduct = async (productName, batchId, price) => {
    const product = new Product({ productName, batchId, price });
    await product.save();
};

// Creating Stock Entries
const createStockEntries = async (batchId, productName, stockNumber) => {
    for (let i = 0; i < stockNumber; i++) {
        const lotteryTicketToken = LotteryGenerator(); // Implement your token generation logic
        const stock = new Stock({
            batchId,
            productName,
            stockNumber: i + 1,
            lotteryTicketToken,
            username: '' // Initially empty
        });
        await stock.save();
    }
};

// Handling Purchases
const purchaseProduct = async (batchId, productName, username) => {
    const stockEntry = await Stock.findOneAndUpdate(
        { batchId, productName, username: '' }, // Find an available stock with an empty username
        { username }, // Update with purchaser's username
        { new: true }
    );
    return stockEntry; // Return purchased stock details
};









// Simulating usage of these functions
// (async () => {
//     // Save product details
//     await saveProduct('Biriyani', 'BATCH001', 100);

//     // Create stock entries for the product
//     await createStockEntries('BATCH001', 'Biriyani', 10);

//     console.log('Product details saved and stock entries created.');
// })();


module.exports = {
    Product,
    Stock

}
