// // controllers/slotController.js
// const Slot = require('../models/slotDB');

// const saveSlot = async (req, res) => {
//   const { numbers } = req.body;
//   // Concatenate the numbers into a single number
//   // const concatenatedNumber = numbers.join('');
//   try {
//     // Save the received numbers to the database
//     await Slot.create({ numbers });
//     return res.status(201).json({ message: 'Slot saved successfully' });
//   } catch (error) {
//     console.error('Error saving slot:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = {
//   saveSlot,
// };

// controllers/slotController.js
const Slot = require('../models/slotDB');

const saveSlot = async (req, res) => {
  const { numbers } = req.body;
  const concatenatedNumber = numbers.join(''); // Concatenate the numbers into a single string

  try {
    // Save the concatenated number to the database
    await Slot.create({ numbers: concatenatedNumber });
    return res.status(201).json({ message: 'Slot saved successfully' });
  } catch (error) {
    console.error('Error saving slot:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  saveSlot,
};
