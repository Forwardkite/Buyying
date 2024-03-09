// controllers/slotController.js
const Slot = require('../models/slotDB');
const LotteryGenerator = require('../components/LotteryGenerator')

const saveSlot = async (req, res) => {
  const { numbers, email, name, product, cost, date } = req.body; // Assuming req.body is an object containing the numbers string
  try {
    // Save the combined numbers to the database
    const slot = new Slot({ numbers, email, name });
    await slot.save();

    // Generate a lottery token
    const lotteryToken = LotteryGenerator();

    // Combine the numbers with the lottery token
    const combinedString = `${lotteryToken}-${numbers}`;

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
 
    const Token = require('../models/lotteryTokenDB');

    const otherSlot = new Token({ combinedString, email, name, product, cost, date });
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

