import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { RequestClient } from "../../../src";
import { NameElements, NameMismatchReason, PscVerification, PscVerificationResource, VerificationStatement } from "../../../src/services/psc-verification-link/types";

export const requestClient = new RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "123" });

export const COMPANY_NUMBER = "12345678";
export const PSC_VERIFICATION_ID = "662a0de6a2c6f9aead0f32ab"
export const TRANSACTION_ID = "12345";
export const FILING_ID = "00112233";
export const FIRST_DATE = new Date("2024-03-13T10:08:42Z");
export const UPDATE_DATE = new Date("2024-04-13T10:08:42Z");
export const DOB_DATE = new Date("1970-01-01");
export const SELF_LINK = `/transactions/${TRANSACTION_ID}/persons-with-significant-control-verification/${FILING_ID}`;

export const PSC_VERIFICATION_CREATED: PscVerification = {
    company_number: COMPANY_NUMBER
};

export const PSC_VERIFICATION_IND: PscVerification = {
    company_number: COMPANY_NUMBER,
    psc_appointment_id: PSC_VERIFICATION_ID,
    verification_details: {
        name_mismatch_reason: NameMismatchReason.MAIDEN_NAME,
        verification_statements: [VerificationStatement.INDIVIDUAL_VERIFIED]
    }
};

const NAME_ELEMENTS: NameElements = {
    title: "Sir",
    forename: "Forename",
    middlename: "Middlename",
    surname: "Surname"
};

export const PSC_VERIFICATION_RLE: PscVerification = {
    company_number: COMPANY_NUMBER,
    psc_appointment_id: PSC_VERIFICATION_ID,
    relevant_officer: {
        name_elements: NAME_ELEMENTS,
        date_of_birth: DOB_DATE,
        is_director: true,
        is_employee: true
    },
    verification_details: {
        name_mismatch_reason: NameMismatchReason.MAIDEN_NAME,
        verification_statements: [VerificationStatement.RO_DECLARATION, VerificationStatement.RO_IDENTIFIED, VerificationStatement.RO_VERIFIED]
    }
};

export const mockPscVerificationCreatedResource: PscVerificationResource = {
    created_at: FIRST_DATE,
    updated_at: FIRST_DATE,
    data: PSC_VERIFICATION_CREATED,
    links: {
        self: SELF_LINK,
        validation_status: `${SELF_LINK}/validation_status`
    }
};

export const PSC_VERIFICATION_INDV_PATCH: PscVerification = {
    psc_appointment_id: PSC_VERIFICATION_ID
};

export const PSC_VERIFICATION_RO_PATCH: PscVerification = {
    psc_appointment_id: PSC_VERIFICATION_ID,
    relevant_officer: {
        name_elements: NAME_ELEMENTS
    }
};

export const mockPscVerificationPatchRleRoResource: PscVerificationResource = {
    created_at: FIRST_DATE,
    updated_at: UPDATE_DATE,
    data: PSC_VERIFICATION_RO_PATCH,
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

export const mockPscVerificationCreatedResponse = {
    201: { status: StatusCodes.CREATED, body: mockPscVerificationCreatedResource },
    400: { status: StatusCodes.BAD_REQUEST, error: ReasonPhrases.BAD_REQUEST },
    401: { status: StatusCodes.UNAUTHORIZED, error: ReasonPhrases.UNAUTHORIZED }
};

export const mockPscVerificationIndResource: PscVerificationResource = {
    created_at: FIRST_DATE,
    updated_at: FIRST_DATE,
    data: PSC_VERIFICATION_IND,
    links: {
        self: SELF_LINK,
        validation_status: `${SELF_LINK}/validation_status`
    }
};

export const mockPscVerificationRleResource: PscVerificationResource = {
    created_at: FIRST_DATE,
    updated_at: FIRST_DATE,
    data: PSC_VERIFICATION_RLE,
    links: {
        self: SELF_LINK,
        validation_status: `${SELF_LINK}/validation_status`
    }
};

export const mockPscVerificationIndResponse = {
    200: { status: StatusCodes.OK, body: mockPscVerificationIndResource },
    401: { status: StatusCodes.UNAUTHORIZED, error: ReasonPhrases.UNAUTHORIZED },
    404: { status: StatusCodes.NOT_FOUND, error: ReasonPhrases.NOT_FOUND }
};
export const mockPscVerificationRleResponse = {
    200: { status: StatusCodes.OK, body: mockPscVerificationRleResource },
    401: { status: StatusCodes.UNAUTHORIZED, error: ReasonPhrases.UNAUTHORIZED },
    404: { status: StatusCodes.NOT_FOUND, error: ReasonPhrases.NOT_FOUND }
};
