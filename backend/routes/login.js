const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/usersDB');
// const userLoggedAuth = require('../middleware/userLoggedAuthen')
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');

router.use(cookieParser());


// Login route
router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

        // Set the cookie in the response
        // res.setHeader('token', `token=${token}; Secure; SameSite=None`);
        res.cookie("token",token)
        // res.cookie("token", token, {
        //     httpOnly: true, // Ensures the cookie is only accessible via HTTP(S) and not client-side JavaScript
        //     secure: true, // Ensures the cookie is only sent over HTTPS
        //     sameSite: 'none', // Helps mitigate CSRF attacks
        //     maxAge: 3600000 // Expires in 1 hour (in milliseconds)
        // });
        
        

          
        // Send token to the client
        res.json({ token });

    } else {
        res.status(401).json({ message: 'Incorrect email or password' });
    }


});



module.exports = router;