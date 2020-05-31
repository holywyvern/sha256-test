const path = require("path");
const dotenv = require("dotenv");

const dotEnvPath = path.join(__dirname, ".mocha-env");
dotenv.config({ path: dotEnvPath });
