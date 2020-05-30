const HttpError = require("../errors/http-error");

const {
  LINE_SEPARATOR,
  VALUE_SEPARATOR,
  MAX_MESSAGE_LENGTH,
} = require("../utils/config");

async function validate(message) {
  if (typeof message !== "string") {
    throw new HttpError(422, "Message is not a string");
  }
  if (!message || message.length < 1) {
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
  if (message.includes(VALUE_SEPARATOR)) {
    throw new HttpError(
      422,
      `Message can't contain '${VALUE_SEPARATOR}' in it.`
    );
  }
}

module.exports = {
  validate,
};
