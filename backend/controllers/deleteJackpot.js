// JackpotDeleting
const JackpotDB = require('../models/jackpotDB'); // Assuming the ProductDB model

const deleteJackpot = async (req, res) => {
  try {
    const JackpotIdToDelete = req.params.JackpotIdToDelete; // Get productId from route parameters

    // Find the product by ID and delete it from the database
    const deletedJackpot = await JackpotDB.findByIdAndDelete(JackpotIdToDelete);

    if (!deletedJackpot) {
      return res.status(404).json({ message: 'Jackpot not found' });
    }

    return res.status(200).json({ message: 'Jackpot deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  deleteJackpot,
};
