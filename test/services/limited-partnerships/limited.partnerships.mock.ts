import { RequestClient } from "../../../src";
import {
    LimitedPartnership,
    LimitedPartnershipCreated,
    NameEndingType
} from "../../../src/services/limited-partnerships";

export const requestClient = new RequestClient({
    baseUrl: "URL_NOT_USED",
    oauthToken: "TOKEN_NOT_USED"
});

export const LIMITED_PARTNERSHIP_OBJECT_MOCK: LimitedPartnership = {
    data: {
        partnership_name: "Legalised Asset Stashing",
        name_ending: NameEndingType.LIMITED_PARTNERSHIP
    }
};

export const TRANSACTION_ID = "12345";
export const SUBMISSION_ID = "09876";
export const LIMITED_PARTNERSHIP_ID = "00112233";
export const UNAUTHORISED = "Unauthorised";
export const BAD_REQUEST = "Bad Request";

export const mockLimitedPartnershipCreatedResource: LimitedPartnershipCreated =
    {
        id: LIMITED_PARTNERSHIP_ID
    };

export const mockPostLimitedPartnershipResponse = {
    200: { status: 200 },
    201: { status: 201, body: mockLimitedPartnershipCreatedResource },
    400: { status: 400, error: BAD_REQUEST },
    401: { status: 401, error: UNAUTHORISED }
};
