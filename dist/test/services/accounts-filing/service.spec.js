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
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const http_1 = require("../../../src/http");
const service_1 = require("../../../src/services/accounts-filing/service");
function createApiResponse(fileId) {
    return {
        fileId,
        fileName: "1mb.zip",
        status: "complete",
        result: {
            validationStatus: "FAILED",
            data: {
                balance_sheet_date: "UNKNOWN",
                accounts_type: "00",
                companieshouse_registered_number: "UNKNOWN"
            },
            errorMessages: [
                {
                    errorMessage: "Found 2 inline XBRL documents."
                },
                {
                    errorMessage: "The submission contains a malformed XML document: image1689926429N.html"
                }
            ]
        }
    };
}
describe("AccountsFilingService", () => {
    let httpClient;
    let accountsFilingService;
    beforeEach(() => {
        httpClient = new http_1.RequestClient({
            baseUrl: "URL-NOT-USED",
            oauthToken: "TOKEN-NOT-USED"
        });
        accountsFilingService = new service_1.AccountsFilingService(httpClient);
    });
    describe("confirmCompany", () => {
        it("should returns 200 response with accountsFilingId", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockCompanyResponse = {
                status: 200,
                body: {
                    accountsFilingId: "mockAccountsFilingId"
                }
            };
            const companyNumber = "CN123456";
            const transactionId = "000000-123456-000000";
            const confirmCompanyRequest = {
                companyName: "Test Company"
            };
            sinon_1.default.stub(httpClient, "httpPut").resolves(mockCompanyResponse);
            yield accountsFilingService
                .confirmCompany(companyNumber, transactionId, confirmCompanyRequest)
                .then((data) => {
                var _a;
                chai_1.expect(data.httpStatusCode).to.equal(200);
                const castedData = data;
                chai_1.expect((_a = castedData === null || castedData === void 0 ? void 0 : castedData.resource) === null || _a === void 0 ? void 0 : _a.accountsFilingId).to.equal("mockAccountsFilingId");
            });
        }));
        it("get returns a 400 when invalid company number is passed", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockErrorResponse = {
                status: 400,
                body: "Mocked error message"
            };
            const companyNumber = "";
            const transactionId = "000000-123456-000000";
            const confirmCompanyRequest = {
                companyName: "Test Company"
            };
            sinon_1.default.stub(httpClient, "httpPut").resolves(mockErrorResponse);
            yield accountsFilingService
                .confirmCompany(companyNumber, transactionId, confirmCompanyRequest)
                .then((data) => {
                chai_1.expect(data.httpStatusCode).to.equal(400);
            });
        }));
        it("get returns a 400 when invalid transaction id is passed", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockErrorResponse = {
                status: 400,
                body: "Mocked error message"
            };
            const companyNumber = "CN123456";
            const transactionId = "123456-000000";
            const confirmCompanyRequest = {
                companyName: "Test Company"
            };
            sinon_1.default.stub(httpClient, "httpPut").resolves(mockErrorResponse);
            yield accountsFilingService
                .confirmCompany(companyNumber, transactionId, confirmCompanyRequest)
                .then((data) => {
                chai_1.expect(data.httpStatusCode).to.equal(400);
            });
        }));
        it("Return 500 during unhandled runtime exception. For example mongodb services are down. ", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockErrorResponse = {
                status: 500,
                body: "Mocked error message"
            };
            const companyNumber = "CN123456";
            const transactionId = "000000-123456-000000";
            const confirmCompanyRequest = {
                companyName: "Test Company"
            };
            sinon_1.default.stub(httpClient, "httpPut").resolves(mockErrorResponse);
            yield accountsFilingService
                .confirmCompany(companyNumber, transactionId, confirmCompanyRequest)
                .then((data) => {
                chai_1.expect(data.httpStatusCode).to.equal(500);
            });
        }));
    });
    describe("checkAccountsFileValidationStatus", () => {
        it("should handle a successful response correctly", () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const fileId = "f37c5268-ecd2-4b62-a19e-ecb343d2c017";
            const accountsFilingApiResponse = createApiResponse(fileId);
            const getStub = sinon_1.default.stub(httpClient, "httpGet").resolves({
                status: 200,
                body: accountsFilingApiResponse
            });
            const fileValidationRequest = {
                fileId,
                accountsFilingId: "456",
                transactionId: "789"
            };
            const resp = yield accountsFilingService.checkAccountsFileValidationStatus(fileValidationRequest);
            chai_1.expect(resp.httpStatusCode).equal(200);
            chai_1.expect(resp).to.have.property("resource");
            const _resp = resp;
            chai_1.expect(_resp.resource).to.not.be.undefined;
            chai_1.expect((_a = _resp.resource) === null || _a === void 0 ? void 0 : _a.fileId).to.equal(fileId);
            getStub.restore();
        }));
        it("should handle a 'file not found' response correctly", () => __awaiter(void 0, void 0, void 0, function* () {
            var _b, _c, _d;
            const fileId = "f37c5268-ecd2-4b62-a19e-ecb343d2c017";
            const getStub = sinon_1.default.stub(httpClient, "httpGet").resolves({
                status: 404
            });
            const fileValidationRequest = {
                fileId,
                accountsFilingId: "456",
                transactionId: "789"
            };
            const resp = yield accountsFilingService.checkAccountsFileValidationStatus(fileValidationRequest);
            chai_1.expect(resp.httpStatusCode).equal(404);
            chai_1.expect(resp).to.have.property("errors");
            chai_1.expect((_d = (_c = (_b = resp) === null || _b === void 0 ? void 0 : _b.errors) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.error).to.include("not found");
            getStub.restore();
        }));
        it("should handle an unexpected error response correctly", () => __awaiter(void 0, void 0, void 0, function* () {
            var _e, _f, _g;
            const fileId = "123";
            const unexpectedError = { message: "Unexpected error" };
            const getStub = sinon_1.default.stub(httpClient, "httpGet").resolves({
                status: 500,
                body: unexpectedError
            });
            const fileValidationRequest = {
                fileId,
                accountsFilingId: "456",
                transactionId: "789"
            };
            const resp = yield accountsFilingService.checkAccountsFileValidationStatus(fileValidationRequest);
            chai_1.expect(resp).to.be.an("object");
            chai_1.expect(resp.httpStatusCode).to.equal(500);
            chai_1.expect(resp).to.have.property("errors");
            chai_1.expect((_g = (_f = (_e = resp) === null || _e === void 0 ? void 0 : _e.errors) === null || _f === void 0 ? void 0 : _f[0]) === null || _g === void 0 ? void 0 : _g.error).to.equal("Unexpected server response: Status Code 500");
            getStub.restore();
        }));
        it("should handle exceptions correctly", () => __awaiter(void 0, void 0, void 0, function* () {
            const fileId = "123";
            const errorMessage = "Network error";
            const getStub = sinon_1.default
                .stub(httpClient, "httpGet")
                .rejects(new Error(errorMessage));
            const fileValidationRequest = {
                fileId,
                accountsFilingId: "456",
                transactionId: "789"
            };
            try {
                yield accountsFilingService.checkAccountsFileValidationStatus(fileValidationRequest);
                chai_1.expect.fail("Expected method to throw an error.");
            }
            catch (error) {
                chai_1.expect(error).to.be.an.instanceOf(Error);
                chai_1.expect(error.message).to.equal("Expected method to throw an error.");
            }
            finally {
                getStub.restore();
            }
        }));
    });
    describe("setPackageType", () => {
        it("Should return a successful result if the return status is 204", () => __awaiter(void 0, void 0, void 0, function* () {
            const putStub = sinon_1.default.stub(httpClient, "httpPut").resolves({
                status: 204
            });
            try {
                const result = yield accountsFilingService.setPackageType("tx_id", "af_id", "uksef");
                chai_1.expect(result.isSuccess()).to.be.true;
            }
            finally {
                putStub.restore();
            }
        }));
        it("Should return a failure message when the return status is 404", () => __awaiter(void 0, void 0, void 0, function* () {
            const putStub = sinon_1.default.stub(httpClient, "httpPut").resolves({
                status: 404
            });
            try {
                const result = yield accountsFilingService.setPackageType("tx_id", "af_id", "uksef");
                chai_1.expect(result.isFailure()).to.be.true;
                const value = result.value;
                chai_1.expect(value).to.be.an("Error");
                chai_1.expect(value.message).to.contain("No transaction with id");
            }
            finally {
                putStub.restore();
            }
        }));
        it("Should return a generic failure message when the return status is not 204 or 404", () => __awaiter(void 0, void 0, void 0, function* () {
            const putStub = sinon_1.default.stub(httpClient, "httpPut").resolves({
                status: 500
            });
            try {
                const result = yield accountsFilingService.setPackageType("tx_id", "af_id", "uksef");
                chai_1.expect(result.isFailure()).to.be.true;
                const value = result.value;
                chai_1.expect(value).to.be.an("Error");
                chai_1.expect(value.message).to.contain("An unknown error occured");
            }
            finally {
                putStub.restore();
            }
        }));
    });
});
//# sourceMappingURL=service.spec.js.map