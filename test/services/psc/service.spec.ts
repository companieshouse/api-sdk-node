import { expect } from "chai";
import { StatusCodes } from "http-status-codes";
import { describe } from "mocha";
import * as sinon from "sinon";
import PscService from "../../../src/services/psc/service";
import { PersonWithSignificantControl } from "../../../src/services/psc/types";
import Resource from "../../../src/services/resource";
import { COMPANY_NUMBER, PSC_ID, PSC_INDIVIDUAL, mockIndividualResponse, requestClient } from "./service.mock";
import Mapping from "../../../src/mapping/mapping";

describe("PSC details", () => {
    const pscService = new PscService(requestClient);

    describe("GET Individual endpoint", () => {
        it("should return status 200 OK and PSC resource representation on authorised access", async () => {
            sinon.stub(requestClient, "httpGet").resolves(mockIndividualResponse[200]);

            const response = (await pscService.getPscIndividual(
                COMPANY_NUMBER, PSC_ID)) as Resource<PersonWithSignificantControl>;

            expect(response.httpStatusCode).to.equal(StatusCodes.OK);
            expect(response.resource).to.eql(Mapping.camelCaseKeys(PSC_INDIVIDUAL));
        });

        // it("should return status 401 Unauthorised on unauthorised access", async () => {
        //     sinon.stub(requestClient, "httpGet").resolves(mockIndividualResponse[401]);

        //     const response = await pscService.getPscIndividual(COMPANY_NUMBER, PSC_ID) as ApiErrorResponse;

        //     expect(response.httpStatusCode).to.equal(StatusCodes.UNAUTHORIZED);
        //     expect(response.errors?.[0]).to.equal(ReasonPhrases.UNAUTHORIZED);
        // });

        // it("should return status 404 Not Found if resource id not found", async () => {
        //     sinon.stub(requestClient, "httpGet").resolves(mockIndividualResponse[404]);

        //     const response = await pscService.getPscIndividual(COMPANY_NUMBER, PSC_ID) as ApiErrorResponse;

        //     expect(response.httpStatusCode).to.equal(StatusCodes.NOT_FOUND);
        //     expect(response.errors?.[0]).to.equal(ReasonPhrases.NOT_FOUND);
        // });
    });

});
