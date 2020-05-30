const HashValidator = require("../../src/validators/hash-validator");

const expect = require("chai").expect;

describe("HashValidator", function () {
  describe(".validate", function () {
    context("when a valid hash is validated", function () {
      const hash =
        "0043d572a9723b7131adfa87bc05d1fa21a99a1e7de8f162ac9ce4da750e78c0";

      it("evaluates hash as valid", function () {
        expect(HashValidator.validate(hash)).to.eq(true);
      });
    });

    context("when an invalid hash is given", function () {
      const hash =
        "0843d572a9723b7131adfa87bc05d1fa21a99a1e7de8f162ac9ce4da750e78c0";

      it("evaluates hash as invalid", function () {
        expect(HashValidator.validate(hash)).to.eq(false);
      });
    });
  });
});
