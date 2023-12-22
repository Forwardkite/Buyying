const mongoose = require('mongoose');
const LotteryGenerator = require('./components/LotteryGenerator');
const connectionDB = require('./config/connection');

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

// Simulating usage of these functions with user input
(async () => {
    try {
        const userInput = process.argv.slice(2); // Get user input from command line arguments
        const [productName, batchId, stockNumber] = userInput;

        if (!productName || !batchId || !stockNumber) {
            console.error('Please provide all required inputs: productName, batchId, stockNumber');
            return;
        }

        await saveProduct(productName, batchId, 100); // Assuming a default price of 100
        await createStockEntries(batchId, productName, parseInt(stockNumber));

        console.log('Product details saved and stock entries created.');
    } catch (error) {
        console.error('Error in simulation:', error);
    } finally {
        mongoose.disconnect(); // Disconnect from MongoDB after operations
    }
})();
