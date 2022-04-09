const express = require("express");
const handle = require("../modules/connection");
const bcrypt = require("bcrypt");
const costumlog = require("../modules/costum-log");
var router = express.Router();
const checkIp = require("../modules/ipchecker");

router.post("/", (req, res) => {
  const pw = req.body.pw;

  if (pw != "eld4Nev0lj4") return res.send("Password incorrect.").status(400);
  else return res.send("Password correct, welcome ELD4.").status(400);
});

module.exports = router;
