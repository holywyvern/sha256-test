const HttpError = require("../errors/http-error");

const { LINE_SEPARATOR, MAX_MESSAGE_LENGTH } = require("../utils/config");

async function validate(message) {
  if (!message) {
    throw new HttpError(422, "Message cannot be blank");
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    throw new HttpError(
      422,
      `Message can't be longer than ${MAX_MESSAGE_LENGTH} characters.`
    );
  }
  if (message.includes(LINE_SEPARATOR)) {
    throw new HttpError(
      422,
      `Message can't contain '${LINE_SEPARATOR}' in it.`
    );
  }
}

module.exports = {
  validate,
};
