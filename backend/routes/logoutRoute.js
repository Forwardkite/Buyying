// logoutRoute.js

const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    // Clear the token cookie by setting its expiration time to a past date
    res.clearCookie('token');
    res.render('dashboard'); // Assuming 'dashboard' is your dashboard view template
});

module.exports = router;

