// Import the ProductDB model
const Purchase = require('../models/transactionsPayment');

// Function to handle '/admin/view' route
const displayPurchaseData = async (req, res) => {
  try {
    // Retrieve all products from the database
    const purchase = await Purchase.find({});

    // Send the retrieved products as a response
    res.json(purchase);
  } catch (error) {
    console.error("Error in Server:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
    displayPurchaseData
};
