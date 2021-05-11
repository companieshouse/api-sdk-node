import chai from "chai";
import sinon from "sinon";

import PscDiscrepancyService from "../../../src/services/psc-discrepancies/service";
import { RequestClient } from "../../../src/http";
import { PscDiscrepancy } from "../../../src/services/psc-discrepancies/types";
import { prototype } from "module";
const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

const mockResponseBodyComplete: PscDiscrepancy = ({
    links: {
        self: "/psc-discrepancy-reports/fac191b2-fb28-43f4-a963-00deed13ff50/discrepancies/294fc59f-3d64-4b49-a1fd-64c6d5becd99",
        psc_discrepancy_report: "/psc-discrepancy-reports/fac191b2-fb28-43f4-a963-00deed13ff50"
    },
    etag: "0d4cce4b87c518cf2464bec3362604bb65267958",
    kind: "psc_discrepancy#psc_discrepancy_report",
    details: "Æ",
    psc_name: "Æ",
    psc_date_of_birth: "Æ"
});

const mockResponseBodyArray: PscDiscrepancy[] = [
    mockResponseBodyComplete,
    mockResponseBodyComplete
]

const mockResponseBodyCreate: any = ({
    details: "Æ",
    psc_name: "Æ",
    psc_date_of_birth: "Æ"
});

const REPORT_SELF_LINK = "REPORT_SELF_LINK";
const DISCREPANCY_SELF_LINK = "DISCREPANCY_SELF_LINK"

describe("Get All Psc Discrepancies", () => {
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

        const pscDiscrepancyReportService: PscDiscrepancyService = new PscDiscrepancyService(requestClient);
        const data = await pscDiscrepancyReportService.getPscDiscrepanciesForReport(REPORT_SELF_LINK);

        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    });

    it("maps the psc discrepancy field data items correctly when optional fields are missing", async () => {
        const mockGetResponse = {
            status: 200,
            body: mockResponseBodyArray
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const pscDiscrepancyReportService: PscDiscrepancyService = new PscDiscrepancyService(requestClient);
        const data = await pscDiscrepancyReportService.getPscDiscrepanciesForReport(REPORT_SELF_LINK);

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.length).to.equal(2);
        data.resource.forEach(res => {
            expect(res.etag).to.equal(mockResponseBodyComplete.etag);
            expect(res.kind).to.equal(mockResponseBodyComplete.kind);
            expect(res.details).to.equal(mockResponseBodyComplete.details);
            expect(res.psc_date_of_birth).to.equal(mockResponseBodyComplete.psc_date_of_birth);
            expect(res.psc_name).to.equal(mockResponseBodyComplete.psc_name);
            expect(res.links.self).to.equal(mockResponseBodyComplete.links.self);
            expect(res.links.psc_discrepancy_report).to.equal(mockResponseBodyComplete.links.psc_discrepancy_report);
        })
    });
})

describe("Get Psc Discrepancies", () => {
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

        const pscDiscrepancyReportService: PscDiscrepancyService = new PscDiscrepancyService(requestClient);
        const data = await pscDiscrepancyReportService.getPscDiscrepancy(DISCREPANCY_SELF_LINK);

        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    });

    it("maps the psc discrepancy field data items correctly when optional fields are missing", async () => {
        const mockGetResponse = {
            status: 200,
            body: mockResponseBodyComplete
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const pscDiscrepancyReportService: PscDiscrepancyService = new PscDiscrepancyService(requestClient);
        const data = await pscDiscrepancyReportService.getPscDiscrepancy(DISCREPANCY_SELF_LINK);

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.etag).to.equal(mockResponseBodyComplete.etag);
        expect(data.resource.kind).to.equal(mockResponseBodyComplete.kind);
        expect(data.resource.details).to.equal(mockResponseBodyComplete.details);
        expect(data.resource.psc_date_of_birth).to.equal(mockResponseBodyComplete.psc_date_of_birth);
        expect(data.resource.psc_name).to.equal(mockResponseBodyComplete.psc_name);
        expect(data.resource.links.self).to.equal(mockResponseBodyComplete.links.self);
        expect(data.resource.links.psc_discrepancy_report).to.equal(mockResponseBodyComplete.links.psc_discrepancy_report);
    });
})

describe("Create Psc Discrepancy", () => {
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

        const pscDiscrepancyReportService: PscDiscrepancyService = new PscDiscrepancyService(requestClient);
        const data = await pscDiscrepancyReportService.createPscDiscrepancy(REPORT_SELF_LINK, mockResponseBodyCreate);

        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    });

    it("maps the psc discrepancy field data items correctly when optional fields are missing", async () => {
        const mockGetResponse = {
            status: 200,
            body: mockResponseBodyComplete
        };

        const mockRequest = sinon.stub(requestClient, "httpPost").resolves(mockGetResponse);
        const pscDiscrepancyReportService: PscDiscrepancyService = new PscDiscrepancyService(requestClient);
        const data = await pscDiscrepancyReportService.createPscDiscrepancy(REPORT_SELF_LINK, mockResponseBodyCreate);

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.etag).to.equal(mockResponseBodyComplete.etag);
        expect(data.resource.kind).to.equal(mockResponseBodyComplete.kind);
        expect(data.resource.details).to.equal(mockResponseBodyComplete.details);
        expect(data.resource.psc_date_of_birth).to.equal(mockResponseBodyComplete.psc_date_of_birth);
        expect(data.resource.psc_name).to.equal(mockResponseBodyComplete.psc_name);
        expect(data.resource.links.self).to.equal(mockResponseBodyComplete.links.self);
        expect(data.resource.links.psc_discrepancy_report).to.equal(mockResponseBodyComplete.links.psc_discrepancy_report);
    });
})
