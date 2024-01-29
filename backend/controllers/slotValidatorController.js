const  Slot  = require('../models/slotDB');
const checkNumberCombination = async (req, res) => {
    const { numbers } = req.body;

    try {
        // Query the database to find if the combination exists
        const existingSlot = await Slot.findOne({ numbers });

        // Send response based on whether the combination exists
        res.json({ exists: !!existingSlot });
    } catch (error) {
        // If an error occurs during the database query, send an error response
        console.error('Error checking number combination:', error);
        res.status(500).json({ error: 'Error checking number combination' });
    }
};

module.exports = {
    checkNumberCombination
}