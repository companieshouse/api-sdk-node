import { expect } from "chai";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { describe } from "mocha";
import * as sinon from "sinon";
import PscVerificationService from "../../../src/services/psc-verification-link/service";
import { PscVerification } from "../../../src/services/psc-verification-link/types";
import Resource, { ApiErrorResponse } from "../../../src/services/resource";
import { COMPANY_NUMBER, FILING_ID, PSC_VERIFICATION_CREATED, PSC_VERIFICATION_ID, PSC_VERIFICATION_IND, PSC_VERIFICATION_RLE, TRANSACTION_ID, mockPscVerificationCreated, mockPscVerificationCreatedResponse, mockPscVerificationInd, mockPscVerificationIndResponse, mockPscVerificationPatchInd, mockPscVerificationPatchIndResponse, mockPscVerificationPatchRleResponse, mockPscVerificationPatchRleRo, requestClient } from "./service.mock";

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

        it("should return staus 400 Bad Request for bad data", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPscVerificationCreatedResponse[400]);

            const data = await pscService.postPscVerification(TRANSACTION_ID, { companyNumber: "" }) as ApiErrorResponse;

            expect(data.httpStatusCode).to.equal(StatusCodes.BAD_REQUEST);
            expect(data.errors?.[0]).to.equal(ReasonPhrases.BAD_REQUEST);
        });
    });

    describe("GET endpoint", () => {
        it("should return status 200 OK and filing resource representation on authorised access", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockPscVerificationIndResponse[200]);

            const response = (await pscService.getPscVerification(
                TRANSACTION_ID,
                PSC_VERIFICATION_ID
            )) as Resource<PscVerification>;

            expect(response.httpStatusCode).to.equal(StatusCodes.OK);
            expect(response.resource).to.eql(mockPscVerificationInd);
        });

        it("should return status 401 Unauthorised on unauthorised access", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockPscVerificationIndResponse[401]);

            const response = await pscService.getPscVerification(TRANSACTION_ID, PSC_VERIFICATION_ID) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.UNAUTHORIZED);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.UNAUTHORIZED);
        });

        it("should return status 404 Not Found if resource id not found", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockPscVerificationIndResponse[404]);

            const response = await pscService.getPscVerification(TRANSACTION_ID, PSC_VERIFICATION_ID) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.NOT_FOUND);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.NOT_FOUND);
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

        it("should return a status 200 OK and patched PSC RLE verification filing", async () => {
            sinon.stub(requestClient, "httpPatch").resolves(mockPscVerificationPatchRleResponse[200]);

            const response = (await pscService.patchPscVerification(
                TRANSACTION_ID,
                FILING_ID,
                PSC_VERIFICATION_RLE
            )) as Resource<PscVerification>;

            expect(response.httpStatusCode).to.equal(StatusCodes.OK);
            expect(response.resource).to.eql(mockPscVerificationPatchRleRo);
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

        it("should return a status 404 Not Found if resource id not found", async () => {
            sinon.stub(requestClient, "httpPatch").resolves(mockPscVerificationPatchRleResponse[404]);

            const response = await pscService.patchPscVerification(
                TRANSACTION_ID,
                FILING_ID,
                PSC_VERIFICATION_RLE
            ) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.NOT_FOUND);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.NOT_FOUND);
        });

        it("should return a status 415 unsupported media type when the 'content-type' is not 'application/merge-patch+json'", async () => {
            sinon.stub(requestClient, "httpPatch").resolves(mockPscVerificationPatchRleResponse[415]);

            const response = await pscService.patchPscVerification(
                TRANSACTION_ID,
                FILING_ID,
                PSC_VERIFICATION_RLE
            ) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.UNSUPPORTED_MEDIA_TYPE);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.UNSUPPORTED_MEDIA_TYPE);
        });
    });
});
