const HashGenerator = require("../../src/generators/hash-generator");
const HashValidator = require("../../src/validators/hash-validator");

const expect = require("chai").expect;

describe("HashGenerator", function () {
  describe(".generate", function () {
    context("When valid parameters are given", function () {
      it("generates a string based on input", function () {
        const prev = "000000000000000000000";
        const message = "Hello world";
        const nonce = 10;
        const hash = HashGenerator.generate(prev, message, nonce);
        expect(hash).to.be.a("string");
      });
    });
  });
  describe(".findNonce", function () {
    context("when valid parameters are given", function () {
      it("finds a numeric value based on input", async function () {
        const prev = "0012837218371283712837812akdjr98";
        const message = "Generating hash";
        const nonce = await HashGenerator.findNonce(prev, message);
        expect(nonce).to.be.a("number");
      });

      it("creates a valid hash", async function () {
        const prev = "0012837218371283712837812akdjr98";
        const message = "Generating hash";
        const nonce = await HashGenerator.findNonce(prev, message);
        const hash = HashGenerator.generate(prev, message, nonce);
        expect(HashValidator.validate(hash)).to.eq(true);
      });
    });
  });
});
