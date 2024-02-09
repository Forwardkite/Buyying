const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/usersDB');
// const userLoggedAuth = require('../middleware/userLoggedAuthen')
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');

// Login route
router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1m' });
        const oneMinuteInMilliseconds = 60000; // 1 minute in milliseconds
        const currentTime = new Date();
        const expirationTime = new Date(currentTime.getTime() + oneMinuteInMilliseconds);

        res.cookie('token', token, {
            expires: expirationTime, // 1 minute in milliseconds
            httpOnly: true, // Ensures cookie is only accessible via HTTP(S) and not JavaScript
            secure: true, // Ensures cookie is only sent over HTTPS
            sameSite: 'strict' // Restricts the cookie to be sent only to the same site
        });
        // Send token to the client
        res.json({ token });

    } else {
        res.status(401).json({ message: 'Incorrect email or password' });
    }


});

router.post('/out', (req, res) => {
    // Clear the token cookie by setting its expiration time to a past date
    res.clearCookie('token');

    // Send a response indicating successful logout
    res.json({ message: 'Logged out successfully' });
});

module.exports = router;


