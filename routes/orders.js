const express = require("express");
const requireAuth = require("../middlewares/authMiddle");
const handle = require("../modules/connection");
const costumlog = require("../modules/costum-log");
var router = express.Router();

router.post("/", (req, res) => {
  let timestamp = new Date();

  let month = timestamp.getMonth();
  let year = timestamp.getFullYear();
  let day = timestamp.getDate();

  let hour = timestamp.getHours();
  let minute = timestamp.getMinutes();

  handle.query(
    `INSERT INTO orders (\`content\`, \`timestamp\`, \`note\` ,\`caffeId\`, \`tableId\`, \`price\`) VALUES \
    ('${req.body.content}', '${hour}:${minute}, ${day}/${month}/${year}', '${req.body.note}', ${req.body.caffeId}, ${req.body.tableId}, ${req.body.price})`,
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
      var io = req.app.get("socketio");
      io.emit("createdOrder");
      res.send("Uspjesno dodana narudzba.").status(200);
    }
  );
});

router.get("/statement/:caffeId", (req, res) => {
  handle.query(
    `SELECT * FROM orders where caffeId = ${req.params.caffeId}`,
    (err, rows) => {
      if (err)
        return (
          costumlog("err", "", "", "Error happened while getting all orders."),
          res
            .send("Doslo je do greske prilikom dobijanja svih narudzbi.")
            .status(500)
        );

      res.send(rows);
    }
  );
});
router.get("/caffe-statement/:caffeId", (req, res) => {
  handle.query(
    `SELECT * FROM orders where caffeId = ${req.params.caffeId}`,
    (err, rows) => {
      if (err)
        return (
          costumlog("err", "", "", "Error happened while getting all orders."),
          res
            .send("Doslo je do greske prilikom dobijanja svih narudzbi.")
            .status(500)
        );

      res.send(rows);
    }
  );
});

router.get("/:caffeId", requireAuth, (req, res) => {
  handle.query(
    `SELECT * FROM orders WHERE caffeId = ${req.params.caffeId} AND \`zavrsena\` = 0 ORDER BY timestamp ASC`,
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

router.put("/:orderId", requireAuth, (req, res) => {
  handle.query(
    `UPDATE orders SET \`zavrsena\` = 1 WHERE id = ${req.params.orderId}`,
    (err) => {
      if (err)
        return (
          costumlog(
            "err",
            "",
            "",
            `Error happened while trying to finish order. (${err.message})`
          ),
          res
            .send("Doslo je do greske prilikom zavrsavanja narudzbe.")
            .status(500)
        );

      var io = req.app.get("socketio");
      io.emit("completedOrder");
      res.send("Uspjesno zavrsena narudzba.").status(200);
    }
  );
});

router.get("/user/:caffeId", (req, res) => {
  handle.query(
    `SELECT name, ip FROM caffes WHERE id = ${req.params.caffeId}`,
    (err, rows) => {
      if (err)
        return (
          costumlog(
            `err`,
            ``,
            "",
            "Error happened while trying to get caffe info."
          ),
          res.send("Interna greska servera.").status(500)
        );

      res.send(rows[0]);
    }
  );
});
module.exports = router;
