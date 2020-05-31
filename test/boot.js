const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs-extra");

const dotEnvPath = path.join(__dirname, ".mocha-env");
dotenv.config({ path: dotEnvPath });

const { STORAGE_FILE } = require("../src/utils/config");

if (fs.existsSync(STORAGE_FILE)) {
  fs.removeSync(STORAGE_FILE);
}
