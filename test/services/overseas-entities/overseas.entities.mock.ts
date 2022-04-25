import { RequestClient } from "../../../src";
import {
    Address,
    BeneficialOwnerCorporate,
    BeneficialOwnerGovernmentOrPublicAuthority,
    BeneficialOwnerIndividual,
    BeneficialOwnersStatementType,
    Entity, NatureOfControlType,
    OverseasEntity,
    OverseasEntityCreated,
    Presenter, yesNoResponse
} from "../../../src/services/overseas-entities";

export const ADDRESS: Address = {
    property_name_number: "property name 1",
    line_1: "addressLine1",
    line_2: "addressLine2",
    town: "town",
    county: "county",
    country: "country",
    postcode: "BY 2"
};

export const PRESENTER_OBJECT_MOCK = {
    full_name: "string",
    phone_number: "string",
    role: "solicitor",
    role_title: "string",
    anti_money_laundering_registration_number: "string"
} as Presenter;

export const ENTITY_OBJECT_MOCK: Entity = {
    name: "overseasEntityName",
    incorporation_country: "incorporationCountry",
    principal_address: ADDRESS,
    is_service_address_same_as_principal_address: 0,
    service_address: {},
    email: "email",
    legal_form: "legalForm",
    law_governed: "governedLaw",
    public_register_name: "publicRegister",
    registration_number: "123"
};

export const BENEFICIAL_OWNER_INDIVIDUAL_MOCK_LIST: BeneficialOwnerIndividual[] = [
    {
        first_name: "Joe",
        last_name: "Bloggs",
        date_of_birth: "",
        nationality: "Utopian",
        usual_residential_address: ADDRESS,
        service_address: ADDRESS,
        is_service_address_same_as_usual_residential_address: yesNoResponse.Yes,
        start_date: "",
        beneficial_owner_nature_of_control_types: NatureOfControlType.over_25_percent_of_shares,
        trustees_nature_of_control_types: NatureOfControlType.appoint_or_remove_majority_board_directors,
        non_legal_firm_members_nature_of_control_types: NatureOfControlType.significant_influence_or_control,
        is_on_sanctions_list: yesNoResponse.No
    }
];

export const BENEFICIAL_OWNER_CORPORATE_MOCK_LIST: BeneficialOwnerCorporate[] = [
    {
        name: "Joe Bloggs Ltd",
        principal_address: ADDRESS,
        service_address: ADDRESS,
        is_service_address_same_as_principal_address: yesNoResponse.Yes,
        legal_form: "corporate",
        law_governed: "corporation",
        is_on_register_in_country_formed_in: yesNoResponse.Yes,
        register_name: "register",
        registration_number: "abc123",
        start_date: "",
        beneficial_owner_nature_of_control_types: NatureOfControlType.over_25_percent_of_shares,
        trustees_nature_of_control_types: NatureOfControlType.appoint_or_remove_majority_board_directors,
        non_legal_firm_members_nature_of_control_types: NatureOfControlType.significant_influence_or_control,
        is_on_sanctions_list: yesNoResponse.No

    }
];

export const BENEFICIAL_OWNER_GOVERNMENT_MOCK_LIST: BeneficialOwnerGovernmentOrPublicAuthority[] = [
    {
        name: "Joe Gov Ltd",
        principal_address: ADDRESS,
        service_address: ADDRESS,
        is_service_address_same_as_principal_address: yesNoResponse.Yes,
        legal_form: "gov",
        law_governed: "government",
        is_on_register_in_country_formed_in: yesNoResponse.Yes,
        register_name: "registerName",
        registration_number: "xyz789",
        beneficial_owner_nature_of_control_types: NatureOfControlType.over_25_percent_of_shares,
        non_legal_firm_members_nature_of_control_types: NatureOfControlType.significant_influence_or_control
    }
];

export const OVERSEAS_ENTITY_OBJECT_MOCK: OverseasEntity = {
    presenter: PRESENTER_OBJECT_MOCK,
    entity: ENTITY_OBJECT_MOCK,
    beneficial_owners_statement: BeneficialOwnersStatementType.all_identified_all_details,
    beneficial_owners_individual: BENEFICIAL_OWNER_INDIVIDUAL_MOCK_LIST,
    beneficial_owners_corporate: BENEFICIAL_OWNER_CORPORATE_MOCK_LIST,
    beneficial_owners_government_or_public_authority: BENEFICIAL_OWNER_GOVERNMENT_MOCK_LIST
};

export const requestClient = new RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "TOKEN_NOT_USED" });

export const TRANSACTION_ID = "12345";
export const UNAUTHORISED = "Unauthorised";

export const mockOverseasEntityCreatedResource: OverseasEntityCreated = { id: "00112233" };
export const mockPostOverseasEntityResponse = {
    201: { status: 201, body: mockOverseasEntityCreatedResource },
    401: { status: 401, error: UNAUTHORISED }
};
