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
const mockValues = __importStar(require("./overseas.entities.mock"));
const mapping_1 = __importDefault(require("../../../src/mapping/mapping"));
const overseas_entities_mock_1 = require("./overseas.entities.mock");
const mapping_2 = require("../../../src/services/overseas-entities/mapping");
const overseas_entities_1 = require("../../../src/services/overseas-entities");
mocha_1.describe("OverseasEntityService POST Tests suite", () => {
    beforeEach(() => {
        sinon_1.default.reset();
        sinon_1.default.restore();
    });
    afterEach(done => {
        sinon_1.default.reset();
        sinon_1.default.restore();
        done();
    });
    it("should return object Id for postOverseasEntity method", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        sinon_1.default.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockPostOverseasEntityResponse[201]);
        const oeService = new overseas_entities_1.OverseasEntityService(mockValues.requestClient);
        const data = (yield oeService.postOverseasEntity(mockValues.TRANSACTION_ID, mockValues.OVERSEAS_ENTITY_OBJECT_MOCK));
        chai_1.expect(data.httpStatusCode).to.equal(201);
        chai_1.expect((_a = data.resource) === null || _a === void 0 ? void 0 : _a.id).to.equal(mockValues.mockOverseasEntityCreatedResource.id);
    }));
    it("should return error 401 (Unauthorised) for postOverseasEntity method", () => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        sinon_1.default.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockPostOverseasEntityResponse[401]);
        const oeService = new overseas_entities_1.OverseasEntityService(mockValues.requestClient);
        const data = yield oeService.postOverseasEntity(mockValues.TRANSACTION_ID, {});
        chai_1.expect(data.httpStatusCode).to.equal(401);
        chai_1.expect((_b = data.errors) === null || _b === void 0 ? void 0 : _b[0]).to.equal(mockValues.UNAUTHORISED);
    }));
    it("should return error 400 (Bad Request) for postOverseasEntity method", () => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        sinon_1.default.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockPostOverseasEntityResponse[400]);
        const oeService = new overseas_entities_1.OverseasEntityService(mockValues.requestClient);
        const data = yield oeService.postOverseasEntity(mockValues.TRANSACTION_ID, {});
        chai_1.expect(data.httpStatusCode).to.equal(400);
        chai_1.expect((_c = data.errors) === null || _c === void 0 ? void 0 : _c[0]).to.equal(mockValues.BAD_REQUEST);
    }));
});
mocha_1.describe("OverseasEntityService PUT Tests suite", () => {
    beforeEach(() => {
        sinon_1.default.reset();
        sinon_1.default.restore();
    });
    it("should return httpStatusCode 200 for putOverseasEntity method", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpPut").resolves(mockValues.mockPutOverseasEntityResponse[200]);
        const oeService = new overseas_entities_1.OverseasEntityService(mockValues.requestClient);
        const data = (yield oeService.putOverseasEntity(mockValues.TRANSACTION_ID, mockValues.OVERSEAS_ENTITY_ID, mockValues.OVERSEAS_ENTITY_OBJECT_MOCK));
        chai_1.expect(data.httpStatusCode).to.equal(200);
    }));
    it("should return error 400 (Bad Request) for putOverseasEntity method", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpPut").resolves(mockValues.mockPutOverseasEntityResponse[400]);
        const oeService = new overseas_entities_1.OverseasEntityService(mockValues.requestClient);
        const data = yield oeService.putOverseasEntity(mockValues.TRANSACTION_ID, mockValues.OVERSEAS_ENTITY_ID, {});
        chai_1.expect(data.httpStatusCode).to.equal(400);
        chai_1.expect(data.errors[0]).to.equal(mockValues.BAD_REQUEST);
    }));
});
mocha_1.describe("OverseasEntityService GET Tests suite", () => {
    beforeEach(() => {
        sinon_1.default.reset();
        sinon_1.default.restore();
    });
    it("should return httpStatusCode 200 for getOverseasEntity method", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetOverseasEntityResponse[200]);
        const oeService = new overseas_entities_1.OverseasEntityService(mockValues.requestClient);
        const data = (yield oeService.getOverseasEntity(mockValues.TRANSACTION_ID, mockValues.OVERSEAS_ENTITY_ID));
        chai_1.expect(data.httpStatusCode).to.equal(200);
        chai_1.expect(data.resource).to.deep.equal(mockValues.OVERSEAS_ENTITY_OBJECT_MOCK);
    }));
    it("should return error 400 (Bad Request) for getOverseasEntity method", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetOverseasEntityResponse[400]);
        const oeService = new overseas_entities_1.OverseasEntityService(mockValues.requestClient);
        const data = yield oeService.getOverseasEntity(mockValues.TRANSACTION_ID, mockValues.OVERSEAS_ENTITY_ID);
        chai_1.expect(data.httpStatusCode).to.equal(400);
        chai_1.expect(data.errors[0]).to.deep.equal(mockValues.BAD_REQUEST);
    }));
    it("should return httpStatusCode 200 for getOverseasEntityDetails method", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetOverseasEntityExtraDetailsResponse[200]);
        const oeService = new overseas_entities_1.OverseasEntityService(mockValues.requestClient);
        const data = (yield oeService.getOverseasEntityDetails(mockValues.TRANSACTION_ID, mockValues.OVERSEAS_ENTITY_ID));
        chai_1.expect(data.httpStatusCode).to.equal(200);
        chai_1.expect(data.resource).to.deep.equal(mockValues.OVERSEAS_ENTITY_EXTRA_DETAILS_OBJECT_MOCK);
    }));
    it("should return error 400 (Bad Request) for getOverseasEntityDetails method", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetOverseasEntityExtraDetailsResponse[400]);
        const oeService = new overseas_entities_1.OverseasEntityService(mockValues.requestClient);
        const data = yield oeService.getOverseasEntityDetails(mockValues.TRANSACTION_ID, mockValues.OVERSEAS_ENTITY_ID);
        chai_1.expect(data.httpStatusCode).to.equal(400);
        chai_1.expect(data.errors[0]).to.deep.equal(mockValues.BAD_REQUEST);
    }));
    it("should return httpStatusCode 200 for getBeneficialOwners method", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockBeneficialOwnerPrivateDataResponse[200]);
        const oeService = new overseas_entities_1.OverseasEntityService(mockValues.requestClient);
        const data = (yield oeService.getBeneficialOwnersPrivateData(mockValues.TRANSACTION_ID, mockValues.OVERSEAS_ENTITY_ID));
        chai_1.expect(data.httpStatusCode).to.equal(200);
        chai_1.expect(data.resource).to.deep.equal(mockValues.BENEFICIAL_OWNER_PRIVATE_DATA_RESOURCE_MOCK);
    }));
    it("should return httpStatusCode 200 and empty fields if no benficial owners for getBeneficialOwners method", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockBeneficialOwnerPrivateDataUndefinedResponse[200]);
        const oeService = new overseas_entities_1.OverseasEntityService(mockValues.requestClient);
        const data = (yield oeService.getBeneficialOwnersPrivateData(mockValues.TRANSACTION_ID, mockValues.OVERSEAS_ENTITY_ID));
        chai_1.expect(data.httpStatusCode).to.equal(200);
        chai_1.expect(data.resource).to.deep.equal(undefined);
    }));
    it("should return error 400 (Bad Request) for getBeneficialOwners method", () => __awaiter(void 0, void 0, void 0, function* () {
        sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockBeneficialOwnerPrivateDataResponse[400]);
        const oeService = new overseas_entities_1.OverseasEntityService(mockValues.requestClient);
        const data = yield oeService.getBeneficialOwnersPrivateData(mockValues.TRANSACTION_ID, mockValues.OVERSEAS_ENTITY_ID);
        chai_1.expect(data.httpStatusCode).to.equal(400);
        chai_1.expect(data.errors[0]).to.deep.equal(mockValues.BAD_REQUEST);
    }));
});
mocha_1.describe("Mapping OverseasEntity Tests suite", () => {
    it("should return OverseasEntityResource object from mapOverseasEntity method", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const data = mapping_2.mapOverseasEntity({
            entity_name: mockValues.ENTITY_NAME_FIELD_MOCK,
            entity_number: mockValues.ENTITY_NUMBER_MOCK,
            presenter: mockValues.PRESENTER_OBJECT_MOCK,
            entity: mockValues.ENTITY_OBJECT_MOCK,
            due_diligence: mockValues.DUE_DILIGENCE_MOCK,
            overseas_entity_due_diligence: mockValues.OE_DUE_DILIGENCE_MOCK,
            beneficial_owners_statement: overseas_entities_1.BeneficialOwnersStatementType.ALL_IDENTIFIED_ALL_DETAILS,
            beneficial_owners_individual: mockValues.BENEFICIAL_OWNER_INDIVIDUAL_MOCK_LIST,
            beneficial_owners_corporate: mockValues.BENEFICIAL_OWNER_CORPORATE_MOCK_LIST,
            beneficial_owners_government_or_public_authority: mockValues.BENEFICIAL_OWNER_GOVERNMENT_MOCK_LIST,
            managing_officers_individual: mockValues.MANAGING_OFFICERS_INDIVIDUAL_MOCK_LIST,
            managing_officers_corporate: mockValues.MANAGING_OFFICERS_CORPORATE_MOCK_LIST,
            trusts: mockValues.TRUSTS_MOCK,
            update: mockValues.UPDATE_OBJECT_MOCK,
            remove: mockValues.REMOVE_OBJECT_MOCK,
            is_remove: true,
            has_sold_land: "0",
            is_secure_register: "0",
            who_is_registering: "agent",
            payment: mockValues.PAYMENT_OBJECT_MOCK
        });
        chai_1.expect(data.entity_name).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.entity_name);
        chai_1.expect(data.entity_number).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.entity_number);
        chai_1.expect(data.presenter).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.presenter);
        chai_1.expect(data.entity).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.entity);
        chai_1.expect(data.due_diligence).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.due_diligence);
        chai_1.expect(data.overseas_entity_due_diligence).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.overseas_entity_due_diligence);
        chai_1.expect(data.beneficial_owners_statement).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.beneficial_owners_statement);
        chai_1.expect((_a = data.beneficial_owners_individual) === null || _a === void 0 ? void 0 : _a[0]).to.deep.equal((_b = mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.beneficial_owners_individual) === null || _b === void 0 ? void 0 : _b[0]);
        chai_1.expect((_c = data.beneficial_owners_corporate) === null || _c === void 0 ? void 0 : _c[0]).to.deep.equal((_d = mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.beneficial_owners_corporate) === null || _d === void 0 ? void 0 : _d[0]);
        chai_1.expect((_e = data.beneficial_owners_government_or_public_authority) === null || _e === void 0 ? void 0 : _e[0]).to.deep.equal((_f = mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.beneficial_owners_government_or_public_authority) === null || _f === void 0 ? void 0 : _f[0]);
        chai_1.expect((_g = data.managing_officers_individual) === null || _g === void 0 ? void 0 : _g[0]).to.deep.equal((_h = mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.managing_officers_individual) === null || _h === void 0 ? void 0 : _h[0]);
        chai_1.expect((_j = data.managing_officers_corporate) === null || _j === void 0 ? void 0 : _j[0]).to.deep.equal((_k = mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.managing_officers_corporate) === null || _k === void 0 ? void 0 : _k[0]);
        chai_1.expect((_l = data.trusts) === null || _l === void 0 ? void 0 : _l[0]).to.deep.equal((_m = mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.trusts) === null || _m === void 0 ? void 0 : _m[0]);
        chai_1.expect(data.update).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.update);
        chai_1.expect(data.is_remove).to.deep.equal(true);
        chai_1.expect(data.has_sold_land).to.deep.equal(false);
        chai_1.expect(data.is_secure_register).to.deep.equal(false);
        chai_1.expect(data.who_is_registering).to.deep.equal(overseas_entities_mock_1.ENTITY_WHO_IS_REGISTERING.AGENT);
        chai_1.expect(data.remove).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.remove);
        chai_1.expect(data.payment).to.deep.equal(mockValues.PAYMENT_OBJECT_MOCK);
    }));
    it("should return OverseasEntityResource object from mapOverseasEntity method", () => __awaiter(void 0, void 0, void 0, function* () {
        var _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
        const data = mapping_2.mapOverseasEntity({
            entity_name: mockValues.ENTITY_NAME_FIELD_MOCK,
            entity_number: mockValues.ENTITY_NUMBER_MOCK,
            presenter: mockValues.PRESENTER_OBJECT_MOCK,
            entity: mockValues.ENTITY_OBJECT_MOCK,
            due_diligence: mockValues.DUE_DILIGENCE_MOCK,
            overseas_entity_due_diligence: mockValues.OE_DUE_DILIGENCE_MOCK,
            beneficial_owners_statement: overseas_entities_1.BeneficialOwnersStatementType.ALL_IDENTIFIED_ALL_DETAILS,
            beneficial_owners_individual: mockValues.BENEFICIAL_OWNER_INDIVIDUAL_MOCK_LIST,
            beneficial_owners_corporate: mockValues.BENEFICIAL_OWNER_CORPORATE_MOCK_LIST,
            beneficial_owners_government_or_public_authority: mockValues.BENEFICIAL_OWNER_GOVERNMENT_MOCK_LIST,
            managing_officers_individual: mockValues.MANAGING_OFFICERS_INDIVIDUAL_MOCK_LIST,
            managing_officers_corporate: mockValues.MANAGING_OFFICERS_CORPORATE_MOCK_LIST,
            trusts: mockValues.TRUSTS_MOCK,
            update: mockValues.UPDATE_OBJECT_MOCK,
            remove: mockValues.REMOVE_OBJECT_MOCK,
            is_remove: true,
            has_sold_land: "1",
            is_secure_register: "1",
            who_is_registering: "someone_else"
        });
        chai_1.expect(data.entity_name).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.entity_name);
        chai_1.expect(data.entity_number).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.entity_number);
        chai_1.expect(data.presenter).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.presenter);
        chai_1.expect(data.entity).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.entity);
        chai_1.expect(data.due_diligence).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.due_diligence);
        chai_1.expect(data.overseas_entity_due_diligence).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.overseas_entity_due_diligence);
        chai_1.expect(data.beneficial_owners_statement).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.beneficial_owners_statement);
        chai_1.expect((_o = data.beneficial_owners_individual) === null || _o === void 0 ? void 0 : _o[0]).to.deep.equal((_p = mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.beneficial_owners_individual) === null || _p === void 0 ? void 0 : _p[0]);
        chai_1.expect((_q = data.beneficial_owners_corporate) === null || _q === void 0 ? void 0 : _q[0]).to.deep.equal((_r = mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.beneficial_owners_corporate) === null || _r === void 0 ? void 0 : _r[0]);
        chai_1.expect((_s = data.beneficial_owners_government_or_public_authority) === null || _s === void 0 ? void 0 : _s[0]).to.deep.equal((_t = mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.beneficial_owners_government_or_public_authority) === null || _t === void 0 ? void 0 : _t[0]);
        chai_1.expect((_u = data.managing_officers_individual) === null || _u === void 0 ? void 0 : _u[0]).to.deep.equal((_v = mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.managing_officers_individual) === null || _v === void 0 ? void 0 : _v[0]);
        chai_1.expect((_w = data.managing_officers_corporate) === null || _w === void 0 ? void 0 : _w[0]).to.deep.equal((_x = mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.managing_officers_corporate) === null || _x === void 0 ? void 0 : _x[0]);
        chai_1.expect((_y = data.trusts) === null || _y === void 0 ? void 0 : _y[0]).to.deep.equal((_z = mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.trusts) === null || _z === void 0 ? void 0 : _z[0]);
        chai_1.expect(data.update).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.update);
        chai_1.expect(data.is_remove).to.deep.equal(true);
        chai_1.expect(data.has_sold_land).to.deep.equal(true);
        chai_1.expect(data.is_secure_register).to.deep.equal(true);
        chai_1.expect(data.who_is_registering).to.deep.equal(overseas_entities_mock_1.ENTITY_WHO_IS_REGISTERING.SOMEONE_ELSE);
        chai_1.expect(data.remove).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.remove);
    }));
    it("should return OverseasEntityResource object from mapOverseasEntity method with all empty sub fields", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = mapping_2.mapOverseasEntity({
            entity_name: undefined,
            entity_number: undefined,
            presenter: undefined,
            entity: undefined,
            due_diligence: undefined,
            overseas_entity_due_diligence: {},
            beneficial_owners_statement: undefined,
            beneficial_owners_individual: [],
            beneficial_owners_corporate: [],
            beneficial_owners_government_or_public_authority: [],
            managing_officers_individual: [],
            managing_officers_corporate: [],
            trusts: [],
            update: undefined,
            remove: undefined,
            is_remove: undefined,
            has_sold_land: undefined,
            is_secure_register: undefined,
            who_is_registering: undefined,
            payment: undefined
        });
        chai_1.expect(data.entity_name).to.deep.equal(null);
        chai_1.expect(data.entity_number).to.deep.equal(null);
        chai_1.expect(data.presenter).to.deep.equal(null);
        chai_1.expect(data.entity).to.deep.equal(null);
        chai_1.expect(data.due_diligence).to.deep.equal(null);
        chai_1.expect(data.overseas_entity_due_diligence).to.deep.equal(null);
        chai_1.expect(data.beneficial_owners_statement).to.deep.equal(undefined);
        chai_1.expect(data.beneficial_owners_individual).to.deep.equal([]);
        chai_1.expect(data.beneficial_owners_corporate).to.deep.equal([]);
        chai_1.expect(data.beneficial_owners_government_or_public_authority).to.deep.equal([]);
        chai_1.expect(data.managing_officers_individual).to.deep.equal([]);
        chai_1.expect(data.managing_officers_corporate).to.deep.equal([]);
        chai_1.expect(data.trusts).to.deep.equal([]);
        chai_1.expect(data.update).to.deep.equal({});
        chai_1.expect(data.remove).to.deep.equal({});
        chai_1.expect(data.is_remove).to.deep.equal(null);
        chai_1.expect(data.has_sold_land).to.deep.equal(undefined);
        chai_1.expect(data.is_secure_register).to.deep.equal(undefined);
        chai_1.expect(data.who_is_registering).to.deep.equal(undefined);
        chai_1.expect(data.payment).to.deep.equal(null);
    }));
    it("should return OverseasEntity object from mapOverseasEntityResource method", () => __awaiter(void 0, void 0, void 0, function* () {
        const OE_RESOURCE = mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK;
        const data = mapping_2.mapOverseasEntityResource({
            entity_name: OE_RESOURCE.entity_name,
            entity_number: OE_RESOURCE.entity_number,
            presenter: OE_RESOURCE.presenter,
            entity: OE_RESOURCE.entity,
            due_diligence: OE_RESOURCE.due_diligence,
            overseas_entity_due_diligence: OE_RESOURCE.overseas_entity_due_diligence,
            beneficial_owners_statement: overseas_entities_1.BeneficialOwnersStatementType.ALL_IDENTIFIED_ALL_DETAILS,
            beneficial_owners_individual: OE_RESOURCE.beneficial_owners_individual,
            beneficial_owners_corporate: OE_RESOURCE.beneficial_owners_corporate,
            beneficial_owners_government_or_public_authority: OE_RESOURCE.beneficial_owners_government_or_public_authority,
            managing_officers_individual: OE_RESOURCE.managing_officers_individual,
            managing_officers_corporate: OE_RESOURCE.managing_officers_corporate,
            trusts: OE_RESOURCE.trusts,
            update: OE_RESOURCE.update,
            remove: OE_RESOURCE.remove,
            is_remove: true,
            has_sold_land: true,
            is_secure_register: true,
            who_is_registering: overseas_entities_mock_1.ENTITY_WHO_IS_REGISTERING.AGENT,
            payment: OE_RESOURCE.payment
        });
        chai_1.expect(data.entity_name).to.deep.equal(mockValues.ENTITY_NAME_FIELD_MOCK);
        chai_1.expect(data.entity_number).to.deep.equal(mockValues.ENTITY_NUMBER_MOCK);
        chai_1.expect(data.presenter).to.deep.equal(mockValues.PRESENTER_OBJECT_MOCK);
        chai_1.expect(data.entity).to.deep.equal(mockValues.ENTITY_OBJECT_MOCK);
        chai_1.expect(data.due_diligence).to.deep.equal(mockValues.DUE_DILIGENCE_MOCK);
        chai_1.expect(data.overseas_entity_due_diligence).to.deep.equal(mockValues.OE_DUE_DILIGENCE_MOCK);
        chai_1.expect(data.beneficial_owners_statement).to.deep.equal(overseas_entities_1.BeneficialOwnersStatementType.ALL_IDENTIFIED_ALL_DETAILS);
        chai_1.expect(data.beneficial_owners_individual).to.deep.equal(mockValues.BENEFICIAL_OWNER_INDIVIDUAL_MOCK_LIST);
        chai_1.expect(data.beneficial_owners_corporate).to.deep.equal(mockValues.BENEFICIAL_OWNER_CORPORATE_MOCK_LIST);
        chai_1.expect(data.beneficial_owners_government_or_public_authority).to.deep.equal(mockValues.BENEFICIAL_OWNER_GOVERNMENT_MOCK_LIST);
        chai_1.expect(data.managing_officers_individual).to.deep.equal(mockValues.MANAGING_OFFICERS_INDIVIDUAL_MOCK_LIST);
        chai_1.expect(data.managing_officers_corporate).to.deep.equal(mockValues.MANAGING_OFFICERS_CORPORATE_MOCK_LIST);
        chai_1.expect(data.trusts).to.deep.equal(mockValues.TRUSTS_MOCK);
        chai_1.expect(data.trusts).to.deep.equal(mockValues.TRUSTS_MOCK);
        chai_1.expect(data.update).to.deep.equal(mockValues.UPDATE_OBJECT_MOCK);
        chai_1.expect(data.remove).to.deep.equal(mockValues.REMOVE_OBJECT_MOCK);
        chai_1.expect(data.is_remove).to.deep.equal(true);
        chai_1.expect(data.has_sold_land).to.deep.equal("1");
        chai_1.expect(data.is_secure_register).to.deep.equal("1");
        chai_1.expect(data.who_is_registering).to.deep.equal("agent");
        chai_1.expect(data.payment).to.deep.equal(mockValues.PAYMENT_OBJECT_MOCK);
    }));
    it("should return OverseasEntity object from mapOverseasEntityResource method", () => __awaiter(void 0, void 0, void 0, function* () {
        const OE_RESOURCE = mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK;
        const data = mapping_2.mapOverseasEntityResource({
            entity_name: OE_RESOURCE.entity_name,
            entity_number: OE_RESOURCE.entity_number,
            presenter: OE_RESOURCE.presenter,
            entity: OE_RESOURCE.entity,
            due_diligence: OE_RESOURCE.due_diligence,
            overseas_entity_due_diligence: OE_RESOURCE.overseas_entity_due_diligence,
            beneficial_owners_statement: overseas_entities_1.BeneficialOwnersStatementType.ALL_IDENTIFIED_ALL_DETAILS,
            beneficial_owners_individual: OE_RESOURCE.beneficial_owners_individual,
            beneficial_owners_corporate: OE_RESOURCE.beneficial_owners_corporate,
            beneficial_owners_government_or_public_authority: OE_RESOURCE.beneficial_owners_government_or_public_authority,
            managing_officers_individual: OE_RESOURCE.managing_officers_individual,
            managing_officers_corporate: OE_RESOURCE.managing_officers_corporate,
            trusts: OE_RESOURCE.trusts,
            update: OE_RESOURCE.update,
            remove: OE_RESOURCE.remove,
            is_remove: true,
            has_sold_land: false,
            is_secure_register: false,
            who_is_registering: overseas_entities_mock_1.ENTITY_WHO_IS_REGISTERING.SOMEONE_ELSE
        });
        chai_1.expect(data.entity_name).to.deep.equal(mockValues.ENTITY_NAME_FIELD_MOCK);
        chai_1.expect(data.entity_number).to.deep.equal(mockValues.ENTITY_NUMBER_MOCK);
        chai_1.expect(data.presenter).to.deep.equal(mockValues.PRESENTER_OBJECT_MOCK);
        chai_1.expect(data.entity).to.deep.equal(mockValues.ENTITY_OBJECT_MOCK);
        chai_1.expect(data.due_diligence).to.deep.equal(mockValues.DUE_DILIGENCE_MOCK);
        chai_1.expect(data.overseas_entity_due_diligence).to.deep.equal(mockValues.OE_DUE_DILIGENCE_MOCK);
        chai_1.expect(data.beneficial_owners_statement).to.deep.equal(overseas_entities_1.BeneficialOwnersStatementType.ALL_IDENTIFIED_ALL_DETAILS);
        chai_1.expect(data.beneficial_owners_individual).to.deep.equal(mockValues.BENEFICIAL_OWNER_INDIVIDUAL_MOCK_LIST);
        chai_1.expect(data.beneficial_owners_corporate).to.deep.equal(mockValues.BENEFICIAL_OWNER_CORPORATE_MOCK_LIST);
        chai_1.expect(data.beneficial_owners_government_or_public_authority).to.deep.equal(mockValues.BENEFICIAL_OWNER_GOVERNMENT_MOCK_LIST);
        chai_1.expect(data.managing_officers_individual).to.deep.equal(mockValues.MANAGING_OFFICERS_INDIVIDUAL_MOCK_LIST);
        chai_1.expect(data.managing_officers_corporate).to.deep.equal(mockValues.MANAGING_OFFICERS_CORPORATE_MOCK_LIST);
        chai_1.expect(data.trusts).to.deep.equal(mockValues.TRUSTS_MOCK);
        chai_1.expect(data.trusts).to.deep.equal(mockValues.TRUSTS_MOCK);
        chai_1.expect(data.update).to.deep.equal(mockValues.UPDATE_OBJECT_MOCK);
        chai_1.expect(data.remove).to.deep.equal(mockValues.REMOVE_OBJECT_MOCK);
        chai_1.expect(data.is_remove).to.deep.equal(true);
        chai_1.expect(data.has_sold_land).to.deep.equal("0");
        chai_1.expect(data.is_secure_register).to.deep.equal("0");
        chai_1.expect(data.who_is_registering).to.deep.equal("someone_else");
    }));
    it("should return OverseasEntity object from mapOverseasEntityResource method with just EntityName data", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = mapping_2.mapOverseasEntityResource({
            entity_name: mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.entity_name,
            entity_number: undefined,
            presenter: undefined,
            entity: undefined,
            due_diligence: undefined,
            overseas_entity_due_diligence: undefined,
            beneficial_owners_statement: undefined,
            beneficial_owners_individual: undefined,
            beneficial_owners_corporate: undefined,
            beneficial_owners_government_or_public_authority: undefined,
            managing_officers_individual: undefined,
            managing_officers_corporate: undefined,
            trusts: undefined,
            is_remove: undefined,
            has_sold_land: undefined,
            is_secure_register: undefined,
            who_is_registering: undefined,
            payment: undefined
        });
        chai_1.expect(data.entity_name).to.deep.equal(mockValues.ENTITY_NAME_FIELD_MOCK);
        chai_1.expect(data.entity_number).to.deep.equal(undefined);
        chai_1.expect(data.presenter).to.deep.equal({});
        chai_1.expect(data.entity).to.deep.equal({});
        chai_1.expect(data.due_diligence).to.deep.equal({});
        chai_1.expect(data.overseas_entity_due_diligence).to.deep.equal({});
        chai_1.expect(data.beneficial_owners_statement).to.deep.equal(undefined);
        chai_1.expect(data.beneficial_owners_individual).to.deep.equal([]);
        chai_1.expect(data.beneficial_owners_corporate).to.deep.equal([]);
        chai_1.expect(data.beneficial_owners_government_or_public_authority).to.deep.equal([]);
        chai_1.expect(data.managing_officers_individual).to.deep.equal([]);
        chai_1.expect(data.managing_officers_corporate).to.deep.equal([]);
        chai_1.expect(data.trusts).to.deep.equal([]);
        chai_1.expect(data.is_remove).to.deep.equal(undefined);
        chai_1.expect(data.has_sold_land).to.deep.equal(undefined);
        chai_1.expect(data.is_secure_register).to.deep.equal(undefined);
        chai_1.expect(data.payment).to.deep.equal(null);
    }));
    it("should return OverseasEntity object from mapOverseasEntityResource method with just entity number data", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = mapping_2.mapOverseasEntityResource({
            entity_name: undefined,
            entity_number: mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.entity_number,
            presenter: undefined,
            entity: undefined,
            due_diligence: undefined,
            overseas_entity_due_diligence: undefined,
            beneficial_owners_statement: undefined,
            beneficial_owners_individual: undefined,
            beneficial_owners_corporate: undefined,
            beneficial_owners_government_or_public_authority: undefined,
            managing_officers_individual: undefined,
            managing_officers_corporate: undefined,
            trusts: undefined,
            is_remove: undefined,
            has_sold_land: undefined,
            is_secure_register: undefined,
            who_is_registering: undefined,
            payment: undefined
        });
        chai_1.expect(data.entity_name).to.deep.equal(null);
        chai_1.expect(data.entity_number).to.deep.equal(mockValues.ENTITY_NUMBER_MOCK);
        chai_1.expect(data.presenter).to.deep.equal({});
        chai_1.expect(data.entity).to.deep.equal({});
        chai_1.expect(data.due_diligence).to.deep.equal({});
        chai_1.expect(data.overseas_entity_due_diligence).to.deep.equal({});
        chai_1.expect(data.beneficial_owners_statement).to.deep.equal(undefined);
        chai_1.expect(data.beneficial_owners_individual).to.deep.equal([]);
        chai_1.expect(data.beneficial_owners_corporate).to.deep.equal([]);
        chai_1.expect(data.beneficial_owners_government_or_public_authority).to.deep.equal([]);
        chai_1.expect(data.managing_officers_individual).to.deep.equal([]);
        chai_1.expect(data.managing_officers_corporate).to.deep.equal([]);
        chai_1.expect(data.trusts).to.deep.equal([]);
        chai_1.expect(data.is_remove).to.deep.equal(undefined);
        chai_1.expect(data.has_sold_land).to.deep.equal(undefined);
        chai_1.expect(data.is_secure_register).to.deep.equal(undefined);
        chai_1.expect(data.who_is_registering).to.deep.equal(undefined);
        chai_1.expect(data.payment).to.deep.equal(null);
    }));
    it("should return OverseasEntity object from mapOverseasEntityResource method with just Presenter data", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = mapping_2.mapOverseasEntityResource({
            entity_name: undefined,
            presenter: mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.presenter,
            entity: undefined,
            due_diligence: undefined,
            overseas_entity_due_diligence: undefined,
            beneficial_owners_statement: undefined,
            beneficial_owners_individual: undefined,
            beneficial_owners_corporate: undefined,
            beneficial_owners_government_or_public_authority: undefined,
            managing_officers_individual: undefined,
            managing_officers_corporate: undefined,
            trusts: undefined,
            is_remove: undefined,
            has_sold_land: undefined,
            is_secure_register: undefined,
            who_is_registering: undefined,
            payment: undefined
        });
        chai_1.expect(data.entity_name).to.deep.equal(null);
        chai_1.expect(data.presenter).to.deep.equal(mockValues.PRESENTER_OBJECT_MOCK);
        chai_1.expect(data.entity).to.deep.equal({});
        chai_1.expect(data.due_diligence).to.deep.equal({});
        chai_1.expect(data.overseas_entity_due_diligence).to.deep.equal({});
        chai_1.expect(data.beneficial_owners_statement).to.deep.equal(undefined);
        chai_1.expect(data.beneficial_owners_individual).to.deep.equal([]);
        chai_1.expect(data.beneficial_owners_corporate).to.deep.equal([]);
        chai_1.expect(data.beneficial_owners_government_or_public_authority).to.deep.equal([]);
        chai_1.expect(data.managing_officers_individual).to.deep.equal([]);
        chai_1.expect(data.managing_officers_corporate).to.deep.equal([]);
        chai_1.expect(data.trusts).to.deep.equal([]);
        chai_1.expect(data.is_remove).to.deep.equal(undefined);
        chai_1.expect(data.has_sold_land).to.deep.equal(undefined);
        chai_1.expect(data.is_secure_register).to.deep.equal(undefined);
        chai_1.expect(data.who_is_registering).to.deep.equal(undefined);
        chai_1.expect(data.payment).to.deep.equal(null);
    }));
    it("should return OverseasEntity object from mapOverseasEntityResource method with just Update data", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = mapping_2.mapOverseasEntityResource({
            entity_name: undefined,
            presenter: undefined,
            entity: undefined,
            due_diligence: undefined,
            overseas_entity_due_diligence: undefined,
            beneficial_owners_statement: undefined,
            beneficial_owners_individual: undefined,
            beneficial_owners_corporate: undefined,
            beneficial_owners_government_or_public_authority: undefined,
            managing_officers_individual: undefined,
            managing_officers_corporate: undefined,
            trusts: undefined,
            update: mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.update,
            remove: undefined,
            is_remove: undefined,
            has_sold_land: undefined,
            is_secure_register: undefined,
            who_is_registering: undefined,
            payment: undefined
        });
        chai_1.expect(data.entity_name).to.deep.equal(null);
        chai_1.expect(data.presenter).to.deep.equal({});
        chai_1.expect(data.entity).to.deep.equal({});
        chai_1.expect(data.due_diligence).to.deep.equal({});
        chai_1.expect(data.overseas_entity_due_diligence).to.deep.equal({});
        chai_1.expect(data.beneficial_owners_statement).to.deep.equal(undefined);
        chai_1.expect(data.beneficial_owners_individual).to.deep.equal([]);
        chai_1.expect(data.beneficial_owners_corporate).to.deep.equal([]);
        chai_1.expect(data.beneficial_owners_government_or_public_authority).to.deep.equal([]);
        chai_1.expect(data.managing_officers_individual).to.deep.equal([]);
        chai_1.expect(data.managing_officers_corporate).to.deep.equal([]);
        chai_1.expect(data.trusts).to.deep.equal([]);
        chai_1.expect(data.update).to.deep.equal(mockValues.UPDATE_OBJECT_MOCK);
        chai_1.expect(data.remove).to.deep.equal({});
        chai_1.expect(data.is_remove).to.deep.equal(undefined);
        chai_1.expect(data.has_sold_land).to.deep.equal(undefined);
        chai_1.expect(data.is_secure_register).to.deep.equal(undefined);
        chai_1.expect(data.who_is_registering).to.deep.equal(undefined);
        chai_1.expect(data.payment).to.deep.equal(null);
    }));
    it("should return OverseasEntity object from mapOverseasEntityResource method with just Remove data", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = mapping_2.mapOverseasEntityResource({
            entity_name: undefined,
            presenter: undefined,
            entity: undefined,
            due_diligence: undefined,
            overseas_entity_due_diligence: undefined,
            beneficial_owners_statement: undefined,
            beneficial_owners_individual: undefined,
            beneficial_owners_corporate: undefined,
            beneficial_owners_government_or_public_authority: undefined,
            managing_officers_individual: undefined,
            managing_officers_corporate: undefined,
            trusts: undefined,
            update: undefined,
            remove: mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.remove,
            is_remove: undefined,
            has_sold_land: undefined,
            is_secure_register: undefined,
            who_is_registering: undefined,
            payment: undefined
        });
        chai_1.expect(data.entity_name).to.deep.equal(null);
        chai_1.expect(data.presenter).to.deep.equal({});
        chai_1.expect(data.entity).to.deep.equal({});
        chai_1.expect(data.due_diligence).to.deep.equal({});
        chai_1.expect(data.overseas_entity_due_diligence).to.deep.equal({});
        chai_1.expect(data.beneficial_owners_statement).to.deep.equal(undefined);
        chai_1.expect(data.beneficial_owners_individual).to.deep.equal([]);
        chai_1.expect(data.beneficial_owners_corporate).to.deep.equal([]);
        chai_1.expect(data.beneficial_owners_government_or_public_authority).to.deep.equal([]);
        chai_1.expect(data.managing_officers_individual).to.deep.equal([]);
        chai_1.expect(data.managing_officers_corporate).to.deep.equal([]);
        chai_1.expect(data.trusts).to.deep.equal([]);
        chai_1.expect(data.update).to.deep.equal({});
        chai_1.expect(data.remove).to.deep.equal(mockValues.REMOVE_OBJECT_MOCK);
        chai_1.expect(data.is_remove).to.deep.equal(undefined);
        chai_1.expect(data.has_sold_land).to.deep.equal(undefined);
        chai_1.expect(data.is_secure_register).to.deep.equal(undefined);
        chai_1.expect(data.who_is_registering).to.deep.equal(undefined);
        chai_1.expect(data.payment).to.deep.equal(null);
    }));
    it("should return OverseasEntity object from mapOverseasEntityResource method with mapped Update dates", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = mapping_2.mapOverseasEntityResource({
            entity_name: undefined,
            presenter: undefined,
            entity: undefined,
            due_diligence: undefined,
            overseas_entity_due_diligence: undefined,
            beneficial_owners_statement: undefined,
            beneficial_owners_individual: undefined,
            beneficial_owners_corporate: undefined,
            beneficial_owners_government_or_public_authority: undefined,
            managing_officers_individual: undefined,
            managing_officers_corporate: undefined,
            trusts: undefined,
            update: mockValues.UPDATE_RESOURCE_MOCK,
            remove: undefined,
            is_remove: undefined,
            has_sold_land: undefined,
            is_secure_register: undefined,
            who_is_registering: undefined,
            payment: undefined
        });
        chai_1.expect(data.update).to.deep.equal(mockValues.UPDATE_OBJECT_MOCK);
    }));
    it("should return OverseasEntity object from mapOverseasEntityResource method with no Update filing date", () => __awaiter(void 0, void 0, void 0, function* () {
        var _0;
        const updateResource = Object.assign({}, mockValues.UPDATE_RESOURCE_MOCK);
        updateResource.filing_date = undefined;
        const data = mapping_2.mapOverseasEntityResource({
            entity_name: undefined,
            presenter: undefined,
            entity: undefined,
            due_diligence: undefined,
            overseas_entity_due_diligence: undefined,
            beneficial_owners_statement: undefined,
            beneficial_owners_individual: undefined,
            beneficial_owners_corporate: undefined,
            beneficial_owners_government_or_public_authority: undefined,
            managing_officers_individual: undefined,
            managing_officers_corporate: undefined,
            trusts: undefined,
            update: updateResource,
            remove: undefined,
            is_remove: undefined,
            has_sold_land: undefined,
            is_secure_register: undefined,
            who_is_registering: undefined,
            payment: undefined
        });
        chai_1.expect((_0 = data.update) === null || _0 === void 0 ? void 0 : _0.filing_date).to.undefined;
    }));
    it("should return OverseasEntity object from mapOverseasEntityResource method with no date of creation", () => __awaiter(void 0, void 0, void 0, function* () {
        var _1;
        const updateResource = Object.assign({}, mockValues.UPDATE_RESOURCE_MOCK);
        updateResource.date_of_creation = undefined;
        const data = mapping_2.mapOverseasEntityResource({
            entity_name: undefined,
            presenter: undefined,
            entity: undefined,
            due_diligence: undefined,
            overseas_entity_due_diligence: undefined,
            beneficial_owners_statement: undefined,
            beneficial_owners_individual: undefined,
            beneficial_owners_corporate: undefined,
            beneficial_owners_government_or_public_authority: undefined,
            managing_officers_individual: undefined,
            managing_officers_corporate: undefined,
            trusts: undefined,
            update: updateResource,
            remove: undefined,
            is_remove: undefined,
            has_sold_land: undefined,
            is_secure_register: undefined,
            who_is_registering: undefined,
            payment: undefined
        });
        chai_1.expect((_1 = data.update) === null || _1 === void 0 ? void 0 : _1.date_of_creation).to.undefined;
    }));
    it("should return OE Due Diligence object with identity_date as InputDate object if identity date is null", () => {
        var _a;
        const dataResource = mapping_2.mapOverseasEntityResource({
            overseas_entity_due_diligence: Object.assign(Object.assign({}, mockValues.OE_DUE_DILIGENCE_RESOURCE_MOCK), { identity_date: null })
        });
        chai_1.expect((_a = dataResource.overseas_entity_due_diligence) === null || _a === void 0 ? void 0 : _a.identity_date).to.deep.equal({ day: "", month: "", year: "" });
    });
    it("should return OE Due Diligence object without identity_date field if identity date is undefined", () => {
        const dataResource = mapping_2.mapOverseasEntity({
            overseas_entity_due_diligence: Object.assign(Object.assign({}, mockValues.OE_DUE_DILIGENCE_MOCK), { identity_date: undefined })
        });
        chai_1.expect(Object.keys(dataResource.overseas_entity_due_diligence).indexOf("identity_date")).to.equal(-1);
    });
    it("should return OE Due Diligence object without identity_date field if identity date subfields are empty", () => {
        const dataResource = mapping_2.mapOverseasEntity({
            overseas_entity_due_diligence: Object.assign(Object.assign({}, mockValues.OE_DUE_DILIGENCE_MOCK), { identity_date: { day: "", month: "", year: "" } })
        });
        chai_1.expect(Object.keys(dataResource.overseas_entity_due_diligence).indexOf("identity_date")).to.equal(-1);
    });
    it("should return OE extra details object with email address", () => {
        const dataResource = mapping_2.mapOverseasEntityExtraDetails({
            email_address: "private@overseasentities.test"
        });
        chai_1.expect(dataResource.email_address).to.equal("private@overseasentities.test");
    });
    it("should return OE extra details object without email address if empty", () => {
        const dataResource = mapping_2.mapOverseasEntityExtraDetails({});
        chai_1.expect(dataResource.email_address).to.equal(undefined);
    });
    it("should return OverseasEntity object from mapOverseasEntityResource method with no review trust ceased date", () => __awaiter(void 0, void 0, void 0, function* () {
        var _2, _3, _4, _5, _6, _7, _8, _9, _10, _11;
        const updateResource = Object.assign({}, mockValues.UPDATE_RESOURCE_MOCK);
        if (updateResource.review_trusts) {
            updateResource.review_trusts[0].ceased_date = "";
        }
        const overseasEntity = mapping_2.mapOverseasEntityResource({
            update: updateResource
        });
        chai_1.expect((_3 = (_2 = overseasEntity.update) === null || _2 === void 0 ? void 0 : _2.review_trusts) === null || _3 === void 0 ? void 0 : _3[0].ceased_date_day).to.be.undefined;
        chai_1.expect((_5 = (_4 = overseasEntity.update) === null || _4 === void 0 ? void 0 : _4.review_trusts) === null || _5 === void 0 ? void 0 : _5[0].ceased_date_month).to.be.undefined;
        chai_1.expect((_7 = (_6 = overseasEntity.update) === null || _6 === void 0 ? void 0 : _6.review_trusts) === null || _7 === void 0 ? void 0 : _7[0].ceased_date_year).to.be.undefined;
        chai_1.expect((_9 = (_8 = overseasEntity.update) === null || _8 === void 0 ? void 0 : _8.review_trusts) === null || _9 === void 0 ? void 0 : _9[0].trust_id).to.equal("1234");
        chai_1.expect((_11 = (_10 = overseasEntity.update) === null || _10 === void 0 ? void 0 : _10.review_trusts) === null || _11 === void 0 ? void 0 : _11[0].ch_reference).to.equal("_ecba-4TzUTXaln-g8daGtvS4a0");
    }));
    it("should return OverseasEntityResource object from mapOverseasEntity method with no review trust ceased date", () => __awaiter(void 0, void 0, void 0, function* () {
        var _12, _13, _14, _15, _16, _17;
        const update = Object.assign({}, mockValues.UPDATE_OBJECT_MOCK);
        if (update.review_trusts) {
            update.review_trusts[0].ceased_date_day = undefined;
            update.review_trusts[0].ceased_date_month = undefined;
            update.review_trusts[0].ceased_date_year = undefined;
        }
        const overseasEntityResource = mapping_2.mapOverseasEntity({
            update
        });
        chai_1.expect((_13 = (_12 = overseasEntityResource.update) === null || _12 === void 0 ? void 0 : _12.review_trusts) === null || _13 === void 0 ? void 0 : _13[0].ceased_date).to.equal("");
        chai_1.expect((_15 = (_14 = overseasEntityResource.update) === null || _14 === void 0 ? void 0 : _14.review_trusts) === null || _15 === void 0 ? void 0 : _15[0].trust_id).to.equal("1234");
        chai_1.expect((_17 = (_16 = overseasEntityResource.update) === null || _16 === void 0 ? void 0 : _16.review_trusts) === null || _17 === void 0 ? void 0 : _17[0].ch_reference).to.equal("_ecba-4TzUTXaln-g8daGtvS4a0");
    }));
    it("should return OverseasEntityResource object from mapOverseasEntity method with Trust data but no ceased date", () => __awaiter(void 0, void 0, void 0, function* () {
        var _18, _19;
        const overseasEntity = {
            trusts: mockValues.TRUSTS_MOCK
        };
        overseasEntity.trusts[0].ceased_date_day = undefined;
        overseasEntity.trusts[0].ceased_date_month = undefined;
        overseasEntity.trusts[0].ceased_date_year = undefined;
        const overseasEntityResource = mapping_2.mapOverseasEntity(overseasEntity);
        chai_1.expect((_18 = overseasEntityResource.trusts) === null || _18 === void 0 ? void 0 : _18[0].ceased_date).to.equal("");
        chai_1.expect((_19 = overseasEntityResource.trusts) === null || _19 === void 0 ? void 0 : _19[0].trust_id).to.equal("123");
    }));
    it("should return OverseasEntity object from mapOverseasEntityResource method with Trust data but no ceased date", () => __awaiter(void 0, void 0, void 0, function* () {
        var _20, _21, _22, _23;
        const overseasEntityResource = {
            trusts: mockValues.TRUSTS_RESOURCE_MOCK
        };
        if (overseasEntityResource.trusts && overseasEntityResource.trusts[0]) {
            overseasEntityResource.trusts[0].ceased_date = "";
        }
        ;
        const overseasEntity = mapping_2.mapOverseasEntityResource(overseasEntityResource);
        chai_1.expect((_20 = overseasEntity.trusts) === null || _20 === void 0 ? void 0 : _20[0].ceased_date_day).to.be.undefined;
        chai_1.expect((_21 = overseasEntity.trusts) === null || _21 === void 0 ? void 0 : _21[0].ceased_date_month).to.be.undefined;
        chai_1.expect((_22 = overseasEntity.trusts) === null || _22 === void 0 ? void 0 : _22[0].ceased_date_year).to.be.undefined;
        chai_1.expect((_23 = overseasEntity.trusts) === null || _23 === void 0 ? void 0 : _23[0].trust_id).to.equal("123");
    }));
    it("should return OverseasEntityResource object from mapOverseasEntity method with Trust data but with 'still involved' flag set to null", () => __awaiter(void 0, void 0, void 0, function* () {
        var _24;
        const overseasEntity = {
            trusts: mockValues.TRUSTS_MOCK
        };
        overseasEntity.trusts[0].trust_still_involved_in_overseas_entity = null;
        const overseasEntityResource = mapping_2.mapOverseasEntity(overseasEntity);
        chai_1.expect((_24 = overseasEntityResource.trusts) === null || _24 === void 0 ? void 0 : _24[0].trust_still_involved_in_overseas_entity).to.equal(null);
    }));
    it("should return OverseasEntity object from mapOverseasEntityResource method with Trust data but with 'still involved' flag set to null", () => __awaiter(void 0, void 0, void 0, function* () {
        var _25;
        const overseasEntityResource = {
            trusts: mockValues.TRUSTS_RESOURCE_MOCK
        };
        if (overseasEntityResource.trusts && overseasEntityResource.trusts[0]) {
            overseasEntityResource.trusts[0].trust_still_involved_in_overseas_entity = null;
        }
        ;
        const overseasEntity = mapping_2.mapOverseasEntityResource(overseasEntityResource);
        chai_1.expect((_25 = overseasEntity.trusts) === null || _25 === void 0 ? void 0 : _25[0].trust_still_involved_in_overseas_entity).to.equal(null);
    }));
    it("should return OverseasEntityResource object from mapOverseasEntity method with Trust data but with 'still involved' flag mapped from undefined to null", () => __awaiter(void 0, void 0, void 0, function* () {
        var _26;
        const overseasEntity = {
            trusts: mockValues.TRUSTS_MOCK
        };
        overseasEntity.trusts[0].trust_still_involved_in_overseas_entity = undefined;
        const overseasEntityResource = mapping_2.mapOverseasEntity(overseasEntity);
        chai_1.expect((_26 = overseasEntityResource.trusts) === null || _26 === void 0 ? void 0 : _26[0].trust_still_involved_in_overseas_entity).to.equal(null);
    }));
    it("should return OverseasEntity object from mapOverseasEntityResource method with Trust data but with 'still involved' flag mapped from undefined to null", () => __awaiter(void 0, void 0, void 0, function* () {
        var _27;
        const overseasEntityResource = {
            trusts: mockValues.TRUSTS_RESOURCE_MOCK
        };
        if (overseasEntityResource.trusts && overseasEntityResource.trusts[0]) {
            overseasEntityResource.trusts[0].trust_still_involved_in_overseas_entity = undefined;
        }
        ;
        const overseasEntity = mapping_2.mapOverseasEntityResource(overseasEntityResource);
        chai_1.expect((_27 = overseasEntity.trusts) === null || _27 === void 0 ? void 0 : _27[0].trust_still_involved_in_overseas_entity).to.equal(null);
    }));
    it("should return OverseasEntityResource object from mapOverseasEntity method with Trust Individual data but with 'is_individual_still_involved_in_trust' flag set to null", () => __awaiter(void 0, void 0, void 0, function* () {
        var _28, _29, _30, _31, _32;
        const overseasEntity = {
            trusts: mockValues.TRUSTS_MOCK,
            update: mockValues.UPDATE_OBJECT_MOCK
        };
        overseasEntity.trusts[0].INDIVIDUALS[0].still_involved = null;
        overseasEntity.update.review_trusts[0].INDIVIDUALS[0].still_involved = null;
        const overseasEntityResource = mapping_2.mapOverseasEntity(overseasEntity);
        chai_1.expect((_29 = (_28 = overseasEntityResource.trusts) === null || _28 === void 0 ? void 0 : _28[0].INDIVIDUAL) === null || _29 === void 0 ? void 0 : _29[0].is_individual_still_involved_in_trust).to.equal(null);
        chai_1.expect((_32 = (_31 = (_30 = overseasEntityResource.update) === null || _30 === void 0 ? void 0 : _30.review_trusts) === null || _31 === void 0 ? void 0 : _31[0].INDIVIDUAL) === null || _32 === void 0 ? void 0 : _32[0].is_individual_still_involved_in_trust).to.equal(null);
    }));
    it("should return OverseasEntity object from mapOverseasEntityResource method with Trust Individual data but with 'still involved' flag set to null", () => __awaiter(void 0, void 0, void 0, function* () {
        var _33, _34, _35, _36, _37;
        const overseasEntityResource = {
            trusts: mockValues.TRUSTS_RESOURCE_MOCK,
            update: mockValues.UPDATE_RESOURCE_MOCK
        };
        overseasEntityResource.trusts[0].INDIVIDUAL[0].is_individual_still_involved_in_trust = null;
        overseasEntityResource.update.review_trusts[0].INDIVIDUAL[0].is_individual_still_involved_in_trust = null;
        const overseasEntity = mapping_2.mapOverseasEntityResource(overseasEntityResource);
        chai_1.expect((_34 = (_33 = overseasEntity.trusts) === null || _33 === void 0 ? void 0 : _33[0].INDIVIDUALS) === null || _34 === void 0 ? void 0 : _34[0].still_involved).to.equal(null);
        chai_1.expect((_37 = (_36 = (_35 = overseasEntity.update) === null || _35 === void 0 ? void 0 : _35.review_trusts) === null || _36 === void 0 ? void 0 : _36[0].INDIVIDUALS) === null || _37 === void 0 ? void 0 : _37[0].still_involved).to.equal(null);
    }));
    it("should return OverseasEntityResource object from mapOverseasEntity method with Trust Individual data but with 'is_individual_still_involved_in_trust' flag mapped from undefined to null", () => __awaiter(void 0, void 0, void 0, function* () {
        var _38, _39, _40, _41, _42;
        const overseasEntity = {
            trusts: mockValues.TRUSTS_MOCK,
            update: mockValues.UPDATE_OBJECT_MOCK
        };
        overseasEntity.trusts[0].INDIVIDUALS[0].still_involved = undefined;
        overseasEntity.update.review_trusts[0].INDIVIDUALS[0].still_involved = undefined;
        const overseasEntityResource = mapping_2.mapOverseasEntity(overseasEntity);
        chai_1.expect((_39 = (_38 = overseasEntityResource.trusts) === null || _38 === void 0 ? void 0 : _38[0].INDIVIDUAL) === null || _39 === void 0 ? void 0 : _39[0].is_individual_still_involved_in_trust).to.equal(null);
        chai_1.expect((_42 = (_41 = (_40 = overseasEntityResource.update) === null || _40 === void 0 ? void 0 : _40.review_trusts) === null || _41 === void 0 ? void 0 : _41[0].INDIVIDUAL) === null || _42 === void 0 ? void 0 : _42[0].is_individual_still_involved_in_trust).to.equal(null);
    }));
    it("should return OverseasEntity object from mapOverseasEntityResource method with Trust Individual data but with 'still involved' flag mapped from undefined to null", () => __awaiter(void 0, void 0, void 0, function* () {
        var _43, _44, _45, _46, _47;
        const overseasEntityResource = {
            trusts: mockValues.TRUSTS_RESOURCE_MOCK,
            update: mockValues.UPDATE_RESOURCE_MOCK
        };
        overseasEntityResource.trusts[0].INDIVIDUAL[0].is_individual_still_involved_in_trust = undefined;
        overseasEntityResource.update.review_trusts[0].INDIVIDUAL[0].is_individual_still_involved_in_trust = undefined;
        const overseasEntity = mapping_2.mapOverseasEntityResource(overseasEntityResource);
        chai_1.expect((_44 = (_43 = overseasEntity.trusts) === null || _43 === void 0 ? void 0 : _43[0].INDIVIDUALS) === null || _44 === void 0 ? void 0 : _44[0].still_involved).to.equal(null);
        chai_1.expect((_47 = (_46 = (_45 = overseasEntity.update) === null || _45 === void 0 ? void 0 : _45.review_trusts) === null || _46 === void 0 ? void 0 : _46[0].INDIVIDUALS) === null || _47 === void 0 ? void 0 : _47[0].still_involved).to.equal(null);
    }));
    mocha_1.describe("OverseasEntityService getManagingOfficersPrivateData Tests suite", () => {
        beforeEach(() => {
            sinon_1.default.reset();
            sinon_1.default.restore();
        });
        it("should return httpStatusCode 200 for getManagingOfficersPrivateData method", () => __awaiter(void 0, void 0, void 0, function* () {
            sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves({
                status: 200,
                body: mockValues.MANAGING_OFFICERS_PRIVATE_DATA_MOCK
            });
            const oeService = new overseas_entities_1.OverseasEntityService(mockValues.requestClient);
            const data = (yield oeService.getManagingOfficersPrivateData(mockValues.TRANSACTION_ID, mockValues.OVERSEAS_ENTITY_ID));
            chai_1.expect(data.httpStatusCode).to.equal(200);
            chai_1.expect(data.resource).to.deep.equal(mockValues.MANAGING_OFFICERS_PRIVATE_DATA_MOCK);
        }));
        it("should return error 400 (Bad Request) for getManagingOfficersPrivateData method", () => __awaiter(void 0, void 0, void 0, function* () {
            sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves({
                status: 400,
                error: mockValues.BAD_REQUEST
            });
            const oeService = new overseas_entities_1.OverseasEntityService(mockValues.requestClient);
            const data = yield oeService.getManagingOfficersPrivateData(mockValues.TRANSACTION_ID, mockValues.OVERSEAS_ENTITY_ID);
            chai_1.expect(data.httpStatusCode).to.equal(400);
            chai_1.expect(data.errors[0]).to.deep.equal(mockValues.BAD_REQUEST);
        }));
    });
    mocha_1.describe("OverseasEntityService getTrustsPrivateData Tests suite", () => {
        beforeEach(() => {
            sinon_1.default.reset();
            sinon_1.default.restore();
        });
        it("should return httpStatusCode 200 for getTrustsPrivateData method", () => __awaiter(void 0, void 0, void 0, function* () {
            sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves({
                status: 200,
                body: mockValues.PRIVATE_TRUSTS_DATA_RESOURCE_MOCK
            });
            const oeService = new overseas_entities_1.OverseasEntityService(mockValues.requestClient);
            const data = (yield oeService.getTrustData(mockValues.TRANSACTION_ID, mockValues.OVERSEAS_ENTITY_ID));
            chai_1.expect(data.httpStatusCode).to.equal(200);
            chai_1.expect(data.resource).to.deep.equal(mockValues.PRIVATE_TRUSTS_DATA_MOCK);
        }));
        it("should return httpStatusCode 200 for getTrustsPrivateData method when trust is not ceased", () => __awaiter(void 0, void 0, void 0, function* () {
            sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves({
                status: 200,
                body: mockValues.PRIVATE_TRUSTS_NOT_CEASED_DATA_RESOURCE_MOCK
            });
            const oeService = new overseas_entities_1.OverseasEntityService(mockValues.requestClient);
            const data = (yield oeService.getTrustData(mockValues.TRANSACTION_ID, mockValues.OVERSEAS_ENTITY_ID));
            chai_1.expect(data.httpStatusCode).to.equal(200);
            chai_1.expect(data.resource).to.deep.equal(mockValues.PRIVATE_TRUSTS_NOT_CEASED_DATA_MOCK);
        }));
        it("should return error 400 (Bad Request) for getTrustsPrivateData method", () => __awaiter(void 0, void 0, void 0, function* () {
            sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves({
                status: 400,
                error: mockValues.BAD_REQUEST
            });
            const oeService = new overseas_entities_1.OverseasEntityService(mockValues.requestClient);
            const data = yield oeService.getTrustData(mockValues.TRANSACTION_ID, mockValues.OVERSEAS_ENTITY_ID);
            chai_1.expect(data.httpStatusCode).to.equal(400);
            chai_1.expect(data.errors[0]).to.deep.equal(mockValues.BAD_REQUEST);
        }));
    });
    mocha_1.describe("OverseasEntityService getTrustLinksPrivateData Tests suite", () => {
        beforeEach(() => {
            sinon_1.default.reset();
            sinon_1.default.restore();
        });
        it("should return httpStatusCode 200 for getTrustLinksPrivateData method", () => __awaiter(void 0, void 0, void 0, function* () {
            sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves({
                status: 200,
                body: mockValues.TRUST_LINKS_RESOURCE_MOCK
            });
            const oeService = new overseas_entities_1.OverseasEntityService(mockValues.requestClient);
            const data = (yield oeService.getTrustLinks(mockValues.TRANSACTION_ID, mockValues.OVERSEAS_ENTITY_ID));
            chai_1.expect(data.httpStatusCode).to.equal(200);
            chai_1.expect(data.resource).to.deep.equal(mockValues.TRUST_LINKS_MOCK);
        }));
        it("should return error 400 (Bad Request) for getTrustLinksPrivateData method", () => __awaiter(void 0, void 0, void 0, function* () {
            sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves({
                status: 400,
                error: mockValues.BAD_REQUEST
            });
            const oeService = new overseas_entities_1.OverseasEntityService(mockValues.requestClient);
            const data = yield oeService.getTrustLinks(mockValues.TRANSACTION_ID, mockValues.OVERSEAS_ENTITY_ID);
            chai_1.expect(data.httpStatusCode).to.equal(400);
            chai_1.expect(data.errors[0]).to.deep.equal(mockValues.BAD_REQUEST);
        }));
    });
    mocha_1.describe("OverseasEntityService getIndividualTrusteesPrivateData Tests suite", () => {
        beforeEach(() => {
            sinon_1.default.reset();
            sinon_1.default.restore();
        });
        it("should return httpStatusCode 200 for getIndividualTrusteesPrivateData method", () => __awaiter(void 0, void 0, void 0, function* () {
            sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves({
                status: 200,
                body: mockValues.INDIVIDUAL_TRUSTEES_DATA_RESOURCE_MOCK
            });
            const oeService = new overseas_entities_1.OverseasEntityService(mockValues.requestClient);
            const data = (yield oeService.getIndividualTrustees(mockValues.TRANSACTION_ID, mockValues.OVERSEAS_ENTITY_ID, mockValues.PRIVATE_TRUSTS_DATA_ID_MOCK));
            chai_1.expect(data.httpStatusCode).to.equal(200);
            chai_1.expect(data.resource).to.deep.equal(mockValues.INDIVIDUAL_TRUSTEES_DATA_MOCK);
        }));
        it("should return error 400 (Bad Request) for getIndividualTrusteesPrivateData method", () => __awaiter(void 0, void 0, void 0, function* () {
            sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves({
                status: 400,
                error: mockValues.BAD_REQUEST
            });
            const oeService = new overseas_entities_1.OverseasEntityService(mockValues.requestClient);
            const data = yield oeService.getIndividualTrustees(mockValues.TRANSACTION_ID, mockValues.OVERSEAS_ENTITY_ID, mockValues.PRIVATE_TRUSTS_DATA_ID_MOCK);
            chai_1.expect(data.httpStatusCode).to.equal(400);
            chai_1.expect(data.errors[0]).to.deep.equal(mockValues.BAD_REQUEST);
        }));
    });
    mocha_1.describe("OverseasEntityService getCorporateTrusteesPrivateData Tests suite", () => {
        beforeEach(() => {
            sinon_1.default.reset();
            sinon_1.default.restore();
        });
        it("should return httpStatusCode 200 for getCorporateTrusteesPrivateData method", () => __awaiter(void 0, void 0, void 0, function* () {
            sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves({
                status: 200,
                body: mockValues.CORPORATE_TRUSTEES_DATA_RESOURCE_MOCK
            });
            const oeService = new overseas_entities_1.OverseasEntityService(mockValues.requestClient);
            const data = (yield oeService.getCorporateTrustees(mockValues.TRANSACTION_ID, mockValues.OVERSEAS_ENTITY_ID, mockValues.PRIVATE_TRUSTS_DATA_ID_MOCK));
            chai_1.expect(data.httpStatusCode).to.equal(200);
            chai_1.expect(data.resource).to.deep.equal(mockValues.CORPORATE_TRUSTEES_DATA_MOCK);
        }));
        it("should return OverseasEntityResource object from mapOverseasEntity method with trust corporate still involved flag set to null", () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            const overseasEntity = {
                trusts: mockValues.TRUSTS_MOCK
            };
            const trustCorporates = overseasEntity.trusts[0].CORPORATES;
            trustCorporates[0].still_involved = null;
            const overseasEntityResource = mapping_2.mapOverseasEntity(overseasEntity);
            chai_1.expect((_b = (_a = overseasEntityResource.trusts) === null || _a === void 0 ? void 0 : _a[0].CORPORATE) === null || _b === void 0 ? void 0 : _b[0].is_corporate_still_involved_in_trust).to.equal(null);
        }));
        it("should return OverseasEntity object from mapOverseasEntityResource method with trust corporate still involved flag set to null", () => __awaiter(void 0, void 0, void 0, function* () {
            var _c, _d;
            const overseasEntityResource = {
                trusts: mockValues.TRUSTS_RESOURCE_MOCK
            };
            const trustCorporatesResource = overseasEntityResource.trusts[0].CORPORATE;
            trustCorporatesResource[0].is_corporate_still_involved_in_trust = null;
            const overseasEntity = mapping_2.mapOverseasEntityResource(overseasEntityResource);
            chai_1.expect((_d = (_c = overseasEntity.trusts) === null || _c === void 0 ? void 0 : _c[0].CORPORATES) === null || _d === void 0 ? void 0 : _d[0].still_involved).to.equal(null);
        }));
        it("should return OverseasEntityResource object from mapOverseasEntity method with trust corporate still involved flag set to true", () => __awaiter(void 0, void 0, void 0, function* () {
            var _e, _f;
            const overseasEntity = {
                trusts: mockValues.TRUSTS_MOCK
            };
            const trustCorporates = overseasEntity.trusts[0].CORPORATES;
            trustCorporates[0].still_involved = "Yes";
            const overseasEntityResource = mapping_2.mapOverseasEntity(overseasEntity);
            chai_1.expect((_f = (_e = overseasEntityResource.trusts) === null || _e === void 0 ? void 0 : _e[0].CORPORATE) === null || _f === void 0 ? void 0 : _f[0].is_corporate_still_involved_in_trust).to.equal(true);
        }));
        it("should return OverseasEntity object from mapOverseasEntityResource method with trust corporate still involved flag set to yes", () => __awaiter(void 0, void 0, void 0, function* () {
            var _g, _h;
            const overseasEntityResource = {
                trusts: mockValues.TRUSTS_RESOURCE_MOCK
            };
            const trustCorporatesResource = overseasEntityResource.trusts[0].CORPORATE;
            trustCorporatesResource[0].is_corporate_still_involved_in_trust = true;
            const overseasEntity = mapping_2.mapOverseasEntityResource(overseasEntityResource);
            chai_1.expect((_h = (_g = overseasEntity.trusts) === null || _g === void 0 ? void 0 : _g[0].CORPORATES) === null || _h === void 0 ? void 0 : _h[0].still_involved).to.equal("Yes");
        }));
        it("should return OverseasEntityResource object from mapOverseasEntity method with trust corporate still involved flag set to false", () => __awaiter(void 0, void 0, void 0, function* () {
            var _j, _k, _l, _m;
            const overseasEntity = {
                trusts: mockValues.TRUSTS_MOCK
            };
            const trustCorporates = overseasEntity.trusts[0].CORPORATES;
            trustCorporates[0].still_involved = "No";
            const overseasEntityResource = mapping_2.mapOverseasEntity(overseasEntity);
            chai_1.expect((_k = (_j = overseasEntityResource.trusts) === null || _j === void 0 ? void 0 : _j[0].CORPORATE) === null || _k === void 0 ? void 0 : _k[0].is_corporate_still_involved_in_trust).to.equal(false);
            chai_1.expect((_m = (_l = overseasEntityResource.trusts) === null || _l === void 0 ? void 0 : _l[0].CORPORATE) === null || _m === void 0 ? void 0 : _m[0].ceased_date).to.equal("2005-09-01");
        }));
        it("should return OverseasEntity object from mapOverseasEntityResource method with trust corporate still involved flag set to no", () => __awaiter(void 0, void 0, void 0, function* () {
            var _o, _p, _q, _r, _s, _t, _u, _v;
            const overseasEntityResource = {
                trusts: mockValues.TRUSTS_RESOURCE_MOCK
            };
            const trustCorporatesResource = overseasEntityResource.trusts[0].CORPORATE;
            trustCorporatesResource[0].is_corporate_still_involved_in_trust = false;
            const overseasEntity = mapping_2.mapOverseasEntityResource(overseasEntityResource);
            chai_1.expect((_p = (_o = overseasEntity.trusts) === null || _o === void 0 ? void 0 : _o[0].CORPORATES) === null || _p === void 0 ? void 0 : _p[0].still_involved).to.equal("No");
            chai_1.expect((_r = (_q = overseasEntity.trusts) === null || _q === void 0 ? void 0 : _q[0].CORPORATES) === null || _r === void 0 ? void 0 : _r[0].ceased_date_day).to.equal("1");
            chai_1.expect((_t = (_s = overseasEntity.trusts) === null || _s === void 0 ? void 0 : _s[0].CORPORATES) === null || _t === void 0 ? void 0 : _t[0].ceased_date_month).to.equal("9");
            chai_1.expect((_v = (_u = overseasEntity.trusts) === null || _u === void 0 ? void 0 : _u[0].CORPORATES) === null || _v === void 0 ? void 0 : _v[0].ceased_date_year).to.equal("2005");
        }));
        it("should return error 400 (Bad Request) for getCorporateTrusteesPrivateData method", () => __awaiter(void 0, void 0, void 0, function* () {
            sinon_1.default.stub(mockValues.requestClient, "httpGet").resolves({
                status: 400,
                error: mockValues.BAD_REQUEST
            });
            const oeService = new overseas_entities_1.OverseasEntityService(mockValues.requestClient);
            const data = yield oeService.getCorporateTrustees(mockValues.TRANSACTION_ID, mockValues.OVERSEAS_ENTITY_ID, mockValues.PRIVATE_TRUSTS_DATA_ID_MOCK);
            chai_1.expect(data.httpStatusCode).to.equal(400);
            chai_1.expect(data.errors[0]).to.deep.equal(mockValues.BAD_REQUEST);
        }));
        it("should pass camel case though but convert snake case for trust retrieval", () => {
            const response = [
                {
                    hashedTrusteeId: "123",
                    trusteeForename1: "test",
                    trusteeForename2: undefined,
                    trustee_surname: "Smith",
                    serviceAddress: {
                        address_line_1: "line1",
                        addressLine2: "line2"
                    },
                    usual_residential_address: {
                        addressLine1: "lineA",
                        address_line_2: "lineB"
                    }
                }
            ];
            const mappedResponse = mapping_1.default.camelCaseKeys(response);
            chai_1.expect(mappedResponse).to.deep.equal([
                {
                    hashedTrusteeId: "123",
                    trusteeForename1: "test",
                    trusteeForename2: undefined,
                    trusteeSurname: "Smith",
                    serviceAddress: {
                        addressLine1: "line1",
                        addressLine2: "line2"
                    },
                    usualResidentialAddress: {
                        addressLine1: "lineA",
                        addressLine2: "lineB"
                    }
                }
            ]);
        });
    });
});
//# sourceMappingURL=overseas.entities.spec.js.map