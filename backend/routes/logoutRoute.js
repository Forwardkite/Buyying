// logoutRoute.js

const express = require('express');
const router = express.Router();

// Logged-out route
router.get('/', (req, res) => {
    // Clear the token cookie by setting its expiration time to a past date
    res.clearCookie("token");
});


router.post('/', (req, res) => {
    // Clear the token cookie by setting its expiration time to a past date
    // res.clearCookie('token');
    
    // Log the clearing of the cookie
    // console.log("Token cookie cleared successfully");
    
    // Send a response indicating successful logout
    res.render('dashboard'); // Assuming 'dashboard' is your dashboard view template
});

module.exports = router;

