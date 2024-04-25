import { describe } from "mocha";
import { expect } from "chai";
import * as sinon from "sinon";
import * as mockValues from "./service.mock"
import PscVerificationService from "../../../src/services/psc-verification-link/service";
import { PscVerificationResource } from "../../../src/services/psc-verification-link/types";
import Resource, { ApiErrorResponse } from "../../../src/services/resource";
import { ReasonPhrases, StatusCodes, UNAUTHORIZED } from "http-status-codes";

describe("PSC Verification Link", () => {
    const pscService = new PscVerificationService(mockValues.requestClient);

    describe("POST endpoint", () => {
        beforeEach(() => {
            sinon.reset();
            sinon.restore();
        });

        afterEach(done => {
            sinon.reset();
            sinon.restore();
            done();
        });

        it("should return status 201 Created and filing resource representation on authorised access", async () => {
            sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockPscVerificationCreatedResponse[201]);

            const response = (await pscService.postPscVerification(
                mockValues.TRANSACTION_ID,
                mockValues.PSC_VERIFICATION_MOCK
            )) as Resource<PscVerificationResource>;

            expect(response.httpStatusCode).to.equal(StatusCodes.CREATED);
            expect(response.resource).to.eql(mockValues.mockPscVerificationCreatedResource);
        });

        it("should return status 401 Unauthorised on unauthorised access", async () => {
            sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockPscVerificationCreatedResponse[401]);

            const response = await pscService.postPscVerification(mockValues.TRANSACTION_ID, { company_number: mockValues.COMPANY_NUMBER }) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.UNAUTHORIZED);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.UNAUTHORIZED);
        });

        it("should return status 400 Bad Request for bad data", async () => {
            sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockPscVerificationCreatedResponse[400]);

            const data = await pscService.postPscVerification(mockValues.TRANSACTION_ID, { company_number: "" }) as ApiErrorResponse;

            expect(data.httpStatusCode).to.equal(StatusCodes.BAD_REQUEST);
            expect(data.errors?.[0]).to.equal(ReasonPhrases.BAD_REQUEST);
        });
    });

    describe("GET endpoint", () => {
        it("should return status 200 OK and filing resource representation on authorised access", async () => {
            sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockPscVerificationIndividualResponse[200]);

            const response = (await pscService.getPscVerification(
                mockValues.TRANSACTION_ID,
                mockValues.PSC_VERIFICATION_ID
            )) as Resource<PscVerificationResource>;

            expect(response.httpStatusCode).to.equal(StatusCodes.OK);
            expect(response.resource).to.eql(mockValues.mockPscVerificationIndividualResource);
        });

        it("should return status 401 Unauthorised on unauthorised access", async () => {
            sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockPscVerificationIndividualResponse[401]);

            const response = await pscService.getPscVerification(mockValues.TRANSACTION_ID, mockValues.PSC_VERIFICATION_ID) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.UNAUTHORIZED);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.UNAUTHORIZED);
        });

        it("should return status 404 Not Found if resource id not found", async () => {
            sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockPscVerificationIndividualResponse[404]);

            const response = await pscService.getPscVerification(mockValues.TRANSACTION_ID, mockValues.PSC_VERIFICATION_ID) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.NOT_FOUND);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.NOT_FOUND);
        });
    });
});
