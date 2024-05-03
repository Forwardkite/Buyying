const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/usersDB');


// Registration route
router.get('/', (req, res) => {
  res.render('registration');
});

router.post('/', async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phoneNumber,
      password: hashedPassword
    });

    await user.save();
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.redirect('/registration');
  }
});

module.exports = router;