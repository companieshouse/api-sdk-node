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
    DueDiligence,
    DueDiligenceResource,
    Entity,
    EntityName,
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
    TrustHistoricalBeneficialOwnerResource,
    Update,
    UpdateResource,
    OverseasEntityExtraDetails,
    BeneficialOwnerPrivateDataResource,
    TrustToReviewResource,
    TrustToReview,
    Remove,
    RemoveResource
} from "../../../src/services/overseas-entities";
import { mockAddress1 } from "../officer-filing/officer.filing.mock";

export const ADDRESS: Address = {
    property_name_number: "property name 1",
    line_1: "addressLine1",
    line_2: "addressLine2",
    town: "town",
    county: "county",
    country: "country",
    postcode: "BY 2"
};

export const PRIVATE_ADDRESS_MOCK = {
    addressLine1: "addressLine1",
    addressLine2: "addressLine2",
    careOf: "care of information",
    country: "country",
    locality: "locality information",
    poBox: "PO Box information",
    postalCode: "postal code information",
    premises: "premises information",
    region: "region information"
};

export const BENEFICIAL_OWNER_PRIVATE_DATA_RESOURCE_MOCK =
[
    {
        hashedId: "somehashedvalue2783",
        dateBecameRegistrable: "1965-01-01",
        isServiceAddressSameAsUsualAddress: "string",
        dateOfBirth: "1950-01-01",
        usualResidentialAddress: PRIVATE_ADDRESS_MOCK,
        principalAddress: PRIVATE_ADDRESS_MOCK
    }
]

export const MANAGING_OFFICERS_PRIVATE_DATA_MOCK = [{
    managingOfficerAppointmentId: "123456789",
    residentialAddress: PRIVATE_ADDRESS_MOCK,
    principalAddress: PRIVATE_ADDRESS_MOCK,
    dateOfBirth: "1980-01-01",
    contactNameFull: "John Doe",
    contactEmailAddress: "john.doe@example.com",
    hashedId: "hashed123456789"
}];

export const ENTITY_NAME_BLOCK_MOCK: EntityName = {
    name: "Entity Name"
};

export const ENTITY_NAME_FIELD_MOCK = "Entity Name";

export const ENTITY_NUMBER_MOCK = "Entity Number";

export const PRESENTER_OBJECT_MOCK: Presenter = {
    full_name: "Full Name",
    email: "user@domain.roe"
};

export const ENTITY_OBJECT_MOCK: Entity = {
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
        have_day_of_birth: false,
        nationality: "Utopian",
        usual_residential_address: ADDRESS,
        service_address: ADDRESS,
        is_service_address_same_as_usual_residential_address: yesNoResponse.Yes,
        start_date: { day: "1", month: "1", year: "2012" },
        ceased_date: { day: "1", month: "2", year: "2023" },
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
        have_day_of_birth: false,
        nationality: "Utopian",
        usual_residential_address: ADDRESS,
        service_address: ADDRESS,
        is_service_address_same_as_usual_residential_address: yesNoResponse.Yes,
        start_date: "2012-01-01",
        ceased_date: "2023-02-01",
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
        ceased_date: { day: "1", month: "2", year: "2023" },
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
        ceased_date: "2023-02-01",
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
        ceased_date: { day: "1", month: "2", year: "2023" },
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
        ceased_date: "2023-02-01",
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
        role_and_responsibilities: "Some role and responsibilities",
        start_date: { day: "1", month: "12", year: "2022" },
        resigned_on: { day: "1", month: "2", year: "2023" }
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
        role_and_responsibilities: "Some role and responsibilities",
        start_date: "2022-12-01",
        resigned_on: "2023-02-01"
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
        role_and_responsibilities: "role and responsibilities text",
        start_date: { day: "1", month: "12", year: "2022" },
        resigned_on: { day: "1", month: "2", year: "2023" }
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
        role_and_responsibilities: "role and responsibilities text",
        start_date: "2022-12-01",
        resigned_on: "2023-02-01"
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

export const TRUST_INDIVIDUALS_MOCK: TrustIndividual[] = [{
    type: "type",
    forename: "joe",
    other_forenames: "jim",
    surname: "bloggs",
    dob_day: "31",
    dob_month: "3",
    dob_year: "2003",
    nationality: "british",
    second_nationality: "german",
    sa_address_line_1: "sa_addressline1",
    sa_address_line_2: "sa_addressline2",
    sa_address_care_of: "sa_careof",
    sa_address_country: "sa_country",
    sa_address_locality: "sa_locality",
    sa_address_po_box: "sa_pobox",
    sa_address_postal_code: "sa_postcode",
    sa_address_premises: "sa_premises",
    sa_address_region: "sa_region",
    is_service_address_same_as_usual_residential_address: yesNoResponse.Yes,
    ura_address_line_1: "ura_line1",
    ura_address_line_2: "ura_line2",
    ura_address_care_of: "ura_careof",
    ura_address_country: "ura_country",
    ura_address_locality: "ura_locality",
    ura_address_po_box: "ura_pobox",
    ura_address_postal_code: "ura_postcode",
    ura_address_premises: "ura_premises",
    ura_address_region: "ura_region",
    date_became_interested_person_day: "30",
    date_became_interested_person_month: "4",
    date_became_interested_person_year: "2004"
}]

export const TRUST_CORPORATES_MOCK: TrustCorporate[] = [{
    type: "corp_type",
    name: "corp_name",
    date_became_interested_person_day: "31",
    date_became_interested_person_month: "8",
    date_became_interested_person_year: "2005",
    ro_address_line_1: "ro_line1",
    ro_address_line_2: "ro_line2",
    ro_address_care_of: "ro_co",
    ro_address_country: "ro_country",
    ro_address_locality: "ro_locality",
    ro_address_po_box: "ro_pobox",
    ro_address_postal_code: "ro_postcode",
    ro_address_premises: "ro_premises",
    ro_address_region: "ro_region",
    sa_address_line_1: "sa_line1",
    sa_address_line_2: "sa_line2",
    sa_address_care_of: "sa_co",
    sa_address_country: "sa_country",
    sa_address_locality: "sa_locality",
    sa_address_po_box: "sa_pobox",
    sa_address_postal_code: "sa_postcode",
    sa_address_premises: "sa_premises",
    sa_address_region: "sa_region",
    is_service_address_same_as_principal_address: yesNoResponse.Yes,
    identification_country_registration: "123",
    identification_legal_authority: "auth",
    identification_legal_form: "form",
    identification_place_registered: "uk",
    identification_registration_number: "456",
    is_on_register_in_country_formed_in: yesNoResponse.Yes
}]

export const TRUST_HISTORICAL_BOS_MOCK: TrustHistoricalBeneficialOwner[] = [{
    forename: "joe",
    other_forenames: "jim",
    surname: "bloggs",
    corporate_indicator: false,
    notified_date_day: "13",
    notified_date_month: "11",
    notified_date_year: "1985",
    ceased_date_day: "14",
    ceased_date_month: "12",
    ceased_date_year: "1986"
},
{
    corporate_indicator: true,
    corporate_name: "corp_former_bo",
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
    creation_date_month: "2",
    creation_date_year: "2020",
    ceased_date_day: "30",
    ceased_date_month: "3",
    ceased_date_year: "2021",
    trust_still_involved_in_overseas_entity: "No",
    unable_to_obtain_all_trust_info: "No",
    INDIVIDUALS: TRUST_INDIVIDUALS_MOCK,
    CORPORATES: TRUST_CORPORATES_MOCK,
    HISTORICAL_BO: TRUST_HISTORICAL_BOS_MOCK
}]

export const REVIEW_TRUSTS_MOCK: TrustToReview[] = [{
    trust_id: "1234",
    trust_name: "review_trust_name",
    creation_date_day: "2",
    creation_date_month: "1",
    creation_date_year: "2023",
    ceased_date_day: "2",
    ceased_date_month: "2",
    ceased_date_year: "2024",
    trust_still_involved_in_overseas_entity: "No",
    unable_to_obtain_all_trust_info: "No",
    INDIVIDUALS: TRUST_INDIVIDUALS_MOCK,
    CORPORATES: TRUST_CORPORATES_MOCK,
    HISTORICAL_BO: TRUST_HISTORICAL_BOS_MOCK,
    review_status: {
        in_review: true,
        reviewed_trust_details: false,
        reviewed_former_bos: false,
        reviewed_individuals: false,
        reviewed_legal_entities: false
    }
}]

export const UPDATE_OBJECT_MOCK: Update = {
    date_of_creation: { day: "1", month: "12", year: "2021" },
    filing_date: { day: "1", month: "2", year: "2023" },
    bo_mo_data_fetched: false,
    registrable_beneficial_owner: yesNoResponse.No,
    no_change: yesNoResponse.No,
    trust_data_fetched: false,
    review_trusts: REVIEW_TRUSTS_MOCK
}

export const REMOVE_OBJECT_MOCK: Remove = {
    is_not_proprietor_of_land: true
}

export const OVERSEAS_ENTITY_OBJECT_MOCK: OverseasEntity = {
    entity_name: ENTITY_NAME_FIELD_MOCK,
    entity_number: ENTITY_NUMBER_MOCK,
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
    trusts: TRUSTS_MOCK,
    update: UPDATE_OBJECT_MOCK,
    remove: REMOVE_OBJECT_MOCK,
    is_remove: undefined
};

export const OVERSEAS_ENTITY_EXTRA_DETAILS_OBJECT_MOCK: OverseasEntityExtraDetails = {
    email_address: "private@overseasentities.test"
};

export const BENEFICIAL_OWNER_PRIVATE_DATA_OBJECT_MOCK: BeneficialOwnerPrivateDataResource = {
    hashed_id: "0000000",
    usual_residential_address: mockAddress1,
    date_of_birth: "1959-01-01",
    date_became_registrable: "string",
    is_service_address_same_as_usual_address: "string",
    principal_address: mockAddress1
};

export const TRUST_INDIVIDUALS_RESOURCE_MOCK: TrustIndividualResource[] = [{
    type: "type",
    forename: "joe",
    other_forenames: "jim",
    surname: "bloggs",
    date_of_birth: "2003-03-31",
    nationality: "british",
    second_nationality: "german",
    sa_address_line_1: "sa_addressline1",
    sa_address_line_2: "sa_addressline2",
    sa_address_care_of: "sa_careof",
    sa_address_country: "sa_country",
    sa_address_locality: "sa_locality",
    sa_address_po_box: "sa_pobox",
    sa_address_postal_code: "sa_postcode",
    sa_address_premises: "sa_premises",
    sa_address_region: "sa_region",
    is_service_address_same_as_usual_residential_address: yesNoResponse.Yes,
    ura_address_line_1: "ura_line1",
    ura_address_line_2: "ura_line2",
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
    ro_address_line_1: "ro_line1",
    ro_address_line_2: "ro_line2",
    ro_address_care_of: "ro_co",
    ro_address_country: "ro_country",
    ro_address_locality: "ro_locality",
    ro_address_po_box: "ro_pobox",
    ro_address_postal_code: "ro_postcode",
    ro_address_premises: "ro_premises",
    ro_address_region: "ro_region",
    sa_address_line_1: "sa_line1",
    sa_address_line_2: "sa_line2",
    sa_address_care_of: "sa_co",
    sa_address_country: "sa_country",
    sa_address_locality: "sa_locality",
    sa_address_po_box: "sa_pobox",
    sa_address_postal_code: "sa_postcode",
    sa_address_premises: "sa_premises",
    sa_address_region: "sa_region",
    is_service_address_same_as_principal_address: yesNoResponse.Yes,
    identification_country_registration: "123",
    identification_legal_authority: "auth",
    identification_legal_form: "form",
    identification_place_registered: "uk",
    identification_registration_number: "456",
    is_on_register_in_country_formed_in: yesNoResponse.Yes
}]

export const TRUST_HISTORICAL_BOS_RESOURCE_MOCK: TrustHistoricalBeneficialOwnerResource[] = [{
    forename: "joe",
    other_forenames: "jim",
    surname: "bloggs",
    notified_date: "1985-11-13",
    ceased_date: "1986-12-14",
    corporate_indicator: false
},
{
    notified_date: "1985-11-13",
    ceased_date: "1986-12-14",
    corporate_indicator: true,
    corporate_name: "corp_former_bo"
}]

export const TRUSTS_RESOURCE_MOCK: TrustResource[] = [{
    trust_id: "123",
    trust_name: "trust_name",
    creation_date: "2020-02-20",
    ceased_date: "2021-03-30",
    trust_still_involved_in_overseas_entity: false,
    unable_to_obtain_all_trust_info: false,
    INDIVIDUAL: TRUST_INDIVIDUALS_RESOURCE_MOCK,
    CORPORATE: TRUST_CORPORATES_RESOURCE_MOCK,
    HISTORICAL_BO: TRUST_HISTORICAL_BOS_RESOURCE_MOCK
}]

export const REVIEW_TRUSTS_RESOURCE_MOCK: TrustToReviewResource[] = [{
    trust_id: "1234",
    trust_name: "review_trust_name",
    creation_date: "2023-01-02",
    ceased_date: "2024-02-02",
    trust_still_involved_in_overseas_entity: false,
    unable_to_obtain_all_trust_info: false,
    INDIVIDUAL: TRUST_INDIVIDUALS_RESOURCE_MOCK,
    CORPORATE: TRUST_CORPORATES_RESOURCE_MOCK,
    HISTORICAL_BO: TRUST_HISTORICAL_BOS_RESOURCE_MOCK,
    review_status: {
        in_review: true,
        reviewed_trust_details: false,
        reviewed_former_bos: false,
        reviewed_individuals: false,
        reviewed_legal_entities: false
    }
}]

export const UPDATE_RESOURCE_MOCK: UpdateResource = {
    date_of_creation: "2021-12-01",
    filing_date: "2023-02-01",
    bo_mo_data_fetched: false,
    registrable_beneficial_owner: yesNoResponse.No,
    no_change: yesNoResponse.No,
    trust_data_fetched: false,
    review_trusts: REVIEW_TRUSTS_RESOURCE_MOCK
}

export const REMOVE_RESOURCE_MOCK: RemoveResource = {
    is_not_proprietor_of_land: true
}

export const OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK: OverseasEntityResource = {
    entity_name: ENTITY_NAME_BLOCK_MOCK,
    entity_number: ENTITY_NUMBER_MOCK,
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
    trusts: TRUSTS_RESOURCE_MOCK,
    update: UPDATE_RESOURCE_MOCK,
    remove: REMOVE_RESOURCE_MOCK
};

export const OVERSEAS_ENTITY_EXTRA_DETAILS_RESOURCE_MOCK: OverseasEntityExtraDetails = {
    email_address: "private@overseasentities.test"
};

export const requestClient = new RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "TOKEN_NOT_USED" });

export const TRANSACTION_ID = "12345";
export const OVERSEAS_ENTITY_ID = "00112233";
export const UNAUTHORISED = "Unauthorised";
export const BAD_REQUEST = "Bad Request";

export const mockOverseasEntityCreatedResource: OverseasEntityCreated = { id: OVERSEAS_ENTITY_ID };
export const mockPostOverseasEntityResponse = {
    201: { status: 201, body: mockOverseasEntityCreatedResource },
    400: { status: 400, error: BAD_REQUEST },
    401: { status: 401, error: UNAUTHORISED }
};

export const mockPutOverseasEntityResponse = {
    200: { status: 200 },
    400: { status: 400, error: BAD_REQUEST }
};

export const mockGetOverseasEntityResponse = {
    200: { status: 200, body: OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK },
    400: { status: 400, error: BAD_REQUEST }
};

export const mockGetOverseasEntityExtraDetailsResponse = {
    200: { status: 200, body: OVERSEAS_ENTITY_EXTRA_DETAILS_RESOURCE_MOCK },
    400: { status: 400, error: BAD_REQUEST }
};

export const mockBeneficialOwnerPrivateDataResponse = {
    200: { status: 200, body: BENEFICIAL_OWNER_PRIVATE_DATA_RESOURCE_MOCK },
    400: { status: 400, error: BAD_REQUEST }
};

export const mockBeneficialOwnerPrivateDataUndefinedResponse = {
    200: { status: 200, body: undefined }
};

export const PRIVATE_TRUSTS_DATA_ID_MOCK = "123";

export const PRIVATE_TRUSTS_DATA_MOCK = [{
    hashedTrustId: PRIVATE_TRUSTS_DATA_ID_MOCK,
    trustName: "trust_name",
    creationDate: "2020-02-20",
    ceasedDate: "2023-03-03",
    trustStillInvolvedInOverseasEntityIndicator: false,
    unableToObtainAllTrustInfoIndicator: false
}];

export const PRIVATE_TRUSTS_DATA_RESOURCE_MOCK = [{
    hashed_trust_id: PRIVATE_TRUSTS_DATA_ID_MOCK,
    trust_name: "trust_name",
    creation_date: "2020-02-20",
    ceased_date: "2023-03-03",
    trust_still_involved_in_overseas_entity_indicator: false,
    unable_to_obtain_all_trust_info_indicator: false
}];

export const TRUST_LINKS_MOCK = [{
    hashedTrustId: "123",
    hashedCorporateBodyAppointmentId: "456"
}];

export const TRUST_LINKS_RESOURCE_MOCK = [{
    hashed_trust_id: "123",
    hashed_corporate_body_appointment_id: "456"
}];

export const INDIVIDUAL_TRUSTEES_DATA_MOCK = [{
    hashedTrusteeId: "123",
    trusteeForename1: "joe",
    trusteeForename2: "jim",
    trusteeSurname: "bloggs",
    dateOfBirth: "2003-03-31",
    nationality: "German",
    corporateIndicator: "N",
    trusteeTypeId: "50002",
    appointmentDate: "2020-02-20",
    ceasedDate: "2020-02-20",
    serviceAddress: {
        addressLine1: "sa_addressline1",
        addressLine2: "sa_addressline2",
        careOf: "sa_careof",
        country: "sa_country",
        locality: "sa_locality",
        poBox: "sa_pobox",
        postalCode: "sa_postcode",
        premises: "sa_premises",
        region: "sa_region"
    },
    usualResidentialAddress: {
        addressLine1: "ura_addressline1",
        addressLine2: "ura_addressline2",
        careOf: "ura_careof",
        country: "ura_country",
        locality: "ura_locality",
        poBox: "ura_pobox",
        postalCode: "ura_postcode",
        premises: "ura_premises",
        region: "ura_region"
    }
}];

export const INDIVIDUAL_TRUSTEES_DATA_RESOURCE_MOCK = [{
    hashed_trustee_id: "123",
    trustee_forename_1: "joe",
    trustee_forename_2: "jim",
    trustee_surname: "bloggs",
    date_of_birth: "2003-03-31",
    nationality: "German",
    corporate_indicator: "N",
    trustee_type_id: "50002",
    appointment_date: "2020-02-20",
    ceased_date: "2020-02-20",
    service_address: {
        address_line_1: "sa_addressline1",
        address_line_2: "sa_addressline2",
        care_of: "sa_careof",
        country: "sa_country",
        locality: "sa_locality",
        po_box: "sa_pobox",
        postal_code: "sa_postcode",
        premises: "sa_premises",
        region: "sa_region"
    },
    usual_residential_address: {
        address_line_1: "ura_addressline1",
        address_line_2: "ura_addressline2",
        care_of: "ura_careof",
        country: "ura_country",
        locality: "ura_locality",
        po_box: "ura_pobox",
        postal_code: "ura_postcode",
        premises: "ura_premises",
        region: "ura_region"
    }
}];

export const CORPORATE_TRUSTEES_DATA_MOCK = [{
    hashedTrusteeId: "123",
    trusteeName: "trust_name",
    registerLocation: "register_location",
    registrationNumber: "registration_number",
    lawGoverned: "law_governed",
    legalForm: "legal_form",
    onRegisterInCountryFormedIn: "Y",
    corporateIndicator: "Y",
    trusteeTypeId: "50002",
    appointmentDate: "2020-02-20",
    ceasedDate: "2020-02-20",
    serviceAddress: {
        addressLine1: "sa_addressline1",
        addressLine2: "sa_addressline2",
        careOf: "sa_careof",
        country: "sa_country",
        locality: "sa_locality",
        poBox: "sa_pobox",
        postalCode: "sa_postcode",
        premises: "sa_premises",
        region: "sa_region"
    },
    registeredOfficeAddress: {
        addressLine1: "ro_addressline1",
        addressLine2: "ro_addressline2",
        careOf: "ro_careof",
        country: "ro_country",
        locality: "ro_locality",
        poBox: "ro_pobox",
        postalCode: "ro_postcode",
        premises: "ro_premises",
        region: "ro_region"
    }
}];

export const CORPORATE_TRUSTEES_DATA_RESOURCE_MOCK = [{
    hashed_trustee_id: "123",
    trustee_name: "trust_name",
    register_location: "register_location",
    registration_number: "registration_number",
    law_governed: "law_governed",
    legal_form: "legal_form",
    on_register_in_country_formed_in: "Y",
    corporate_indicator: "Y",
    trustee_type_id: "50002",
    appointment_date: "2020-02-20",
    ceased_date: "2020-02-20",
    service_address: {
        address_line_1: "sa_addressline1",
        address_line_2: "sa_addressline2",
        care_of: "sa_careof",
        country: "sa_country",
        locality: "sa_locality",
        po_box: "sa_pobox",
        postal_code: "sa_postcode",
        premises: "sa_premises",
        region: "sa_region"
    },
    registered_office_address: {
        address_line_1: "ro_addressline1",
        address_line_2: "ro_addressline2",
        care_of: "ro_careof",
        country: "ro_country",
        locality: "ro_locality",
        po_box: "ro_pobox",
        postal_code: "ro_postcode",
        premises: "ro_premises",
        region: "ro_region"
    }
}];
