import {
    CompanyOfficer, FilingResponse, OfficerFiling, OfficerFilingService, ValidationStatusResponse
} from "../../../src/services/officer-filing";
import * as mockValues from "./officer.filing.mock";
import { expect } from "chai";
import sinon from "sinon";
import Resource, { ApiErrorResponse } from "../../../src/services/resource";

const TRANSACTION_ID = "12345";
const SUBMISSION_ID = "645d1188c794645afe15f5cc";
const COMPANY_NUMBER = "00006400";

beforeEach(() => {
    sinon.reset();
    sinon.restore();
});

afterEach(done => {
    sinon.reset();
    sinon.restore();
    done();
});

describe("List active Directors details GET", () => {
    it("should return active director details object", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetListActiveDirectorsDetails[200]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: Resource<CompanyOfficer[]> = await ofService.getListActiveDirectorDetails(TRANSACTION_ID) as Resource<CompanyOfficer[]>;

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource?.[1].dateOfBirth).to.contain(mockValues.mockActiveDirectorDetails.date_of_birth);
    });

    it("should return error 404 - No active director details were found", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetListActiveDirectorsDetails[404]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.getListActiveDirectorDetails(TRANSACTION_ID);

        expect(data.httpStatusCode).to.equal(404);
        expect(data.errors?.[0]).to.equal("No active directors details were found");
    });

    it("should return error 500 - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetListActiveDirectorsDetails[500]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.getListActiveDirectorDetails(TRANSACTION_ID);

        expect(data.httpStatusCode).to.equal(500);
        expect(data.errors?.[0]).to.equal("Internal server error");
    });
});

describe("List TM01 check your answers details GET", () => {
    it("should return company officer details object", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetDirectorAndTerminationDate[200]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: Resource<CompanyOfficer> = await ofService.getDirectorAndTerminationDate(TRANSACTION_ID, SUBMISSION_ID) as Resource<CompanyOfficer>;

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource?.resignedOn).to.contain(mockValues.mockDirectorAndTerminationDate.resigned_on);
        expect(data.resource?.dateOfBirth).to.contain(mockValues.mockDirectorAndTerminationDate.date_of_birth);
        expect(data.resource?.appointedOn).to.contain(mockValues.mockDirectorAndTerminationDate.appointed_on);
        expect(data.resource?.officerRole).to.contain(mockValues.mockDirectorAndTerminationDate.officer_role);
        expect(data.resource?.name).to.contain(mockValues.mockDirectorAndTerminationDate.name);
    });

    it("should return error 500 - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetDirectorAndTerminationDate[500]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.getDirectorAndTerminationDate(TRANSACTION_ID, SUBMISSION_ID);

        expect(data.httpStatusCode).to.equal(500);
        expect(data.errors?.[0]).to.equal("Internal server error");
    });
});

describe("Validation Status Response GET", () => {
    it("should return list of error/s and validation status", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetValidationStatusResponse[200]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: Resource<ValidationStatusResponse> = await ofService.getValidationStatus(TRANSACTION_ID, SUBMISSION_ID) as Resource<ValidationStatusResponse>;

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource?.errors[0].error).to.equal("European public limited liability company (SE) not permitted");
        expect(data.resource?.errors[0].locationType).to.equal("json-path");
        expect(data.resource?.isValid).to.equal(false);
    });

    it("should return error 404 - No found", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetValidationStatusResponse[404]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.getValidationStatus(TRANSACTION_ID, SUBMISSION_ID) as Resource<Boolean>;

        expect(data.httpStatusCode).to.equal(404);
        expect(data.errors?.[0]).to.equal("Not Found");
    });

    it("should return error 500 - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetCurrentOrFutureDissolved[500]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.getValidationStatus(TRANSACTION_ID, SUBMISSION_ID);

        expect(data.httpStatusCode).to.equal(500);
        expect(data.errors?.[0]).to.equal("Internal server error");
    });
});

describe("Officer Filing GET", () => {
    it("should return an officer filing", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetOfficerFiling[200]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: Resource<OfficerFiling> = await ofService.getOfficerFiling(TRANSACTION_ID, SUBMISSION_ID) as Resource<OfficerFiling>;

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource?.referenceAppointmentId).to.equal("app1");
        expect(data.resource?.referenceEtag).to.equal("968ada7234bb1eb65778ca4c83a4a42d36669a17");
        expect(data.resource?.resignedOn).to.equal("2009-08-29");
    });

    it("should return error 404 - Not found", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetOfficerFiling[404]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.getOfficerFiling(TRANSACTION_ID, SUBMISSION_ID);

        expect(data.httpStatusCode).to.equal(404);
        expect(data.errors?.[0]).to.equal("Officer filing not found");
    });

    it("should return error 500 - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetOfficerFiling[500]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.getOfficerFiling(TRANSACTION_ID, SUBMISSION_ID);

        expect(data.httpStatusCode).to.equal(500);
        expect(data.errors?.[0]).to.equal("Internal server error");
    });
});

describe("Officer Filing POST", () => {
    it("should return an officer filing", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockPostOfficerFiling[200]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: Resource<FilingResponse> = await ofService.postOfficerFiling(TRANSACTION_ID, {}) as Resource<FilingResponse>;

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource?.id).to.equal("567");
        expect(data.resource?.data?.description).to.equal("Update a Director");
    });

    it("should return error 404 - Not found", async () => {
        sinon.stub(mockValues.requestClient, "httpPatch").resolves(mockValues.mockPatchOfficerFiling[404]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.patchOfficerFiling(TRANSACTION_ID, SUBMISSION_ID, {});

        expect(data.httpStatusCode).to.equal(404);
        expect(data.errors?.[0]).to.equal("Officer filing not found");
    });

    it("should return error 500 - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpPatch").resolves(mockValues.mockPatchOfficerFiling[500]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.patchOfficerFiling(TRANSACTION_ID, SUBMISSION_ID, {});

        expect(data.httpStatusCode).to.equal(500);
        expect(data.errors?.[0]).to.equal("Internal server error");
    });
});

describe("Officer Filing PATCH", () => {
    it("should return an officer filing", async () => {
        sinon.stub(mockValues.requestClient, "httpPatch").resolves(mockValues.mockPatchOfficerFiling[200]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: Resource<FilingResponse> = await ofService.patchOfficerFiling(TRANSACTION_ID, SUBMISSION_ID, {}) as Resource<FilingResponse>;

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource?.id).to.equal("123");
        expect(data.resource?.data?.description).to.equal("Appoint a new Director");
    });

    it("should return error 404 - Not found", async () => {
        sinon.stub(mockValues.requestClient, "httpPatch").resolves(mockValues.mockPatchOfficerFiling[404]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.patchOfficerFiling(TRANSACTION_ID, SUBMISSION_ID, {});

        expect(data.httpStatusCode).to.equal(404);
        expect(data.errors?.[0]).to.equal("Officer filing not found");
    });

    it("should return error 500 - Internal server error", async () => {
        sinon.stub(mockValues.requestClient, "httpPatch").resolves(mockValues.mockPatchOfficerFiling[500]);
        const ofService: OfficerFilingService = new OfficerFilingService(mockValues.requestClient);
        const data: ApiErrorResponse = await ofService.patchOfficerFiling(TRANSACTION_ID, SUBMISSION_ID, {});

        expect(data.httpStatusCode).to.equal(500);
        expect(data.errors?.[0]).to.equal("Internal server error");
    });
});
