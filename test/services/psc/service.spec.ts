import { expect } from "chai";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { describe } from "mocha";
import * as sinon from "sinon";
import PscService from "../../../src/services/psc/service";
import { PersonWithSignificantControl } from "../../../src/services/psc/types";
import Resource, { ApiErrorResponse } from "../../../src/services/resource";
import { COMPANY_NUMBER, PSC_NOTIFICATION_ID, mockIndividualResponse, requestClient, PSC_INDIVIDUAL } from "./service.mock";
import Mapping from "../../../src/mapping/mapping";

describe("PSC details", () => {
    const pscService = new PscService(requestClient);

    describe("GET Individual endpoint", () => {
        it("should return status 200 OK and PSC resource representation on authorised access", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockIndividualResponse[200]);

            const response = (await pscService.getPscIndividual(
                COMPANY_NUMBER, PSC_NOTIFICATION_ID)) as Resource<PersonWithSignificantControl>;

            expect(response.httpStatusCode).to.equal(StatusCodes.OK);
            expect(response.resource).to.eql(Mapping.camelCaseKeys(PSC_INDIVIDUAL));
        });

        it("should return status 401 Unauthorised when access is unauthorised", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockIndividualResponse[401]);

            const response = await pscService.getPscIndividual(COMPANY_NUMBER, PSC_NOTIFICATION_ID) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.UNAUTHORIZED);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.UNAUTHORIZED);
        });

        it("should return status 400 Bad Request when the resource ID is null in the request", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockIndividualResponse[400]);

            const response = (await pscService.getPscIndividual(
                    null as unknown as string, null as unknown as string

            )) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.BAD_REQUEST);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.BAD_REQUEST);
        });

        it("should return status 404 Not Found when the resource ID is not found", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockIndividualResponse[404]);

            const response = (await pscService.getPscIndividual(
                COMPANY_NUMBER, PSC_NOTIFICATION_ID

            )) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.NOT_FOUND);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.NOT_FOUND);
        });

        it("should return status 500 Internal Server Error if a server error occurs", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockIndividualResponse[500]);

            const response = (await pscService.getPscIndividual(
                COMPANY_NUMBER, PSC_NOTIFICATION_ID

            )) as ApiErrorResponse;

            expect(response.httpStatusCode).to.equal(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(response.errors?.[0]).to.equal(ReasonPhrases.INTERNAL_SERVER_ERROR);
        });
    });
});
