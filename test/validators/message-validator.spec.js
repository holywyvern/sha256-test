const MessageValidator = require("../../src/validators/message-validator");

const {
  MAX_MESSAGE_LENGTH,
  VALUE_SEPARATOR,
} = require("../../src/utils/config");

const chai = require("chai");
const { expect } = chai;
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("MessageValidator", function () {
  describe(".validate", function () {
    context("when a valid message is given", function () {
      const message = "Hello World of Crypto";

      it("is fullfilled", function () {
        const promise = MessageValidator.validate(message);
        expect(promise).to.be.fulfilled;
      });
    });

    context("when message is blank", function () {
      const message = "";

      it("is rejected", function () {
        const promise = MessageValidator.validate(message);
        expect(promise).to.be.rejected;
      });
    });

    context("when message is too long", function () {
      const message = new Array(MAX_MESSAGE_LENGTH + 1).fill("A").join("");

      it("is rejected", function () {
        const promise = MessageValidator.validate(message);
        expect(promise).to.be.rejected;
      });
    });

    context("when message is not a string", function () {
      const message = 32;

      it("is rejected", function () {
        const promise = MessageValidator.validate(message);
        expect(promise).to.be.rejected;
      });
    });

    context("when message contains invalid characters", function () {
      const message = `Hello${VALUE_SEPARATOR} World`;

      it("is rejected", function () {
        const promise = MessageValidator.validate(message);
        expect(promise).to.be.rejected;
      });
    });
  });
});
