const mysql = require("mysql");

require("dotenv").config();

var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PW,
  database: process.env.DATABASE,
});

module.exports = con;
