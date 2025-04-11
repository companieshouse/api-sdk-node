import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { RequestClient } from "../../../src";
import { PlannedMaintenance, PscVerification, PscVerificationData, PscVerificationResource, ValidationStatusError, ValidationStatusResponse, ValidationStatusResponseResource } from "../../../src/services/psc-verification-link/types";
export declare const requestClient: RequestClient;
export declare const COMPANY_NUMBER = "12345678";
export declare const PSC_NOTIFICATION_ID = "662a0de6a2c6f9aead0f32ab";
export declare const TRANSACTION_ID = "12345";
export declare const FILING_ID = "00112233";
export declare const FIRST_DATE: Date;
export declare const UPDATE_DATE: Date;
export declare const DOB_DATE: Date;
export declare const SELF_LINK: string;
export declare const PSC_VERIFICATION_CREATED: PscVerificationData;
export declare const PSC_VERIFICATION_IND: PscVerificationData;
export declare const mockPscVerificationCreated: PscVerification;
export declare const mockPscVerificationCreatedResource: PscVerificationResource;
export declare const mockPscVerificationPatchedResource: PscVerificationResource;
export declare const mockPscVerificationPatchIndResource: PscVerificationResource;
export declare const mockPscVerificationPatchInd: PscVerification;
export declare const mockPscVerificationCreatedResponse: {
    201: {
        status: StatusCodes;
        body: PscVerificationResource;
    };
    400: {
        status: StatusCodes;
        error: ReasonPhrases;
    };
    401: {
        status: StatusCodes;
        error: ReasonPhrases;
    };
    500: {
        status: StatusCodes;
        error: ReasonPhrases;
    };
};
export declare const PSC_VERIFICATION_IND_CAMEL: PscVerificationData;
export declare const mockPscVerificationIndResource: PscVerificationResource;
export declare const mockPscVerificationInd: PscVerification;
export declare const mockPlannedMaintenanceResource: PlannedMaintenance;
export declare const mockValidationStatusError: ValidationStatusError;
export declare const mockValidationStatusResponseValid: ValidationStatusResponse;
export declare const mockValidationStatusResponseErrors: ValidationStatusResponse;
export declare const mockPscVerificationIndResponse: {
    200: {
        status: StatusCodes;
        body: PscVerificationResource;
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
export declare const mockPscVerificationPatchIndResponse: {
    200: {
        status: StatusCodes;
        body: PscVerificationResource;
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
export declare const mockPlannedMaintenanceResponse: {
    200: {
        status: StatusCodes;
        body: PlannedMaintenance;
    };
    404: {
        status: StatusCodes;
        error: ReasonPhrases;
    };
};
export declare const mockGetValidationStatusResponse: {
    200: {
        status: StatusCodes;
        body: ValidationStatusResponseResource;
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
export declare const mockGetValidationStatusResponseErrors: {
    200: {
        status: StatusCodes;
        body: ValidationStatusResponseResource;
    };
};
