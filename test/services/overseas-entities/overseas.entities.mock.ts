import { RequestClient } from "../../../src";
import {
    Address,
    BeneficialOwnerCorporate,
    BeneficialOwnerCorporateResource,
    BeneficialOwnerGovernmentOrPublicAuthority,
    BeneficialOwnerGovernmentOrPublicAuthorityResource,
    BeneficialOwnerIndividual,
    BeneficialOwnerIndividualResource,
    BeneficialOwnersStatementType,
    Entity,
    ManagingOfficerCorporate,
    ManagingOfficerCorporateResource,
    ManagingOfficerIndividual,
    ManagingOfficerIndividualResource,
    NatureOfControlType,
    OverseasEntity,
    OverseasEntityCreated,
    OverseasEntityResource,
    Presenter,
    yesNoResponse
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

export const PRESENTER_OBJECT_MOCK: Presenter = {
    full_name: "Full Name",
    email: "user@domain.roe"
};

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
    registration_number: "123",
    is_on_register_in_country_formed_in: 1
};

export const BENEFICIAL_OWNER_INDIVIDUAL_MOCK_LIST: BeneficialOwnerIndividual[] = [
    {
        id: "1ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
        first_name: "Joe",
        last_name: "Bloggs",
        date_of_birth: { day: "1", month: "1", year: "1950" },
        nationality: "Utopian",
        usual_residential_address: ADDRESS,
        service_address: ADDRESS,
        is_service_address_same_as_usual_residential_address: yesNoResponse.Yes,
        start_date: { day: "1", month: "1", year: "2012" },
        beneficial_owner_nature_of_control_types: [NatureOfControlType.OVER_25_PERCENT_OF_SHARES],
        trustees_nature_of_control_types: [NatureOfControlType.APPOINT_OR_REMOVE_MAJORITY_BOARD_DIRECTORS],
        non_legal_firm_members_nature_of_control_types: [NatureOfControlType.SIGNIFICANT_INFLUENCE_OR_CONTROL],
        is_on_sanctions_list: yesNoResponse.No
    }
];

export const BENEFICIAL_OWNER_INDIVIDUAL_RESOURCE_MOCK_LIST: BeneficialOwnerIndividualResource[] = [
    {
        first_name: "Joe",
        last_name: "Bloggs",
        date_of_birth: "1950-01-01",
        nationality: "Utopian",
        usual_residential_address: ADDRESS,
        service_address: ADDRESS,
        is_service_address_same_as_usual_residential_address: yesNoResponse.Yes,
        start_date: "2012-01-01",
        beneficial_owner_nature_of_control_types: [NatureOfControlType.OVER_25_PERCENT_OF_SHARES],
        trustees_nature_of_control_types: [NatureOfControlType.APPOINT_OR_REMOVE_MAJORITY_BOARD_DIRECTORS],
        non_legal_firm_members_nature_of_control_types: [NatureOfControlType.SIGNIFICANT_INFLUENCE_OR_CONTROL],
        is_on_sanctions_list: yesNoResponse.No
    }
];

export const BENEFICIAL_OWNER_CORPORATE_MOCK_LIST: BeneficialOwnerCorporate[] = [
    {
        id: "2ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
        name: "Joe Bloggs Ltd",
        principal_address: ADDRESS,
        service_address: ADDRESS,
        is_service_address_same_as_principal_address: yesNoResponse.Yes,
        legal_form: "corporate",
        law_governed: "corporation",
        is_on_register_in_country_formed_in: yesNoResponse.Yes,
        public_register_name: "register",
        registration_number: "abc123",
        start_date: { day: "1", month: "12", year: "1950" },
        beneficial_owner_nature_of_control_types: [NatureOfControlType.OVER_25_PERCENT_OF_SHARES],
        trustees_nature_of_control_types: [NatureOfControlType.APPOINT_OR_REMOVE_MAJORITY_BOARD_DIRECTORS],
        non_legal_firm_members_nature_of_control_types: [NatureOfControlType.SIGNIFICANT_INFLUENCE_OR_CONTROL],
        is_on_sanctions_list: yesNoResponse.No
    }
];

export const BENEFICIAL_OWNER_CORPORATE_RESOURCE_MOCK_LIST: BeneficialOwnerCorporateResource[] = [
    {
        name: "Joe Bloggs Ltd",
        principal_address: ADDRESS,
        service_address: ADDRESS,
        is_service_address_same_as_principal_address: yesNoResponse.Yes,
        legal_form: "corporate",
        law_governed: "corporation",
        is_on_register_in_country_formed_in: yesNoResponse.Yes,
        public_register_name: "register",
        registration_number: "abc123",
        start_date: "1950-12-01",
        beneficial_owner_nature_of_control_types: [NatureOfControlType.OVER_25_PERCENT_OF_SHARES],
        trustees_nature_of_control_types: [NatureOfControlType.APPOINT_OR_REMOVE_MAJORITY_BOARD_DIRECTORS],
        non_legal_firm_members_nature_of_control_types: [NatureOfControlType.SIGNIFICANT_INFLUENCE_OR_CONTROL],
        is_on_sanctions_list: yesNoResponse.No

    }
];

export const BENEFICIAL_OWNER_GOVERNMENT_MOCK_LIST: BeneficialOwnerGovernmentOrPublicAuthority[] = [
    {
        id: "3ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
        name: "Joe Gov Ltd",
        principal_address: ADDRESS,
        service_address: ADDRESS,
        is_service_address_same_as_principal_address: yesNoResponse.Yes,
        legal_form: "gov",
        law_governed: "government",
        start_date: { day: "1", month: "12", year: "1950" },
        beneficial_owner_nature_of_control_types: [NatureOfControlType.OVER_25_PERCENT_OF_SHARES],
        non_legal_firm_members_nature_of_control_types: [NatureOfControlType.SIGNIFICANT_INFLUENCE_OR_CONTROL]
    }
];

export const BENEFICIAL_OWNER_GOVERNMENT_RESOURCE_MOCK_LIST: BeneficialOwnerGovernmentOrPublicAuthorityResource[] = [
    {
        name: "Joe Gov Ltd",
        principal_address: ADDRESS,
        service_address: ADDRESS,
        is_service_address_same_as_principal_address: yesNoResponse.Yes,
        legal_form: "gov",
        law_governed: "government",
        start_date: "1950-12-01",
        beneficial_owner_nature_of_control_types: [NatureOfControlType.OVER_25_PERCENT_OF_SHARES],
        non_legal_firm_members_nature_of_control_types: [NatureOfControlType.SIGNIFICANT_INFLUENCE_OR_CONTROL]
    }
];

export const MANAGING_OFFICERS_INDIVIDUAL_MOCK_LIST: ManagingOfficerIndividual[] = [
    {
        id: "4ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
        first_name: "Joe",
        last_name: "Bloggs",
        has_former_names: yesNoResponse.Yes,
        former_names: "Some name",
        date_of_birth: { day: "1", month: "1", year: "1990" },
        nationality: "Utopian",
        usual_residential_address: ADDRESS,
        service_address: ADDRESS,
        is_service_address_same_as_usual_residential_address: yesNoResponse.Yes,
        occupation: "Some Occupation",
        role_and_responsibilities: "Some role and responsibilities"
    }
];

export const MANAGING_OFFICERS_INDIVIDUAL_RESOURCE_MOCK_LIST: ManagingOfficerIndividualResource[] = [
    {
        first_name: "Joe",
        last_name: "Bloggs",
        has_former_names: yesNoResponse.Yes,
        former_names: "Some name",
        date_of_birth: "1990-01-01",
        nationality: "Utopian",
        usual_residential_address: ADDRESS,
        service_address: ADDRESS,
        is_service_address_same_as_usual_residential_address: yesNoResponse.Yes,
        occupation: "Some Occupation",
        role_and_responsibilities: "Some role and responsibilities"
    }
];

export const MANAGING_OFFICERS_CORPORATE_MOCK_LIST: ManagingOfficerCorporate[] = [
    {
        id: "5ec0bd7f-11c0-43da-975e-2a8ad9ebae0b",
        name: "Joe Bloggs Ltd",
        principal_address: ADDRESS,
        service_address: ADDRESS,
        is_service_address_same_as_principal_address: yesNoResponse.Yes,
        legal_form: "corporate",
        law_governed: "corporation",
        is_on_register_in_country_formed_in: yesNoResponse.Yes,
        public_register_name: "register",
        registration_number: "abc123",
        start_date: { day: "1", month: "12", year: "1950" }
    }
];

export const MANAGING_OFFICERS_CORPORATE_RESOURCE_MOCK_LIST: ManagingOfficerCorporateResource[] = [
    {
        name: "Joe Bloggs Ltd",
        principal_address: ADDRESS,
        service_address: ADDRESS,
        is_service_address_same_as_principal_address: yesNoResponse.Yes,
        legal_form: "corporate",
        law_governed: "corporation",
        is_on_register_in_country_formed_in: yesNoResponse.Yes,
        public_register_name: "register",
        registration_number: "abc123",
        start_date: "1950-12-01"
    }
];

export const OVERSEAS_ENTITY_OBJECT_MOCK: OverseasEntity = {
    presenter: PRESENTER_OBJECT_MOCK,
    entity: ENTITY_OBJECT_MOCK,
    beneficial_owners_statement: BeneficialOwnersStatementType.ALL_IDENTIFIED_ALL_DETAILS,
    beneficial_owners_individual: BENEFICIAL_OWNER_INDIVIDUAL_MOCK_LIST,
    beneficial_owners_corporate: BENEFICIAL_OWNER_CORPORATE_MOCK_LIST,
    beneficial_owners_government_or_public_authority: BENEFICIAL_OWNER_GOVERNMENT_MOCK_LIST,
    managing_officers_individual: MANAGING_OFFICERS_INDIVIDUAL_MOCK_LIST,
    managing_officers_corporate: MANAGING_OFFICERS_CORPORATE_MOCK_LIST
};

export const OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK: OverseasEntityResource = {
    presenter: PRESENTER_OBJECT_MOCK,
    entity: ENTITY_OBJECT_MOCK,
    beneficial_owners_statement: BeneficialOwnersStatementType.ALL_IDENTIFIED_ALL_DETAILS,
    beneficial_owners_individual: BENEFICIAL_OWNER_INDIVIDUAL_RESOURCE_MOCK_LIST,
    beneficial_owners_corporate: BENEFICIAL_OWNER_CORPORATE_RESOURCE_MOCK_LIST,
    beneficial_owners_government_or_public_authority: BENEFICIAL_OWNER_GOVERNMENT_RESOURCE_MOCK_LIST,
    managing_officers_individual: MANAGING_OFFICERS_INDIVIDUAL_RESOURCE_MOCK_LIST,
    managing_officers_corporate: MANAGING_OFFICERS_CORPORATE_RESOURCE_MOCK_LIST
};

export const requestClient = new RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "TOKEN_NOT_USED" });

export const TRANSACTION_ID = "12345";
export const UNAUTHORISED = "Unauthorised";

export const mockOverseasEntityCreatedResource: OverseasEntityCreated = { id: "00112233" };
export const mockPostOverseasEntityResponse = {
    201: { status: 201, body: mockOverseasEntityCreatedResource },
    401: { status: 401, error: UNAUTHORISED }
};
