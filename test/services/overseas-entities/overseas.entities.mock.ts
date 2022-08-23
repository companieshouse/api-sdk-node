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
    DueDiligence, DueDiligenceResource,
    Entity,
    ManagingOfficerCorporate,
    ManagingOfficerCorporateResource,
    ManagingOfficerIndividual,
    ManagingOfficerIndividualResource,
    NatureOfControlType,
    OverseasEntity,
    OverseasEntityCreated,
    OverseasEntityDueDiligence,
    OverseasEntityDueDiligenceResource,
    OverseasEntityResource,
    Presenter,
    yesNoResponse,
    Trust,
    TrustResource,
    TrustIndividual,
    TrustIndividualResource,
    TrustCorporate,
    TrustCorporateResource,
    TrustHistoricalBeneficialOwner,
    TrustHistoricalBeneficialOwnerResource
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
        name: "Joe Bloggs Ltd",
        principal_address: ADDRESS,
        service_address: ADDRESS,
        is_service_address_same_as_principal_address: yesNoResponse.Yes,
        legal_form: "corporate",
        law_governed: "corporation",
        is_on_register_in_country_formed_in: yesNoResponse.Yes,
        public_register_name: "register",
        registration_number: "abc123",
        role_and_responsibilities: "role and responsibilities text"
    }
];

export const DUE_DILIGENCE_MOCK: DueDiligence = {
    identity_date: { day: "1", month: "12", year: "2021" },
    name: "ABC Checking Ltd",
    email: "lorem@ipsum.com",
    supervisory_name: "Super supervisors",
    aml_number: "antimon123",
    agent_code: "assure123",
    partner_name: "Joe Checker"
};

export const DUE_DILIGENCE_RESOURCE_MOCK: DueDiligenceResource = {
    ...DUE_DILIGENCE_MOCK,
    identity_date: "2021-12-01"
}

export const OE_DUE_DILIGENCE_MOCK: OverseasEntityDueDiligence = {
    identity_date: { day: "1", month: "1", year: "2022" },
    name: "ABC Checking Ltd",
    identity_address: ADDRESS,
    email: "lorem@ipsum.com",
    supervisory_name: "Super supervisors",
    aml_number: "antimon123",
    partner_name: "Joe Checker"
};

export const OE_DUE_DILIGENCE_RESOURCE_MOCK: OverseasEntityDueDiligenceResource = {
    ...OE_DUE_DILIGENCE_MOCK,
    identity_date: "2022-01-01"
};

export const MANAGING_OFFICERS_CORPORATE_RESOURCE_MOCK_LIST: ManagingOfficerCorporateResource[] = MANAGING_OFFICERS_CORPORATE_MOCK_LIST;

export const TRUST_INDIVIDUALS_MOCK: TrustIndividual[] = [{
    type: "type",
    forename: "joe",
    other_forenames: "jim",
    surname: "bloggs",
    dob_day: "31",
    dob_month: "03",
    dob_year: "2003",
    nationality: "british",
    sa_address_line1: "sa_addressline1",
    sa_address_line2: "sa_addressline2",
    sa_address_care_of: "sa_careof",
    sa_address_country: "sa_country",
    sa_address_locality: "sa_locality",
    sa_address_po_box: "sa_pobox",
    sa_address_postal_code: "sa_postcode",
    sa_address_premises: "sa_premises",
    sa_address_region: "sa_region",
    ura_address_line1: "ura_line1",
    ura_address_line2: "ura_line2",
    ura_address_care_of: "ura_careof",
    ura_address_country: "ura_country",
    ura_address_locality: "ura_locality",
    ura_address_po_box: "ura_pobox",
    ura_address_postal_code: "ura_postcode",
    ura_address_premises: "ura_premises",
    ura_address_region: "ura_region",
    date_became_interested_person_day: "30",
    date_became_interested_person_month: "04",
    date_became_interested_person_year: "2004"
}]

export const TRUST_CORPORATES_MOCK: TrustCorporate[] = [{
    type: "corp_type",
    name: "corp_name",
    date_became_interested_person_day: "31",
    date_became_interested_person_month: "08",
    date_became_interested_person_year: "2005",
    ro_address_line1: "ro_line1",
    ro_address_line2: "ro_line2",
    ro_address_care_of: "ro_co",
    ro_address_country: "ro_country",
    ro_address_locality: "ro_locality",
    ro_address_po_box: "ro_pobox",
    ro_address_postal_code: "ro_postcode",
    ro_address_premises: "ro_premises",
    ro_address_region: "ro_region",
    sa_address_line1: "sa_line1",
    sa_address_line2: "sa_line2",
    sa_address_care_of: "sa_co",
    sa_address_country: "sa_country",
    sa_address_locality: "sa_locality",
    sa_address_po_box: "sa_pobox",
    sa_address_postal_code: "sa_postcode",
    sa_address_premises: "sa_premises",
    sa_address_region: "sa_region",
    identification_country_registration: "123",
    identification_legal_authority: "auth",
    identification_legal_form: "form",
    identification_place_registered: "uk",
    identification_registration_number: "456"
}]

export const TRUST_HISTORICAL_BOS_MOCK: TrustHistoricalBeneficialOwner[] = [{
    forename: "joe",
    other_forenames: "jim",
    surname: "bloggs",
    notified_date_day: "13",
    notified_date_month: "11",
    notified_date_year: "1985",
    ceased_date_day: "14",
    ceased_date_month: "12",
    ceased_date_year: "1986"
}]

export const TRUSTS_MOCK: Trust[] = [{
    trust_id: "123",
    trust_name: "trust_name",
    creation_date_day: "20",
    creation_date_month: "02",
    creation_date_year: "2020",
    unable_to_obtain_all_trust_info: "No",
    INDIVIDUALS: TRUST_INDIVIDUALS_MOCK,
    CORPORATES: TRUST_CORPORATES_MOCK,
    HISTORICAL_BO: TRUST_HISTORICAL_BOS_MOCK
}]

export const OVERSEAS_ENTITY_OBJECT_MOCK: OverseasEntity = {
    presenter: PRESENTER_OBJECT_MOCK,
    entity: ENTITY_OBJECT_MOCK,
    due_diligence: DUE_DILIGENCE_MOCK,
    overseas_entity_due_diligence: OE_DUE_DILIGENCE_MOCK,
    beneficial_owners_statement: BeneficialOwnersStatementType.ALL_IDENTIFIED_ALL_DETAILS,
    beneficial_owners_individual: BENEFICIAL_OWNER_INDIVIDUAL_MOCK_LIST,
    beneficial_owners_corporate: BENEFICIAL_OWNER_CORPORATE_MOCK_LIST,
    beneficial_owners_government_or_public_authority: BENEFICIAL_OWNER_GOVERNMENT_MOCK_LIST,
    managing_officers_individual: MANAGING_OFFICERS_INDIVIDUAL_MOCK_LIST,
    managing_officers_corporate: MANAGING_OFFICERS_CORPORATE_MOCK_LIST,
    trusts: TRUSTS_MOCK
};

export const TRUST_INDIVIDUALS_RESOURCE_MOCK: TrustIndividualResource[] = [{
    type: "type",
    forename: "joe",
    other_forenames: "jim",
    surname: "bloggs",
    date_of_birth: "2003-03-31",
    nationality: "british",
    sa_address_line1: "sa_addressline1",
    sa_address_line2: "sa_addressline2",
    sa_address_care_of: "sa_careof",
    sa_address_country: "sa_country",
    sa_address_locality: "sa_locality",
    sa_address_po_box: "sa_pobox",
    sa_address_postal_code: "sa_postcode",
    sa_address_premises: "sa_premises",
    sa_address_region: "sa_region",
    ura_address_line1: "ura_line1",
    ura_address_line2: "ura_line2",
    ura_address_care_of: "ura_careof",
    ura_address_country: "ura_country",
    ura_address_locality: "ura_locality",
    ura_address_po_box: "ura_pobox",
    ura_address_postal_code: "ura_postcode",
    ura_address_premises: "ura_premises",
    ura_address_region: "ura_region",
    date_became_interested_person: "2004-04-30"
}]

export const TRUST_CORPORATES_RESOURCE_MOCK: TrustCorporateResource[] = [{
    type: "corp_type",
    name: "corp_name",
    date_became_interested_person: "2005-08-31",
    ro_address_line1: "ro_line1",
    ro_address_line2: "ro_line2",
    ro_address_care_of: "ro_co",
    ro_address_country: "ro_country",
    ro_address_locality: "ro_locality",
    ro_address_po_box: "ro_pobox",
    ro_address_postal_code: "ro_postcode",
    ro_address_premises: "ro_premises",
    ro_address_region: "ro_region",
    sa_address_line1: "sa_line1",
    sa_address_line2: "sa_line2",
    sa_address_care_of: "sa_co",
    sa_address_country: "sa_country",
    sa_address_locality: "sa_locality",
    sa_address_po_box: "sa_pobox",
    sa_address_postal_code: "sa_postcode",
    sa_address_premises: "sa_premises",
    sa_address_region: "sa_region",
    identification_country_registration: "123",
    identification_legal_authority: "auth",
    identification_legal_form: "form",
    identification_place_registered: "uk",
    identification_registration_number: "456"
}]

export const TRUST_HISTORICAL_BOS_RESOURCE_MOCK: TrustHistoricalBeneficialOwnerResource[] = [{
    forename: "joe",
    other_forenames: "jim",
    surname: "bloggs",
    notified_date: "1985-11-13",
    ceased_date: "1986-12-14"
}]

export const TRUSTS_RESOURCE_MOCK: TrustResource[] = [{
    trust_id: "123",
    trust_name: "trust_name",
    creation_date: "2020-02-20",
    unable_to_obtain_all_trust_info: false,
    INDIVIDUAL: TRUST_INDIVIDUALS_RESOURCE_MOCK,
    CORPORATE: TRUST_CORPORATES_RESOURCE_MOCK,
    HISTORICAL_BO: TRUST_HISTORICAL_BOS_RESOURCE_MOCK
}]

export const OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK: OverseasEntityResource = {
    presenter: PRESENTER_OBJECT_MOCK,
    entity: ENTITY_OBJECT_MOCK,
    due_diligence: DUE_DILIGENCE_RESOURCE_MOCK,
    overseas_entity_due_diligence: OE_DUE_DILIGENCE_RESOURCE_MOCK,
    beneficial_owners_statement: BeneficialOwnersStatementType.ALL_IDENTIFIED_ALL_DETAILS,
    beneficial_owners_individual: BENEFICIAL_OWNER_INDIVIDUAL_RESOURCE_MOCK_LIST,
    beneficial_owners_corporate: BENEFICIAL_OWNER_CORPORATE_RESOURCE_MOCK_LIST,
    beneficial_owners_government_or_public_authority: BENEFICIAL_OWNER_GOVERNMENT_RESOURCE_MOCK_LIST,
    managing_officers_individual: MANAGING_OFFICERS_INDIVIDUAL_RESOURCE_MOCK_LIST,
    managing_officers_corporate: MANAGING_OFFICERS_CORPORATE_RESOURCE_MOCK_LIST,
    trusts: TRUSTS_RESOURCE_MOCK
};

export const requestClient = new RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "TOKEN_NOT_USED" });

export const TRANSACTION_ID = "12345";
export const UNAUTHORISED = "Unauthorised";
export const BAD_REQUEST = "Bad Request";

export const mockOverseasEntityCreatedResource: OverseasEntityCreated = { id: "00112233" };
export const mockPostOverseasEntityResponse = {
    201: { status: 201, body: mockOverseasEntityCreatedResource },
    400: { status: 400, error: BAD_REQUEST },
    401: { status: 401, error: UNAUTHORISED }
};
