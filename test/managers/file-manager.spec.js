const fs = require("fs-extra");

const FileManager = require("../../src/managers/file-manager");
const HashGenerator = require("../../src/generators/hash-generator");

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
    context("when a valid hash is processed", function () {
      it("is fulfiled", async function () {
        const last = await FileManager.getLastLine();
        const message = "Testing File Manager";
        const prev = HashGenerator.generate(
          last.prevHash,
          last.message,
          last.nonce
        );
        const nonce = await HashGenerator.findNonce(prev, message);

        const promise = FileManager.saveToFile(prev, message, nonce);
        await expect(promise).to.be.fulfilled;
      });
    });

    context("when an invalid prev hash is given", function () {
      it("is rejected", function () {
        const message = "Testing File Manager";
        const promise = FileManager.getLastLine().then(async (last) => {
          const prev = HashGenerator.generate(
            last.prevHash,
            last.message,
            last.nonce
          );
          const nonce = await HashGenerator.findNonce(prev, message);
          return FileManager.saveToFile("x", message, nonce);
        });
        expect(promise).to.be.rejected;
      });
    });

    context("when an invalid nonce is given", function () {
      it("is rejected", function () {
        const message = "Testing File Manager";
        const promise = FileManager.getLastLine().then(async (last) => {
          const prev = HashGenerator.generate(
            last.prevHash,
            last.message,
            last.nonce
          );
          const nonce = (await HashGenerator.findNonce(prev, message)) - 1;
          return FileManager.saveToFile(prev, message, nonce);
        });
        expect(promise).to.be.rejected;
      });
    });
  });
});
