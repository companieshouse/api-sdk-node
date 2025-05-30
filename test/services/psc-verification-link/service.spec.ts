import { expect } from "chai";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { describe } from "mocha";
import * as sinon from "sinon";
import PscVerificationService from "../../../src/services/psc-verification-link/service";
import { PlannedMaintenance, PscVerification, ValidationStatusResponse } from "../../../src/services/psc-verification-link/types";
import Resource, { ApiErrorResponse, ApiResponse } from "../../../src/services/resource";
import { COMPANY_NUMBER, FILING_ID, PSC_VERIFICATION_CREATED, PSC_NOTIFICATION_ID, PSC_VERIFICATION_IND, TRANSACTION_ID, mockPlannedMaintenanceResource, mockPlannedMaintenanceResponse, mockGetValidationStatusResponseErrors, mockGetValidationStatusResponse, mockPscVerificationCreated, mockPscVerificationCreatedResponse, mockPscVerificationInd, mockPscVerificationIndResponse, mockPscVerificationPatchInd, mockPscVerificationPatchIndResponse, requestClient, mockValidationStatusResponseValid, mockValidationStatusResponseErrors } from "./service.mock";

describe("PSC Verification Link", () => {
    const pscService = new PscVerificationService(requestClient);

    describe("POST endpoint", () => {
        afterEach(sinon.restore);

        it("should return status 201 Created and filing resource representation on authorised access", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPscVerificationCreatedResponse[201]);

            const response = (await pscService.postPscVerification(
                TRANSACTION_ID,
                PSC_VERIFICATION_CREATED
            )) as Resource<PscVerification>;

            expect(response.httpStatusCode).to.equal(StatusCodes.CREATED);
            expect(response.resource).to.eql(mockPscVerificationCreated);
        });

        it("should return status 401 Unauthorised on unauthorised access", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPscVerificationCreatedResponse[401]);

            const response = await pscService.postPscVerification(TRANSACTION_ID, { companyNumber: COMPANY_NUMBER }) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.UNAUTHORIZED);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.UNAUTHORIZED);
        });

        it("should return status 400 Bad Request for bad data", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPscVerificationCreatedResponse[400]);

            const data = await pscService.postPscVerification(TRANSACTION_ID, { companyNumber: "" }) as ApiErrorResponse;

            expect(data.httpStatusCode).to.equal(StatusCodes.BAD_REQUEST);
            expect(data.errors?.[0]).to.equal(ReasonPhrases.BAD_REQUEST);
        });

        it("should return status 500 Internal Server Error if a server error occurs", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPscVerificationCreatedResponse[500]);

            const data = await pscService.postPscVerification(TRANSACTION_ID, { companyNumber: COMPANY_NUMBER }) as ApiErrorResponse;

            expect(data.httpStatusCode).to.equal(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(data.errors?.[0]).to.equal(ReasonPhrases.INTERNAL_SERVER_ERROR);
        });
    });

    describe("GET endpoint", () => {
        it("should return status 200 OK and filing resource representation on authorised access", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockPscVerificationIndResponse[200]);

            const response = (await pscService.getPscVerification(
                TRANSACTION_ID,
                PSC_NOTIFICATION_ID
            )) as Resource<PscVerification>;

            expect(response.httpStatusCode).to.equal(StatusCodes.OK);
            expect(response.resource).to.eql(mockPscVerificationInd);
        });

        it("should return status 401 Unauthorised on unauthorised access", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockPscVerificationIndResponse[401]);

            const response = await pscService.getPscVerification(TRANSACTION_ID, PSC_NOTIFICATION_ID) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.UNAUTHORIZED);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.UNAUTHORIZED);
        });

        it("should return status 404 Not Found if resource id not found", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockPscVerificationIndResponse[404]);

            const response = await pscService.getPscVerification(TRANSACTION_ID, PSC_NOTIFICATION_ID) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.NOT_FOUND);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.NOT_FOUND);
        });

        it("should return status 500 Internal Server Error if a server error occurs", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockPscVerificationIndResponse[500]);

            const response = await pscService.getPscVerification(TRANSACTION_ID, PSC_NOTIFICATION_ID) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.INTERNAL_SERVER_ERROR);
        });
    });

    describe("PATCH endpoint", () => {
        afterEach(sinon.restore);

        it("should return a status 200 OK and patched PSC individual verification filing", async () => {
            sinon.stub(requestClient, "httpPatch").resolves(mockPscVerificationPatchIndResponse[200]);

            const response = (await pscService.patchPscVerification(
                TRANSACTION_ID,
                FILING_ID,
                PSC_VERIFICATION_IND
            )) as Resource<PscVerification>;

            expect(response.httpStatusCode).to.equal(StatusCodes.OK);
            expect(response.resource).to.eql(mockPscVerificationPatchInd);
        });

        it("should return a status 401 Unauthorised on unauthorised access", async () => {
            sinon.stub(requestClient, "httpPatch").resolves(mockPscVerificationPatchIndResponse[401]);

            const response = await pscService.patchPscVerification(
                TRANSACTION_ID,
                FILING_ID,
                PSC_VERIFICATION_IND
            ) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.UNAUTHORIZED);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.UNAUTHORIZED);
        });

        it("should return a status 500 Internal Server Error when a server error occurs", async () => {
            sinon.stub(requestClient, "httpPatch").resolves(mockPscVerificationPatchIndResponse[500]);

            const response = await pscService.patchPscVerification(
                TRANSACTION_ID,
                FILING_ID,
                PSC_VERIFICATION_IND
            ) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.INTERNAL_SERVER_ERROR);
        });
    });

    describe("Validation status GET endpoint", () => {
        it("should return status 200 OK with no errors when the validation status returns true", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetValidationStatusResponse[200]);

            const response = (await pscService.getValidationStatus(
                TRANSACTION_ID,
                PSC_NOTIFICATION_ID
            )) as Resource<ValidationStatusResponse>;

            expect(response.httpStatusCode).to.equal(StatusCodes.OK);
            expect(response.resource).to.eql(mockValidationStatusResponseValid);
            expect(response.resource?.errors).length.to.be.empty;
            expect(response.resource?.isValid).to.eql(true);
        });

        it("should return status 200 OK when the validation status returns false with errors", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetValidationStatusResponseErrors[200]);

            const response = (await pscService.getValidationStatus(
                TRANSACTION_ID,
                PSC_NOTIFICATION_ID
            )) as Resource<ValidationStatusResponse>;

            expect(response.httpStatusCode).to.equal(StatusCodes.OK);
            expect(response.resource).to.eql(mockValidationStatusResponseErrors);
            expect(response.resource?.errors).length.to.be.gt(0);
            expect(response.resource?.isValid).to.eql(false);
        });

        it("should return status 401 Unauthorised on unauthorised access", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetValidationStatusResponse[401]);

            const response = await pscService.getValidationStatus(TRANSACTION_ID, PSC_NOTIFICATION_ID) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.UNAUTHORIZED);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.UNAUTHORIZED);
        });

        it("should return status 404 Not Found if resource is not found", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetValidationStatusResponse[404]);

            const response = await pscService.getValidationStatus(TRANSACTION_ID, PSC_NOTIFICATION_ID) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.NOT_FOUND);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.NOT_FOUND);
        });

        it("should return status 500 Internal Server Error if a server error occurs", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetValidationStatusResponse[500]);

            const response = await pscService.getValidationStatus(TRANSACTION_ID, PSC_NOTIFICATION_ID) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.INTERNAL_SERVER_ERROR);
        });
    });

    describe("checkPlannedMaintenance endpoint", () => {
        it("should return status 200 OK and Planned Maintenance resource", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockPlannedMaintenanceResponse[200]);

            const response = (await pscService.checkPlannedMaintenance(
            )) as ApiResponse<PlannedMaintenance>;

            expect(response.httpStatusCode).to.equal(StatusCodes.OK);
            expect(response.resource).to.eql(mockPlannedMaintenanceResource);
        });

        it("should return status 404 Not Found if resource not found", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockPlannedMaintenanceResponse[404]);

            const response = (await pscService.checkPlannedMaintenance(
            )) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.NOT_FOUND);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.NOT_FOUND);
        });

        it("should return status 500 Internal Server Error if a server error occurs", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetValidationStatusResponse[500]);

            const response = await pscService.getValidationStatus(TRANSACTION_ID, PSC_NOTIFICATION_ID) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.INTERNAL_SERVER_ERROR);
        });
    });
});
