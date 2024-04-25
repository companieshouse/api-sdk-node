import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { RequestClient } from "../../../src";
import { NameMismatchReason, PscVerification, PscVerificationResource, VerificationStatement } from "../../../src/services/psc-verification-link/types";

export const requestClient = new RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "123" });

export const COMPANY_NUMBER = "12345678";
export const PSC_VERIFICATION_ID = "662a0de6a2c6f9aead0f32ab"
export const TRANSACTION_ID = "12345";
export const FILING_ID = "00112233";
export const FIRST_DATE = new Date("2024-03-13T10:08:42Z");
export const DOB_DATE = new Date("1970-01-01");
export const SELF_LINK = `/transactions/${TRANSACTION_ID}/persons-with-significant-control-verification/${FILING_ID}`;

export const PSC_VERIFICATION_MOCK: PscVerification = {
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
export const PSC_VERIFICATION_RLE: PscVerification = {
    company_number: COMPANY_NUMBER,
    psc_appointment_id: PSC_VERIFICATION_ID,
    relevant_officer: {
        name_elements: {
            title: "Sir",
            forename: "Forename",
            middlename: "Middlename",
            surname: "Surname"
        },
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
    data: PSC_VERIFICATION_MOCK,
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

export const mockPscVerificationIndividualResource: PscVerificationResource = {
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

export const mockPscVerificationIndividualResponse = {
    200: { status: StatusCodes.OK, body: mockPscVerificationIndividualResource },
    401: { status: StatusCodes.UNAUTHORIZED, error: ReasonPhrases.UNAUTHORIZED },
    404: { status: StatusCodes.NOT_FOUND, error: ReasonPhrases.NOT_FOUND }
};
export const mockPscVerificationRleResponse = {
    200: { status: StatusCodes.OK, body: mockPscVerificationRleResource },
    401: { status: StatusCodes.UNAUTHORIZED, error: ReasonPhrases.UNAUTHORIZED },
    404: { status: StatusCodes.NOT_FOUND, error: ReasonPhrases.NOT_FOUND }
};
