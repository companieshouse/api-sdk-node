import Util from "../../../src/services/psc-discrepancies-report/util";
import { HttpResponse } from "../../../src/http/index";
import { ApiResponse, ApiErrorResponse, ApiError } from "../../../src/services/resource";
import { PSCDiscrepancyReport } from "../../../src/services/psc-discrepancies-report/types";

const utility: Util = new Util();

const mockSuccessResponse: HttpResponse = {
    body: {
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
    },
    status: 200,
    headers: {
        "Content-Type": "application/json"
    }
};
const mockErrorResponseCode: HttpResponse = {
    status: 400
}
const mockGenericErrorResponse: HttpResponse = {
    status: 404,
    error: "Error:Object not found"
}
const mockApiErrorResponse: HttpResponse = {
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

describe("Process Response", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    afterEach(done => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
        done();
    });

    it(
        "returns an ApiResponse with correctly mapped fields on success",
        async () => {
            const result = utility.processResponse(mockSuccessResponse)

            expect(result.isFailure()).toBe(false);
            expect(result.isSuccess()).toBe(true);

            const data = result.value as ApiResponse<PSCDiscrepancyReport>;

            expect(data.httpStatusCode).toBe(200);
            expect(JSON.stringify(data.headers)).toBe(JSON.stringify(mockSuccessResponse.headers))
            expect(JSON.stringify(data.resource)).toBe(JSON.stringify(mockSuccessResponse.body));
        }
    );

    it(
        "returns an ApiErrorResponse with no Errors if only error status code is sent",
        async () => {
            const result = utility.processResponse(mockErrorResponseCode)

            expect(result.isFailure()).toBe(false);
            expect(result.isSuccess()).toBe(true);

            const data = result.value as ApiErrorResponse;

            expect(data.httpStatusCode).toBe(400);
            expect(JSON.stringify(data.errors)).toBeUndefined()
        }
    );

    it(
        "returns an ApiErrorResponse with a single ApiError if response body does not match APIError format",
        async () => {
            const result = utility.processResponse(mockGenericErrorResponse)

            expect(result.isFailure()).toBe(true);
            expect(result.isSuccess()).toBe(false);

            const data = result.value as ApiErrorResponse;

            expect(data.httpStatusCode).toBe(404);
            expect(data.errors).toHaveLength(1)
            expect(data.errors[0].error).toBe(mockGenericErrorResponse.error)
        }
    );

    it(
        "returns an ApiErrorResponse with ApiErrors matching response body if body does match APIError format",
        async () => {
            const expectedError: ApiError = {
                error: "material_discrepancies contains an invalid subfield",
                location: "material_discrepancies",
                locationType: "request-body",
                type: "ch:validation"
            }

            const result = utility.processResponse(mockApiErrorResponse)

            expect(result.isFailure()).toBe(true);
            expect(result.isSuccess()).toBe(false);

            const data = result.value as ApiErrorResponse;

            expect(data.httpStatusCode).toBe(400);
            expect(JSON.stringify(data.errors)).toBe(JSON.stringify([expectedError]))
        }
    );
})
