const HttpError = require("../errors/http-error");

const hashGenerator = require("../generators/hash-generator");

const fileManager = require("../managers/file-manager");

const successPresenter = require("../presenters/success-presenter");

const { validate } = require("../validators/message-validator");

const { DEFAULT_HASH } = require("../utils/config");

async function create(message) {
  await validate(message);
  try {
    const lastLine = await fileManager.getLastLine();
    const prev = DEFAULT_HASH;
    if (lastLine) {
      prev = lastLine.prevHash;
    }
    const nonce = await hashGenerator.findNonce(prev, message);
    await fileManager.saveToFile(prev, message, nonce);
    return successPresenter.present("Message was properly stored");
  } catch (error) {
    // TODO: Log error
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
