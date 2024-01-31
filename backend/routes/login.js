const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/usersDB');

// Login route
router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user._id;
        res.redirect('/dashboard');
    } else {
        // res.send('');
        // alert('Error');
        res.status(401).send('Incorrect username or password');
    }
});

module.exports = router;