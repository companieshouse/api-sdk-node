"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const result_1 = require("../../src/services/result");
const expect = chai_1.default.expect;
describe("Result", () => {
    describe("Result.success", () => {
        it("should create a success value", () => {
            const successValue = result_1.success("Hello");
            expect(successValue.isSuccess()).to.equal(true);
            expect(successValue.isFailure()).to.equal(false);
            expect(successValue).to.be.an.instanceof(result_1.Success);
        });
        it("Can read the value after narrowing", () => {
            const fallible = () => result_1.success({ name: "The Company" });
            const val = fallible();
            // After this check val is narrowed to Success<Company, CompanyError>. Without this
            // line TypeScript will not allow accessing val.value.name
            if (val.isFailure())
                return;
            expect(val.value.name).to.equal("The Company");
        });
    });
    describe("Result.failure", () => {
        it("should create a success value", () => {
            const successValue = result_1.failure("Hello");
            expect(successValue.isSuccess()).to.equal(false);
            expect(successValue.isFailure()).to.equal(true);
            expect(successValue).to.be.an.instanceof(result_1.Failure);
        });
        it("Can read the value after narrowing", () => {
            const fallible = () => result_1.failure({ error: "There was an error" });
            const val = fallible();
            // After this check val is narrowed to Failure<Company, CompanyError>. Without this
            // line TypeScript will not allow accessing val.value.error
            if (val.isSuccess())
                return;
            expect(val.value.error).to.equal("There was an error");
        });
    });
});
//# sourceMappingURL=result.spec.js.map