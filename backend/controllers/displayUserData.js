
// Import the ProductDB model
const User = require('../models/usersDB');

// Function to handle '/admin/view' route
const displayUserData = async (req, res) => {
  try {
    // Retrieve all products from the database
    const UserData = await User.find({});

    // Send the retrieved products as a response
    res.json(UserData);
  } catch (error) {
    console.error("Error in Server:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const displayUserDataById = async (req, res) => {
    try {
      const UserId = req.params.id;
      const UserDataById = await User.findById(UserId);
  
      if (!UserDataById) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json(UserDataById);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = {
    displayUserData,
    displayUserDataById
};
