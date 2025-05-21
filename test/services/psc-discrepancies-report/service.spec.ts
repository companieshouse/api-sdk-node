import chai from "chai";
import sinon from "sinon";

import PscDiscrepancyReportService from "../../../src/services/psc-discrepancies-report/service";
import { RequestClient } from "../../../src/http";
import { PSCDiscrepancyReport } from "../../../src/services/psc-discrepancies-report/types";
import { ApiResponse, ApiErrorResponse, ApiError } from "../../../src/services/resource";
import { Result, failure } from "../../../src/services/result";
const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

const mockResponseBodyComplete: PSCDiscrepancyReport = {
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

const mockResponseBodyCreate: any = (
    {
        links: {
            self: "/psc-discrepancy-reports/3fbf9243-38c7-422a-91cc-009fa3b065a6"
        },
        etag: "0c4cd8b723080d2be59b451e5d258a2215db469f",
        kind: "psc_discrepancy_report#psc_discrepancy_report",
        material_discrepancies: ["1", "2"],
        obliged_entity_email: "Æ",
        obliged_entity_type: "2"
    }
)

const genericApiError: ApiError = {
    error: "An error occurred"
};

const REPORT_ID = "REPORT_ID";
const MATERIAL_DISCREPANCIES = ["1", "2"];

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

    it("Fully mocked Test", async () => {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const mockResult: Result<ApiResponse<PSCDiscrepancyReport>, ApiErrorResponse> = failure(null);

        const pscDiscrepancyReportService: PscDiscrepancyReportService = new PscDiscrepancyReportService(requestClient);

        const mockProcess = sinon.stub(pscDiscrepancyReportService.utility, "processResponse").resolves(mockResult)

        const result = await pscDiscrepancyReportService.getReport(REPORT_ID);

        expect(result).toBe(mockResult)

        expect(mockRequest).toHaveBeenCalledWith("/psc-discrepancy-reports/" + REPORT_ID)
        expect(mockProcess).toHaveBeenCalledWith(mockGetResponse)
    })

    it("returns an error response on failure", async () => {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);

        const pscDiscrepancyReportService: PscDiscrepancyReportService = new PscDiscrepancyReportService(requestClient);

        const result = await pscDiscrepancyReportService.getReport(REPORT_ID);

        expect(result.isFailure()).toBe(true);

        const data = result.value as ApiErrorResponse;

        expect(data.httpStatusCode).toBe(401);
        expect(JSON.stringify(data.errors)).toBe(JSON.stringify([genericApiError]));
    });

    it(
        "maps the psc discrepancy report field data items correctly when optional fields are missing",
        async () => {
            const mockGetResponse = {
                status: 200,
                body: mockResponseBodyCreate
            };

            const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
            const pscDiscrepancyReportService: PscDiscrepancyReportService = new PscDiscrepancyReportService(requestClient);
            const result = await pscDiscrepancyReportService.getReport(REPORT_ID);

            expect(result.isFailure()).toBe(false);
            expect(result.isSuccess()).toBe(true);

            const data = result.value as ApiResponse<PSCDiscrepancyReport>;

            expect(data.httpStatusCode).toBe(200);
            expect(data.resource.etag).toBe(mockResponseBodyCreate.etag);
            expect(data.resource.obliged_entity_organisation_name).toBe(mockResponseBodyCreate.obliged_entity_organisation_name);
            expect(data.resource.kind).toBe(mockResponseBodyCreate.kind);
            expect(data.resource.material_discrepancies).toBe(mockResponseBodyCreate.material_discrepancies);
            expect(data.resource.obliged_entity_name).toBe(mockResponseBodyCreate.obliged_entity_name);
            expect(data.resource.obliged_entity_contact_name).toBe(mockResponseBodyCreate.obliged_entity_contact_name);
            expect(data.resource.obliged_entity_email).toBe(mockResponseBodyCreate.obliged_entity_email);
            expect(data.resource.obliged_entity_telephone_number).toBe(mockResponseBodyCreate.obliged_entity_telephone_number);
            expect(data.resource.obliged_entity_type).toBe(mockResponseBodyCreate.obliged_entity_type);
            expect(data.resource.company_number).toBe(mockResponseBodyCreate.company_number);
            expect(data.resource.submission_reference).toBe(mockResponseBodyCreate.submission_reference);
            expect(data.resource.status).toBe(mockResponseBodyCreate.status);
            expect(data.resource.links.self).toBe(mockResponseBodyCreate.links.self);
        }
    );
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

    it("Fully mocked Test", async () => {
        const mockPostResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon.stub(requestClient, "httpPost").resolves(mockPostResponse);
        const mockResult: Result<ApiResponse<PSCDiscrepancyReport>, ApiErrorResponse> = failure(null);

        const pscDiscrepancyReportService: PscDiscrepancyReportService = new PscDiscrepancyReportService(requestClient);

        const mockProcess = sinon.stub(pscDiscrepancyReportService.utility, "processResponse").resolves(mockResult)

        const result = await pscDiscrepancyReportService.createNewReport(MATERIAL_DISCREPANCIES);

        expect(result).toBe(mockResult)

        expect(mockRequest).toHaveBeenCalledWith("/psc-discrepancy-reports")
        expect(mockProcess).toHaveBeenCalledWith(mockPostResponse)
    })

    it("returns an error response on failure", async () => {
        const mockPostResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon.stub(requestClient, "httpPost").resolves(mockPostResponse);

        const pscDiscrepancyReportService: PscDiscrepancyReportService = new PscDiscrepancyReportService(requestClient);
        const result = await pscDiscrepancyReportService.createNewReport(MATERIAL_DISCREPANCIES);

        expect(result.isFailure()).toBe(true);

        const data = result.value as ApiErrorResponse;

        expect(data.httpStatusCode).toBe(401);
        expect(JSON.stringify(data.errors)).toBe(JSON.stringify([genericApiError]));
    });
    it(
        "returns a correctly mapped error response on validation failure",
        async () => {
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
            }
            const expectedError: ApiError = {
                error: "material_discrepancies contains an invalid subfield",
                location: "material_discrepancies",
                locationType: "request-body",
                type: "ch:validation"
            }

            const mockRequest = sinon.stub(requestClient, "httpPost").resolves(validationError);

            const pscDiscrepancyReportService: PscDiscrepancyReportService = new PscDiscrepancyReportService(requestClient);
            const result = await pscDiscrepancyReportService.createNewReport(MATERIAL_DISCREPANCIES);

            expect(result.isFailure()).toBe(true);

            const data = result.value as ApiErrorResponse;

            expect(data.httpStatusCode).toBe(400);
            expect(JSON.stringify(data.errors)).toBe(JSON.stringify([expectedError]));
        }
    );

    it(
        "maps the psc discrepancy report field data items correctly when optional fields are missing",
        async () => {
            const mockPostResponse = {
                status: 200,
                body: mockResponseBodyCreate
            };

            const mockRequest = sinon.stub(requestClient, "httpPost").resolves(mockPostResponse);
            const pscDiscrepancyReportService: PscDiscrepancyReportService = new PscDiscrepancyReportService(requestClient);
            const result = await pscDiscrepancyReportService.createNewReport(MATERIAL_DISCREPANCIES);

            expect(result.isFailure()).toBe(false);
            expect(result.isSuccess()).toBe(true);

            const data = result.value as ApiResponse<PSCDiscrepancyReport>;

            expect(data.httpStatusCode).toBe(200);
            expect(data.resource.etag).toBe(mockResponseBodyCreate.etag);
            expect(data.resource.kind).toBe(mockResponseBodyCreate.kind);
            expect(data.resource.material_discrepancies).toBe(mockResponseBodyCreate.material_discrepancies);
            expect(data.resource.status).toBe(mockResponseBodyCreate.status);
            expect(data.resource.obliged_entity_type).toBe(mockResponseBodyCreate.obliged_entity_type);
            expect(data.resource.obliged_entity_email).toBe(mockResponseBodyCreate.obliged_entity_email);
            expect(data.resource.links.self).toBe(mockResponseBodyCreate.links.self);
            expect(data.resource.obliged_entity_organisation_name).toBeUndefined();
            expect(data.resource.obliged_entity_name).toBeUndefined();
            expect(data.resource.obliged_entity_contact_name).toBeUndefined();
            expect(data.resource.obliged_entity_telephone_number).toBeUndefined();
            expect(data.resource.company_number).toBeUndefined();
            expect(data.resource.submission_reference).toBeUndefined();
        }
    );
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

    it("Fully mocked Test", async () => {
        const mockPutResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon.stub(requestClient, "httpPut").resolves(mockPutResponse);
        const mockResult: Result<ApiResponse<PSCDiscrepancyReport>, ApiErrorResponse> = failure(null);

        const pscDiscrepancyReportService: PscDiscrepancyReportService = new PscDiscrepancyReportService(requestClient);

        const mockProcess = sinon.stub(pscDiscrepancyReportService.utility, "processResponse").resolves(mockResult)

        const result = await pscDiscrepancyReportService.updateReport(REPORT_ID, mockResponseBodyComplete);

        expect(result).toBe(mockResult)

        expect(mockRequest).toHaveBeenCalledWith("/psc-discrepancy-reports/" + REPORT_ID, mockResponseBodyComplete)
        expect(mockProcess).toHaveBeenCalledWith(mockPutResponse)
    })

    it("returns an error response on failure", async () => {
        const mockPutResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon.stub(requestClient, "httpPut").resolves(mockPutResponse);

        const pscDiscrepancyReportService: PscDiscrepancyReportService = new PscDiscrepancyReportService(requestClient);
        const result = await pscDiscrepancyReportService.updateReport(REPORT_ID, mockResponseBodyComplete);

        expect(result.isFailure()).toBe(true);

        const data = result.value as ApiErrorResponse;

        expect(data.httpStatusCode).toBe(401);
        expect(JSON.stringify(data.errors)).toBe(JSON.stringify([genericApiError]));
    });

    it(
        "maps the psc discrepancy report field data items correctly when optional fields are missing",
        async () => {
            const mockPutResponse = {
                status: 200,
                body: mockResponseBodyComplete
            };

            const mockRequest = sinon.stub(requestClient, "httpPut").resolves(mockPutResponse);
            const pscDiscrepancyReportService: PscDiscrepancyReportService = new PscDiscrepancyReportService(requestClient);
            const result = await pscDiscrepancyReportService.updateReport(REPORT_ID, mockResponseBodyComplete);

            expect(result.isFailure()).toBe(false);
            expect(result.isSuccess()).toBe(true);

            const data = result.value as ApiResponse<PSCDiscrepancyReport>;

            expect(data.httpStatusCode).toBe(200);
            expect(data.resource.etag).toBe(mockResponseBodyComplete.etag);
            expect(data.resource.kind).toBe(mockResponseBodyComplete.kind);
            expect(data.resource.material_discrepancies).toBe(mockResponseBodyComplete.material_discrepancies);
            expect(data.resource.status).toBe(mockResponseBodyComplete.status);
            expect(data.resource.obliged_entity_type).toBe(mockResponseBodyComplete.obliged_entity_type);
            expect(data.resource.obliged_entity_email).toBe(mockResponseBodyComplete.obliged_entity_email);
            expect(data.resource.links.self).toBe(mockResponseBodyComplete.links.self);
            expect(data.resource.obliged_entity_organisation_name).toBe(mockResponseBodyComplete.obliged_entity_organisation_name);
            expect(data.resource.obliged_entity_name).toBe(mockResponseBodyComplete.obliged_entity_name);
            expect(data.resource.obliged_entity_contact_name).toBe(mockResponseBodyComplete.obliged_entity_contact_name);
            expect(data.resource.obliged_entity_telephone_number).toBe(mockResponseBodyComplete.obliged_entity_telephone_number);
            expect(data.resource.company_number).toBe(mockResponseBodyComplete.company_number);
            expect(data.resource.submission_reference).toBe(mockResponseBodyComplete.submission_reference);
        }
    );
})
