const crypto = require("crypto");

const { validate } = require("../validators/hash-validator");
const { VALUE_SEPARATOR } = require("../utils/config");

function generate(prev, message, nonce) {
  const generator = crypto.createHash("sha256");
  return generator
    .update([prev, message, nonce].join(VALUE_SEPARATOR), "utf8")
    .digest("hex")
    .toString();
}

async function findNonce(prev, message) {
  let hash;
  let nonce = -1;
  do {
    ++nonce;
    hash = generate(prev, message, nonce);
  } while (!validate(hash));
  return nonce;
}

module.exports = {
  generate,
  findNonce,
};
