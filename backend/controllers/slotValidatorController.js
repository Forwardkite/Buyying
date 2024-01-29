// // routes/validation.js

// const express = require('express');
// const router = express.Router();
// const Slot = require('../models/slotDB');

// // Function to validate the slot numbers
// const validateSlotNumbers = async (numbers) => {
//   try {
//     // Check if the combination of numbers exists in the database
//     const existingSlot = await Slot.findOne({ numbers });
//     return !!existingSlot; // Return true if the combination exists, false otherwise
//   } catch (error) {
//     console.error('Error validating numbers:', error);
//     throw new Error('Internal server error');
//   }
// };

// const validator = async (req, res) => {
//   const { numbers } = req.body;

//   try {
//     const exists = await validateSlotNumbers(numbers);
//     res.json({ exists });
//   } catch (error) {
//     console.error('Error validating numbers:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = router;

// module.exports = {
//     validator,
//     validateSlotNumbers,
//   };
  
  // backend/controllers/slotController.js

// Assuming you have a database connection
const Slot = require('../models/slotDB');

// Controller to validate selected numbers
const validator = async (req, res) => {
  try {
    // Extract numbers from the request body
    const { numbers } = req.body;

    // Query the database to check if the pair exists
    // Here, 'slots' is assumed to be the collection/table name
    const result = await db.slots.findOne({ numbers });

    // If the result exists, it means the pair already exists
    if (result) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error validating selected numbers:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
    validator
};
