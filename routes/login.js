const express = require("express");
const handle = require("../modules/connection");
const bcrypt = require("bcrypt");
const costumlog = require("../modules/costum-log");
var router = express.Router();
const generateAccessToken = require("../modules/generatejwt");

router.post("/admin", (req, res) => {
  const pw = req.body.pw;

  if (pw != "eld4Nev0lj4")
    return res.status(400).send({ message: "Not authorized" });
  else return res.send("Password correct, welcome ELD4.").status(400);
});

router.post("/:caffeId", (req, res) => {
  const pw = req.body.pass;
  const caffe = req.params.caffeId;

  console.log(req.params.pass);

  handle.query(
    `SELECT \`pass\`, \`name\` FROM \`caffes\` WHERE \`id\` = ${req.params.caffeId}`,
    (err, rows) => {
      if (err)
        return (
          costumlog(
            "err",
            "",
            "",
            `Someone entered a pw for a non existant caffe login ${caffe} (${err.message})`
          ),
          res.send("Pogresna lozinka.").status(400)
        );

      const comparedPw = bcrypt.compareSync(pw, rows[0].pass);

      if (!comparedPw)
        return (
          res.send("Pogresna lozinka").status(400),
          costumlog(
            "err",
            "",
            "",
            `Someone made a mistake entering a pw for caffe id: ${caffe}`
          )
        );
      else if (comparedPw) {
        const token = generateAccessToken(caffe, rows[0].name);

        res.json({ success: true, token: token }).status(200);
        costumlog("endpoint", "login", "GET", "");
      }

      console.log(rows[0].pass);
    }
  );
});

module.exports = router;
