// Import the LotteryDB model
const Lottery = require('../models/lotteryTokenDB');

// Function to handle '/admin/view' route
const displayLotteryData = async (req, res) => {
  try {
    // Retrieve all products from the database
    const lotteryData = await Lottery.find({});

    // Send the retrieved products as a response
    res.json(lotteryData);
  } catch (error) {
    console.error("Error in Server:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
    displayLotteryData
};
