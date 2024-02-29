// controllers/slotController.js
const Slot = require('../models/slotDB');
const LotteryGenerator = require('../components/LotteryGenerator')

const saveSlot = async (req, res) => {
  const { numbers, email, name } = req.body; // Assuming req.body is an object containing the numbers string
  try {
    // Save the combined numbers to the database
    const slot = new Slot({ numbers, email, name });
    await slot.save();

    // Generate a lottery token
    const lotteryToken = LotteryGenerator();

    // Combine the numbers with the lottery token
    const combinedString = `${lotteryToken}-${numbers}`;

    // Save the combined string to another database (replace this with your own logic)
    // For example, if you're using Mongoose:
    const Token = require('../models/lotteryTokenDB'); // Import the model for the other database
    const otherSlot = new Token({ combinedString, email });
    console.log("HEY:",combinedString)
    await otherSlot.save();


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

