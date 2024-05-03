const User = require('../models/usersDB');

const checkPhoneDuplication = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    // Check if email exists
    const existingPhone = await User.findOne({ phoneNumber });
    if (existingPhone) {
      return res.json({ exists: true, field: 'email' });
    }

    // If email doesn't exist, return false
    res.json({ exists: false });
  } catch (error) {
    console.error('Error checking email duplication:', error);
    res.status(500).json({ error: 'Error checking email duplication' });
  }
};

module.exports = {
  checkPhoneDuplication
};
