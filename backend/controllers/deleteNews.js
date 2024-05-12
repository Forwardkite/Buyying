// NewsDeleting
const NewsDB = require('../models/newsDB'); // Assuming the ProductDB model

const deleteNews = async (req, res) => {
  try {
    const NewsIdToDelete = req.params.NewsIdToDelete; // Get productId from route parameters

    // Find the product by ID and delete it from the database
    const deletedNews = await NewsDB.findByIdAndDelete(NewsIdToDelete);

    if (!deletedNews) {
      return res.status(404).json({ message: 'News not found' });
    }

    return res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting News:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  deleteNews,
};
