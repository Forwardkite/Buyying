const express = require('express');
const router = express.Router();

// Middleware function
const myMiddleware = (req, res, next) => {
  // Do something here, for example, logging the request
  console.log('Middleware is working');
  next(); // Call next to pass the request to the next middleware
};

// Using middleware in a route
router.use('/admin', myMiddleware, (req, res) => {
  // Handle the route logic here
  res.send('Response from /somepath');
});

module.exports = router;
