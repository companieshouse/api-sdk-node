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
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const mockValues = __importStar(require("./limited.partnerships.mock"));
const limited_partnerships_1 = require("../../../src/services/limited-partnerships");
mocha_1.describe("LimitedPartnershipsService", () => {
    beforeEach(() => {
        sinon_1.default.reset();
        sinon_1.default.restore();
    });
    afterEach((done) => {
        sinon_1.default.reset();
        sinon_1.default.restore();
        done();
    });
    mocha_1.describe("LimitedPartnership", () => {
        mocha_1.describe("postLimitedPartnership", () => {
            it("should return object Id for postLimitedPartnership method", () => __awaiter(void 0, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                const mockRequest = sinon_1.default
                    .stub(mockValues.requestClient, "httpPost")
                    .resolves(mockValues.mockPostLimitedPartnershipResponse[201]);
                const service = new limited_partnerships_1.LimitedPartnershipsService(mockValues.requestClient);
                const response = (yield service.postLimitedPartnership(mockValues.TRANSACTION_ID, {
                    data: {
                        partnership_name: (_a = mockValues.LIMITED_PARTNERSHIP_OBJECT_MOCK.data) === null || _a === void 0 ? void 0 : _a.partnership_name,
                        name_ending: (_b = mockValues.LIMITED_PARTNERSHIP_OBJECT_MOCK.data) === null || _b === void 0 ? void 0 : _b.name_ending,
                        partnership_type: (_c = mockValues.LIMITED_PARTNERSHIP_OBJECT_MOCK.data) === null || _c === void 0 ? void 0 : _c.partnership_type
                    }
                }));
                chai_1.expect(mockRequest).to.have.been.calledOnce;
                chai_1.expect(mockRequest.calledWith("/transactions/12345/limited-partnership/partnership", {
                    data: {
                        partnership_name: "Legalised Asset Stashing",
                        name_ending: "Limited Partnership",
                        partnership_type: "LP"
                    }
                })).to.be.true;
                chai_1.expect(response.httpStatusCode).to.equal(201);
                chai_1.expect((_d = response.resource) === null || _d === void 0 ? void 0 : _d.id).to.equal(mockValues.mockLimitedPartnershipCreatedResource.id);
            }));
            it("should return error 401 (Unauthorised) for postLimitedPartnership method", () => __awaiter(void 0, void 0, void 0, function* () {
                const mockRequest = sinon_1.default
                    .stub(mockValues.requestClient, "httpPost")
                    .resolves(mockValues.mockPostLimitedPartnershipResponse[401]);
                const service = new limited_partnerships_1.LimitedPartnershipsService(mockValues.requestClient);
                const response = (yield service.postLimitedPartnership(mockValues.TRANSACTION_ID, { data: {} }));
                chai_1.expect(mockRequest).to.have.been.calledOnce;
                chai_1.expect(mockRequest.calledWith("/transactions/12345/limited-partnership/partnership", { data: {} })).to.be.true;
                chai_1.expect(response.httpStatusCode).to.equal(401);
                chai_1.expect(response.resource.error).to.equal(mockValues.UNAUTHORISED);
            }));
            it("should return error 400 (Bad Request) for postLimitedPartnership method", () => __awaiter(void 0, void 0, void 0, function* () {
                const mockRequest = sinon_1.default
                    .stub(mockValues.requestClient, "httpPost")
                    .resolves(mockValues.mockPostLimitedPartnershipResponse[400]);
                const service = new limited_partnerships_1.LimitedPartnershipsService(mockValues.requestClient);
                const response = (yield service.postLimitedPartnership(mockValues.TRANSACTION_ID, { data: { name_ending: limited_partnerships_1.NameEndingType.LP } }));
                chai_1.expect(mockRequest).to.have.been.calledOnce;
                chai_1.expect(mockRequest.calledWith("/transactions/12345/limited-partnership/partnership", { data: { name_ending: limited_partnerships_1.NameEndingType.LP } })).to.be.true;
                chai_1.expect(response.httpStatusCode).to.equal(400);
                chai_1.expect(response.resource.error).to.equal(mockValues.BAD_REQUEST);
            }));
        });
        mocha_1.describe("patchLimitedPartnership", () => {
            it("should return a status 200", () => __awaiter(void 0, void 0, void 0, function* () {
                const mockRequest = sinon_1.default
                    .stub(mockValues.requestClient, "httpPatch")
                    .resolves(mockValues.mockPostLimitedPartnershipResponse[200]);
                const service = new limited_partnerships_1.LimitedPartnershipsService(mockValues.requestClient);
                const response = yield service.patchLimitedPartnership(mockValues.TRANSACTION_ID, mockValues.SUBMISSION_ID, mockValues.LIMITED_PARTNERSHIP_OBJECT_MOCK.data);
                chai_1.expect(mockRequest).to.have.been.calledOnce;
                chai_1.expect(mockRequest.calledWith("/transactions/12345/limited-partnership/partnership/09876", mockValues.LIMITED_PARTNERSHIP_OBJECT_MOCK.data)).to.be.true;
                chai_1.expect(response.httpStatusCode).to.equal(200);
            }));
            it("should return error 400 (Bad Request)", () => __awaiter(void 0, void 0, void 0, function* () {
                const mockRequest = sinon_1.default
                    .stub(mockValues.requestClient, "httpPatch")
                    .resolves(mockValues.mockPostLimitedPartnershipResponse[400]);
                const service = new limited_partnerships_1.LimitedPartnershipsService(mockValues.requestClient);
                const response = yield service.patchLimitedPartnership(mockValues.TRANSACTION_ID, mockValues.SUBMISSION_ID, {
                    email: "testemail.com"
                });
                chai_1.expect(mockRequest).to.have.been.calledOnce;
                chai_1.expect(mockRequest.calledWith("/transactions/12345/limited-partnership/partnership/09876", {
                    email: "testemail.com"
                })).to.be.true;
                chai_1.expect(response.httpStatusCode).to.equal(400);
                chai_1.expect(response.resource.error).to.equal(mockValues.BAD_REQUEST);
            }));
        });
        mocha_1.describe("getLimitedPartnership", () => {
            it("should return a status 200 and the limitedPartnership object", () => __awaiter(void 0, void 0, void 0, function* () {
                const mockRequest = sinon_1.default
                    .stub(mockValues.requestClient, "httpGet")
                    .resolves(mockValues.mockGetLimitedPartnershipResponse[200]);
                const service = new limited_partnerships_1.LimitedPartnershipsService(mockValues.requestClient);
                const response = yield service.getLimitedPartnership(mockValues.TRANSACTION_ID, mockValues.SUBMISSION_ID);
                chai_1.expect(mockRequest).to.have.been.calledOnce;
                chai_1.expect(mockRequest.calledWith("/transactions/12345/limited-partnership/partnership/09876")).to.be.true;
                chai_1.expect(response.httpStatusCode).to.equal(200);
                chai_1.expect(response === null || response === void 0 ? void 0 : response.resource).to.eql(mockValues.LIMITED_PARTNERSHIP_OBJECT_MOCK);
            }));
            it("should return error 401 (Unauthorised)", () => __awaiter(void 0, void 0, void 0, function* () {
                const mockRequest = sinon_1.default
                    .stub(mockValues.requestClient, "httpGet")
                    .resolves(mockValues.mockGetLimitedPartnershipResponse[401]);
                const service = new limited_partnerships_1.LimitedPartnershipsService(mockValues.requestClient);
                const response = (yield service.getLimitedPartnership(mockValues.TRANSACTION_ID, mockValues.SUBMISSION_ID));
                chai_1.expect(mockRequest).to.have.been.calledOnce;
                chai_1.expect(mockRequest.calledWith("/transactions/12345/limited-partnership/partnership/09876")).to.be.true;
                chai_1.expect(response.httpStatusCode).to.equal(401);
                chai_1.expect(response.resource.error).to.equal(mockValues.UNAUTHORISED);
            }));
            it("should return error 404 (Not Found)", () => __awaiter(void 0, void 0, void 0, function* () {
                const mockRequest = sinon_1.default
                    .stub(mockValues.requestClient, "httpGet")
                    .resolves(mockValues.mockGetLimitedPartnershipResponse[404]);
                const service = new limited_partnerships_1.LimitedPartnershipsService(mockValues.requestClient);
                const response = (yield service.getLimitedPartnership(mockValues.TRANSACTION_ID, "wrong-id"));
                chai_1.expect(mockRequest).to.have.been.calledOnce;
                chai_1.expect(mockRequest.calledWith("/transactions/12345/limited-partnership/partnership/wrong-id")).to.be.true;
                chai_1.expect(response.httpStatusCode).to.equal(404);
                chai_1.expect(response.resource.error).to.equal(mockValues.NOT_FOUND);
            }));
        });
    });
    mocha_1.describe("Incorporation", () => {
        mocha_1.describe("postLimitedPartnershipIncorporation", () => {
            it("should return object Id for postLimitedPartnershipIncorporation method", () => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                const mockRequest = sinon_1.default
                    .stub(mockValues.requestClient, "httpPost")
                    .resolves(mockValues.mockPostLimitedPartnershipIncorporationResponse[201]);
                const service = new limited_partnerships_1.LimitedPartnershipsService(mockValues.requestClient);
                const response = (yield service.postLimitedPartnershipIncorporation(mockValues.TRANSACTION_ID, mockValues.INCORPORATION_OBJECT_MOCK));
                chai_1.expect(mockRequest).to.have.been.calledOnce;
                chai_1.expect(mockRequest.calledWith("/transactions/12345/incorporation/limited-partnership")).to.be.true;
                chai_1.expect(response.httpStatusCode).to.equal(201);
                chai_1.expect((_a = response.resource) === null || _a === void 0 ? void 0 : _a.id).to.equal(mockValues.mockLimitedPartnershipCreatedResource.id);
            }));
            it("should return error 400 (Bad Request) for postLimitedPartnershipIncorporation method", () => __awaiter(void 0, void 0, void 0, function* () {
                const mockRequest = sinon_1.default
                    .stub(mockValues.requestClient, "httpPost")
                    .resolves(mockValues.mockPostLimitedPartnershipIncorporationResponse[400]);
                const service = new limited_partnerships_1.LimitedPartnershipsService(mockValues.requestClient);
                const response = (yield service.postLimitedPartnershipIncorporation(mockValues.TRANSACTION_ID, mockValues.INCORPORATION_OBJECT_MOCK));
                chai_1.expect(mockRequest).to.have.been.calledOnce;
                chai_1.expect(mockRequest.calledWith("/transactions/12345/incorporation/limited-partnership")).to.be.true;
                chai_1.expect(response.httpStatusCode).to.equal(400);
                chai_1.expect(response.resource.error).to.equal(mockValues.BAD_REQUEST);
            }));
            it("should return error 401 (Unauthorised) for postLimitedPartnershipIncorporation method", () => __awaiter(void 0, void 0, void 0, function* () {
                const mockRequest = sinon_1.default
                    .stub(mockValues.requestClient, "httpPost")
                    .resolves(mockValues.mockPostLimitedPartnershipIncorporationResponse[401]);
                const service = new limited_partnerships_1.LimitedPartnershipsService(mockValues.requestClient);
                const response = (yield service.postLimitedPartnershipIncorporation(mockValues.TRANSACTION_ID, mockValues.INCORPORATION_OBJECT_MOCK));
                chai_1.expect(mockRequest).to.have.been.calledOnce;
                chai_1.expect(mockRequest.calledWith("/transactions/12345/incorporation/limited-partnership")).to.be.true;
                chai_1.expect(response.httpStatusCode).to.equal(401);
                chai_1.expect(response.resource.error).to.equal(mockValues.UNAUTHORISED);
            }));
        });
        mocha_1.describe("getLimitedPartnershipIncorporation", () => {
            it("should return a status 200 and the limitedPartnershipIncorporation object no query no sub resources", () => __awaiter(void 0, void 0, void 0, function* () {
                const mockRequest = sinon_1.default
                    .stub(mockValues.requestClient, "httpGet")
                    .resolves(mockValues.mockGetLimitedPartnershipIncorporationResponse[200]);
                const service = new limited_partnerships_1.LimitedPartnershipsService(mockValues.requestClient);
                const response = yield service.getLimitedPartnershipIncorporation(mockValues.TRANSACTION_ID, mockValues.FILE_RESOURCE_ID);
                chai_1.expect(mockRequest).to.have.been.calledOnce;
                chai_1.expect(mockRequest.calledWith("/transactions/12345/incorporation/limited-partnership/a1b2c3")).to.be.true;
                chai_1.expect(response.httpStatusCode).to.equal(200);
                chai_1.expect(response === null || response === void 0 ? void 0 : response.resource).to.eql(mockValues.LIMITED_PARTNERSHIP_INCORPORATION_OBJECT_MOCK);
            }));
            it("should return a status 200 and the limitedPartnershipIncorporation object false query no sub resources", () => __awaiter(void 0, void 0, void 0, function* () {
                const mockRequest = sinon_1.default
                    .stub(mockValues.requestClient, "httpGet")
                    .resolves(mockValues.mockGetLimitedPartnershipIncorporationResponse[200]);
                const service = new limited_partnerships_1.LimitedPartnershipsService(mockValues.requestClient);
                const response = yield service.getLimitedPartnershipIncorporation(mockValues.TRANSACTION_ID, mockValues.FILE_RESOURCE_ID, false);
                chai_1.expect(mockRequest).to.have.been.calledOnce;
                chai_1.expect(mockRequest.calledWith("/transactions/12345/incorporation/limited-partnership/a1b2c3")).to.be.true;
                chai_1.expect(response.httpStatusCode).to.equal(200);
                chai_1.expect(response === null || response === void 0 ? void 0 : response.resource).to.eql(mockValues.LIMITED_PARTNERSHIP_INCORPORATION_OBJECT_MOCK);
            }));
            it("should return a status 200 and the limitedPartnershipIncorporation object true query returns sub resources", () => __awaiter(void 0, void 0, void 0, function* () {
                const mockRequest = sinon_1.default
                    .stub(mockValues.requestClient, "httpGet")
                    .resolves(mockValues.mockGetLimitedPartnershipIncorporationResponseWithSub[200]);
                const service = new limited_partnerships_1.LimitedPartnershipsService(mockValues.requestClient);
                const response = yield service.getLimitedPartnershipIncorporation(mockValues.TRANSACTION_ID, mockValues.FILE_RESOURCE_ID, true);
                chai_1.expect(mockRequest).to.have.been.calledOnce;
                chai_1.expect(mockRequest.calledWith("/transactions/12345/incorporation/limited-partnership/a1b2c3?include_sub_resources=true")).to.be.true;
                chai_1.expect(response.httpStatusCode).to.equal(200);
                chai_1.expect(response === null || response === void 0 ? void 0 : response.resource).to.eql(mockValues.LIMITED_PARTNERSHIP_INCORPORATION_OBJECT_MOCK_WITH_SUB);
            }));
            it("should return error 401 (Unauthorised)", () => __awaiter(void 0, void 0, void 0, function* () {
                const mockRequest = sinon_1.default
                    .stub(mockValues.requestClient, "httpGet")
                    .resolves(mockValues.mockGetLimitedPartnershipIncorporationResponse[401]);
                const service = new limited_partnerships_1.LimitedPartnershipsService(mockValues.requestClient);
                const response = (yield service.getLimitedPartnershipIncorporation(mockValues.TRANSACTION_ID, mockValues.FILE_RESOURCE_ID));
                chai_1.expect(mockRequest).to.have.been.calledOnce;
                chai_1.expect(mockRequest.calledWith("/transactions/12345/incorporation/limited-partnership/a1b2c3")).to.be.true;
                chai_1.expect(response.httpStatusCode).to.equal(401);
                chai_1.expect(response.resource.error).to.equal(mockValues.UNAUTHORISED);
            }));
            it("should return error 404 (Not Found)", () => __awaiter(void 0, void 0, void 0, function* () {
                const mockRequest = sinon_1.default
                    .stub(mockValues.requestClient, "httpGet")
                    .resolves(mockValues.mockGetLimitedPartnershipIncorporationResponse[404]);
                const service = new limited_partnerships_1.LimitedPartnershipsService(mockValues.requestClient);
                const response = (yield service.getLimitedPartnershipIncorporation(mockValues.TRANSACTION_ID, "wrong-id"));
                chai_1.expect(mockRequest).to.have.been.calledOnce;
                chai_1.expect(mockRequest.calledWith("/transactions/12345/incorporation/limited-partnership/wrong-id")).to.be.true;
                chai_1.expect(response.httpStatusCode).to.equal(404);
                chai_1.expect(response.resource.error).to.equal(mockValues.NOT_FOUND);
            }));
        });
    });
    mocha_1.describe("GeneralPartner", () => {
        mocha_1.describe("postGeneralPartner", () => {
            it("should return object Id for postGeneralPartner method", () => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                const mockRequest = sinon_1.default
                    .stub(mockValues.requestClient, "httpPost")
                    .resolves(mockValues.mockPostGeneralPartnerResponse[201]);
                const service = new limited_partnerships_1.LimitedPartnershipsService(mockValues.requestClient);
                const response = (yield service.postGeneralPartner(mockValues.TRANSACTION_ID, mockValues.GENERAL_PARTNER_OBJECT_MOCK));
                chai_1.expect(mockRequest).to.have.been.calledOnce;
                chai_1.expect(mockRequest.calledWith("/transactions/12345/limited-partnership/general-partner", mockValues.GENERAL_PARTNER_OBJECT_MOCK)).to.be.true;
                chai_1.expect(response.httpStatusCode).to.equal(201);
                chai_1.expect((_a = response.resource) === null || _a === void 0 ? void 0 : _a.id).to.equal(mockValues.mockLimitedPartnershipCreatedResource.id);
            }));
            it("should return error 400 (Bad Request)", () => __awaiter(void 0, void 0, void 0, function* () {
                const mockRequest = sinon_1.default
                    .stub(mockValues.requestClient, "httpPost")
                    .resolves(mockValues.mockPostGeneralPartnerResponse[400]);
                const service = new limited_partnerships_1.LimitedPartnershipsService(mockValues.requestClient);
                const response = (yield service.postGeneralPartner(mockValues.TRANSACTION_ID, {}));
                chai_1.expect(mockRequest).to.have.been.calledOnce;
                chai_1.expect(mockRequest.calledWith("/transactions/12345/limited-partnership/general-partner", {})).to.be.true;
                chai_1.expect(response.httpStatusCode).to.equal(400);
            }));
        });
    });
    mocha_1.describe("getGeneralPartner", () => {
        it("should return a status 200 and the generalPartner object", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockRequest = sinon_1.default
                .stub(mockValues.requestClient, "httpGet")
                .resolves(mockValues.mockGetGeneralPartnerResponse[200]);
            const service = new limited_partnerships_1.LimitedPartnershipsService(mockValues.requestClient);
            const response = yield service.getGeneralPartner(mockValues.TRANSACTION_ID, mockValues.SUBMISSION_ID);
            chai_1.expect(mockRequest).to.have.been.calledOnce;
            chai_1.expect(mockRequest.calledWith("/transactions/12345/limited-partnership/general-partner/09876")).to.be.true;
            chai_1.expect(response.httpStatusCode).to.equal(200);
            chai_1.expect(response === null || response === void 0 ? void 0 : response.resource).to.eql(mockValues.GENERAL_PARTNER_OBJECT_MOCK);
        }));
        it("should return error 401 (Unauthorised)", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockRequest = sinon_1.default
                .stub(mockValues.requestClient, "httpGet")
                .resolves(mockValues.mockGetGeneralPartnerResponse[401]);
            const service = new limited_partnerships_1.LimitedPartnershipsService(mockValues.requestClient);
            const response = (yield service.getGeneralPartner(mockValues.TRANSACTION_ID, mockValues.SUBMISSION_ID));
            chai_1.expect(mockRequest).to.have.been.calledOnce;
            chai_1.expect(mockRequest.calledWith("/transactions/12345/limited-partnership/general-partner/09876")).to.be.true;
            chai_1.expect(response.httpStatusCode).to.equal(401);
            chai_1.expect(response.resource.error).to.equal(mockValues.UNAUTHORISED);
        }));
        it("should return error 404 (Not Found)", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockRequest = sinon_1.default
                .stub(mockValues.requestClient, "httpGet")
                .resolves(mockValues.mockGetGeneralPartnerResponse[404]);
            const service = new limited_partnerships_1.LimitedPartnershipsService(mockValues.requestClient);
            const response = (yield service.getGeneralPartner(mockValues.TRANSACTION_ID, "wrong-id"));
            chai_1.expect(mockRequest).to.have.been.calledOnce;
            chai_1.expect(mockRequest.calledWith("/transactions/12345/limited-partnership/general-partner/wrong-id")).to.be.true;
            chai_1.expect(response.httpStatusCode).to.equal(404);
            chai_1.expect(response.resource.error).to.equal(mockValues.NOT_FOUND);
        }));
    });
    mocha_1.describe("patchGeneralPartner", () => {
        it("should return 200 patchGeneralPartner method", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockRequest = sinon_1.default
                .stub(mockValues.requestClient, "httpPatch")
                .resolves(mockValues.mockPatchGeneralPartnerResponse[200]);
            const service = new limited_partnerships_1.LimitedPartnershipsService(mockValues.requestClient);
            const response = (yield service.patchGeneralPartner(mockValues.TRANSACTION_ID, mockValues.GENERAL_PARTNER_ID, mockValues.GENERAL_PARTNER_OBJECT_MOCK.data));
            chai_1.expect(mockRequest).to.have.been.calledOnce;
            chai_1.expect(mockRequest.calledWith("/transactions/12345/limited-partnership/general-partner/00112233", mockValues.GENERAL_PARTNER_OBJECT_MOCK.data)).to.be.true;
            chai_1.expect(response.httpStatusCode).to.equal(200);
        }));
        it("should return error 400 (Bad Request)", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockRequest = sinon_1.default
                .stub(mockValues.requestClient, "httpPatch")
                .resolves(mockValues.mockPatchGeneralPartnerResponse[400]);
            const service = new limited_partnerships_1.LimitedPartnershipsService(mockValues.requestClient);
            const response = (yield service.patchGeneralPartner(mockValues.TRANSACTION_ID, mockValues.GENERAL_PARTNER_ID, {}));
            chai_1.expect(mockRequest).to.have.been.calledOnce;
            chai_1.expect(mockRequest.calledWith("/transactions/12345/limited-partnership/general-partner/00112233", {})).to.be.true;
            chai_1.expect(response.httpStatusCode).to.equal(400);
        }));
    });
});
//# sourceMappingURL=limited.partnerships.spec.js.map