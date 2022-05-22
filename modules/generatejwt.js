const jwt = require("jsonwebtoken");
require("dotenv/config");

const generateAccessToken = (id, name) => {
  return jwt.sign(
    { caffeId: id, signed: true, caffeName: name },
    process.env.TOKEN_SECRET,
    { expiresIn: "8h" }
  );
};

module.exports = generateAccessToken;
