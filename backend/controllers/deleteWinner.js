// WinnerDeleting
const WinnerDB = require('../models/winnerDB'); // Assuming the ProductDB model

const deleteWinner = async (req, res) => {
  try {
    const WinnerIdToDelete = req.params.WinnerIdToDelete; // Get productId from route parameters

    // Find the product by ID and delete it from the database
    const WinnerNews = await WinnerDB.findByIdAndDelete(WinnerIdToDelete);

    if (!WinnerNews) {
      return res.status(404).json({ message: 'Winner not found' });
    }

    return res.status(200).json({ message: 'Winner deleted successfully' });
  } catch (error) {
    console.error('Error deleting Winner:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  deleteWinner,
};
