"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = __importDefault(require("sinon"));
const postcode_lookup_1 = require("../../../src/services/postcode-lookup");
const src_1 = require("../../../src");
const chai_1 = require("chai");
const requestClient = new src_1.RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "NOT USED" });
const mockResponseBodyOfUKAddress1 = ({
    premise: "123",
    addressLine1: "123 Main St",
    postTown: "London",
    postcode: "SW1A 1AA",
    country: "GB-ENG"
});
const mockResponseBodyOfUKAddress2 = ({
    premise: "125",
    addressLine1: "123 Main St",
    postTown: "London",
    postcode: "SW1A 1AA",
    country: "GB-ENG"
});
const mockResponseBody = [
    mockResponseBodyOfUKAddress1,
    mockResponseBodyOfUKAddress2
];
describe("test isValidUKPostcode", () => {
    it("should return true for a valid postcode", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").returns(Promise.resolve(mockGetResponse));
        const postcode = "SW1A1AA";
        const postcodeValidationUrl = "https://example.com/postcode";
        const postcodeLookupService = new postcode_lookup_1.PostcodeLookupService(requestClient);
        const result = yield postcodeLookupService.isValidUKPostcode(postcodeValidationUrl, postcode);
        chai_1.expect(result).to.be.equal(true);
    }));
    it("should return false for an invalid postcode", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetResponse = {
            status: 404,
            body: null
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").returns(Promise.resolve(mockGetResponse));
        const postcode = "SW1A1AB";
        const postcodeValidationUrl = "https://example.com/postcode";
        const postcodeLookupService = new postcode_lookup_1.PostcodeLookupService(requestClient);
        const result = yield postcodeLookupService.isValidUKPostcode(postcodeValidationUrl, postcode);
        chai_1.expect(result).to.be.equal(false);
    }));
});
describe("test getListOfValidPostcodeAddresses", () => {
    it("should return a list of addresses for a valid postcode", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").returns(Promise.resolve(mockGetResponse));
        const postcode = "SW1A1AA";
        const postcodeAddressesLookupUrl = "https://example.com/multiple-addresses";
        const postcodeLookupService = new postcode_lookup_1.PostcodeLookupService(requestClient);
        const result = yield postcodeLookupService.getListOfValidPostcodeAddresses(postcodeAddressesLookupUrl, postcode);
        chai_1.expect(mockRequest).to.have.been.calledOnce;
        chai_1.expect(result.httpStatusCode).to.be.equal(200);
        chai_1.expect(result.resource).to.not.be.undefined;
        chai_1.expect((_a = result.resource) === null || _a === void 0 ? void 0 : _a.length).to.be.equal(2);
        chai_1.expect(JSON.stringify(result.resource[0])).to.be.equals(JSON.stringify(mockResponseBodyOfUKAddress1));
        chai_1.expect(JSON.stringify(result.resource[1])).to.be.equals(JSON.stringify(mockResponseBodyOfUKAddress2));
    }));
    it("should return an empty list for an invalid postcode", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetResponse = {
            status: 404,
            body: null
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").returns(Promise.resolve(mockGetResponse));
        const postcode = "SW1A1AB";
        const postcodeAddressesLookupUrl = "https://example.com/multiple-addresses";
        const postcodeLookupService = new postcode_lookup_1.PostcodeLookupService(requestClient);
        const result = yield postcodeLookupService.getListOfValidPostcodeAddresses(postcodeAddressesLookupUrl, postcode);
        chai_1.expect(mockRequest).to.have.been.calledOnce;
        chai_1.expect(result.httpStatusCode).to.be.equal(404);
        chai_1.expect(result.resource).to.not.be.undefined;
        chai_1.expect(result.resource).to.be.empty;
    }));
});
//# sourceMappingURL=service.spec.js.map