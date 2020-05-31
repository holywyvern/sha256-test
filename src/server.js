const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const messages = require("./routes/messages");

const server = express();
if (process.env.NODE_ENV !== "test") {
  server.use(morgan());
}
server.use(bodyParser.json());

server.use("/api/messages", messages);

module.exports = server;
