import { expect } from "chai";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { describe } from "mocha";
import * as sinon from "sinon";
import PscExtensionService from "../../../src/services/psc-extensions-link/service";
import { PscExtension, ValidationStatusResponse } from "../../../src/services/psc-extensions-link/types";
import Resource, { ApiErrorResponse } from "../../../src/services/resource";
import {
    COMPANY_NUMBER,
    PSC_NOTIFICATION_ID,
    TRANSACTION_ID,
    PSC_EXTENSION_DATA,
    mockPostPscExtensionResponse,
    mockGetPscExtensionCountResponse,
    mockGetIsPscExtensionValidResponse,
    mockGetIsPscExtensionValidInvalidResponse,
    requestClient
} from "./service.mock";
import Mapping from "../../../src/mapping/mapping";

describe("PSC Extensions Service", () => {
    const pscExtensionService = new PscExtensionService(requestClient);

    describe("POST PSC Extension endpoint", () => {
        afterEach(sinon.restore);

        it("should return status 201 Created and PSC extension resource on successful creation", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPostPscExtensionResponse[201]);

            const response = (await pscExtensionService.postPscExtension(
                TRANSACTION_ID, PSC_EXTENSION_DATA)) as Resource<PscExtension>;

            expect(response.httpStatusCode).to.equal(StatusCodes.CREATED);
            expect(response.resource).to.deep.equal(Mapping.camelCaseKeys(mockPostPscExtensionResponse[201].body));
        });

        it("should return status 400 Bad Request when the request is invalid", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPostPscExtensionResponse[400]);

            const response = await pscExtensionService.postPscExtension(
                TRANSACTION_ID, PSC_EXTENSION_DATA) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.BAD_REQUEST);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.BAD_REQUEST);
        });

        it("should return status 401 Unauthorised when access is unauthorised", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPostPscExtensionResponse[401]);

            const response = await pscExtensionService.postPscExtension(
                TRANSACTION_ID, PSC_EXTENSION_DATA) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.UNAUTHORIZED);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.UNAUTHORIZED);
        });

        it("should return status 404 Not Found when the transaction is not found", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPostPscExtensionResponse[404]);

            const response = await pscExtensionService.postPscExtension(
                TRANSACTION_ID, PSC_EXTENSION_DATA) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.NOT_FOUND);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.NOT_FOUND);
        });

        it("should return status 500 Internal Server Error if a server error occurs", async () => {
            sinon.stub(requestClient, "httpPost").resolves(mockPostPscExtensionResponse[500]);

            const response = await pscExtensionService.postPscExtension(
                TRANSACTION_ID, PSC_EXTENSION_DATA) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.INTERNAL_SERVER_ERROR);
        });

        it("uses provided headers", async () => {
            const mockRequest = sinon.stub(requestClient, "httpPost").resolves(mockPostPscExtensionResponse[201]);
            const headers = { "X-Request-Id": "random-uuid" };

            await pscExtensionService.postPscExtension(TRANSACTION_ID, PSC_EXTENSION_DATA, headers);

            expect(mockRequest.calledOnce).to.be.true;
            expect(mockRequest.firstCall.args[2]).to.deep.equal(headers);
        });
    });

    describe("GET PSC Extension Count endpoint", () => {
        it("should return status 200 OK and extension count on successful request", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetPscExtensionCountResponse[200]);

            const response = (await pscExtensionService.getPscExtensionCount(
                PSC_NOTIFICATION_ID)) as Resource<number>;

            expect(response.httpStatusCode).to.equal(StatusCodes.OK);
            expect(response.resource).to.equal(1);
        });

        it("should return status 400 Bad Request when the PSC notification ID is invalid", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetPscExtensionCountResponse[400]);

            const response = await pscExtensionService.getPscExtensionCount(
                PSC_NOTIFICATION_ID) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.BAD_REQUEST);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.BAD_REQUEST);
        });

        it("should return status 401 Unauthorised when access is unauthorised", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetPscExtensionCountResponse[401]);

            const response = await pscExtensionService.getPscExtensionCount(
                PSC_NOTIFICATION_ID) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.UNAUTHORIZED);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.UNAUTHORIZED);
        });

        it("should return status 404 Not Found when the PSC notification is not found", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetPscExtensionCountResponse[404]);

            const response = await pscExtensionService.getPscExtensionCount(
                PSC_NOTIFICATION_ID) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.NOT_FOUND);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.NOT_FOUND);
        });

        it("should return status 500 Internal Server Error if a server error occurs", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetPscExtensionCountResponse[500]);

            const response = await pscExtensionService.getPscExtensionCount(
                PSC_NOTIFICATION_ID) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.INTERNAL_SERVER_ERROR);
        });

        it("uses provided headers", async () => {
            const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetPscExtensionCountResponse[200]);
            const headers = { "X-Request-Id": "random-uuid" };

            await pscExtensionService.getPscExtensionCount(PSC_NOTIFICATION_ID, headers);

            expect(mockRequest.calledOnce).to.be.true;
            expect(mockRequest.firstCall.args[1]).to.deep.equal(headers);
        });
    });

    describe("GET PSC Extension Validation endpoint", () => {
        it("should return status 200 OK and validation response when extension is valid", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetIsPscExtensionValidResponse[200]);

            const response = (await pscExtensionService.getIsPscExtensionValid(
                PSC_NOTIFICATION_ID, COMPANY_NUMBER)) as Resource<ValidationStatusResponse>;

            expect(response.httpStatusCode).to.equal(StatusCodes.OK);
            expect(response.resource!.valid).to.be.true;
            expect(response.resource!.validationStatusError).to.be.empty;
        });

        it("should return status 200 OK and validation response when extension is invalid", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetIsPscExtensionValidInvalidResponse[200]);

            const response = (await pscExtensionService.getIsPscExtensionValid(
                PSC_NOTIFICATION_ID, COMPANY_NUMBER)) as Resource<ValidationStatusResponse>;

            expect(response.httpStatusCode).to.equal(StatusCodes.OK);
            expect(response.resource!.valid).to.be.false;
            expect(response.resource!.validationStatusError).to.have.length(1);
            expect(response.resource!.validationStatusError[0].message).to.equal("PSC has exceeded maximum number of extension requests");
        });

        it("should return status 400 Bad Request when parameters are invalid", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetIsPscExtensionValidResponse[400]);

            const response = await pscExtensionService.getIsPscExtensionValid(
                PSC_NOTIFICATION_ID, COMPANY_NUMBER) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.BAD_REQUEST);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.BAD_REQUEST);
        });

        it("should return status 401 Unauthorised when access is unauthorised", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetIsPscExtensionValidResponse[401]);

            const response = await pscExtensionService.getIsPscExtensionValid(
                PSC_NOTIFICATION_ID, COMPANY_NUMBER) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.UNAUTHORIZED);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.UNAUTHORIZED);
        });

        it("should return status 404 Not Found when the resource is not found", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetIsPscExtensionValidResponse[404]);

            const response = await pscExtensionService.getIsPscExtensionValid(
                PSC_NOTIFICATION_ID, COMPANY_NUMBER) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.NOT_FOUND);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.NOT_FOUND);
        });

        it("should return status 500 Internal Server Error if a server error occurs", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockGetIsPscExtensionValidResponse[500]);

            const response = await pscExtensionService.getIsPscExtensionValid(
                PSC_NOTIFICATION_ID, COMPANY_NUMBER) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.INTERNAL_SERVER_ERROR);
        });

        it("uses provided headers", async () => {
            const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetIsPscExtensionValidResponse[200]);
            const headers = { "X-Request-Id": "random-uuid" };

            await pscExtensionService.getIsPscExtensionValid(PSC_NOTIFICATION_ID, COMPANY_NUMBER, headers);

            expect(mockRequest.calledOnce).to.be.true;
            expect(mockRequest.firstCall.args[1]).to.deep.equal(headers);
        });
    });
});
