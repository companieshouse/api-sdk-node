import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { RequestClient } from "../../../src";
import { NameMismatchReasonEnum, PlannedMaintenance, PscVerification, PscVerificationData, PscVerificationDataResource, PscVerificationResource, ValidationStatusError, ValidationStatusErrorResource, ValidationStatusResponse, ValidationStatusResponseResource, VerificationStatementEnum } from "../../../src/services/psc-verification-link/types";

export const requestClient = new RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "123" });

export const COMPANY_NUMBER = "12345678";
export const PSC_NOTIFICATION_ID = "662a0de6a2c6f9aead0f32ab"
export const TRANSACTION_ID = "12345";
export const FILING_ID = "00112233";
export const FIRST_DATE = new Date("2024-03-13T10:08:42Z");
export const UPDATE_DATE = new Date("2024-04-13T10:08:42Z");
export const DOB_DATE = new Date("1970-01-01");
export const SELF_LINK = `/transactions/${TRANSACTION_ID}/persons-with-significant-control-verification/${FILING_ID}`;

export const PSC_VERIFICATION_CREATED: PscVerificationData = {
    companyNumber: COMPANY_NUMBER
};

export const PSC_VERIFICATION_IND: PscVerificationData = {
    companyNumber: COMPANY_NUMBER,
    pscNotificationId: PSC_NOTIFICATION_ID,
    verificationDetails: {
        nameMismatchReason: NameMismatchReasonEnum.LEGAL_NAME_CHANGE,
        verificationStatements: [VerificationStatementEnum.INDIVIDUAL_VERIFIED]
    }
};

const PSC_VERIFICATION_CREATED_RESOURCE: PscVerificationDataResource = {
    company_number: COMPANY_NUMBER
}

const PSC_VERIFICATION_CREATED_CAMEL: PscVerificationData = {
    companyNumber: COMPANY_NUMBER
}

export const mockPscVerificationCreated: PscVerification = {
    createdAt: FIRST_DATE,
    updatedAt: FIRST_DATE,
    data: PSC_VERIFICATION_CREATED_CAMEL,
    links: {
        self: SELF_LINK,
        validationStatus: `${SELF_LINK}/validation_status`
    }
};

export const mockPscVerificationCreatedResource: PscVerificationResource = {
    created_at: FIRST_DATE,
    updated_at: FIRST_DATE,
    data: PSC_VERIFICATION_CREATED_RESOURCE,
    links: {
        self: SELF_LINK,
        validation_status: `${SELF_LINK}/validation_status`
    }
};

const PSC_VERIFICATION_INDV_PATCH: PscVerificationDataResource = {
    psc_notification_id: PSC_NOTIFICATION_ID
};

export const mockPscVerificationPatchedResource: PscVerificationResource = {
    created_at: FIRST_DATE,
    updated_at: UPDATE_DATE,
    data: PSC_VERIFICATION_INDV_PATCH,
    links: {
        self: SELF_LINK,
        validation_status: `${SELF_LINK}/validation_status`
    }
};

export const mockPscVerificationPatchIndResource: PscVerificationResource = {
    created_at: FIRST_DATE,
    updated_at: UPDATE_DATE,
    data: PSC_VERIFICATION_INDV_PATCH,
    links: {
        self: SELF_LINK,
        validation_status: `${SELF_LINK}/validation_status`
    }
};

const PSC_VERIFICATION_INDV_PATCH_CAMEL: PscVerificationData = {
    pscNotificationId: PSC_NOTIFICATION_ID
};

export const mockPscVerificationPatchInd: PscVerification = {
    createdAt: FIRST_DATE,
    updatedAt: UPDATE_DATE,
    data: PSC_VERIFICATION_INDV_PATCH_CAMEL,
    links: {
        self: SELF_LINK,
        validationStatus: `${SELF_LINK}/validation_status`
    }
};

export const mockPscVerificationCreatedResponse = {
    201: { status: StatusCodes.CREATED, body: mockPscVerificationCreatedResource },
    400: { status: StatusCodes.BAD_REQUEST, error: ReasonPhrases.BAD_REQUEST },
    401: { status: StatusCodes.UNAUTHORIZED, error: ReasonPhrases.UNAUTHORIZED }
};

const PSC_VERIFICATION_IND_RESOURCE: PscVerificationDataResource = {
    company_number: COMPANY_NUMBER,
    psc_notification_id: PSC_NOTIFICATION_ID,
    verification_details: {
        name_mismatch_reason: NameMismatchReasonEnum.LEGAL_NAME_CHANGE,
        verification_statements: [VerificationStatementEnum.INDIVIDUAL_VERIFIED]
    }
};

export const PSC_VERIFICATION_IND_CAMEL: PscVerificationData = {
    companyNumber: COMPANY_NUMBER,
    pscNotificationId: PSC_NOTIFICATION_ID,
    verificationDetails: {
        nameMismatchReason: NameMismatchReasonEnum.LEGAL_NAME_CHANGE,
        verificationStatements: [VerificationStatementEnum.INDIVIDUAL_VERIFIED]
    }
};

export const mockPscVerificationIndResource: PscVerificationResource = {
    created_at: FIRST_DATE,
    updated_at: FIRST_DATE,
    data: PSC_VERIFICATION_IND_RESOURCE,
    links: {
        self: SELF_LINK,
        validation_status: `${SELF_LINK}/validation_status`
    }
};

export const mockPscVerificationInd: PscVerification = {
    createdAt: FIRST_DATE,
    updatedAt: FIRST_DATE,
    data: PSC_VERIFICATION_IND_CAMEL,
    links: {
        self: SELF_LINK,
        validationStatus: `${SELF_LINK}/validation_status`
    }
};

export const mockPlannedMaintenanceResource: PlannedMaintenance = {
    status: "UP",
    message: "",
    maintenance_start_time: new Date(),
    maintenance_end_time: new Date()
}

export const mockValidationStatusError: ValidationStatusError = {
    error: "The name on the public register is different to the name this PSC used for identity verification: a name mismatch reason must be provided",
    location: "$.uvid_match",
    type: "ch:validation",
    locationType: "json-path"
}

export const mockValidationStatusResponseValid: ValidationStatusResponse = {
    errors: [],
    isValid: true
}

export const mockValidationStatusResponseErrors: ValidationStatusResponse = {
    errors: [mockValidationStatusError],
    isValid: false
}

const mockValidationStatusErrorResource: ValidationStatusErrorResource = {
    error: "The name on the public register is different to the name this PSC used for identity verification: a name mismatch reason must be provided",
    location: "$.uvid_match",
    type: "ch:validation",
    location_type: "json-path"
}

const mockValidationStatusResponseValidResource: ValidationStatusResponseResource = {
    errors: [],
    is_valid: true
}

const mockValidationStatusResponseErrorsResource: ValidationStatusResponseResource = {
    errors: [mockValidationStatusErrorResource],
    is_valid: false
}

export const mockPscVerificationIndResponse = {
    200: { status: StatusCodes.OK, body: mockPscVerificationIndResource },
    401: { status: StatusCodes.UNAUTHORIZED, error: ReasonPhrases.UNAUTHORIZED },
    404: { status: StatusCodes.NOT_FOUND, error: ReasonPhrases.NOT_FOUND }
};

export const mockPscVerificationPatchIndResponse = {
    200: { status: StatusCodes.OK, body: mockPscVerificationPatchIndResource },
    400: { status: StatusCodes.BAD_REQUEST, error: ReasonPhrases.BAD_REQUEST },
    401: { status: StatusCodes.UNAUTHORIZED, error: ReasonPhrases.UNAUTHORIZED },
    404: { status: StatusCodes.NOT_FOUND, error: ReasonPhrases.NOT_FOUND }
};

export const mockPlannedMaintenanceResponse = {
    200: { status: StatusCodes.OK, body: mockPlannedMaintenanceResource },
    404: { status: StatusCodes.NOT_FOUND, error: ReasonPhrases.NOT_FOUND }
};

export const mockGetValidationStatusResponse = {
    200: { status: StatusCodes.OK, body: mockValidationStatusResponseValidResource },
    401: { status: StatusCodes.UNAUTHORIZED, error: ReasonPhrases.UNAUTHORIZED },
    404: { status: StatusCodes.NOT_FOUND, error: ReasonPhrases.NOT_FOUND },
    500: { status: StatusCodes.INTERNAL_SERVER_ERROR, error: ReasonPhrases.INTERNAL_SERVER_ERROR }
};

export const mockGetValidationStatusResponseErrors = {
    200: { status: StatusCodes.OK, body: mockValidationStatusResponseErrorsResource }
};
