const NewsDB = require('../models/newsDB');

// Function to handle '/admin/view' route
const viewNews = async (req, res) => {
  try {
    const RenderData = await NewsDB.find({});
     // Send the retrieved products as a response
     res.json(RenderData);
  } catch (error) {
    console.log("Error in Server");
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
    viewNews
};