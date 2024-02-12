// // authMiddleware.js

// const authMiddleware = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.redirect('/login'); // Redirect to login page if not authenticated
//   }
// };

// module.exports = authMiddleware;

let middlewareObject = {};

//a middleware to check if a user is logged in or not
middlewareObject.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

middlewareObject.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

module.exports = middlewareObject;

  