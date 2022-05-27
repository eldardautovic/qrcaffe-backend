const mysql = require("mysql");

require("dotenv").config();

var con = mysql.createConnection({
  host: process.env.HOST,
  user: "root",
  password: process.env.PW,
  database: process.env.DATABASE,
});

module.exports = con;
