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

router.get("/caffe/:caffeId", (req, res) => {
  if (req.params.caffeId == undefined)
    return res.send("Nemoj sql injectati. <:)");
  handle.query(
    `SELECT ip, name from caffes WHERE id = ${req.params.caffeId}`,
    (err, rows) => {
      res.send(rows[0]);
      costumlog("endpoint", "caffes/caffe", "GET", "");
    }
  );
});

router.put("/caffe", (req, res) => {
  const desired = req.body.pass;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(desired, salt, (err, hash) => {
      req.body.pass == "N/A"
        ? handle.query(
            `UPDATE \`caffes\` SET  \`ip\` = '${req.body.ip}', \`name\` = '${req.body.name}' WHERE \`id\` = ${req.body.id}`,
            (err, rows) => {
              if (err)
                return (
                  costumlog(
                    "err",
                    "",
                    "",
                    "It isn't possible to update caffe data!"
                  ),
                  res.status(500)
                );
              else
                return (
                  costumlog("endpoint", "/caffes/caffe", "PUT", ""),
                  res.send("Podaci uspjesno azurirani.").status(200)
                );
            }
          )
        : handle.query(
            `UPDATE \`caffes\` SET \`pass\` = '${hash}', \`ip\` = '${req.body.ip}', \`name\` = '${req.body.name}' WHERE \`id\` = ${req.body.id}`,
            (err, rows) => {
              if (err)
                return (
                  costumlog(
                    "err",
                    "",
                    "",
                    "It isn't possible to update caffe data!"
                  ),
                  res.status(500)
                );
              else
                return (
                  costumlog("endpoint", "/caffes/caffe", "PUT", ""),
                  res.send("Podaci uspjesno azurirani.").status(200)
                );
            }
          );
    });
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
