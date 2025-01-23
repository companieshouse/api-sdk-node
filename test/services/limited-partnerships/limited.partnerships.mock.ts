import { RequestClient } from "../../../src";
import {
    LimitedPartnership,
    LimitedPartnershipResourceCreated,
    NameEndingType,
    PartnershipType
} from "../../../src/services/limited-partnerships";

export const requestClient = new RequestClient({
    baseUrl: "URL_NOT_USED",
    oauthToken: "TOKEN_NOT_USED"
});

export const LIMITED_PARTNERSHIP_OBJECT_MOCK: LimitedPartnership = {
    data: {
        partnership_name: "Legalised Asset Stashing",
        name_ending: NameEndingType.LIMITED_PARTNERSHIP,
        partnership_type: PartnershipType.LP,
        email: "test@email.com"
    }
};

export const TRANSACTION_ID = "12345";
export const SUBMISSION_ID = "09876";
export const LIMITED_PARTNERSHIP_ID = "00112233";
export const UNAUTHORISED = "Unauthorised";
export const BAD_REQUEST = "Bad Request";
export const NOT_FOUND = "Not Found";

export const mockLimitedPartnershipCreatedResource: LimitedPartnershipResourceCreated =
    {
        id: LIMITED_PARTNERSHIP_ID
    };

export const mockPostLimitedPartnershipResponse = {
    200: { status: 200 },
    201: { status: 201, body: mockLimitedPartnershipCreatedResource },
    400: { status: 400, error: BAD_REQUEST },
    401: { status: 401, error: UNAUTHORISED }
};

export const mockGetLimitedPartnershipResponse = {
    200: { status: 200, body: LIMITED_PARTNERSHIP_OBJECT_MOCK },
    404: { status: 404, error: NOT_FOUND },
    401: { status: 401, error: UNAUTHORISED }
};

export const mockPostLimitedPartnershipIncorporationResponse = {
    201: { status: 201, body: mockLimitedPartnershipCreatedResource },
    400: { status: 400, error: BAD_REQUEST },
    401: { status: 401, error: UNAUTHORISED }
};
