// routes/lotteryRoutes.js

const express = require('express');
const router = express.Router();
const Lottery = require('../models/lotteryTokenDB');

// Route to fetch combinedString by email
router.get('/lottery/:email', async (req, res) => {
  const { email } = req.params;

  try {
    // Query the database to find the lottery tokens associated with the email
    const lotteryTokens = await Lottery.find({ email });

    if (!lotteryTokens) {
      return res.status(404).json({ message: 'No lottery tokens found for the email provided.' });
    }

    // Extract the combinedString from each lottery token
    const combinedStrings = lotteryTokens.map(token => token.combinedString);

    // Send the combinedString(s) associated with the email as the response
    res.status(200).json({ combinedStrings });
  } catch (error) {
    console.error('Error fetching lottery tokens:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
