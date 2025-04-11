"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockGetValidationStatusResponseErrors = exports.mockGetValidationStatusResponse = exports.mockPlannedMaintenanceResponse = exports.mockPscVerificationPatchIndResponse = exports.mockPscVerificationIndResponse = exports.mockValidationStatusResponseErrors = exports.mockValidationStatusResponseValid = exports.mockValidationStatusError = exports.mockPlannedMaintenanceResource = exports.mockPscVerificationInd = exports.mockPscVerificationIndResource = exports.PSC_VERIFICATION_IND_CAMEL = exports.mockPscVerificationCreatedResponse = exports.mockPscVerificationPatchInd = exports.mockPscVerificationPatchIndResource = exports.mockPscVerificationPatchedResource = exports.mockPscVerificationCreatedResource = exports.mockPscVerificationCreated = exports.PSC_VERIFICATION_IND = exports.PSC_VERIFICATION_CREATED = exports.SELF_LINK = exports.DOB_DATE = exports.UPDATE_DATE = exports.FIRST_DATE = exports.FILING_ID = exports.TRANSACTION_ID = exports.PSC_NOTIFICATION_ID = exports.COMPANY_NUMBER = exports.requestClient = void 0;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("../../../src");
const types_1 = require("../../../src/services/psc-verification-link/types");
exports.requestClient = new src_1.RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "123" });
exports.COMPANY_NUMBER = "12345678";
exports.PSC_NOTIFICATION_ID = "662a0de6a2c6f9aead0f32ab";
exports.TRANSACTION_ID = "12345";
exports.FILING_ID = "00112233";
exports.FIRST_DATE = new Date("2024-03-13T10:08:42Z");
exports.UPDATE_DATE = new Date("2024-04-13T10:08:42Z");
exports.DOB_DATE = new Date("1970-01-01");
exports.SELF_LINK = `/transactions/${exports.TRANSACTION_ID}/persons-with-significant-control-verification/${exports.FILING_ID}`;
exports.PSC_VERIFICATION_CREATED = {
    companyNumber: exports.COMPANY_NUMBER
};
exports.PSC_VERIFICATION_IND = {
    companyNumber: exports.COMPANY_NUMBER,
    pscNotificationId: exports.PSC_NOTIFICATION_ID,
    verificationDetails: {
        nameMismatchReason: types_1.NameMismatchReasonEnum.LEGAL_NAME_CHANGE,
        verificationStatements: [types_1.VerificationStatementEnum.INDIVIDUAL_VERIFIED]
    }
};
const PSC_VERIFICATION_CREATED_RESOURCE = {
    company_number: exports.COMPANY_NUMBER
};
const PSC_VERIFICATION_CREATED_CAMEL = {
    companyNumber: exports.COMPANY_NUMBER
};
exports.mockPscVerificationCreated = {
    createdAt: exports.FIRST_DATE,
    updatedAt: exports.FIRST_DATE,
    data: PSC_VERIFICATION_CREATED_CAMEL,
    links: {
        self: exports.SELF_LINK,
        validationStatus: `${exports.SELF_LINK}/validation_status`
    }
};
exports.mockPscVerificationCreatedResource = {
    created_at: exports.FIRST_DATE,
    updated_at: exports.FIRST_DATE,
    data: PSC_VERIFICATION_CREATED_RESOURCE,
    links: {
        self: exports.SELF_LINK,
        validation_status: `${exports.SELF_LINK}/validation_status`
    }
};
const PSC_VERIFICATION_INDV_PATCH = {
    psc_notification_id: exports.PSC_NOTIFICATION_ID
};
exports.mockPscVerificationPatchedResource = {
    created_at: exports.FIRST_DATE,
    updated_at: exports.UPDATE_DATE,
    data: PSC_VERIFICATION_INDV_PATCH,
    links: {
        self: exports.SELF_LINK,
        validation_status: `${exports.SELF_LINK}/validation_status`
    }
};
exports.mockPscVerificationPatchIndResource = {
    created_at: exports.FIRST_DATE,
    updated_at: exports.UPDATE_DATE,
    data: PSC_VERIFICATION_INDV_PATCH,
    links: {
        self: exports.SELF_LINK,
        validation_status: `${exports.SELF_LINK}/validation_status`
    }
};
const PSC_VERIFICATION_INDV_PATCH_CAMEL = {
    pscNotificationId: exports.PSC_NOTIFICATION_ID
};
exports.mockPscVerificationPatchInd = {
    createdAt: exports.FIRST_DATE,
    updatedAt: exports.UPDATE_DATE,
    data: PSC_VERIFICATION_INDV_PATCH_CAMEL,
    links: {
        self: exports.SELF_LINK,
        validationStatus: `${exports.SELF_LINK}/validation_status`
    }
};
exports.mockPscVerificationCreatedResponse = {
    201: { status: http_status_codes_1.StatusCodes.CREATED, body: exports.mockPscVerificationCreatedResource },
    400: { status: http_status_codes_1.StatusCodes.BAD_REQUEST, error: http_status_codes_1.ReasonPhrases.BAD_REQUEST },
    401: { status: http_status_codes_1.StatusCodes.UNAUTHORIZED, error: http_status_codes_1.ReasonPhrases.UNAUTHORIZED },
    500: { status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error: http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR }
};
const PSC_VERIFICATION_IND_RESOURCE = {
    company_number: exports.COMPANY_NUMBER,
    psc_notification_id: exports.PSC_NOTIFICATION_ID,
    verification_details: {
        name_mismatch_reason: types_1.NameMismatchReasonEnum.LEGAL_NAME_CHANGE,
        verification_statements: [types_1.VerificationStatementEnum.INDIVIDUAL_VERIFIED]
    }
};
exports.PSC_VERIFICATION_IND_CAMEL = {
    companyNumber: exports.COMPANY_NUMBER,
    pscNotificationId: exports.PSC_NOTIFICATION_ID,
    verificationDetails: {
        nameMismatchReason: types_1.NameMismatchReasonEnum.LEGAL_NAME_CHANGE,
        verificationStatements: [types_1.VerificationStatementEnum.INDIVIDUAL_VERIFIED]
    }
};
exports.mockPscVerificationIndResource = {
    created_at: exports.FIRST_DATE,
    updated_at: exports.FIRST_DATE,
    data: PSC_VERIFICATION_IND_RESOURCE,
    links: {
        self: exports.SELF_LINK,
        validation_status: `${exports.SELF_LINK}/validation_status`
    }
};
exports.mockPscVerificationInd = {
    createdAt: exports.FIRST_DATE,
    updatedAt: exports.FIRST_DATE,
    data: exports.PSC_VERIFICATION_IND_CAMEL,
    links: {
        self: exports.SELF_LINK,
        validationStatus: `${exports.SELF_LINK}/validation_status`
    }
};
exports.mockPlannedMaintenanceResource = {
    status: "UP",
    message: "",
    maintenance_start_time: new Date(),
    maintenance_end_time: new Date()
};
exports.mockValidationStatusError = {
    error: "The name on the public register is different to the name this PSC used for identity verification: a name mismatch reason must be provided",
    location: "$.uvid_match",
    type: "ch:validation",
    locationType: "json-path"
};
exports.mockValidationStatusResponseValid = {
    errors: [],
    isValid: true
};
exports.mockValidationStatusResponseErrors = {
    errors: [exports.mockValidationStatusError],
    isValid: false
};
const mockValidationStatusErrorResource = {
    error: "The name on the public register is different to the name this PSC used for identity verification: a name mismatch reason must be provided",
    location: "$.uvid_match",
    type: "ch:validation",
    location_type: "json-path"
};
const mockValidationStatusResponseValidResource = {
    errors: [],
    is_valid: true
};
const mockValidationStatusResponseErrorsResource = {
    errors: [mockValidationStatusErrorResource],
    is_valid: false
};
exports.mockPscVerificationIndResponse = {
    200: { status: http_status_codes_1.StatusCodes.OK, body: exports.mockPscVerificationIndResource },
    401: { status: http_status_codes_1.StatusCodes.UNAUTHORIZED, error: http_status_codes_1.ReasonPhrases.UNAUTHORIZED },
    404: { status: http_status_codes_1.StatusCodes.NOT_FOUND, error: http_status_codes_1.ReasonPhrases.NOT_FOUND },
    500: { status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error: http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR }
};
exports.mockPscVerificationPatchIndResponse = {
    200: { status: http_status_codes_1.StatusCodes.OK, body: exports.mockPscVerificationPatchIndResource },
    400: { status: http_status_codes_1.StatusCodes.BAD_REQUEST, error: http_status_codes_1.ReasonPhrases.BAD_REQUEST },
    401: { status: http_status_codes_1.StatusCodes.UNAUTHORIZED, error: http_status_codes_1.ReasonPhrases.UNAUTHORIZED },
    404: { status: http_status_codes_1.StatusCodes.NOT_FOUND, error: http_status_codes_1.ReasonPhrases.NOT_FOUND },
    500: { status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error: http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR }
};
exports.mockPlannedMaintenanceResponse = {
    200: { status: http_status_codes_1.StatusCodes.OK, body: exports.mockPlannedMaintenanceResource },
    404: { status: http_status_codes_1.StatusCodes.NOT_FOUND, error: http_status_codes_1.ReasonPhrases.NOT_FOUND }
};
exports.mockGetValidationStatusResponse = {
    200: { status: http_status_codes_1.StatusCodes.OK, body: mockValidationStatusResponseValidResource },
    401: { status: http_status_codes_1.StatusCodes.UNAUTHORIZED, error: http_status_codes_1.ReasonPhrases.UNAUTHORIZED },
    404: { status: http_status_codes_1.StatusCodes.NOT_FOUND, error: http_status_codes_1.ReasonPhrases.NOT_FOUND },
    500: { status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error: http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR }
};
exports.mockGetValidationStatusResponseErrors = {
    200: { status: http_status_codes_1.StatusCodes.OK, body: mockValidationStatusResponseErrorsResource }
};
//# sourceMappingURL=service.mock.js.map