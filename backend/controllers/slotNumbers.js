// controllers/slotController.js
const Slot = require('../models/slotDB');

const saveSlot = async (req, res) => {
  const { numbers } = req.body; // Assuming req.body is an object containing the numbers string
  try {
    // Save the combined numbers to the database
    const slot = new Slot({ numbers });
    await slot.save();
    // Send a success response
    res.status(201).json({ message: 'Slot saved successfully' });
  } catch (error) {
    console.error('Error saving slot:', error);
    // Send an error response
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  saveSlot,
};

