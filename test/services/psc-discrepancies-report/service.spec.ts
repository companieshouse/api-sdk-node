import chai from "chai";
import sinon from "sinon";

import PscDiscrepancyReportService from "../../../src/services/psc-discrepancies-report/service";
import { RequestClient } from "../../../src/http";
import { PSCDiscrepancyReport } from "../../../src/services/psc-discrepancies-report/types";
const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

const mockResponseBodyComplete: PSCDiscrepancyReport = ({
    links: {
        self: "/psc-discrepancy-reports/573a4369-c29d-44d7-9580-e52f85c4a19b"
    },
    etag: "fa1774742515a04204dc105520cee4a4b8d2fc37",
    kind: "psc_discrepancy_report#psc_discrepancy_report",
    obliged_entity_organisation_name: "orgName",
    obliged_entity_telephone_number: "telephone",
    obliged_entity_contact_name: "contactName",
    obliged_entity_name: "obligedEntity",
    obliged_entity_email: "demo@ch.gov.uk",
    obliged_entity_type: "2",
    company_number: "00006400",
    submission_reference: "1755-1223-1316-1244",
    status: "COMPLETE"
});

const mockResponseBodyCreate: any = (
    {
        links: {
            self: "/psc-discrepancy-reports/3fbf9243-38c7-422a-91cc-009fa3b065a6"
        },
        etag: "0c4cd8b723080d2be59b451e5d258a2215db469f",
        kind: "psc_discrepancy_report#psc_discrepancy_report",
        obliged_entity_email: "Æ",
        obliged_entity_type: "2"
    }
)

const REPORT_ID = "REPORT_ID";

describe("Get Psc Discrepancy Report", () => {
    beforeEach(() => {
        sinon.reset();
        sinon.restore();
    });

    afterEach(done => {
        sinon.reset();
        sinon.restore();
        done();
    });

    it("returns an error response on failure", async () => {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);

        const pscDiscrepancyReportService: PscDiscrepancyReportService = new PscDiscrepancyReportService(requestClient);
        const data = await pscDiscrepancyReportService.getReport(REPORT_ID);

        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    });

    it("maps the psc discrepancy report field data items correctly when optional fields are missing", async () => {
        const mockGetResponse = {
            status: 200,
            body: mockResponseBodyCreate
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const pscDiscrepancyReportService: PscDiscrepancyReportService = new PscDiscrepancyReportService(requestClient);
        const data = await pscDiscrepancyReportService.getReport(REPORT_ID);

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.etag).to.equal(mockResponseBodyCreate.etag);
        expect(data.resource.obliged_entity_organisation_name).to.equal(mockResponseBodyCreate.obliged_entity_organisation_name);
        expect(data.resource.kind).to.equal(mockResponseBodyCreate.kind);
        expect(data.resource.obliged_entity_name).to.equal(mockResponseBodyCreate.obliged_entity_name);
        expect(data.resource.obliged_entity_contact_name).to.equal(mockResponseBodyCreate.obliged_entity_contact_name);
        expect(data.resource.obliged_entity_email).to.equal(mockResponseBodyCreate.obliged_entity_email);
        expect(data.resource.obliged_entity_telephone_number).to.equal(mockResponseBodyCreate.obliged_entity_telephone_number);
        expect(data.resource.obliged_entity_type).to.equal(mockResponseBodyCreate.obliged_entity_type);
        expect(data.resource.company_number).to.equal(mockResponseBodyCreate.company_number);
        expect(data.resource.submission_reference).to.equal(mockResponseBodyCreate.submission_reference);
        expect(data.resource.status).to.equal(mockResponseBodyCreate.status);
        expect(data.resource.links.self).to.equal(mockResponseBodyCreate.links.self);
    });
})

describe("Create Psc Discrepancy Report", () => {
    beforeEach(() => {
        sinon.reset();
        sinon.restore();
    });

    afterEach(done => {
        sinon.reset();
        sinon.restore();
        done();
    });

    it("returns an error response on failure", async () => {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon.stub(requestClient, "httpPost").resolves(mockGetResponse);

        const pscDiscrepancyReportService: PscDiscrepancyReportService = new PscDiscrepancyReportService(requestClient);
        const data = await pscDiscrepancyReportService.createNewReport(REPORT_ID);

        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    });

    it("maps the psc discrepancy report field data items correctly when optional fields are missing", async () => {
        const mockGetResponse = {
            status: 200,
            body: mockResponseBodyCreate
        };

        const mockRequest = sinon.stub(requestClient, "httpPost").resolves(mockGetResponse);
        const pscDiscrepancyReportService: PscDiscrepancyReportService = new PscDiscrepancyReportService(requestClient);
        const data = await pscDiscrepancyReportService.createNewReport(REPORT_ID);

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.etag).to.equal(mockResponseBodyCreate.etag);
        expect(data.resource.kind).to.equal(mockResponseBodyCreate.kind);
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
    });
})

describe("Update Psc Discrepancy Report", () => {
    beforeEach(() => {
        sinon.reset();
        sinon.restore();
    });

    afterEach(done => {
        sinon.reset();
        sinon.restore();
        done();
    });

    it("returns an error response on failure", async () => {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon.stub(requestClient, "httpPut").resolves(mockGetResponse);

        const pscDiscrepancyReportService: PscDiscrepancyReportService = new PscDiscrepancyReportService(requestClient);
        const data = await pscDiscrepancyReportService.updateReport(REPORT_ID, mockResponseBodyComplete);

        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    });

    it("maps the psc discrepancy report field data items correctly when optional fields are missing", async () => {
        const mockGetResponse = {
            status: 200,
            body: mockResponseBodyComplete
        };

        const mockRequest = sinon.stub(requestClient, "httpPut").resolves(mockGetResponse);
        const pscDiscrepancyReportService: PscDiscrepancyReportService = new PscDiscrepancyReportService(requestClient);
        const data = await pscDiscrepancyReportService.updateReport(REPORT_ID, mockResponseBodyComplete);

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.etag).to.equal(mockResponseBodyComplete.etag);
        expect(data.resource.kind).to.equal(mockResponseBodyComplete.kind);
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
    });
})
