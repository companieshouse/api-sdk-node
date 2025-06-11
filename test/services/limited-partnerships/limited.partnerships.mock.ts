import { RequestClient } from "../../../src";
import {
    Incorporation,
    IncorporationKind,
    LimitedPartnership,
    LimitedPartnershipResourceCreated,
    LimitedPartnershipIncorporation,
    NameEndingType,
    PartnershipType,
    Jurisdiction,
    Term,
    GeneralPartner,
    LimitedPartner
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
        term: Term.BY_AGREEMENT,
        sic_codes: ["12345", "56789"],
        lawful_purpose_statement_checked: true
    }
};

export const GENERAL_PARTNER_OBJECT_MOCK: GeneralPartner = {
    id: "123456",
    data: {
        completed: true,
        date_effective_from: "2005-02-04",
        date_of_birth: "2000-05-01",
        etag: "",
        forename: "John",
        former_names: "Mary",
        governing_law: "British Government",
        kind: "",
        legal_entity_name: "My company ltd",
        legal_entity_register_name: "UK Register",
        legal_entity_registration_location: "England",
        legal_form: "abc",
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
            postal_code: "SC12 1WE"
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
            postal_code: "SC45 1XF"
        },
        surname: "Doe",
        usual_residential_address: {
            premises: "25",
            address_line_1: "That Street",
            address_line_2: "That Line 2",
            locality: "That Locality",
            region: "That Region",
            country: "That Country",
            postal_code: "SC15 1N2"
        }
    }
};

export const LIMITED_PARTNER_OBJECT_MOCK: LimitedPartner = {
    id: "123456",
    data: {
        completed: true,
        contribution_currency_type: "GBP",
        contribution_currency_value: "1000",
        contribution_non_monetary_value: "car",
        date_effective_from: "2005-02-04",
        date_of_birth: "2000-05-01",
        etag: "",
        forename: "John",
        former_names: "Mary",
        governing_law: "British Government",
        kind: "",
        legal_entity_name: "My company ltd",
        legal_entity_register_name: "UK Register",
        legal_entity_registration_location: "England",
        legal_form: "abc",
        nationality1: "English",
        nationality2: "French",
        principal_office_address: {
            premises: "22",
            address_line_1: "Some Street",
            address_line_2: "Some Line 2",
            locality: "Some Locality",
            region: "Some Region",
            country: "Some Country",
            postal_code: "SC12 1WE"
        },
        registered_company_number: "223456",
        resignation_date: "",
        surname: "Doe",
        usual_residential_address: {
            premises: "25",
            address_line_1: "That Street",
            address_line_2: "That Line 2",
            locality: "That Locality",
            region: "That Region",
            country: "That Country",
            postal_code: "SC15 1N2"
        }
    }
};

// This structure is used when POSTing Incorporation data
export const INCORPORATION_OBJECT_MOCK: Incorporation = {
    data: {
        kind: IncorporationKind.REGISTRATION
    }
};

// These structures represent responses from GETing Incorporation data:

export const LIMITED_PARTNERSHIP_INCORPORATION_OBJECT_MOCK: LimitedPartnershipIncorporation =
    {
        etag: "",
        kind: ""
    };

export const LIMITED_PARTNERSHIP_INCORPORATION_OBJECT_MOCK_WITH_SUB: LimitedPartnershipIncorporation =
    {
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
export const GENERAL_PARTNER_ID = "00112233";
export const LIMITED_PARTNER_ID = "11223344";
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
    200: {
        status: 200,
        body: LIMITED_PARTNERSHIP_INCORPORATION_OBJECT_MOCK_WITH_SUB
    }
};

export const mockPostGeneralPartnerResponse = {
    201: { status: 201, body: mockLimitedPartnershipCreatedResource },
    400: { status: 400, body: { error: BAD_REQUEST } },
    401: { status: 401, body: { error: UNAUTHORISED } }
};

export const mockGetGeneralPartnerResponse = {
    200: { status: 200, body: GENERAL_PARTNER_OBJECT_MOCK },
    404: { status: 404, body: { error: NOT_FOUND } },
    401: { status: 401, body: { error: UNAUTHORISED } }
};

export const mockGetGeneralPartnersResponse = {
    200: { status: 200, body: [GENERAL_PARTNER_OBJECT_MOCK] },
    404: { status: 404, body: { error: NOT_FOUND } },
    401: { status: 401, body: { error: UNAUTHORISED } }
};

export const mockPatchGeneralPartnerResponse = {
    200: { status: 200 },
    400: { status: 400, body: { error: BAD_REQUEST } },
    401: { status: 401, body: { error: UNAUTHORISED } }
};

export const mockDeleteGeneralPartnerResponse = {
    204: { status: 204 },
    404: { status: 404, body: { error: NOT_FOUND } },
    401: { status: 401, body: { error: UNAUTHORISED } }
};

export const mockPostLimitedPartnerResponse = {
    201: { status: 201, body: mockLimitedPartnershipCreatedResource },
    400: { status: 400, body: { error: BAD_REQUEST } },
    401: { status: 401, body: { error: UNAUTHORISED } }
};

export const mockGetLimitedPartnerResponse = {
    200: { status: 200, body: LIMITED_PARTNER_OBJECT_MOCK },
    404: { status: 404, body: { error: NOT_FOUND } },
    401: { status: 401, body: { error: UNAUTHORISED } }
};

export const mockGetLimitedPartnersResponse = {
    200: { status: 200, body: [LIMITED_PARTNER_OBJECT_MOCK] },
    404: { status: 404, body: { error: NOT_FOUND } },
    401: { status: 401, body: { error: UNAUTHORISED } }
};

export const mockPatchLimitedPartnerResponse = {
    200: { status: 200 },
    400: { status: 400, body: { error: BAD_REQUEST } },
    401: { status: 401, body: { error: UNAUTHORISED } }
};

export const mockDeleteLimitedPartnerResponse = {
    204: { status: 204 },
    404: { status: 404, body: { error: NOT_FOUND } },
    401: { status: 401, body: { error: UNAUTHORISED } }
};
