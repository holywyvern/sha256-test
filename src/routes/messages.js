const express = require("express");
const messagesController = require("../controllers/messages-controller");

const errorPresenter = require("../presenters/error-presenter");

const messages = express();

messages.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    const { status, response } = await messagesController.create(message);
    res.status(status).json(response);
  } catch (error) {
    const { status, response } = await errorPresenter.present(error);
    res.status(status).json(response);
  }
});

module.exports = messages;
