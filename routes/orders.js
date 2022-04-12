const express = require("express");
const handle = require("../modules/connection");
const costumlog = require("../modules/costum-log");
var router = express.Router();

router.post("/", (req, res) => {
  let timestamp = new Date();

  let month = timestamp.getMonth();
  let year = timestamp.getFullYear();
  let day = timestamp.getDay();

  let hour = timestamp.getHours();
  let minute = timestamp.getMinutes();

  handle.query(
    `INSERT INTO orders (\`content\`, \`timestamp\`, \`note\` ,\`caffeId\`) VALUES \
    ('${req.body.content}', '${hour}:${minute}, ${day}/${month}/${year}', '${req.body.note}', ${req.body.caffeId})`,
    (err, rows) => {
      if (err)
        return (
          costumlog(
            "err",
            "",
            "",
            "!!!An error happened while trying to create a new order!!!"
          ),
          res
            .send(`Doslo je do greske prilikom unosenja. (${err.message})`)
            .status(500)
        );

      res.send("Uspjesno dodana narudzba.").status(200);
    }
  );
});

router.get("/:caffeId", (req, res) => {
  handle.query(
    `SELECT * FROM orders WHERE caffeId = ${req.params.caffeId}`,
    (err, rows) => {
      if (err)
        return (
          costumlog(
            "err",
            "",
            "",
            `Error happened while trying to get orders. (${err.message})`
          ),
          res
            .send("Doslo je do greske prilikom dobavljanja izvjestaja.")
            .status(500)
        );

      res.send(rows).status(200);
    }
  );
});

module.exports = router;
