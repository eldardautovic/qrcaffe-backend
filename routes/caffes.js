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
  const signature = req.body.signature;

  if (signature != "eld4Nev0lj4") return res.send("Access denied").status(401);

  if (!checkIp(ip))
    return (
      res.send("IP Adress invalid.").status(400),
      costumlog("err", "", "", "IP Adress invalid while creating new caffe.")
    );

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(desired, salt, (err, hash) => {
      handle.query(
        `INSERT INTO caffes (\`name\`, \`ip\`, \`pass\`) VALUES ('${name}', '${ip}', '${hash}')`,
        (err, result) => {
          if (err)
            res.send("Unable to insert into database.").status(500),
              costumlog(
                "err",
                "",
                "",
                "!!!Unable to insert into DB check FAST!!!"
              );

          res.json({ id: result.insertId });
          costumlog("endpoint", "caffes", "POST", "");
        }
      );
    });
  });
});

module.exports = router;
