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
const acsp_1 = require("../../../src/services/acsp");
const mockValues = __importStar(require("./acsp.mock"));
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const TRANSACTION_ID = "12345";
const SUBMISSION_ID = "645d1188c794645afe15f5cc";
beforeEach(() => {
    sinon_1.default.reset();
    sinon_1.default.restore();
});
afterEach(done => {
    sinon_1.default.reset();
    sinon_1.default.restore();
    done();
});
describe("Acsp Registration GET", () => {
    it("should return an Acsp registration", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetAcsp[200]);
        const ofService = new acsp_1.AcspService(mockValues.requestClient);
        const data = yield ofService.getAcsp(TRANSACTION_ID, SUBMISSION_ID);
        chai_1.expect(data.httpStatusCode).to.equal(200);
        chai_1.expect(data.resource).to.deep.equal(mockValues.mockAcsp);
    }));
    it("should return error 404 - Not found", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetAcsp[404]);
        const ofService = new acsp_1.AcspService(mockValues.requestClient);
        const data = yield ofService.getAcsp(TRANSACTION_ID, SUBMISSION_ID);
        chai_1.expect(data.httpStatusCode).to.equal(404);
        chai_1.expect((_a = data.errors) === null || _a === void 0 ? void 0 : _a[0]).to.equal("Acsp registration not found");
    }));
    it("should return error 500 - Internal server error", () => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetAcsp[500]);
        const ofService = new acsp_1.AcspService(mockValues.requestClient);
        const data = yield ofService.getAcsp(TRANSACTION_ID, SUBMISSION_ID);
        chai_1.expect(data.httpStatusCode).to.equal(500);
        chai_1.expect((_b = data.errors) === null || _b === void 0 ? void 0 : _b[0]).to.equal("Internal server error");
    }));
});
describe("Acsp Registration POST", () => {
    it("should return an Acsp registration", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockPostAcsp[200]);
        const ofService = new acsp_1.AcspService(mockValues.requestClient);
        const data = yield ofService.postACSP(TRANSACTION_ID, mockValues.mockAcspResponce);
        chai_1.expect(data.httpStatusCode).to.equal(200);
    }));
    it("should return error 409 - Document already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        sinon_1.default.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockPostAcsp[409]);
        const ofService = new acsp_1.AcspService(mockValues.requestClient);
        const data = yield ofService.postACSP(TRANSACTION_ID, mockValues.mockAcsp);
        chai_1.expect(data.httpStatusCode).to.equal(409);
        chai_1.expect((_a = data.errors) === null || _a === void 0 ? void 0 : _a[0]).to.equal("A document already exist with this id");
    }));
});
describe("Acsp Registration PUT", () => {
    it("should return an Acsp registration", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpPut").resolves(mockValues.mockPutAcsp[200]);
        const ofService = new acsp_1.AcspService(mockValues.requestClient);
        const data = yield ofService.putACSP(TRANSACTION_ID, SUBMISSION_ID, mockValues.mockAcspResponce);
        chai_1.expect(data.httpStatusCode).to.equal(200);
    }));
    it("should return error 404 - Not found", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        sinon_1.default.stub(mockValues.requestClient, "httpPut").resolves(mockValues.mockPutAcsp[404]);
        const ofService = new acsp_1.AcspService(mockValues.requestClient);
        const data = yield ofService.putACSP(TRANSACTION_ID, SUBMISSION_ID, mockValues.mockAcsp);
        chai_1.expect(data.httpStatusCode).to.equal(404);
        chai_1.expect((_a = data.errors) === null || _a === void 0 ? void 0 : _a[0]).to.equal("Acsp registration not found");
    }));
});
describe("Acsp Registration DELETE", () => {
    it("should return 204 on successful delete", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpDelete").resolves(mockValues.mockDeleteAcsp[204]);
        const ofService = new acsp_1.AcspService(mockValues.requestClient);
        const data = yield ofService.deleteSavedApplication(TRANSACTION_ID, SUBMISSION_ID);
        chai_1.expect(data.status).to.equal(204);
    }));
    it("should return 404 if no application exists", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpDelete").resolves(mockValues.mockDeleteAcsp[404]);
        const ofService = new acsp_1.AcspService(mockValues.requestClient);
        const data = yield ofService.deleteSavedApplication(TRANSACTION_ID, SUBMISSION_ID);
        chai_1.expect(data.status).to.equal(404);
    }));
});
describe("ACSP Verifiy a client send confirmation email", () => __awaiter(void 0, void 0, void 0, function* () {
    it("should return 200 on successful email send", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockSendEmail[200]);
        const ofService = new acsp_1.AcspService(mockValues.requestClient);
        const data = yield ofService.sendIdentityVerificationEmail(mockValues.mockClientVerificationEmail);
        chai_1.expect(data.status).to.equal(200);
    }));
    it("should return 500 if email fails", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockSendEmail[500]);
        const ofService = new acsp_1.AcspService(mockValues.requestClient);
        const data = yield ofService.sendIdentityVerificationEmail(mockValues.mockClientVerificationEmail);
        chai_1.expect(data.status).to.equal(500);
    }));
}));
//# sourceMappingURL=acsp.spec.js.map