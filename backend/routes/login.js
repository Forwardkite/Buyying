const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/usersDB');
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
        res.json(token);
    } else {
        res.status(401).json('Incorrect email or password');
    }


});



module.exports = router;