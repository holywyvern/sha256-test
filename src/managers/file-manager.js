const fs = require("fs-extra");
const lockfile = require("proper-lockfile");

const hashGenerator = require("../generators/hash-generator");
const { validate } = require("../validators/hash-validator");

const {
  STORAGE_FILE,
  LINE_SEPARATOR,
  VALUE_SEPARATOR,
} = require("../utils/config");

async function getLastLine() {
  await fs.ensureFile(STORAGE_FILE);
  const data = await fs.readFile(STORAGE_FILE, "utf-8");
  if (!data) {
    return null;
  }
  const lines = data.trim().split(LINE_SEPARATOR);
  if (lines.length === 0) {
    return null;
  }
  const lastLine = lines[lines.length - 1];
  const [prevHash, message, nonce] = lastLine.split(VALUE_SEPARATOR);
  return { prevHash, message, nonce };
}

async function validatePrevHash(prev) {
  const lastLine = await getLastLine();
  if (!lastLine) {
    return;
  }
  const hash = hashGenerator.generate(
    lastLine.prevHash,
    lastLine.message,
    lastLine.nonce
  );
  if (hash !== prev) {
    throw new Error("Previous hash does not match stored hash");
  }
}

async function validateCurrentHash(prev, message, nonce) {
  const hash = hashGenerator.generate(prev, message, nonce);
  if (!validate(hash)) {
    throw new Error("Current hash is not valid");
  }
}

async function writeLine(prev, message, nonce) {
  const line = [prev, message, nonce].join(VALUE_SEPARATOR);
  await fs.appendFile(STORAGE_FILE, `${LINE_SEPARATOR}${line}`, "utf8");
}

async function saveToFile(prev, message, nonce) {
  await validateCurrentHash(prev, message, nonce);
  const release = await lockfile.lock(STORAGE_FILE);
  await validatePrevHash(prev);
  await writeLine(prev, message, nonce);
  await release();
}

module.exports = {
  getLastLine,
  saveToFile,
};
