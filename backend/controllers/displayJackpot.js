const JackpotDB = require('../models/jackpotDB');

// Function to handle '/admin/view' route
const viewJackpot = async (req, res) => {
  try {
    const RenderData = await JackpotDB.find({});
     // Send the retrieved products as a response
     res.json(RenderData);
  } catch (error) {
    console.log("Error in Server");
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
    viewJackpot
};
