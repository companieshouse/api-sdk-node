import { expect } from "chai";
import { isAccountValidatorResponse } from "../../../src/services/account-validator/types";

const validResponse = {
    status: "complete",
    fileId: "abc-123",
    fileName: "accounts.zip",
    result: {
        validationStatus: "OK",
        data: {},
        errorMessages: [{ errorMessage: "some error" }]
    }
};

describe("isAccountValidatorResponse", () => {
    it("should return true for a valid AccountValidatorResponse", () => {
        expect(isAccountValidatorResponse(validResponse)).to.be.true;
    });

    it("should return true when errorMessages is undefined", () => {
        const obj = {
            ...validResponse,
            result: {
                validationStatus: "FAILED",
                data: {},
                errorMessages: undefined
            }
        };
        expect(isAccountValidatorResponse(obj)).to.be.true;
    });

    it("should return true for all valid status values", () => {
        for (const status of ["complete", "pending", "error"]) {
            expect(isAccountValidatorResponse({ ...validResponse, status })).to.be.true;
        }
    });

    it("should return true for all valid validationStatus values", () => {
        for (const validationStatus of ["OK", "FAILED"]) {
            const obj = { ...validResponse, result: { ...validResponse.result, validationStatus } };
            expect(isAccountValidatorResponse(obj)).to.be.true;
        }
    });

    it("should return false when status is not a string", () => {
        expect(isAccountValidatorResponse({ ...validResponse, status: 123 })).to.be.false;
    });

    it("should return false when status is not a valid RequestStatus", () => {
        expect(isAccountValidatorResponse({ ...validResponse, status: "unknown" })).to.be.false;
    });

    it("should return false when fileId is not a string", () => {
        expect(isAccountValidatorResponse({ ...validResponse, fileId: 99 })).to.be.false;
    });

    it("should return false when fileName is not a string", () => {
        expect(isAccountValidatorResponse({ ...validResponse, fileName: true })).to.be.false;
    });

    it("should return false when result is not an object", () => {
        expect(isAccountValidatorResponse({ ...validResponse, result: "bad" })).to.be.false;
    });

    it("should return false when result is null", () => {
        expect(isAccountValidatorResponse({ ...validResponse, result: null })).to.be.false;
    });

    it("should return false when errorMessages is present but not an array", () => {
        const obj = {
            ...validResponse,
            result: { ...validResponse.result, errorMessages: "not-an-array" }
        };
        expect(isAccountValidatorResponse(obj)).to.be.false;
    });

    it("should return false when data is not an object", () => {
        const obj = {
            ...validResponse,
            result: { ...validResponse.result, data: "bad" }
        };
        expect(isAccountValidatorResponse(obj)).to.be.false;
    });

    it("should return false when validationStatus is not a string", () => {
        const obj = {
            ...validResponse,
            result: { ...validResponse.result, validationStatus: 42 }
        };
        expect(isAccountValidatorResponse(obj)).to.be.false;
    });

    it("should return false when validationStatus is not a valid ValidationStatus", () => {
        const obj = {
            ...validResponse,
            result: { ...validResponse.result, validationStatus: "UNKNOWN" }
        };
        expect(isAccountValidatorResponse(obj)).to.be.false;
    });

    it("should return false when an errorMessage entry is not an object", () => {
        const obj = {
            ...validResponse,
            result: { ...validResponse.result, errorMessages: ["not-an-object"] }
        };
        expect(isAccountValidatorResponse(obj)).to.be.false;
    });

    it("should return false when an errorMessage entry is null", () => {
        const obj = {
            ...validResponse,
            result: { ...validResponse.result, errorMessages: [null] }
        };
        expect(isAccountValidatorResponse(obj)).to.be.false;
    });

    it("should return false when errorMessage property is not a string", () => {
        const obj = {
            ...validResponse,
            result: { ...validResponse.result, errorMessages: [{ errorMessage: 123 }] }
        };
        expect(isAccountValidatorResponse(obj)).to.be.false;
    });
});
