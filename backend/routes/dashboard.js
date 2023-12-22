var express = require('express');
var router = express.Router();

// authMiddleware function

function authenticate(req, res, next) {
  // Check if the userId is set in the session or any other authentication logic
  if (req.session.userId) {
      
      next();
  } else {
      
      res.redirect('/login');
      res.status(401).send('Unauthorized - Please login');
  }
}
// router.use(authenticate);

router.get('/',authenticate, function(req, res) {
  res.render('dashboard');
});

module.exports = router;