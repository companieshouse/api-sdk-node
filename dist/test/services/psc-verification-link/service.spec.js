"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const http_status_codes_1 = require("http-status-codes");
const mocha_1 = require("mocha");
const sinon = __importStar(require("sinon"));
const service_1 = __importDefault(require("../../../src/services/psc-verification-link/service"));
const service_mock_1 = require("./service.mock");
mocha_1.describe("PSC Verification Link", () => {
    const pscService = new service_1.default(service_mock_1.requestClient);
    mocha_1.describe("POST endpoint", () => {
        afterEach(sinon.restore);
        it("should return status 201 Created and filing resource representation on authorised access", () => __awaiter(void 0, void 0, void 0, function* () {
            sinon.stub(service_mock_1.requestClient, "httpPost").resolves(service_mock_1.mockPscVerificationCreatedResponse[201]);
            const response = (yield pscService.postPscVerification(service_mock_1.TRANSACTION_ID, service_mock_1.PSC_VERIFICATION_CREATED));
            chai_1.expect(response.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.CREATED);
            chai_1.expect(response.resource).to.eql(service_mock_1.mockPscVerificationCreated);
        }));
        it("should return status 401 Unauthorised on unauthorised access", () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            sinon.stub(service_mock_1.requestClient, "httpPost").resolves(service_mock_1.mockPscVerificationCreatedResponse[401]);
            const response = yield pscService.postPscVerification(service_mock_1.TRANSACTION_ID, { companyNumber: service_mock_1.COMPANY_NUMBER });
            chai_1.expect(response.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.UNAUTHORIZED);
            chai_1.expect((_a = response.errors) === null || _a === void 0 ? void 0 : _a[0]).to.equal(http_status_codes_1.ReasonPhrases.UNAUTHORIZED);
        }));
        it("should return status 400 Bad Request for bad data", () => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            sinon.stub(service_mock_1.requestClient, "httpPost").resolves(service_mock_1.mockPscVerificationCreatedResponse[400]);
            const data = yield pscService.postPscVerification(service_mock_1.TRANSACTION_ID, { companyNumber: "" });
            chai_1.expect(data.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.BAD_REQUEST);
            chai_1.expect((_b = data.errors) === null || _b === void 0 ? void 0 : _b[0]).to.equal(http_status_codes_1.ReasonPhrases.BAD_REQUEST);
        }));
        it("should return status 500 Internal Server Error if a server error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
            var _c;
            sinon.stub(service_mock_1.requestClient, "httpPost").resolves(service_mock_1.mockPscVerificationCreatedResponse[500]);
            const data = yield pscService.postPscVerification(service_mock_1.TRANSACTION_ID, { companyNumber: service_mock_1.COMPANY_NUMBER });
            chai_1.expect(data.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            chai_1.expect((_c = data.errors) === null || _c === void 0 ? void 0 : _c[0]).to.equal(http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR);
        }));
    });
    mocha_1.describe("GET endpoint", () => {
        it("should return status 200 OK and filing resource representation on authorised access", () => __awaiter(void 0, void 0, void 0, function* () {
            sinon.stub(service_mock_1.requestClient, "httpGet").resolves(service_mock_1.mockPscVerificationIndResponse[200]);
            const response = (yield pscService.getPscVerification(service_mock_1.TRANSACTION_ID, service_mock_1.PSC_NOTIFICATION_ID));
            chai_1.expect(response.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.OK);
            chai_1.expect(response.resource).to.eql(service_mock_1.mockPscVerificationInd);
        }));
        it("should return status 401 Unauthorised on unauthorised access", () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            sinon.stub(service_mock_1.requestClient, "httpGet").resolves(service_mock_1.mockPscVerificationIndResponse[401]);
            const response = yield pscService.getPscVerification(service_mock_1.TRANSACTION_ID, service_mock_1.PSC_NOTIFICATION_ID);
            chai_1.expect(response.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.UNAUTHORIZED);
            chai_1.expect((_a = response.errors) === null || _a === void 0 ? void 0 : _a[0]).to.equal(http_status_codes_1.ReasonPhrases.UNAUTHORIZED);
        }));
        it("should return status 404 Not Found if resource id not found", () => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            sinon.stub(service_mock_1.requestClient, "httpGet").resolves(service_mock_1.mockPscVerificationIndResponse[404]);
            const response = yield pscService.getPscVerification(service_mock_1.TRANSACTION_ID, service_mock_1.PSC_NOTIFICATION_ID);
            chai_1.expect(response.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.NOT_FOUND);
            chai_1.expect((_b = response.errors) === null || _b === void 0 ? void 0 : _b[0]).to.equal(http_status_codes_1.ReasonPhrases.NOT_FOUND);
        }));
        it("should return status 500 Internal Server Error if a server error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
            var _c;
            sinon.stub(service_mock_1.requestClient, "httpGet").resolves(service_mock_1.mockPscVerificationIndResponse[500]);
            const response = yield pscService.getPscVerification(service_mock_1.TRANSACTION_ID, service_mock_1.PSC_NOTIFICATION_ID);
            chai_1.expect(response.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            chai_1.expect((_c = response.errors) === null || _c === void 0 ? void 0 : _c[0]).to.equal(http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR);
        }));
    });
    mocha_1.describe("PATCH endpoint", () => {
        afterEach(sinon.restore);
        it("should return a status 200 OK and patched PSC individual verification filing", () => __awaiter(void 0, void 0, void 0, function* () {
            sinon.stub(service_mock_1.requestClient, "httpPatch").resolves(service_mock_1.mockPscVerificationPatchIndResponse[200]);
            const response = (yield pscService.patchPscVerification(service_mock_1.TRANSACTION_ID, service_mock_1.FILING_ID, service_mock_1.PSC_VERIFICATION_IND));
            chai_1.expect(response.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.OK);
            chai_1.expect(response.resource).to.eql(service_mock_1.mockPscVerificationPatchInd);
        }));
        it("should return a status 401 Unauthorised on unauthorised access", () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            sinon.stub(service_mock_1.requestClient, "httpPatch").resolves(service_mock_1.mockPscVerificationPatchIndResponse[401]);
            const response = yield pscService.patchPscVerification(service_mock_1.TRANSACTION_ID, service_mock_1.FILING_ID, service_mock_1.PSC_VERIFICATION_IND);
            chai_1.expect(response.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.UNAUTHORIZED);
            chai_1.expect((_a = response.errors) === null || _a === void 0 ? void 0 : _a[0]).to.equal(http_status_codes_1.ReasonPhrases.UNAUTHORIZED);
        }));
        it("should return a status 500 Internal Server Error when a server error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            sinon.stub(service_mock_1.requestClient, "httpPatch").resolves(service_mock_1.mockPscVerificationPatchIndResponse[500]);
            const response = yield pscService.patchPscVerification(service_mock_1.TRANSACTION_ID, service_mock_1.FILING_ID, service_mock_1.PSC_VERIFICATION_IND);
            chai_1.expect(response.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            chai_1.expect((_b = response.errors) === null || _b === void 0 ? void 0 : _b[0]).to.equal(http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR);
        }));
    });
    mocha_1.describe("Validation status GET endpoint", () => {
        it("should return status 200 OK with no errors when the validation status returns true", () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            sinon.stub(service_mock_1.requestClient, "httpGet").resolves(service_mock_1.mockGetValidationStatusResponse[200]);
            const response = (yield pscService.getValidationStatus(service_mock_1.TRANSACTION_ID, service_mock_1.PSC_NOTIFICATION_ID));
            chai_1.expect(response.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.OK);
            chai_1.expect(response.resource).to.eql(service_mock_1.mockValidationStatusResponseValid);
            chai_1.expect((_a = response.resource) === null || _a === void 0 ? void 0 : _a.errors).length.to.be.empty;
            chai_1.expect((_b = response.resource) === null || _b === void 0 ? void 0 : _b.isValid).to.eql(true);
        }));
        it("should return status 200 OK when the validation status returns false with errors", () => __awaiter(void 0, void 0, void 0, function* () {
            var _c, _d;
            sinon.stub(service_mock_1.requestClient, "httpGet").resolves(service_mock_1.mockGetValidationStatusResponseErrors[200]);
            const response = (yield pscService.getValidationStatus(service_mock_1.TRANSACTION_ID, service_mock_1.PSC_NOTIFICATION_ID));
            chai_1.expect(response.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.OK);
            chai_1.expect(response.resource).to.eql(service_mock_1.mockValidationStatusResponseErrors);
            chai_1.expect((_c = response.resource) === null || _c === void 0 ? void 0 : _c.errors).length.to.be.gt(0);
            chai_1.expect((_d = response.resource) === null || _d === void 0 ? void 0 : _d.isValid).to.eql(false);
        }));
        it("should return status 401 Unauthorised on unauthorised access", () => __awaiter(void 0, void 0, void 0, function* () {
            var _e;
            sinon.stub(service_mock_1.requestClient, "httpGet").resolves(service_mock_1.mockGetValidationStatusResponse[401]);
            const response = yield pscService.getValidationStatus(service_mock_1.TRANSACTION_ID, service_mock_1.PSC_NOTIFICATION_ID);
            chai_1.expect(response.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.UNAUTHORIZED);
            chai_1.expect((_e = response.errors) === null || _e === void 0 ? void 0 : _e[0]).to.equal(http_status_codes_1.ReasonPhrases.UNAUTHORIZED);
        }));
        it("should return status 404 Not Found if resource is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            var _f;
            sinon.stub(service_mock_1.requestClient, "httpGet").resolves(service_mock_1.mockGetValidationStatusResponse[404]);
            const response = yield pscService.getValidationStatus(service_mock_1.TRANSACTION_ID, service_mock_1.PSC_NOTIFICATION_ID);
            chai_1.expect(response.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.NOT_FOUND);
            chai_1.expect((_f = response.errors) === null || _f === void 0 ? void 0 : _f[0]).to.equal(http_status_codes_1.ReasonPhrases.NOT_FOUND);
        }));
        it("should return status 500 Internal Server Error if a server error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
            var _g;
            sinon.stub(service_mock_1.requestClient, "httpGet").resolves(service_mock_1.mockGetValidationStatusResponse[500]);
            const response = yield pscService.getValidationStatus(service_mock_1.TRANSACTION_ID, service_mock_1.PSC_NOTIFICATION_ID);
            chai_1.expect(response.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            chai_1.expect((_g = response.errors) === null || _g === void 0 ? void 0 : _g[0]).to.equal(http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR);
        }));
    });
    mocha_1.describe("checkPlannedMaintenance endpoint", () => {
        it("should return status 200 OK and Planned Maintenance resource", () => __awaiter(void 0, void 0, void 0, function* () {
            sinon.stub(service_mock_1.requestClient, "httpGet").resolves(service_mock_1.mockPlannedMaintenanceResponse[200]);
            const response = (yield pscService.checkPlannedMaintenance());
            chai_1.expect(response.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.OK);
            chai_1.expect(response.resource).to.eql(service_mock_1.mockPlannedMaintenanceResource);
        }));
        it("should return status 404 Not Found if resource not found", () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            sinon.stub(service_mock_1.requestClient, "httpGet").resolves(service_mock_1.mockPlannedMaintenanceResponse[404]);
            const response = (yield pscService.checkPlannedMaintenance());
            chai_1.expect(response.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.NOT_FOUND);
            chai_1.expect((_a = response.errors) === null || _a === void 0 ? void 0 : _a[0]).to.equal(http_status_codes_1.ReasonPhrases.NOT_FOUND);
        }));
        it("should return status 500 Internal Server Error if a server error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            sinon.stub(service_mock_1.requestClient, "httpGet").resolves(service_mock_1.mockGetValidationStatusResponse[500]);
            const response = yield pscService.getValidationStatus(service_mock_1.TRANSACTION_ID, service_mock_1.PSC_NOTIFICATION_ID);
            chai_1.expect(response.httpStatusCode).to.equal(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            chai_1.expect((_b = response.errors) === null || _b === void 0 ? void 0 : _b[0]).to.equal(http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR);
        }));
    });
});
//# sourceMappingURL=service.spec.js.map