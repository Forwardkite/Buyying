// Import the Slot model
const Slot = require('../models/slotDB');

// Function to check if a number combination exists in the database
const checkNumberCombination = async (selectedNumbers) => {
    try {
        // Query the database to find if the combination exists
        const existingSlot = await Slot.findOne({ numbers: selectedNumbers });

        // If the combination exists, return true
        if (existingSlot) {
            return true;
        } else {
            // If the combination does not exist, return false
            return false;
        }
    } catch (error) {
        // If an error occurs during the database query, log the error and return false
        console.error('Error checking number combination:', error);
        return false;
    }
};

module.exports = {
    checkNumberCombination
};
