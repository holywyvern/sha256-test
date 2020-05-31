const fs = require("fs-extra");

const FileManager = require("../../src/managers/file-manager");

const { STORAGE_FILE } = require("../../src/utils/config");

const chai = require("chai");
const { expect } = chai;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("FileManager", function () {
  describe(".getLastLine", function () {
    context("when a line does not exists", function () {
      it("resolves as null", async function () {
        await fs.remove(STORAGE_FILE);
        const line = await FileManager.getLastLine();
        expect(line).to.eq(null);
      });
    });

    context("when a line already exists", function () {
      it("resolves as the correct value", async function () {
        await fs.writeFile(
          STORAGE_FILE,
          "0000000000000000000000000000000000000,Hello world,68",
          "utf8"
        );
        const line = await FileManager.getLastLine();
        expect(line).to.be.an("object");
        expect(line.prevHash).to.eq("0000000000000000000000000000000000000");
        expect(line.message).to.eq("Hello world");
        expect(line.nonce).to.eq("68");
      });
    });
  });
  describe(".saveToFile", function () {
    // TODO: Add test
  });
});
