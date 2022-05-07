const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var con = require("./modules/connection");
const costumlog = require("./modules/costum-log");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

require("dotenv/config");

app.use(express.json());
app.use(cors());

//routes
const caffes = require("./routes/caffes");
const login = require("./routes/login");
const orders = require("./routes/orders");

app.use("/caffes", caffes);
app.use("/login", login);
app.use("/orders", orders);
app.set("socketio", io);

//starting server
io.on("createdOrder", () => console.log("created ordeer"));

server.listen(process.env.PORT || 3000, () => {
  console.log("Server starting, trying to connect to the database...");

  con.connect((err) => {
    if (err) return costumlog("err", "/", "/", "connecting to database");

    console.log("\t\t[+] Connection was established with the database.\n\n");
  });
});
