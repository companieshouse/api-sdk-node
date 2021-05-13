import chai from "chai";
import sinon from "sinon";

import PscDiscrepancyService from "../../../src/services/psc-discrepancies/service";
import { RequestClient } from "../../../src/http";
import { PscDiscrepancy } from "../../../src/services/psc-discrepancies/types";
import { ApiResponse, ApiErrorResponse, ApiError } from "../../../src/services/resource";
import { failure, Result } from "../../../src/services/result";
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

const genericApiError: ApiError = {
    error: "An error occurred"
};

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

    it("Fully mocked Test", async () => {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const mockResult: Result<ApiResponse<PscDiscrepancy>, ApiErrorResponse> = failure(null);

        const pscDiscrepancyService: PscDiscrepancyService = new PscDiscrepancyService(requestClient);

        const mockProcess = sinon.stub(pscDiscrepancyService.utility, "processResponse").resolves(mockResult)

        const result = await pscDiscrepancyService.getPscDiscrepanciesForReport(REPORT_SELF_LINK);

        expect(result).to.be.equal(mockResult);

        expect(mockRequest).to.have.been.calledWith(REPORT_SELF_LINK + "/discrepancies");
        expect(mockProcess).to.have.been.calledWith(mockGetResponse);
    })

    it("returns an error response on failure", async () => {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);

        const pscDiscrepancyService: PscDiscrepancyService = new PscDiscrepancyService(requestClient);
        const result = await pscDiscrepancyService.getPscDiscrepanciesForReport(REPORT_SELF_LINK);

        expect(result.isFailure()).to.be.true;
        expect(result.isSuccess()).to.be.false;

        const data = result.value as ApiErrorResponse;

        expect(data.httpStatusCode).to.equal(401);

        expect(JSON.stringify(data.errors)).to.be.equal(JSON.stringify([genericApiError]));
    });

    it("maps the psc discrepancy field data items correctly when optional fields are missing", async () => {
        const mockGetResponse = {
            status: 200,
            body: mockResponseBodyArray
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const pscDiscrepancyService: PscDiscrepancyService = new PscDiscrepancyService(requestClient);
        const result = await pscDiscrepancyService.getPscDiscrepanciesForReport(REPORT_SELF_LINK);

        expect(result.isFailure()).to.be.false;
        expect(result.isSuccess()).to.be.true;

        const data = result.value as ApiResponse<PscDiscrepancy[]>;

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

    it("Fully mocked Test", async () => {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const mockResult: Result<ApiResponse<PscDiscrepancy>, ApiErrorResponse> = failure(null);

        const pscDiscrepancyService: PscDiscrepancyService = new PscDiscrepancyService(requestClient);

        const mockProcess = sinon.stub(pscDiscrepancyService.utility, "processResponse").resolves(mockResult)

        const result = await pscDiscrepancyService.getPscDiscrepancy(DISCREPANCY_SELF_LINK);

        expect(result).to.be.equal(mockResult);

        expect(mockRequest).to.have.been.calledWith(DISCREPANCY_SELF_LINK);
        expect(mockProcess).to.have.been.calledWith(mockGetResponse);
    })

    it("returns an error response on failure", async () => {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);

        const pscDiscrepancyService: PscDiscrepancyService = new PscDiscrepancyService(requestClient);
        const result = await pscDiscrepancyService.getPscDiscrepancy(DISCREPANCY_SELF_LINK);

        expect(result.isFailure()).to.be.true;
        expect(result.isSuccess()).to.be.false;

        const data = result.value as ApiErrorResponse;

        expect(data.httpStatusCode).to.equal(401);
        expect(JSON.stringify(data.errors)).to.be.equal(JSON.stringify([genericApiError]));
    });

    it("maps the psc discrepancy field data items correctly when optional fields are missing", async () => {
        const mockGetResponse = {
            status: 200,
            body: mockResponseBodyComplete
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const pscDiscrepancyService: PscDiscrepancyService = new PscDiscrepancyService(requestClient);
        const result = await pscDiscrepancyService.getPscDiscrepancy(DISCREPANCY_SELF_LINK);

        const data = result.value as ApiResponse<PscDiscrepancy>;

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

    it("Fully mocked Test", async () => {
        const mockPostResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon.stub(requestClient, "httpPost").resolves(mockPostResponse);
        const mockResult: Result<ApiResponse<PscDiscrepancy>, ApiErrorResponse> = failure(null);

        const pscDiscrepancyService: PscDiscrepancyService = new PscDiscrepancyService(requestClient);

        const mockProcess = sinon.stub(pscDiscrepancyService.utility, "processResponse").resolves(mockResult)

        const result = await pscDiscrepancyService.createPscDiscrepancy(REPORT_SELF_LINK, mockResponseBodyCreate);

        expect(result).to.be.equal(mockResult);

        expect(mockRequest).to.have.been.calledWith(`${REPORT_SELF_LINK}/discrepancies`, mockResponseBodyCreate);
        expect(mockProcess).to.have.been.calledWith(mockPostResponse);
    })

    it("returns an error response on failure", async () => {
        const mockPostResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon.stub(requestClient, "httpPost").resolves(mockPostResponse);

        const pscDiscrepancyService: PscDiscrepancyService = new PscDiscrepancyService(requestClient);
        const result = await pscDiscrepancyService.createPscDiscrepancy(REPORT_SELF_LINK, mockResponseBodyCreate);

        expect(result.isFailure()).to.be.true;
        expect(result.isSuccess()).to.be.false;

        const data = result.value as ApiErrorResponse;

        expect(data.httpStatusCode).to.equal(401);
        expect(JSON.stringify(data.errors)).to.be.equal(JSON.stringify([genericApiError]));
    });

    it("maps the psc discrepancy field data items correctly when optional fields are missing", async () => {
        const mockPostResponse = {
            status: 200,
            body: mockResponseBodyComplete
        };

        const mockRequest = sinon.stub(requestClient, "httpPost").resolves(mockPostResponse);
        const pscDiscrepancyService: PscDiscrepancyService = new PscDiscrepancyService(requestClient);
        const result = await pscDiscrepancyService.createPscDiscrepancy(REPORT_SELF_LINK, mockResponseBodyCreate);

        const data = result.value as ApiResponse<PscDiscrepancy>;

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
