const jwt = require("jsonwebtoken");

require("dotenv/config");

const verifyToken = (token) => {
  return jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return false;

    return decoded;
  });
};

module.exports = verifyToken;
