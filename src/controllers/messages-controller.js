const HttpError = require("../errors/http-error");

const hashGenerator = require("../generators/hash-generator");

const fileManager = require("../managers/file-manager");

const successPresenter = require("../presenters/success-presenter");

const { validate } = require("../validators/message-validator");

const { DEFAULT_HASH } = require("../utils/config");
const logger = require("../utils/logger");

async function create(message) {
  await validate(message);
  try {
    const lastLine = await fileManager.getLastLine();
    let prev = DEFAULT_HASH;
    if (lastLine) {
      prev = hashGenerator.generate(
        lastLine.prevHash,
        lastLine.message,
        lastLine.nonce
      );
    }
    const nonce = await hashGenerator.findNonce(prev, message);
    await fileManager.saveToFile(prev, message, nonce);
    return successPresenter.present("Message was properly stored");
  } catch (error) {
    logger.error(error);
    // We don't present the internal error to the client
    throw new HttpError(
      500,
      "There was an error storing your message, try again later"
    );
  }
}

module.exports = {
  create,
};
