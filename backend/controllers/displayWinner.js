const WinnerDB = require('../models/winnerDB');

// Function to handle '/admin/view' route
const viewWinner = async (req, res) => {
  try {
    const RenderData = await WinnerDB.find({});
     // Send the retrieved products as a response
     res.json(RenderData);
  } catch (error) {
    console.log("Error in Server");
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
    viewWinner
};