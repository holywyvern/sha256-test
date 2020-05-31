const chai = require("chai");
const { expect } = chai;
const chaiHttp = require("chai-http");

const server = require("../../src/server");

chai.use(chaiHttp);

describe("/api/messages", function () {
  describe("POST /", function () {
    context("when a valid message is given", function () {
      const message = "Hello world";

      it("responds with created status", function () {
        const req = chai.request(server).post("/api/messages").send({
          message,
        });

        req.end((_, res) => {
          expect(res).to.have.status(201);
        });
      });
    });

    context("when an invalid message is given", function () {
      it("responds with unprocessable entity status", function () {
        const message = "";
        const req = chai.request(server).post("/api/messages").send({
          message,
        });

        req.end((_, res) => {
          expect(res).to.have.status(422);
        });
      });
    });
  });
});
