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
const officer_filing_1 = require("../../../src/services/officer-filing");
const mockValues = __importStar(require("./officer.filing.mock"));
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const TRANSACTION_ID = "12345";
const SUBMISSION_ID = "645d1188c794645afe15f5cc";
const COMPANY_NUMBER = "00006400";
beforeEach(() => {
    sinon_1.default.reset();
    sinon_1.default.restore();
});
afterEach(done => {
    sinon_1.default.reset();
    sinon_1.default.restore();
    done();
});
describe("List active Directors details GET", () => {
    it("should return active director details object", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetListActiveDirectorsDetails[200]);
        const ofService = new officer_filing_1.OfficerFilingService(mockValues.requestClient);
        const data = yield ofService.getListActiveDirectorDetails(TRANSACTION_ID);
        chai_1.expect(data.httpStatusCode).to.equal(200);
        chai_1.expect((_a = data.resource) === null || _a === void 0 ? void 0 : _a[1].dateOfBirth).to.contain(mockValues.mockActiveDirectorDetails.date_of_birth);
    }));
    it("should return error 404 - No active director details were found", () => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetListActiveDirectorsDetails[404]);
        const ofService = new officer_filing_1.OfficerFilingService(mockValues.requestClient);
        const data = yield ofService.getListActiveDirectorDetails(TRANSACTION_ID);
        chai_1.expect(data.httpStatusCode).to.equal(404);
        chai_1.expect((_b = data.errors) === null || _b === void 0 ? void 0 : _b[0]).to.equal("No active directors details were found");
    }));
    it("should return error 500 - Internal server error", () => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetListActiveDirectorsDetails[500]);
        const ofService = new officer_filing_1.OfficerFilingService(mockValues.requestClient);
        const data = yield ofService.getListActiveDirectorDetails(TRANSACTION_ID);
        chai_1.expect(data.httpStatusCode).to.equal(500);
        chai_1.expect((_c = data.errors) === null || _c === void 0 ? void 0 : _c[0]).to.equal("Internal server error");
    }));
});
describe("List TM01 check your answers details GET", () => {
    it("should return company officer details object", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetDirectorAndTerminationDate[200]);
        const ofService = new officer_filing_1.OfficerFilingService(mockValues.requestClient);
        const data = yield ofService.getDirectorAndTerminationDate(TRANSACTION_ID, SUBMISSION_ID);
        chai_1.expect(data.httpStatusCode).to.equal(200);
        chai_1.expect((_a = data.resource) === null || _a === void 0 ? void 0 : _a.resignedOn).to.contain(mockValues.mockDirectorAndTerminationDate.resigned_on);
        chai_1.expect((_b = data.resource) === null || _b === void 0 ? void 0 : _b.dateOfBirth).to.contain(mockValues.mockDirectorAndTerminationDate.date_of_birth);
        chai_1.expect((_c = data.resource) === null || _c === void 0 ? void 0 : _c.appointedOn).to.contain(mockValues.mockDirectorAndTerminationDate.appointed_on);
        chai_1.expect((_d = data.resource) === null || _d === void 0 ? void 0 : _d.officerRole).to.contain(mockValues.mockDirectorAndTerminationDate.officer_role);
        chai_1.expect((_e = data.resource) === null || _e === void 0 ? void 0 : _e.name).to.contain(mockValues.mockDirectorAndTerminationDate.name);
    }));
    it("should return error 500 - Internal server error", () => __awaiter(void 0, void 0, void 0, function* () {
        var _f;
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetDirectorAndTerminationDate[500]);
        const ofService = new officer_filing_1.OfficerFilingService(mockValues.requestClient);
        const data = yield ofService.getDirectorAndTerminationDate(TRANSACTION_ID, SUBMISSION_ID);
        chai_1.expect(data.httpStatusCode).to.equal(500);
        chai_1.expect((_f = data.errors) === null || _f === void 0 ? void 0 : _f[0]).to.equal("Internal server error");
    }));
});
describe("Validation Status Response GET", () => {
    it("should return list of error/s and validation status", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetValidationStatusResponse[200]);
        const ofService = new officer_filing_1.OfficerFilingService(mockValues.requestClient);
        const data = yield ofService.getValidationStatus(TRANSACTION_ID, SUBMISSION_ID);
        chai_1.expect(data.httpStatusCode).to.equal(200);
        chai_1.expect((_a = data.resource) === null || _a === void 0 ? void 0 : _a.errors[0].error).to.equal("European public limited liability company (SE) not permitted");
        chai_1.expect((_b = data.resource) === null || _b === void 0 ? void 0 : _b.errors[0].locationType).to.equal("json-path");
        chai_1.expect((_c = data.resource) === null || _c === void 0 ? void 0 : _c.isValid).to.equal(false);
    }));
    it("should return error 404 - No found", () => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetValidationStatusResponse[404]);
        const ofService = new officer_filing_1.OfficerFilingService(mockValues.requestClient);
        const data = yield ofService.getValidationStatus(TRANSACTION_ID, SUBMISSION_ID);
        chai_1.expect(data.httpStatusCode).to.equal(404);
        chai_1.expect((_d = data.errors) === null || _d === void 0 ? void 0 : _d[0]).to.equal("Not Found");
    }));
    it("should return error 500 - Internal server error", () => __awaiter(void 0, void 0, void 0, function* () {
        var _e;
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetCurrentOrFutureDissolved[500]);
        const ofService = new officer_filing_1.OfficerFilingService(mockValues.requestClient);
        const data = yield ofService.getValidationStatus(TRANSACTION_ID, SUBMISSION_ID);
        chai_1.expect(data.httpStatusCode).to.equal(500);
        chai_1.expect((_e = data.errors) === null || _e === void 0 ? void 0 : _e[0]).to.equal("Internal server error");
    }));
});
describe("Officer Filing GET", () => {
    it("should return an officer filing", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetOfficerFiling[200]);
        const ofService = new officer_filing_1.OfficerFilingService(mockValues.requestClient);
        const data = yield ofService.getOfficerFiling(TRANSACTION_ID, SUBMISSION_ID);
        chai_1.expect(data.httpStatusCode).to.equal(200);
        chai_1.expect((_a = data.resource) === null || _a === void 0 ? void 0 : _a.referenceAppointmentId).to.equal("app1");
        chai_1.expect((_b = data.resource) === null || _b === void 0 ? void 0 : _b.referenceEtag).to.equal("968ada7234bb1eb65778ca4c83a4a42d36669a17");
        chai_1.expect((_c = data.resource) === null || _c === void 0 ? void 0 : _c.resignedOn).to.equal("2009-08-29");
    }));
    it("should return error 404 - Not found", () => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetOfficerFiling[404]);
        const ofService = new officer_filing_1.OfficerFilingService(mockValues.requestClient);
        const data = yield ofService.getOfficerFiling(TRANSACTION_ID, SUBMISSION_ID);
        chai_1.expect(data.httpStatusCode).to.equal(404);
        chai_1.expect((_d = data.errors) === null || _d === void 0 ? void 0 : _d[0]).to.equal("Officer filing not found");
    }));
    it("should return error 500 - Internal server error", () => __awaiter(void 0, void 0, void 0, function* () {
        var _e;
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetOfficerFiling[500]);
        const ofService = new officer_filing_1.OfficerFilingService(mockValues.requestClient);
        const data = yield ofService.getOfficerFiling(TRANSACTION_ID, SUBMISSION_ID);
        chai_1.expect(data.httpStatusCode).to.equal(500);
        chai_1.expect((_e = data.errors) === null || _e === void 0 ? void 0 : _e[0]).to.equal("Internal server error");
    }));
});
describe("Officer Filing POST", () => {
    it("should return an officer filing", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        sinon_1.default.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockPostOfficerFiling[200]);
        const ofService = new officer_filing_1.OfficerFilingService(mockValues.requestClient);
        const data = yield ofService.postOfficerFiling(TRANSACTION_ID, {});
        chai_1.expect(data.httpStatusCode).to.equal(200);
        chai_1.expect((_a = data.resource) === null || _a === void 0 ? void 0 : _a.id).to.equal("567");
        chai_1.expect((_c = (_b = data.resource) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.description).to.equal("Update a Director");
    }));
    it("should return error 404 - Not found", () => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
        sinon_1.default.stub(mockValues.requestClient, "httpPatch").resolves(mockValues.mockPatchOfficerFiling[404]);
        const ofService = new officer_filing_1.OfficerFilingService(mockValues.requestClient);
        const data = yield ofService.patchOfficerFiling(TRANSACTION_ID, SUBMISSION_ID, {});
        chai_1.expect(data.httpStatusCode).to.equal(404);
        chai_1.expect((_d = data.errors) === null || _d === void 0 ? void 0 : _d[0]).to.equal("Officer filing not found");
    }));
    it("should return error 500 - Internal server error", () => __awaiter(void 0, void 0, void 0, function* () {
        var _e;
        sinon_1.default.stub(mockValues.requestClient, "httpPatch").resolves(mockValues.mockPatchOfficerFiling[500]);
        const ofService = new officer_filing_1.OfficerFilingService(mockValues.requestClient);
        const data = yield ofService.patchOfficerFiling(TRANSACTION_ID, SUBMISSION_ID, {});
        chai_1.expect(data.httpStatusCode).to.equal(500);
        chai_1.expect((_e = data.errors) === null || _e === void 0 ? void 0 : _e[0]).to.equal("Internal server error");
    }));
});
describe("Officer Filing PATCH", () => {
    it("should return an officer filing", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        sinon_1.default.stub(mockValues.requestClient, "httpPatch").resolves(mockValues.mockPatchOfficerFiling[200]);
        const ofService = new officer_filing_1.OfficerFilingService(mockValues.requestClient);
        const data = yield ofService.patchOfficerFiling(TRANSACTION_ID, SUBMISSION_ID, {});
        chai_1.expect(data.httpStatusCode).to.equal(200);
        chai_1.expect((_a = data.resource) === null || _a === void 0 ? void 0 : _a.id).to.equal("123");
        chai_1.expect((_c = (_b = data.resource) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.description).to.equal("Appoint a new Director");
    }));
    it("should return error 404 - Not found", () => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
        sinon_1.default.stub(mockValues.requestClient, "httpPatch").resolves(mockValues.mockPatchOfficerFiling[404]);
        const ofService = new officer_filing_1.OfficerFilingService(mockValues.requestClient);
        const data = yield ofService.patchOfficerFiling(TRANSACTION_ID, SUBMISSION_ID, {});
        chai_1.expect(data.httpStatusCode).to.equal(404);
        chai_1.expect((_d = data.errors) === null || _d === void 0 ? void 0 : _d[0]).to.equal("Officer filing not found");
    }));
    it("should return error 500 - Internal server error", () => __awaiter(void 0, void 0, void 0, function* () {
        var _e;
        sinon_1.default.stub(mockValues.requestClient, "httpPatch").resolves(mockValues.mockPatchOfficerFiling[500]);
        const ofService = new officer_filing_1.OfficerFilingService(mockValues.requestClient);
        const data = yield ofService.patchOfficerFiling(TRANSACTION_ID, SUBMISSION_ID, {});
        chai_1.expect(data.httpStatusCode).to.equal(500);
        chai_1.expect((_e = data.errors) === null || _e === void 0 ? void 0 : _e[0]).to.equal("Internal server error");
    }));
});
//# sourceMappingURL=officer.filing.spec.js.map