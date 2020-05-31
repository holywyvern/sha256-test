const express = require("express");
const bodyParser = require("body-parser");

const messages = require("./routes/messages");

const server = express();
server.use(bodyParser.json());

server.use("/api/messages", messages);

module.exports = server;
