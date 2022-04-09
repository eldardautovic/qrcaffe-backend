const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var con = require("./modules/connection");
const costumlog = require("./modules/costum-log");

require("dotenv/config");

const app = express();

app.use(express.json());
app.use(cors());

//routes
const caffes = require("./routes/caffes");
const login = require("./routes/login");

app.use("/caffes", caffes);
app.use("/login", login);
//starting server

app.listen(process.env.PORT || 3000, () => {
  console.log("Server starting, trying to connect to the database...");

  con.connect((err) => {
    if (err) costumlog("err", "/", "/", "connecting to database");

    console.log("\t\t[+] Connection was established with the database.\n\n");
  });
});
