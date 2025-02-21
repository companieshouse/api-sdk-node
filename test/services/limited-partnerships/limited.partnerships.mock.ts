import { RequestClient } from "../../../src";
import {
    LimitedPartnership,
    LimitedPartnershipResourceCreated,
    LimitedPartnershipIncorporation,
    NameEndingType,
    PartnershipType,
    Jurisdiction,
    Term,
    GeneralPartner
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
        principal_place_of_business_address: {
            premises: "23",
            address_line_1: "Some Other Street",
            address_line_2: "Some Other Line 2",
            locality: "Some Other Locality",
            region: "Some Other Region",
            country: "Some Country",
            postal_code: "SC13 1WE"
        },
        term: Term.BY_AGREEMENT
    }
};

export const GENERAL_PARTNER_OBJECT_MOCK: GeneralPartner = {
    data: {
        country: "England",
        date_effective_from: "2005-02-04",
        date_of_birth: "2000-05-01",
        etag: "",
        forename: "John",
        former_names: "Mary",
        governing_law: "British Government",
        internal_id: "123456",
        kind: "",
        legal_entity_register_name: "Entity Name",
        legal_entity_registration_location: "UK",
        legal_form: "",
        nationality1: "English",
        nationality2: "French",
        not_disqualified_statement_checked: true,
        principal_office_address: {
            premises: "22",
            address_line_1: "Some Street",
            address_line_2: "Some Line 2",
            locality: "Some Locality",
            region: "Some Region",
            country: "Some Country",
            postal_code: "SC12 1WE",
            care_of: "",
            po_box: ""
        },
        registered_company_number: "223456",
        resignation_date: "",
        service_address: {
            premises: "10",
            address_line_1: "This Street",
            address_line_2: "This Line 2",
            locality: "This Locality",
            region: "This Region",
            country: "This Country",
            postal_code: "SC45 1XF",
            care_of: "",
            po_box: ""
        },
        surname: "Doe",
        usual_residential_address: {
            premises: "25",
            address_line_1: "That Street",
            address_line_2: "That Line 2",
            locality: "That Locality",
            region: "That Region",
            country: "That Country",
            postal_code: "SC15 1N2",
            care_of: "",
            po_box: ""
        }
    }
}

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

export const mockPostGeneralPartnerResponse = {
    201: { status: 201, body: mockLimitedPartnershipCreatedResource },
    400: { status: 400, body: { error: BAD_REQUEST } },
    401: { status: 401, body: { error: UNAUTHORISED } }
};
