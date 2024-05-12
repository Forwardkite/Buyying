// Import the ProductDB model
const Slot = require('../models/jackpotDB');

// Function to handle '/admin/view' route
const displaySlotData = async (req, res) => {
  try {
    // Retrieve all products from the database
    const slots = await Slot.find({});

    // Send the retrieved products as a response
    res.json(slots);
  } catch (error) {
    console.error("Error in Server:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
    displaySlotData
};
