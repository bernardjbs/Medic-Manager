const withAuth = (req, res, next) => {
  
  // Authentication middleware to handle attempts to read pages that require user authentication
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // The user is authenticated and the end point HTTP method can now trigger
    next();
  }
};

module.exports = withAuth;
