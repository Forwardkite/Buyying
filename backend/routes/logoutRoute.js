// logoutRoute.js

const express = require('express');
const router = express.Router();

// Logged-out route
router.post('/', (req, res) => {
    // Clear the token cookie by setting its expiration time to a past date
    res.clearCookie('token');

    // Send a response indicating successful logout
    res.json({ message: 'Logged out successfully' });
});

module.exports = router;
