const connectionDB = require("../config/connection");
connectionDB();
const ProductDB = require('../models/productDB');

const formatDate = (date) => {
    // Ensure date is a valid Date object
    if (!(date instanceof Date)) {
        return 'Invalid Date';
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const deleteProduct = async (productId) => {
    try {
        // Delete the product
        await ProductDB.deleteOne({ _id: productId });
        console.log("Product deleted:", productId);
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};

const checkProductExpiry = async () => {
    try {
        // Get the current date
        const currentDate = new Date();

        // Format the current date
        const formattedCurrentDate = formatDate(currentDate);

        // Find all products from the database
        const products = await ProductDB.find();

        // Iterate over each product
        for (const product of products) {
            // Parse ending date into a Date object
            const endingDate = new Date(product.endingDate);

            // Format the ending date
            const formattedEndingDate = formatDate(endingDate);

            // Log the current date and ending date
            console.log("Current Date:", formattedCurrentDate);
            console.log("Ending Date:", formattedEndingDate);

            // Check if the ending date is greater than the current date
            if (endingDate > currentDate) {
                console.log("No product found for expiry, All is up to date!")
            } else {
                // Delete the expired product
                await deleteProduct(product._id);
                console.log("Product expired and deleted");
            }
        }

    } catch (error) {
        console.error('Error checking product expiry:', error);
    }
};

// Call the function to check product expiry periodically, for example, once a day
setInterval(checkProductExpiry, 24 * 60 * 60 * 1000); // Execute once every 24 hours (in milliseconds)

// Export the function if needed
module.exports = checkProductExpiry;

