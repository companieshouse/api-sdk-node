import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { RequestClient } from "../../../src";
import { PersonWithSignificantControl, PersonWithSignificantControlResource } from "../../../src/services/psc/types";
export declare const requestClient: RequestClient;
export declare const COMPANY_NUMBER = "12345678";
export declare const PSC_NOTIFICATION_ID = "67edfE436y35hetsie6zuAZtr";
export declare const PSC_INDIVIDUAL: PersonWithSignificantControl;
export declare const mockIndividualResponse: {
    200: {
        status: StatusCodes;
        body: PersonWithSignificantControlResource;
    };
    400: {
        status: StatusCodes;
        error: ReasonPhrases;
    };
    401: {
        status: StatusCodes;
        error: ReasonPhrases;
    };
    404: {
        status: StatusCodes;
        error: ReasonPhrases;
    };
    500: {
        status: StatusCodes;
        error: ReasonPhrases;
    };
};
