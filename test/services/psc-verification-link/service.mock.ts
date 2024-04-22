import { RequestClient } from "../../../src";
import { PscVerification, PscVerificationResource } from "../../../src/services/psc-verification-link/types";
import { ApiError, ApiErrorResponse, ApiResponse } from "../../../src/services/resource";

export const requestClient = new RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "123" });

export const COMPANY_NUMBER = "12345678";
export const TRANSACTION_ID = "12345";
export const FILING_ID = "00112233";
export const UNAUTHORISED = "Unauthorised";
export const BAD_REQUEST = "Bad Request";
export const FIRST_DATE = new Date("2024-03-13T10:08:42Z");
export const SELF_LINK = `/transactions/${TRANSACTION_ID}/persons-with-significant-control-verification/${FILING_ID}`;
export const PSC_VERIFICATION_MOCK: PscVerification = {
    company_number: COMPANY_NUMBER
}

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
    201: { status: 201, body: mockPscVerificationCreatedResource },
    400: { status: 400, error: BAD_REQUEST },
    401: { status: 401, error: UNAUTHORISED }
};
