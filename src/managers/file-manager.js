const fs = require("fs-extra");
const lockfile = require("proper-lockfile");
const {
  STORAGE_FILE,
  LINE_SEPARATOR,
  VALUE_SEPARATOR,
} = require("../utils/config");

async function getLastLine() {
  const data = await fs.readFile(STORAGE_FILE, "utf-8");
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
  if (lastLine && lastLine.prevHash !== prev) {
    throw new Error("Previous hash does not match stored hash");
  }
}

async function writeLine(prev, message, nonce) {
  const line = [prev, message, nonce].join(VALUE_SEPARATOR);
  await fs.appendFile(STORAGE_FILE, line, "utf8");
}

async function saveToFile(prev, message, nonce) {
  try {
    await fs.ensureFile(STORAGE_FILE);
    const release = await lockfile.lock(STORAGE_FILE);
    await validatePrevHash(prev);
    await writeLine(prev, message, nonce);
    await release();
    return true;
  } catch (error) {
    // TODO: log error
  }
  return false;
}

module.exports = {
  getLastLine,
  saveToFile,
};
