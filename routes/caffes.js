const express = require("express");
const handle = require("../modules/connection");
const bcrypt = require("bcrypt");
const costumlog = require("../modules/costum-log");
var router = express.Router();
const checkIp = require("../modules/ipchecker");

router.get("/", (req, res) => {
  handle.query(`SELECT * FROM caffes`, (err, rows) => {
    res.send(rows);
    costumlog("endpoint", "caffes", "GET", "");
  });
});

router.post("/", (req, res) => {
  const desired = req.body.pw;
  const ip = req.body.ip;
  const name = req.body.name;

  if (!checkIp(ip)) return res.send("IP Adress invalid.").status(504);

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(desired, salt, (err, hash) => {
      handle.query(
        `INSERT INTO caffes (\`name\`, \`ip\`, \`pass\`) VALUES ('${name}', '${ip}', '${hash}')`,
        (err, rows) => {
          if (err)
            res.send("Unable to insert into database.").status(504),
              console.log(err);

          res.send(`${name} kafic uspjesno kreiran.`).status(200);
          costumlog("endpoint", "caffes", "POST", "");
        }
      );
    });
  });
});

module.exports = router;
