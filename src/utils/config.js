const STORAGE_FILE = process.env.STORAGE_FILE || "store.csv";
const LINE_SEPARATOR = process.env.LINE_SEPARATOR || "\n";
const VALUE_SEPARATOR = process.env.VALUE_SEPARATOR || ",";

module.exports = {
  STORAGE_FILE,
  LINE_SEPARATOR,
  VALUE_SEPARATOR,
};
