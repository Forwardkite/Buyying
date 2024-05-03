const User = require('../models/usersDB');

const checkEmailDuplication = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if email exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
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
  checkEmailDuplication
};
