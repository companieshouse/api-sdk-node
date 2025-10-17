import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { RequestClient } from "../../../src";
import { PscExtension, PscExtensionData, ValidationStatusResponse } from "../../../src/services/psc-extensions-link/types";

export const requestClient = new RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "123" });
export const TRANSACTION_ID = "1234-5678-9123";
export const PSC_NOTIFICATION_ID = "123456";
export const COMPANY_NUMBER = "00064000";

const PSC_EXTENSION_DATA: PscExtensionData = {
    companyNumber: COMPANY_NUMBER,
    pscNotificationId: PSC_NOTIFICATION_ID,
    extensionDetails: {
        extensionReason: "Have arranged through GOV.UK One Login to verify identity at the Post Office",
        extensionStatus: "pending",
        extensionRequestDate: "2024-10-17"
    }
};

const PSC_EXTENSION_RESOURCE = {
    created_at: new Date("2024-10-17T10:30:00Z"),
    updated_at: new Date("2024-10-17T10:30:00Z"),
    links: {
        self: `/transactions/${TRANSACTION_ID}/persons-with-significant-control-extensions/extension-id`,
        validation_status: `/transactions/${TRANSACTION_ID}/persons-with-significant-control-extensions/extension-id/validation_status`
    },
    data: {
        company_number: COMPANY_NUMBER,
        psc_notification_id: PSC_NOTIFICATION_ID,
        extension_details: {
            extension_reason: "Have arranged through GOV.UK One Login to verify identity at the Post Office",
            extension_status: "pending",
            extension_request_date: "2024-10-17"
        }
    }
};

export const PSC_EXTENSION: PscExtension = {
    createdAt: new Date("2024-10-17T10:30:00Z"),
    updatedAt: new Date("2024-10-17T10:30:00Z"),
    links: {
        self: `/transactions/${TRANSACTION_ID}/persons-with-significant-control-extensions/extension-id`,
        validationStatus: `/transactions/${TRANSACTION_ID}/persons-with-significant-control-extensions/extension-id/validation_status`
    },
    data: PSC_EXTENSION_DATA
};

const VALIDATION_STATUS_RESPONSE_RESOURCE = {
    is_valid: true,
    errors: []
};

export const VALIDATION_STATUS_RESPONSE: ValidationStatusResponse = {
    isValid: true,
    errors: []
};

const VALIDATION_STATUS_RESPONSE_INVALID_RESOURCE = {
    is_valid: false,
    errors: [
        {
            error: "PSC has exceeded maximum number of extension requests",
            location: "$.",
            location_type: "json-path",
            type: "ch:validation"
        }
    ]
};

export const VALIDATION_STATUS_RESPONSE_INVALID: ValidationStatusResponse = {
    isValid: false,
    errors: [
        {
            error: "PSC has exceeded maximum number of extension requests",
            location: "$.",
            locationType: "json-path",
            type: "ch:validation"
        }
    ]
};

export const mockPostPscExtensionResponse = {
    201: { status: StatusCodes.CREATED, body: PSC_EXTENSION_RESOURCE },
    400: { status: StatusCodes.BAD_REQUEST, error: ReasonPhrases.BAD_REQUEST },
    401: { status: StatusCodes.UNAUTHORIZED, error: ReasonPhrases.UNAUTHORIZED },
    404: { status: StatusCodes.NOT_FOUND, error: ReasonPhrases.NOT_FOUND },
    500: { status: StatusCodes.INTERNAL_SERVER_ERROR, error: ReasonPhrases.INTERNAL_SERVER_ERROR }
};

export const mockGetPscExtensionCountResponse = {
    200: { status: StatusCodes.OK, body: 1 },
    400: { status: StatusCodes.BAD_REQUEST, error: ReasonPhrases.BAD_REQUEST },
    401: { status: StatusCodes.UNAUTHORIZED, error: ReasonPhrases.UNAUTHORIZED },
    404: { status: StatusCodes.NOT_FOUND, error: ReasonPhrases.NOT_FOUND },
    500: { status: StatusCodes.INTERNAL_SERVER_ERROR, error: ReasonPhrases.INTERNAL_SERVER_ERROR }
};

export const mockGetIsPscExtensionValidResponse = {
    200: { status: StatusCodes.OK, body: VALIDATION_STATUS_RESPONSE_RESOURCE },
    400: { status: StatusCodes.BAD_REQUEST, error: ReasonPhrases.BAD_REQUEST },
    401: { status: StatusCodes.UNAUTHORIZED, error: ReasonPhrases.UNAUTHORIZED },
    404: { status: StatusCodes.NOT_FOUND, error: ReasonPhrases.NOT_FOUND },
    500: { status: StatusCodes.INTERNAL_SERVER_ERROR, error: ReasonPhrases.INTERNAL_SERVER_ERROR }
};

export const mockGetIsPscExtensionValidInvalidResponse = {
    200: { status: StatusCodes.OK, body: VALIDATION_STATUS_RESPONSE_INVALID_RESOURCE }
};

export { PSC_EXTENSION_DATA };
