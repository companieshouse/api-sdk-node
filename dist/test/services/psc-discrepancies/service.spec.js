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
const chai_1 = __importDefault(require("chai"));
const sinon_1 = __importDefault(require("sinon"));
const service_1 = __importDefault(require("../../../src/services/psc-discrepancies/service"));
const http_1 = require("../../../src/http");
const result_1 = require("../../../src/services/result");
const expect = chai_1.default.expect;
const requestClient = new http_1.RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
const mockResponseBodyComplete = ({
    links: {
        self: "/psc-discrepancy-reports/fac191b2-fb28-43f4-a963-00deed13ff50/discrepancies/294fc59f-3d64-4b49-a1fd-64c6d5becd99",
        psc_discrepancy_report: "/psc-discrepancy-reports/fac191b2-fb28-43f4-a963-00deed13ff50"
    },
    etag: "0d4cce4b87c518cf2464bec3362604bb65267958",
    kind: "psc_discrepancy#psc_discrepancy_report",
    details: "Æ",
    psc_name: "Æ",
    psc_date_of_birth: "Æ",
    psc_type: "Æ"
});
const mockResponseBodyArray = [
    mockResponseBodyComplete,
    mockResponseBodyComplete
];
const mockResponseBodyCreate = ({
    details: "Æ",
    psc_name: "Æ",
    psc_date_of_birth: "Æ"
});
const genericApiError = {
    error: "An error occurred"
};
const REPORT_SELF_LINK = "REPORT_SELF_LINK";
const DISCREPANCY_SELF_LINK = "DISCREPANCY_SELF_LINK";
describe("Get All Psc Discrepancies", () => {
    beforeEach(() => {
        sinon_1.default.reset();
        sinon_1.default.restore();
    });
    afterEach(done => {
        sinon_1.default.reset();
        sinon_1.default.restore();
        done();
    });
    it("Fully mocked Test", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const mockResult = result_1.failure(null);
        const pscDiscrepancyService = new service_1.default(requestClient);
        const mockProcess = sinon_1.default.stub(pscDiscrepancyService.utility, "processResponse").resolves(mockResult);
        const result = yield pscDiscrepancyService.getPscDiscrepanciesForReport(REPORT_SELF_LINK);
        expect(result).to.be.equal(mockResult);
        expect(mockRequest).to.have.been.calledWith(REPORT_SELF_LINK + "/discrepancies");
        expect(mockProcess).to.have.been.calledWith(mockGetResponse);
    }));
    it("returns an error response on failure", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const pscDiscrepancyService = new service_1.default(requestClient);
        const result = yield pscDiscrepancyService.getPscDiscrepanciesForReport(REPORT_SELF_LINK);
        expect(result.isFailure()).to.be.true;
        expect(result.isSuccess()).to.be.false;
        const data = result.value;
        expect(data.httpStatusCode).to.equal(401);
        expect(JSON.stringify(data.errors)).to.be.equal(JSON.stringify([genericApiError]));
    }));
    it("maps the psc discrepancy field data items correctly when optional fields are missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetResponse = {
            status: 200,
            body: mockResponseBodyArray
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const pscDiscrepancyService = new service_1.default(requestClient);
        const result = yield pscDiscrepancyService.getPscDiscrepanciesForReport(REPORT_SELF_LINK);
        expect(result.isFailure()).to.be.false;
        expect(result.isSuccess()).to.be.true;
        const data = result.value;
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.length).to.equal(2);
        data.resource.forEach(res => {
            expect(res.etag).to.equal(mockResponseBodyComplete.etag);
            expect(res.kind).to.equal(mockResponseBodyComplete.kind);
            expect(res.details).to.equal(mockResponseBodyComplete.details);
            expect(res.psc_date_of_birth).to.equal(mockResponseBodyComplete.psc_date_of_birth);
            expect(res.psc_name).to.equal(mockResponseBodyComplete.psc_name);
            expect(res.psc_type).to.equal(mockResponseBodyComplete.psc_type);
            expect(res.links.self).to.equal(mockResponseBodyComplete.links.self);
            expect(res.links.psc_discrepancy_report).to.equal(mockResponseBodyComplete.links.psc_discrepancy_report);
        });
    }));
});
describe("Get Psc Discrepancies", () => {
    beforeEach(() => {
        sinon_1.default.reset();
        sinon_1.default.restore();
    });
    afterEach(done => {
        sinon_1.default.reset();
        sinon_1.default.restore();
        done();
    });
    it("Fully mocked Test", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const mockResult = result_1.failure(null);
        const pscDiscrepancyService = new service_1.default(requestClient);
        const mockProcess = sinon_1.default.stub(pscDiscrepancyService.utility, "processResponse").resolves(mockResult);
        const result = yield pscDiscrepancyService.getPscDiscrepancy(DISCREPANCY_SELF_LINK);
        expect(result).to.be.equal(mockResult);
        expect(mockRequest).to.have.been.calledWith(DISCREPANCY_SELF_LINK);
        expect(mockProcess).to.have.been.calledWith(mockGetResponse);
    }));
    it("returns an error response on failure", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const pscDiscrepancyService = new service_1.default(requestClient);
        const result = yield pscDiscrepancyService.getPscDiscrepancy(DISCREPANCY_SELF_LINK);
        expect(result.isFailure()).to.be.true;
        expect(result.isSuccess()).to.be.false;
        const data = result.value;
        expect(data.httpStatusCode).to.equal(401);
        expect(JSON.stringify(data.errors)).to.be.equal(JSON.stringify([genericApiError]));
    }));
    it("maps the psc discrepancy field data items correctly when optional fields are missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetResponse = {
            status: 200,
            body: mockResponseBodyComplete
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const pscDiscrepancyService = new service_1.default(requestClient);
        const result = yield pscDiscrepancyService.getPscDiscrepancy(DISCREPANCY_SELF_LINK);
        const data = result.value;
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.etag).to.equal(mockResponseBodyComplete.etag);
        expect(data.resource.kind).to.equal(mockResponseBodyComplete.kind);
        expect(data.resource.details).to.equal(mockResponseBodyComplete.details);
        expect(data.resource.psc_date_of_birth).to.equal(mockResponseBodyComplete.psc_date_of_birth);
        expect(data.resource.psc_name).to.equal(mockResponseBodyComplete.psc_name);
        expect(data.resource.psc_type).to.equal(mockResponseBodyComplete.psc_type);
        expect(data.resource.links.self).to.equal(mockResponseBodyComplete.links.self);
        expect(data.resource.links.psc_discrepancy_report).to.equal(mockResponseBodyComplete.links.psc_discrepancy_report);
    }));
});
describe("Create Psc Discrepancy", () => {
    beforeEach(() => {
        sinon_1.default.reset();
        sinon_1.default.restore();
    });
    afterEach(done => {
        sinon_1.default.reset();
        sinon_1.default.restore();
        done();
    });
    it("Fully mocked Test", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPostResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpPost").resolves(mockPostResponse);
        const mockResult = result_1.failure(null);
        const pscDiscrepancyService = new service_1.default(requestClient);
        const mockProcess = sinon_1.default.stub(pscDiscrepancyService.utility, "processResponse").resolves(mockResult);
        const result = yield pscDiscrepancyService.createPscDiscrepancy(REPORT_SELF_LINK, mockResponseBodyCreate);
        expect(result).to.be.equal(mockResult);
        expect(mockRequest).to.have.been.calledWith(`${REPORT_SELF_LINK}/discrepancies`, mockResponseBodyCreate);
        expect(mockProcess).to.have.been.calledWith(mockPostResponse);
    }));
    it("returns an error response on failure", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPostResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpPost").resolves(mockPostResponse);
        const pscDiscrepancyService = new service_1.default(requestClient);
        const result = yield pscDiscrepancyService.createPscDiscrepancy(REPORT_SELF_LINK, mockResponseBodyCreate);
        expect(result.isFailure()).to.be.true;
        expect(result.isSuccess()).to.be.false;
        const data = result.value;
        expect(data.httpStatusCode).to.equal(401);
        expect(JSON.stringify(data.errors)).to.be.equal(JSON.stringify([genericApiError]));
    }));
    it("maps the psc discrepancy field data items correctly when optional fields are missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPostResponse = {
            status: 200,
            body: mockResponseBodyComplete
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpPost").resolves(mockPostResponse);
        const pscDiscrepancyService = new service_1.default(requestClient);
        const result = yield pscDiscrepancyService.createPscDiscrepancy(REPORT_SELF_LINK, mockResponseBodyCreate);
        const data = result.value;
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.etag).to.equal(mockResponseBodyComplete.etag);
        expect(data.resource.kind).to.equal(mockResponseBodyComplete.kind);
        expect(data.resource.details).to.equal(mockResponseBodyComplete.details);
        expect(data.resource.psc_date_of_birth).to.equal(mockResponseBodyComplete.psc_date_of_birth);
        expect(data.resource.psc_name).to.equal(mockResponseBodyComplete.psc_name);
        expect(data.resource.psc_type).to.equal(mockResponseBodyComplete.psc_type);
        expect(data.resource.links.self).to.equal(mockResponseBodyComplete.links.self);
        expect(data.resource.links.psc_discrepancy_report).to.equal(mockResponseBodyComplete.links.psc_discrepancy_report);
    }));
});
//# sourceMappingURL=service.spec.js.map