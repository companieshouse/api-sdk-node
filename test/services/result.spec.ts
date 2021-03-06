import chai from "chai";

import { Result, success, Success, failure, Failure } from "../../src/services/result";
const expect = chai.expect;

describe("Result", () => {
  interface Company {
    name: string;
  }

  interface CompanyError {
    error: string;
  }
  describe("Result.success", () => {
      it("should create a success value", () => {
          const successValue = success("Hello");

          expect(successValue.isSuccess()).to.equal(true);
          expect(successValue.isFailure()).to.equal(false);
          expect(successValue).to.be.an.instanceof(Success);
      });

      it("Can read the value after narrowing", () => {
          const fallible: () => Result<Company, CompanyError> = () => success({ name: "The Company" });
          const val = fallible();

          // After this check val is narrowed to Success<Company, CompanyError>. Without this
          // line TypeScript will not allow accessing val.value.name
          if (val.isFailure()) return;

          expect(val.value.name).to.equal("The Company");
      });
  });

  describe("Result.failure", () => {
      it("should create a success value", () => {
          const successValue = failure("Hello");

          expect(successValue.isSuccess()).to.equal(false);
          expect(successValue.isFailure()).to.equal(true);
          expect(successValue).to.be.an.instanceof(Failure);
      });

      it("Can read the value after narrowing", () => {
          const fallible: () => Result<Company, CompanyError> = () => failure({ error: "There was an error" });
          const val = fallible();

          // After this check val is narrowed to Failure<Company, CompanyError>. Without this
          // line TypeScript will not allow accessing val.value.error
          if (val.isSuccess()) return;

          expect(val.value.error).to.equal("There was an error");
      });
  });
});
