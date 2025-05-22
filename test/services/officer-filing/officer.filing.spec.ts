import {
    CompanyOfficer, FilingResponse, OfficerFiling, OfficerFilingService, ValidationStatusResponse
} from "../../../src/services/officer-filing";
import * as mockValues from "./officer.filing.mock";
import Resource, { ApiErrorResponse } from "../../../src/services/resource";

const TRANSACTION_ID = "12345";
const SUBMISSION_ID = "645d1188c794645afe15f5cc";
const COMPANY_NUMBER = "00006400";

beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

afterEach(done => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
    done();
});

describe("List active Directors details GET", () => {
    it("should return active director details object", async () => {
        jest.spyOn(mockValues.requestClient, "httpGet").mockClear().mockResolvedValue(mockValues.mockGetListActiveDirectorsDetails[200]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: Resource<CompanyOfficer[]> = await ofService.getListActiveDirectorDetails(TRANSACTION_ID) as Resource<CompanyOfficer[]>;

        expect(data.httpStatusCode).toBe(200);
        expect(data.resource?.[1].dateOfBirth).toEqual(
            mockValues.mockActiveDirectorDetails.date_of_birth
        );
    });

    it(
        "should return error 404 - No active director details were found",
        async () => {
            jest.spyOn(mockValues.requestClient, "httpGet").mockClear().mockResolvedValue(mockValues.mockGetListActiveDirectorsDetails[404]);
            const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
            const data: ApiErrorResponse = await ofService.getListActiveDirectorDetails(TRANSACTION_ID);

            expect(data.httpStatusCode).toBe(404);
            expect(data.errors?.[0]).toBe("No active directors details were found");
        }
    );

    it("should return error 500 - Internal server error", async () => {
        jest.spyOn(mockValues.requestClient, "httpGet").mockClear().mockResolvedValue(mockValues.mockGetListActiveDirectorsDetails[500]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.getListActiveDirectorDetails(TRANSACTION_ID);

        expect(data.httpStatusCode).toBe(500);
        expect(data.errors?.[0]).toBe("Internal server error");
    });
});

describe("List TM01 check your answers details GET", () => {
    it("should return company officer details object", async () => {
        jest.spyOn(mockValues.requestClient, "httpGet").mockClear().mockResolvedValue(mockValues.mockGetDirectorAndTerminationDate[200]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: Resource<CompanyOfficer> = await ofService.getDirectorAndTerminationDate(TRANSACTION_ID, SUBMISSION_ID) as Resource<CompanyOfficer>;

        expect(data.httpStatusCode).toBe(200);
        expect(data.resource?.resignedOn).toEqual(mockValues.mockDirectorAndTerminationDate.resigned_on);
        expect(data.resource?.dateOfBirth).toEqual(mockValues.mockDirectorAndTerminationDate.date_of_birth);
        expect(data.resource?.appointedOn).toEqual(mockValues.mockDirectorAndTerminationDate.appointed_on);
        expect(data.resource?.officerRole).toEqual(mockValues.mockDirectorAndTerminationDate.officer_role);
        expect(data.resource?.name).toEqual(mockValues.mockDirectorAndTerminationDate.name);
    });

    it("should return error 500 - Internal server error", async () => {
        jest.spyOn(mockValues.requestClient, "httpGet").mockClear().mockResolvedValue(mockValues.mockGetDirectorAndTerminationDate[500]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.getDirectorAndTerminationDate(TRANSACTION_ID, SUBMISSION_ID);

        expect(data.httpStatusCode).toBe(500);
        expect(data.errors?.[0]).toBe("Internal server error");
    });
});

describe("Validation Status Response GET", () => {
    it("should return list of error/s and validation status", async () => {
        jest.spyOn(mockValues.requestClient, "httpGet").mockClear().mockResolvedValue(mockValues.mockGetValidationStatusResponse[200]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: Resource<ValidationStatusResponse> = await ofService.getValidationStatus(TRANSACTION_ID, SUBMISSION_ID) as Resource<ValidationStatusResponse>;

        expect(data.httpStatusCode).toBe(200);
        expect(data.resource?.errors[0].error).toBe("European public limited liability company (SE) not permitted");
        expect(data.resource?.errors[0].locationType).toBe("json-path");
        expect(data.resource?.isValid).toBe(false);
    });

    it("should return error 404 - No found", async () => {
        jest.spyOn(mockValues.requestClient, "httpGet").mockClear().mockResolvedValue(mockValues.mockGetValidationStatusResponse[404]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.getValidationStatus(TRANSACTION_ID, SUBMISSION_ID) as Resource<Boolean>;

        expect(data.httpStatusCode).toBe(404);
        expect(data.errors?.[0]).toBe("Not Found");
    });

    it("should return error 500 - Internal server error", async () => {
        jest.spyOn(mockValues.requestClient, "httpGet").mockClear().mockResolvedValue(mockValues.mockGetCurrentOrFutureDissolved[500]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.getValidationStatus(TRANSACTION_ID, SUBMISSION_ID);

        expect(data.httpStatusCode).toBe(500);
        expect(data.errors?.[0]).toBe("Internal server error");
    });
});

describe("Officer Filing GET", () => {
    it("should return an officer filing", async () => {
        jest.spyOn(mockValues.requestClient, "httpGet").mockClear().mockResolvedValue(mockValues.mockGetOfficerFiling[200]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: Resource<OfficerFiling> = await ofService.getOfficerFiling(TRANSACTION_ID, SUBMISSION_ID) as Resource<OfficerFiling>;

        expect(data.httpStatusCode).toBe(200);
        expect(data.resource?.referenceAppointmentId).toBe("app1");
        expect(data.resource?.referenceEtag).toBe("968ada7234bb1eb65778ca4c83a4a42d36669a17");
        expect(data.resource?.resignedOn).toBe("2009-08-29");
    });

    it("should return error 404 - Not found", async () => {
        jest.spyOn(mockValues.requestClient, "httpGet").mockClear().mockResolvedValue(mockValues.mockGetOfficerFiling[404]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.getOfficerFiling(TRANSACTION_ID, SUBMISSION_ID);

        expect(data.httpStatusCode).toBe(404);
        expect(data.errors?.[0]).toBe("Officer filing not found");
    });

    it("should return error 500 - Internal server error", async () => {
        jest.spyOn(mockValues.requestClient, "httpGet").mockClear().mockResolvedValue(mockValues.mockGetOfficerFiling[500]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.getOfficerFiling(TRANSACTION_ID, SUBMISSION_ID);

        expect(data.httpStatusCode).toBe(500);
        expect(data.errors?.[0]).toBe("Internal server error");
    });
});

describe("Officer Filing POST", () => {
    it("should return an officer filing", async () => {
        jest.spyOn(mockValues.requestClient, "httpPost").mockClear().mockResolvedValue(mockValues.mockPostOfficerFiling[200]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: Resource<FilingResponse> = await ofService.postOfficerFiling(TRANSACTION_ID, {}) as Resource<FilingResponse>;

        expect(data.httpStatusCode).toBe(200);
        expect(data.resource?.id).toBe("567");
        expect(data.resource?.data?.description).toBe("Update a Director");
    });

    it("should return error 404 - Not found", async () => {
        jest.spyOn(mockValues.requestClient, "httpPatch").mockClear().mockResolvedValue(mockValues.mockPatchOfficerFiling[404]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.patchOfficerFiling(TRANSACTION_ID, SUBMISSION_ID, {});

        expect(data.httpStatusCode).toBe(404);
        expect(data.errors?.[0]).toBe("Officer filing not found");
    });

    it("should return error 500 - Internal server error", async () => {
        jest.spyOn(mockValues.requestClient, "httpPatch").mockClear().mockResolvedValue(mockValues.mockPatchOfficerFiling[500]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.patchOfficerFiling(TRANSACTION_ID, SUBMISSION_ID, {});

        expect(data.httpStatusCode).toBe(500);
        expect(data.errors?.[0]).toBe("Internal server error");
    });
});

describe("Officer Filing PATCH", () => {
    it("should return an officer filing", async () => {
        jest.spyOn(mockValues.requestClient, "httpPatch").mockClear().mockResolvedValue(mockValues.mockPatchOfficerFiling[200]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: Resource<FilingResponse> = await ofService.patchOfficerFiling(TRANSACTION_ID, SUBMISSION_ID, {}) as Resource<FilingResponse>;

        expect(data.httpStatusCode).toBe(200);
        expect(data.resource?.id).toBe("123");
        expect(data.resource?.data?.description).toBe("Appoint a new Director");
    });

    it("should return error 404 - Not found", async () => {
        jest.spyOn(mockValues.requestClient, "httpPatch").mockClear().mockResolvedValue(mockValues.mockPatchOfficerFiling[404]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.patchOfficerFiling(TRANSACTION_ID, SUBMISSION_ID, {});

        expect(data.httpStatusCode).toBe(404);
        expect(data.errors?.[0]).toBe("Officer filing not found");
    });

    it("should return error 500 - Internal server error", async () => {
        jest.spyOn(mockValues.requestClient, "httpPatch").mockClear().mockResolvedValue(mockValues.mockPatchOfficerFiling[500]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.patchOfficerFiling(TRANSACTION_ID, SUBMISSION_ID, {});

        expect(data.httpStatusCode).toBe(500);
        expect(data.errors?.[0]).toBe("Internal server error");
    });
});
