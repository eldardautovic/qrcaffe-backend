const requireAuth = (req, res, next) => {
  if (req.auth) {
    next();
  } else if (!req.auth) {
    res.send("Invalid token");
  }
};

module.exports = requireAuth;
