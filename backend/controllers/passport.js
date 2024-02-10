// passport.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/usersDB'); // Your User model (replace with your actual user model)

passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      const user = await User.findOne({ username }); // Find user by username
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) { // Implement your password validation logic
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user); // Authentication successful
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Fetch user by ID
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
