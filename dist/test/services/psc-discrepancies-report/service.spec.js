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
const service_1 = __importDefault(require("../../../src/services/psc-discrepancies-report/service"));
const http_1 = require("../../../src/http");
const result_1 = require("../../../src/services/result");
const expect = chai_1.default.expect;
const requestClient = new http_1.RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
const mockResponseBodyComplete = {
    links: {
        self: "/psc-discrepancy-reports/573a4369-c29d-44d7-9580-e52f85c4a19b"
    },
    etag: "fa1774742515a04204dc105520cee4a4b8d2fc37",
    kind: "psc_discrepancy_report#psc_discrepancy_report",
    material_discrepancies: ["1", "2"],
    obliged_entity_organisation_name: "orgName",
    obliged_entity_telephone_number: "telephone",
    obliged_entity_contact_name: "contactName",
    obliged_entity_name: "obligedEntity",
    obliged_entity_email: "demo@ch.gov.uk",
    obliged_entity_type: "2",
    company_number: "00006400",
    submission_reference: "1755-1223-1316-1244",
    status: "COMPLETE"
};
const mockResponseBodyCreate = ({
    links: {
        self: "/psc-discrepancy-reports/3fbf9243-38c7-422a-91cc-009fa3b065a6"
    },
    etag: "0c4cd8b723080d2be59b451e5d258a2215db469f",
    kind: "psc_discrepancy_report#psc_discrepancy_report",
    material_discrepancies: ["1", "2"],
    obliged_entity_email: "Æ",
    obliged_entity_type: "2"
});
const genericApiError = {
    error: "An error occurred"
};
const REPORT_ID = "REPORT_ID";
const MATERIAL_DISCREPANCIES = ["1", "2"];
describe("Get Psc Discrepancy Report", () => {
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
        const pscDiscrepancyReportService = new service_1.default(requestClient);
        const mockProcess = sinon_1.default.stub(pscDiscrepancyReportService.utility, "processResponse").resolves(mockResult);
        const result = yield pscDiscrepancyReportService.getReport(REPORT_ID);
        expect(result).to.be.equal(mockResult);
        expect(mockRequest).to.have.been.calledWith("/psc-discrepancy-reports/" + REPORT_ID);
        expect(mockProcess).to.have.been.calledWith(mockGetResponse);
    }));
    it("returns an error response on failure", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const pscDiscrepancyReportService = new service_1.default(requestClient);
        const result = yield pscDiscrepancyReportService.getReport(REPORT_ID);
        expect(result.isFailure()).to.be.true;
        const data = result.value;
        expect(data.httpStatusCode).to.equal(401);
        expect(JSON.stringify(data.errors)).to.be.equal(JSON.stringify([genericApiError]));
    }));
    it("maps the psc discrepancy report field data items correctly when optional fields are missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetResponse = {
            status: 200,
            body: mockResponseBodyCreate
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const pscDiscrepancyReportService = new service_1.default(requestClient);
        const result = yield pscDiscrepancyReportService.getReport(REPORT_ID);
        expect(result.isFailure()).to.be.false;
        expect(result.isSuccess()).to.be.true;
        const data = result.value;
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.etag).to.equal(mockResponseBodyCreate.etag);
        expect(data.resource.obliged_entity_organisation_name).to.equal(mockResponseBodyCreate.obliged_entity_organisation_name);
        expect(data.resource.kind).to.equal(mockResponseBodyCreate.kind);
        expect(data.resource.material_discrepancies).to.equal(mockResponseBodyCreate.material_discrepancies);
        expect(data.resource.obliged_entity_name).to.equal(mockResponseBodyCreate.obliged_entity_name);
        expect(data.resource.obliged_entity_contact_name).to.equal(mockResponseBodyCreate.obliged_entity_contact_name);
        expect(data.resource.obliged_entity_email).to.equal(mockResponseBodyCreate.obliged_entity_email);
        expect(data.resource.obliged_entity_telephone_number).to.equal(mockResponseBodyCreate.obliged_entity_telephone_number);
        expect(data.resource.obliged_entity_type).to.equal(mockResponseBodyCreate.obliged_entity_type);
        expect(data.resource.company_number).to.equal(mockResponseBodyCreate.company_number);
        expect(data.resource.submission_reference).to.equal(mockResponseBodyCreate.submission_reference);
        expect(data.resource.status).to.equal(mockResponseBodyCreate.status);
        expect(data.resource.links.self).to.equal(mockResponseBodyCreate.links.self);
    }));
});
describe("Create Psc Discrepancy Report", () => {
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
        const pscDiscrepancyReportService = new service_1.default(requestClient);
        const mockProcess = sinon_1.default.stub(pscDiscrepancyReportService.utility, "processResponse").resolves(mockResult);
        const result = yield pscDiscrepancyReportService.createNewReport(MATERIAL_DISCREPANCIES);
        expect(result).to.be.equal(mockResult);
        expect(mockRequest).to.have.been.calledWith("/psc-discrepancy-reports");
        expect(mockProcess).to.have.been.calledWith(mockPostResponse);
    }));
    it("returns an error response on failure", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPostResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpPost").resolves(mockPostResponse);
        const pscDiscrepancyReportService = new service_1.default(requestClient);
        const result = yield pscDiscrepancyReportService.createNewReport(MATERIAL_DISCREPANCIES);
        expect(result.isFailure()).to.be.true;
        const data = result.value;
        expect(data.httpStatusCode).to.equal(401);
        expect(JSON.stringify(data.errors)).to.be.equal(JSON.stringify([genericApiError]));
    }));
    it("returns a correctly mapped error response on validation failure", () => __awaiter(void 0, void 0, void 0, function* () {
        const validationError = {
            status: 400,
            error: {
                errors: [
                    {
                        error: "material_discrepancies contains an invalid subfield",
                        location: "material_discrepancies",
                        location_type: "request-body",
                        type: "ch:validation"
                    }
                ]
            }
        };
        const expectedError = {
            error: "material_discrepancies contains an invalid subfield",
            location: "material_discrepancies",
            locationType: "request-body",
            type: "ch:validation"
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpPost").resolves(validationError);
        const pscDiscrepancyReportService = new service_1.default(requestClient);
        const result = yield pscDiscrepancyReportService.createNewReport(MATERIAL_DISCREPANCIES);
        expect(result.isFailure()).to.be.true;
        const data = result.value;
        expect(data.httpStatusCode).to.equal(400);
        expect(JSON.stringify(data.errors)).to.be.equal(JSON.stringify([expectedError]));
    }));
    it("maps the psc discrepancy report field data items correctly when optional fields are missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPostResponse = {
            status: 200,
            body: mockResponseBodyCreate
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpPost").resolves(mockPostResponse);
        const pscDiscrepancyReportService = new service_1.default(requestClient);
        const result = yield pscDiscrepancyReportService.createNewReport(MATERIAL_DISCREPANCIES);
        expect(result.isFailure()).to.be.false;
        expect(result.isSuccess()).to.be.true;
        const data = result.value;
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.etag).to.equal(mockResponseBodyCreate.etag);
        expect(data.resource.kind).to.equal(mockResponseBodyCreate.kind);
        expect(data.resource.material_discrepancies).to.equal(mockResponseBodyCreate.material_discrepancies);
        expect(data.resource.status).to.equal(mockResponseBodyCreate.status);
        expect(data.resource.obliged_entity_type).to.equal(mockResponseBodyCreate.obliged_entity_type);
        expect(data.resource.obliged_entity_email).to.equal(mockResponseBodyCreate.obliged_entity_email);
        expect(data.resource.links.self).to.equal(mockResponseBodyCreate.links.self);
        expect(data.resource.obliged_entity_organisation_name).to.be.undefined;
        expect(data.resource.obliged_entity_name).to.be.undefined;
        expect(data.resource.obliged_entity_contact_name).to.be.undefined;
        expect(data.resource.obliged_entity_telephone_number).to.be.undefined;
        expect(data.resource.company_number).to.be.undefined;
        expect(data.resource.submission_reference).to.be.undefined;
    }));
});
describe("Update Psc Discrepancy Report", () => {
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
        const mockPutResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpPut").resolves(mockPutResponse);
        const mockResult = result_1.failure(null);
        const pscDiscrepancyReportService = new service_1.default(requestClient);
        const mockProcess = sinon_1.default.stub(pscDiscrepancyReportService.utility, "processResponse").resolves(mockResult);
        const result = yield pscDiscrepancyReportService.updateReport(REPORT_ID, mockResponseBodyComplete);
        expect(result).to.be.equal(mockResult);
        expect(mockRequest).to.have.been.calledWith("/psc-discrepancy-reports/" + REPORT_ID, mockResponseBodyComplete);
        expect(mockProcess).to.have.been.calledWith(mockPutResponse);
    }));
    it("returns an error response on failure", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPutResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpPut").resolves(mockPutResponse);
        const pscDiscrepancyReportService = new service_1.default(requestClient);
        const result = yield pscDiscrepancyReportService.updateReport(REPORT_ID, mockResponseBodyComplete);
        expect(result.isFailure()).to.be.true;
        const data = result.value;
        expect(data.httpStatusCode).to.equal(401);
        expect(JSON.stringify(data.errors)).to.be.equal(JSON.stringify([genericApiError]));
    }));
    it("maps the psc discrepancy report field data items correctly when optional fields are missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPutResponse = {
            status: 200,
            body: mockResponseBodyComplete
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpPut").resolves(mockPutResponse);
        const pscDiscrepancyReportService = new service_1.default(requestClient);
        const result = yield pscDiscrepancyReportService.updateReport(REPORT_ID, mockResponseBodyComplete);
        expect(result.isFailure()).to.be.false;
        expect(result.isSuccess()).to.be.true;
        const data = result.value;
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.etag).to.equal(mockResponseBodyComplete.etag);
        expect(data.resource.kind).to.equal(mockResponseBodyComplete.kind);
        expect(data.resource.material_discrepancies).to.equal(mockResponseBodyComplete.material_discrepancies);
        expect(data.resource.status).to.equal(mockResponseBodyComplete.status);
        expect(data.resource.obliged_entity_type).to.equal(mockResponseBodyComplete.obliged_entity_type);
        expect(data.resource.obliged_entity_email).to.equal(mockResponseBodyComplete.obliged_entity_email);
        expect(data.resource.links.self).to.equal(mockResponseBodyComplete.links.self);
        expect(data.resource.obliged_entity_organisation_name).to.equal(mockResponseBodyComplete.obliged_entity_organisation_name);
        expect(data.resource.obliged_entity_name).to.equal(mockResponseBodyComplete.obliged_entity_name);
        expect(data.resource.obliged_entity_contact_name).to.equal(mockResponseBodyComplete.obliged_entity_contact_name);
        expect(data.resource.obliged_entity_telephone_number).to.equal(mockResponseBodyComplete.obliged_entity_telephone_number);
        expect(data.resource.company_number).to.equal(mockResponseBodyComplete.company_number);
        expect(data.resource.submission_reference).to.equal(mockResponseBodyComplete.submission_reference);
    }));
});
//# sourceMappingURL=service.spec.js.map