import { RequestClient } from "../../../src";
import {
    LimitedPartnership,
    LimitedPartnershipResourceCreated,
    LimitedPartnershipIncorporation,
    NameEndingType,
    PartnershipType,
    Jurisdiction,
    Term
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
        email: "test@email.com",
        jurisdiction: Jurisdiction.ENGLAND_AND_WALES,
        registered_office_address: {
            premises: "22",
            address_line_1: "Some Street",
            address_line_2: "Some Line 2",
            locality: "Some Locality",
            region: "Some Region",
            country: "Some Country",
            postal_code: "SC12 1WE"
        },
        term: Term.BY_AGREEMENT
    }
};

export const LIMITED_PARTNERSHIP_INCORPORATION_OBJECT_MOCK: LimitedPartnershipIncorporation = {
    etag: "",
    kind: ""
};

export const LIMITED_PARTNERSHIP_INCORPORATION_OBJECT_MOCK_WITH_SUB: LimitedPartnershipIncorporation = {
    etag: "",
    kind: "",
    sub_resources: {
        general_partners: [],
        limited_partners: [],
        partnership: LIMITED_PARTNERSHIP_OBJECT_MOCK
    }
};

export const TRANSACTION_ID = "12345";
export const SUBMISSION_ID = "09876";
export const LIMITED_PARTNERSHIP_ID = "00112233";
export const FILE_RESOURCE_ID = "a1b2c3";
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
    400: { status: 400, body: { error: BAD_REQUEST } },
    401: { status: 401, body: { error: UNAUTHORISED } }
};

export const mockGetLimitedPartnershipResponse = {
    200: { status: 200, body: LIMITED_PARTNERSHIP_OBJECT_MOCK },
    404: { status: 404, body: { error: NOT_FOUND } },
    401: { status: 401, body: { error: UNAUTHORISED } }
};

export const mockPostLimitedPartnershipIncorporationResponse = {
    201: { status: 201, body: mockLimitedPartnershipCreatedResource },
    400: { status: 400, body: { error: BAD_REQUEST } },
    401: { status: 401, body: { error: UNAUTHORISED } }
};

export const mockGetLimitedPartnershipIncorporationResponse = {
    200: { status: 200, body: LIMITED_PARTNERSHIP_INCORPORATION_OBJECT_MOCK },
    404: { status: 404, body: { error: NOT_FOUND } },
    401: { status: 401, body: { error: UNAUTHORISED } }
};

export const mockGetLimitedPartnershipIncorporationResponseWithSub = {
    200: { status: 200, body: LIMITED_PARTNERSHIP_INCORPORATION_OBJECT_MOCK_WITH_SUB }
}
