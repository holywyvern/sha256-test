const HashValidator = require("../../src/validators/hash-validator");

const expect = require("chai").expect;

describe("HashValidator", function () {
  describe(".validate", function () {
    context("when a valid hash is validated", function () {
      const hash = "00ajdkasj3mncmfkajhjd34";

      it("evaluates hash as valid", function () {
        expect(HashValidator.validate(hash)).to.eq(true);
      });
    });

    context("when an invalid hash is given", function () {
      const hash = "laskdl3mcdjfdjsfhdsjhfjsd";

      it("evaluates hash as invalid", function () {
        expect(HashValidator.validate(hash)).to.eq(false);
      });
    });
  });
});
