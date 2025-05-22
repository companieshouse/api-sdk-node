import { ReasonPhrases, StatusCodes } from "http-status-codes";
import PscService from "../../../src/services/psc/service";
import { PersonWithSignificantControl } from "../../../src/services/psc/types";
import Resource, { ApiErrorResponse } from "../../../src/services/resource";
import { COMPANY_NUMBER, PSC_NOTIFICATION_ID, mockIndividualResponse, requestClient, PSC_INDIVIDUAL } from "./service.mock";
import Mapping from "../../../src/mapping/mapping";

describe("PSC details", () => {
    const pscService = new PscService(requestClient);

    describe("GET Individual endpoint", () => {
        it(
            "should return status 200 OK and PSC resource representation on authorised access",
            async () => {
                jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockIndividualResponse[200]);

                const response = (await pscService.getPscIndividual(
                    COMPANY_NUMBER, PSC_NOTIFICATION_ID)) as Resource<PersonWithSignificantControl>;

                expect(response.httpStatusCode).toBe(StatusCodes.OK);
                expect(response.resource).toEqual(Mapping.camelCaseKeys(PSC_INDIVIDUAL));
            }
        );

        it(
            "should return status 401 Unauthorised when access is unauthorised",
            async () => {
                jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockIndividualResponse[401]);

                const response = await pscService.getPscIndividual(COMPANY_NUMBER, PSC_NOTIFICATION_ID) as ApiErrorResponse;

                expect(response.httpStatusCode).toBe(StatusCodes.UNAUTHORIZED);
                expect(response.errors?.[0]).toBe(ReasonPhrases.UNAUTHORIZED);
            }
        );

        it(
            "should return status 400 Bad Request when the resource ID is null in the request",
            async () => {
                jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockIndividualResponse[400]);

                const response = (await pscService.getPscIndividual(
                        null as unknown as string, null as unknown as string

                )) as ApiErrorResponse;

                expect(response.httpStatusCode).toBe(StatusCodes.BAD_REQUEST);
                expect(response.errors?.[0]).toBe(ReasonPhrases.BAD_REQUEST);
            }
        );

        it(
            "should return status 404 Not Found when the resource ID is not found",
            async () => {
                jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockIndividualResponse[404]);

                const response = (await pscService.getPscIndividual(
                    COMPANY_NUMBER, PSC_NOTIFICATION_ID

                )) as ApiErrorResponse;

                expect(response.httpStatusCode).toBe(StatusCodes.NOT_FOUND);
                expect(response.errors?.[0]).toBe(ReasonPhrases.NOT_FOUND);
            }
        );

        it(
            "should return status 500 Internal Server Error if a server error occurs",
            async () => {
                jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockIndividualResponse[500]);

                const response = (await pscService.getPscIndividual(
                    COMPANY_NUMBER, PSC_NOTIFICATION_ID

                )) as ApiErrorResponse;

                expect(response.httpStatusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
                expect(response.errors?.[0]).toBe(ReasonPhrases.INTERNAL_SERVER_ERROR);
            }
        );
    });
});
