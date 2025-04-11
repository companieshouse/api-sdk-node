"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockOverseasEntityCreatedResource = exports.BAD_REQUEST = exports.UNAUTHORISED = exports.OVERSEAS_ENTITY_ID = exports.TRANSACTION_ID = exports.requestClient = exports.OVERSEAS_ENTITY_EXTRA_DETAILS_RESOURCE_MOCK = exports.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK = exports.REMOVE_RESOURCE_MOCK = exports.UPDATE_RESOURCE_MOCK = exports.REVIEW_TRUSTS_RESOURCE_MOCK = exports.TRUSTS_RESOURCE_MOCK = exports.TRUST_HISTORICAL_BOS_RESOURCE_MOCK = exports.TRUST_CORPORATES_RESOURCE_MOCK = exports.TRUST_INDIVIDUALS_RESOURCE_MOCK = exports.BENEFICIAL_OWNER_PRIVATE_DATA_OBJECT_MOCK = exports.OVERSEAS_ENTITY_EXTRA_DETAILS_OBJECT_MOCK = exports.OVERSEAS_ENTITY_OBJECT_MOCK = exports.REMOVE_OBJECT_MOCK = exports.UPDATE_OBJECT_MOCK = exports.REVIEW_TRUSTS_MOCK = exports.TRUSTS_MOCK = exports.TRUST_HISTORICAL_BOS_MOCK = exports.TRUST_CORPORATES_MOCK = exports.TRUST_INDIVIDUALS_MOCK = exports.OE_DUE_DILIGENCE_RESOURCE_MOCK = exports.OE_DUE_DILIGENCE_MOCK = exports.DUE_DILIGENCE_RESOURCE_MOCK = exports.DUE_DILIGENCE_MOCK = exports.MANAGING_OFFICERS_CORPORATE_RESOURCE_MOCK_LIST = exports.MANAGING_OFFICERS_CORPORATE_MOCK_LIST = exports.MANAGING_OFFICERS_INDIVIDUAL_RESOURCE_MOCK_LIST = exports.MANAGING_OFFICERS_INDIVIDUAL_MOCK_LIST = exports.BENEFICIAL_OWNER_GOVERNMENT_RESOURCE_MOCK_LIST = exports.BENEFICIAL_OWNER_GOVERNMENT_MOCK_LIST = exports.BENEFICIAL_OWNER_CORPORATE_RESOURCE_MOCK_LIST = exports.BENEFICIAL_OWNER_CORPORATE_MOCK_LIST = exports.BENEFICIAL_OWNER_INDIVIDUAL_RESOURCE_MOCK_LIST = exports.BENEFICIAL_OWNER_INDIVIDUAL_MOCK_LIST = exports.ENTITY_OBJECT_MOCK = exports.ENTITY_WHO_IS_REGISTERING = exports.PAYMENT_OBJECT_MOCK = exports.PRESENTER_OBJECT_MOCK = exports.ENTITY_NUMBER_MOCK = exports.ENTITY_NAME_FIELD_MOCK = exports.ENTITY_NAME_BLOCK_MOCK = exports.MANAGING_OFFICERS_PRIVATE_DATA_MOCK = exports.BENEFICIAL_OWNER_PRIVATE_DATA_RESOURCE_MOCK = exports.PRIVATE_ADDRESS_MOCK = exports.ADDRESS = void 0;
exports.CORPORATE_TRUSTEES_DATA_RESOURCE_MOCK = exports.CORPORATE_TRUSTEES_DATA_MOCK = exports.INDIVIDUAL_TRUSTEES_DATA_RESOURCE_MOCK = exports.INDIVIDUAL_TRUSTEES_DATA_MOCK = exports.TRUST_LINKS_RESOURCE_MOCK = exports.TRUST_LINKS_MOCK = exports.PRIVATE_TRUSTS_NOT_CEASED_DATA_RESOURCE_MOCK = exports.PRIVATE_TRUSTS_NOT_CEASED_DATA_MOCK = exports.PRIVATE_TRUSTS_DATA_RESOURCE_MOCK = exports.PRIVATE_TRUSTS_DATA_MOCK = exports.PRIVATE_TRUSTS_DATA_ID_MOCK = exports.mockBeneficialOwnerPrivateDataUndefinedResponse = exports.mockBeneficialOwnerPrivateDataResponse = exports.mockGetOverseasEntityExtraDetailsResponse = exports.mockGetOverseasEntityResponse = exports.mockPutOverseasEntityResponse = exports.mockPostOverseasEntityResponse = void 0;
const src_1 = require("../../../src");
const officer_filing_mock_1 = require("../officer-filing/officer.filing.mock");
const overseas_entities_1 = require("../../../src/services/overseas-entities");
exports.ADDRESS = {
    property_name_number: "property name 1",
    line_1: "addressLine1",
    line_2: "addressLine2",
    town: "town",
    county: "county",
    country: "country",
    postcode: "BY 2"
};
exports.PRIVATE_ADDRESS_MOCK = {
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
exports.BENEFICIAL_OWNER_PRIVATE_DATA_RESOURCE_MOCK = [
    {
        hashedId: "somehashedvalue2783",
        dateBecameRegistrable: "1965-01-01",
        isServiceAddressSameAsUsualAddress: "string",
        dateOfBirth: "1950-01-01",
        usualResidentialAddress: exports.PRIVATE_ADDRESS_MOCK,
        principalAddress: exports.PRIVATE_ADDRESS_MOCK
    }
];
exports.MANAGING_OFFICERS_PRIVATE_DATA_MOCK = [{
        managingOfficerAppointmentId: "123456789",
        residentialAddress: exports.PRIVATE_ADDRESS_MOCK,
        principalAddress: exports.PRIVATE_ADDRESS_MOCK,
        dateOfBirth: "1980-01-01",
        contactNameFull: "John Doe",
        contactEmailAddress: "john.doe@example.com",
        hashedId: "hashed123456789"
    }];
exports.ENTITY_NAME_BLOCK_MOCK = {
    name: "Entity Name"
};
exports.ENTITY_NAME_FIELD_MOCK = "Entity Name";
exports.ENTITY_NUMBER_MOCK = "Entity Number";
exports.PRESENTER_OBJECT_MOCK = {
    full_name: "Full Name",
    email: "user@domain.roe"
};
exports.PAYMENT_OBJECT_MOCK = {
    resource: "http://api.base-domain/transactions/abc123/payment",
    state: "9a82902b-5292-4908-9898-14212b7ee1d5",
    redirectUri: "http://base-domain/service-name/transaction/abc1234/submission/xyz890/payment",
    reference: "ServiceNameReference_058235-235017-353205"
};
var ENTITY_WHO_IS_REGISTERING;
(function (ENTITY_WHO_IS_REGISTERING) {
    ENTITY_WHO_IS_REGISTERING["AGENT"] = "agent";
    ENTITY_WHO_IS_REGISTERING["SOMEONE_ELSE"] = "someone_else";
})(ENTITY_WHO_IS_REGISTERING = exports.ENTITY_WHO_IS_REGISTERING || (exports.ENTITY_WHO_IS_REGISTERING = {}));
exports.ENTITY_OBJECT_MOCK = {
    incorporation_country: "incorporationCountry",
    principal_address: exports.ADDRESS,
    is_service_address_same_as_principal_address: 0,
    service_address: {},
    email: "email",
    legal_form: "legalForm",
    law_governed: "governedLaw",
    public_register_name: "publicRegister",
    registration_number: "123",
    is_on_register_in_country_formed_in: 1
};
exports.BENEFICIAL_OWNER_INDIVIDUAL_MOCK_LIST = [
    {
        first_name: "Joe",
        last_name: "Bloggs",
        date_of_birth: { day: "1", month: "1", year: "1950" },
        have_day_of_birth: false,
        nationality: "Utopian",
        usual_residential_address: exports.ADDRESS,
        service_address: exports.ADDRESS,
        is_service_address_same_as_usual_residential_address: overseas_entities_1.yesNoResponse.Yes,
        start_date: { day: "1", month: "1", year: "2012" },
        ceased_date: { day: "1", month: "2", year: "2023" },
        beneficial_owner_nature_of_control_types: [overseas_entities_1.NatureOfControlType.OVER_25_PERCENT_OF_SHARES],
        trustees_nature_of_control_types: [overseas_entities_1.NatureOfControlType.APPOINT_OR_REMOVE_MAJORITY_BOARD_DIRECTORS],
        non_legal_firm_members_nature_of_control_types: [overseas_entities_1.NatureOfControlType.SIGNIFICANT_INFLUENCE_OR_CONTROL],
        non_legal_firm_control_nature_of_control_types: [overseas_entities_1.NatureOfControlType.OVER_25_PERCENT_OF_SHARES],
        trust_control_nature_of_control_types: [overseas_entities_1.NatureOfControlType.OVER_25_PERCENT_OF_SHARES],
        owner_of_land_person_nature_of_control_jurisdictions: [overseas_entities_1.NatureOfControlJurisdictionType.ENGLAND_AND_WALES],
        owner_of_land_other_entity_nature_of_control_jurisdictions: [overseas_entities_1.NatureOfControlJurisdictionType.SCOTLAND],
        is_on_sanctions_list: overseas_entities_1.yesNoResponse.No
    }
];
exports.BENEFICIAL_OWNER_INDIVIDUAL_RESOURCE_MOCK_LIST = [
    {
        first_name: "Joe",
        last_name: "Bloggs",
        date_of_birth: "1950-01-01",
        have_day_of_birth: false,
        nationality: "Utopian",
        usual_residential_address: exports.ADDRESS,
        service_address: exports.ADDRESS,
        is_service_address_same_as_usual_residential_address: overseas_entities_1.yesNoResponse.Yes,
        start_date: "2012-01-01",
        ceased_date: "2023-02-01",
        beneficial_owner_nature_of_control_types: [overseas_entities_1.NatureOfControlType.OVER_25_PERCENT_OF_SHARES],
        trustees_nature_of_control_types: [overseas_entities_1.NatureOfControlType.APPOINT_OR_REMOVE_MAJORITY_BOARD_DIRECTORS],
        non_legal_firm_members_nature_of_control_types: [overseas_entities_1.NatureOfControlType.SIGNIFICANT_INFLUENCE_OR_CONTROL],
        non_legal_firm_control_nature_of_control_types: [overseas_entities_1.NatureOfControlType.OVER_25_PERCENT_OF_SHARES],
        trust_control_nature_of_control_types: [overseas_entities_1.NatureOfControlType.OVER_25_PERCENT_OF_SHARES],
        owner_of_land_person_nature_of_control_jurisdictions: [overseas_entities_1.NatureOfControlJurisdictionType.ENGLAND_AND_WALES],
        owner_of_land_other_entity_nature_of_control_jurisdictions: [overseas_entities_1.NatureOfControlJurisdictionType.SCOTLAND],
        is_on_sanctions_list: overseas_entities_1.yesNoResponse.No
    }
];
exports.BENEFICIAL_OWNER_CORPORATE_MOCK_LIST = [
    {
        name: "Joe Bloggs Ltd",
        principal_address: exports.ADDRESS,
        service_address: exports.ADDRESS,
        is_service_address_same_as_principal_address: overseas_entities_1.yesNoResponse.Yes,
        legal_form: "corporate",
        law_governed: "corporation",
        is_on_register_in_country_formed_in: overseas_entities_1.yesNoResponse.Yes,
        public_register_name: "register",
        registration_number: "abc123",
        start_date: { day: "1", month: "12", year: "1950" },
        ceased_date: { day: "1", month: "2", year: "2023" },
        beneficial_owner_nature_of_control_types: [overseas_entities_1.NatureOfControlType.OVER_25_PERCENT_OF_SHARES],
        trustees_nature_of_control_types: [overseas_entities_1.NatureOfControlType.APPOINT_OR_REMOVE_MAJORITY_BOARD_DIRECTORS],
        non_legal_firm_members_nature_of_control_types: [overseas_entities_1.NatureOfControlType.SIGNIFICANT_INFLUENCE_OR_CONTROL],
        non_legal_firm_control_nature_of_control_types: [overseas_entities_1.NatureOfControlType.OVER_25_PERCENT_OF_VOTING_RIGHTS],
        trust_control_nature_of_control_types: [overseas_entities_1.NatureOfControlType.SIGNIFICANT_INFLUENCE_OR_CONTROL],
        owner_of_land_person_nature_of_control_jurisdictions: [overseas_entities_1.NatureOfControlJurisdictionType.SCOTLAND],
        owner_of_land_other_entity_nature_of_control_jurisdictions: [overseas_entities_1.NatureOfControlJurisdictionType.NORTHERN_IRELAND],
        is_on_sanctions_list: overseas_entities_1.yesNoResponse.No
    }
];
exports.BENEFICIAL_OWNER_CORPORATE_RESOURCE_MOCK_LIST = [
    {
        name: "Joe Bloggs Ltd",
        principal_address: exports.ADDRESS,
        service_address: exports.ADDRESS,
        is_service_address_same_as_principal_address: overseas_entities_1.yesNoResponse.Yes,
        legal_form: "corporate",
        law_governed: "corporation",
        is_on_register_in_country_formed_in: overseas_entities_1.yesNoResponse.Yes,
        public_register_name: "register",
        registration_number: "abc123",
        start_date: "1950-12-01",
        ceased_date: "2023-02-01",
        beneficial_owner_nature_of_control_types: [overseas_entities_1.NatureOfControlType.OVER_25_PERCENT_OF_SHARES],
        trustees_nature_of_control_types: [overseas_entities_1.NatureOfControlType.APPOINT_OR_REMOVE_MAJORITY_BOARD_DIRECTORS],
        non_legal_firm_members_nature_of_control_types: [overseas_entities_1.NatureOfControlType.SIGNIFICANT_INFLUENCE_OR_CONTROL],
        non_legal_firm_control_nature_of_control_types: [overseas_entities_1.NatureOfControlType.OVER_25_PERCENT_OF_VOTING_RIGHTS],
        trust_control_nature_of_control_types: [overseas_entities_1.NatureOfControlType.SIGNIFICANT_INFLUENCE_OR_CONTROL],
        owner_of_land_person_nature_of_control_jurisdictions: [overseas_entities_1.NatureOfControlJurisdictionType.SCOTLAND],
        owner_of_land_other_entity_nature_of_control_jurisdictions: [overseas_entities_1.NatureOfControlJurisdictionType.NORTHERN_IRELAND],
        is_on_sanctions_list: overseas_entities_1.yesNoResponse.No
    }
];
exports.BENEFICIAL_OWNER_GOVERNMENT_MOCK_LIST = [
    {
        name: "Joe Gov Ltd",
        principal_address: exports.ADDRESS,
        service_address: exports.ADDRESS,
        is_service_address_same_as_principal_address: overseas_entities_1.yesNoResponse.Yes,
        legal_form: "gov",
        law_governed: "government",
        start_date: { day: "1", month: "12", year: "1950" },
        ceased_date: { day: "1", month: "2", year: "2023" },
        beneficial_owner_nature_of_control_types: [overseas_entities_1.NatureOfControlType.OVER_25_PERCENT_OF_SHARES],
        non_legal_firm_members_nature_of_control_types: [overseas_entities_1.NatureOfControlType.SIGNIFICANT_INFLUENCE_OR_CONTROL],
        non_legal_firm_control_nature_of_control_types: [overseas_entities_1.NatureOfControlType.OVER_25_PERCENT_OF_SHARES],
        trust_control_nature_of_control_types: [overseas_entities_1.NatureOfControlType.OVER_25_PERCENT_OF_SHARES],
        owner_of_land_person_nature_of_control_jurisdictions: [overseas_entities_1.NatureOfControlJurisdictionType.ENGLAND_AND_WALES],
        owner_of_land_other_entity_nature_of_control_jurisdictions: [overseas_entities_1.NatureOfControlJurisdictionType.SCOTLAND]
    }
];
exports.BENEFICIAL_OWNER_GOVERNMENT_RESOURCE_MOCK_LIST = [
    {
        name: "Joe Gov Ltd",
        principal_address: exports.ADDRESS,
        service_address: exports.ADDRESS,
        is_service_address_same_as_principal_address: overseas_entities_1.yesNoResponse.Yes,
        legal_form: "gov",
        law_governed: "government",
        start_date: "1950-12-01",
        ceased_date: "2023-02-01",
        beneficial_owner_nature_of_control_types: [overseas_entities_1.NatureOfControlType.OVER_25_PERCENT_OF_SHARES],
        non_legal_firm_members_nature_of_control_types: [overseas_entities_1.NatureOfControlType.SIGNIFICANT_INFLUENCE_OR_CONTROL],
        non_legal_firm_control_nature_of_control_types: [overseas_entities_1.NatureOfControlType.OVER_25_PERCENT_OF_SHARES],
        trust_control_nature_of_control_types: [overseas_entities_1.NatureOfControlType.OVER_25_PERCENT_OF_SHARES],
        owner_of_land_person_nature_of_control_jurisdictions: [overseas_entities_1.NatureOfControlJurisdictionType.ENGLAND_AND_WALES],
        owner_of_land_other_entity_nature_of_control_jurisdictions: [overseas_entities_1.NatureOfControlJurisdictionType.SCOTLAND]
    }
];
exports.MANAGING_OFFICERS_INDIVIDUAL_MOCK_LIST = [
    {
        first_name: "Joe",
        last_name: "Bloggs",
        has_former_names: overseas_entities_1.yesNoResponse.Yes,
        former_names: "Some name",
        date_of_birth: { day: "1", month: "1", year: "1990" },
        nationality: "Utopian",
        usual_residential_address: exports.ADDRESS,
        service_address: exports.ADDRESS,
        is_service_address_same_as_usual_residential_address: overseas_entities_1.yesNoResponse.Yes,
        occupation: "Some Occupation",
        role_and_responsibilities: "Some role and responsibilities",
        start_date: { day: "1", month: "12", year: "2022" },
        resigned_on: { day: "1", month: "2", year: "2023" }
    }
];
exports.MANAGING_OFFICERS_INDIVIDUAL_RESOURCE_MOCK_LIST = [
    {
        first_name: "Joe",
        last_name: "Bloggs",
        has_former_names: overseas_entities_1.yesNoResponse.Yes,
        former_names: "Some name",
        date_of_birth: "1990-01-01",
        nationality: "Utopian",
        usual_residential_address: exports.ADDRESS,
        service_address: exports.ADDRESS,
        is_service_address_same_as_usual_residential_address: overseas_entities_1.yesNoResponse.Yes,
        occupation: "Some Occupation",
        role_and_responsibilities: "Some role and responsibilities",
        start_date: "2022-12-01",
        resigned_on: "2023-02-01"
    }
];
exports.MANAGING_OFFICERS_CORPORATE_MOCK_LIST = [
    {
        name: "Joe Bloggs Ltd",
        principal_address: exports.ADDRESS,
        service_address: exports.ADDRESS,
        is_service_address_same_as_principal_address: overseas_entities_1.yesNoResponse.Yes,
        legal_form: "corporate",
        law_governed: "corporation",
        is_on_register_in_country_formed_in: overseas_entities_1.yesNoResponse.Yes,
        public_register_name: "register",
        registration_number: "abc123",
        role_and_responsibilities: "role and responsibilities text",
        start_date: { day: "1", month: "12", year: "2022" },
        resigned_on: { day: "1", month: "2", year: "2023" }
    }
];
exports.MANAGING_OFFICERS_CORPORATE_RESOURCE_MOCK_LIST = [
    {
        name: "Joe Bloggs Ltd",
        principal_address: exports.ADDRESS,
        service_address: exports.ADDRESS,
        is_service_address_same_as_principal_address: overseas_entities_1.yesNoResponse.Yes,
        legal_form: "corporate",
        law_governed: "corporation",
        is_on_register_in_country_formed_in: overseas_entities_1.yesNoResponse.Yes,
        public_register_name: "register",
        registration_number: "abc123",
        role_and_responsibilities: "role and responsibilities text",
        start_date: "2022-12-01",
        resigned_on: "2023-02-01"
    }
];
exports.DUE_DILIGENCE_MOCK = {
    identity_date: { day: "1", month: "12", year: "2021" },
    name: "ABC Checking Ltd",
    email: "lorem@ipsum.com",
    supervisory_name: "Super supervisors",
    aml_number: "antimon123",
    agent_code: "assure123",
    partner_name: "Joe Checker"
};
exports.DUE_DILIGENCE_RESOURCE_MOCK = Object.assign(Object.assign({}, exports.DUE_DILIGENCE_MOCK), { identity_date: "2021-12-01" });
exports.OE_DUE_DILIGENCE_MOCK = {
    identity_date: { day: "1", month: "1", year: "2022" },
    name: "ABC Checking Ltd",
    identity_address: exports.ADDRESS,
    email: "lorem@ipsum.com",
    supervisory_name: "Super supervisors",
    aml_number: "antimon123",
    partner_name: "Joe Checker"
};
exports.OE_DUE_DILIGENCE_RESOURCE_MOCK = Object.assign(Object.assign({}, exports.OE_DUE_DILIGENCE_MOCK), { identity_date: "2022-01-01" });
exports.TRUST_INDIVIDUALS_MOCK = [{
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
        is_service_address_same_as_usual_residential_address: overseas_entities_1.yesNoResponse.Yes,
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
        date_became_interested_person_year: "2004",
        still_involved: "No",
        ceased_date_day: "31",
        ceased_date_month: "8",
        ceased_date_year: "2005",
        start_date_day: "11",
        start_date_month: "5",
        start_date_year: "2006"
    }];
exports.TRUST_CORPORATES_MOCK = [{
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
        is_service_address_same_as_principal_address: overseas_entities_1.yesNoResponse.Yes,
        identification_country_registration: "123",
        identification_legal_authority: "auth",
        identification_legal_form: "form",
        identification_place_registered: "uk",
        identification_registration_number: "456",
        is_on_register_in_country_formed_in: overseas_entities_1.yesNoResponse.Yes,
        still_involved: "No",
        ceased_date_day: "1",
        ceased_date_month: "9",
        ceased_date_year: "2005",
        start_date_day: "11",
        start_date_month: "5",
        start_date_year: "2006"
    }];
exports.TRUST_HISTORICAL_BOS_MOCK = [{
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
    }];
exports.TRUSTS_MOCK = [{
        trust_id: "123",
        trust_name: "trust_name",
        ch_reference: undefined,
        creation_date_day: "20",
        creation_date_month: "2",
        creation_date_year: "2020",
        ceased_date_day: "30",
        ceased_date_month: "3",
        ceased_date_year: "2021",
        trust_still_involved_in_overseas_entity: "No",
        unable_to_obtain_all_trust_info: "No",
        INDIVIDUALS: exports.TRUST_INDIVIDUALS_MOCK,
        CORPORATES: exports.TRUST_CORPORATES_MOCK,
        HISTORICAL_BO: exports.TRUST_HISTORICAL_BOS_MOCK
    }];
exports.REVIEW_TRUSTS_MOCK = [{
        trust_id: "1234",
        trust_name: "review_trust_name",
        ch_reference: "_ecba-4TzUTXaln-g8daGtvS4a0",
        creation_date_day: "2",
        creation_date_month: "1",
        creation_date_year: "2023",
        ceased_date_day: "2",
        ceased_date_month: "2",
        ceased_date_year: "2024",
        trust_still_involved_in_overseas_entity: "No",
        unable_to_obtain_all_trust_info: "No",
        INDIVIDUALS: exports.TRUST_INDIVIDUALS_MOCK,
        CORPORATES: exports.TRUST_CORPORATES_MOCK,
        HISTORICAL_BO: exports.TRUST_HISTORICAL_BOS_MOCK,
        review_status: {
            in_review: true,
            reviewed_trust_details: false,
            reviewed_former_bos: false,
            reviewed_individuals: false,
            reviewed_legal_entities: false
        }
    }];
exports.UPDATE_OBJECT_MOCK = {
    date_of_creation: { day: "1", month: "12", year: "2021" },
    filing_date: { day: "1", month: "2", year: "2023" },
    bo_mo_data_fetched: false,
    registrable_beneficial_owner: overseas_entities_1.yesNoResponse.No,
    no_change: overseas_entities_1.yesNoResponse.No,
    trust_data_fetched: false,
    review_trusts: exports.REVIEW_TRUSTS_MOCK,
    owned_land_relevant_period: overseas_entities_1.yesNoResponse.No,
    change_bo_relevant_period: overseas_entities_1.ChangeBoRelevantPeriodType.YES,
    trustee_involved_relevant_period: overseas_entities_1.TrusteeInvolvedRelevantPeriodType.YES,
    change_beneficiary_relevant_period: overseas_entities_1.ChangeBeneficiaryRelevantPeriodType.NO
};
exports.REMOVE_OBJECT_MOCK = {
    is_not_proprietor_of_land: true
};
exports.OVERSEAS_ENTITY_OBJECT_MOCK = {
    entity_name: exports.ENTITY_NAME_FIELD_MOCK,
    entity_number: exports.ENTITY_NUMBER_MOCK,
    presenter: exports.PRESENTER_OBJECT_MOCK,
    entity: exports.ENTITY_OBJECT_MOCK,
    due_diligence: exports.DUE_DILIGENCE_MOCK,
    overseas_entity_due_diligence: exports.OE_DUE_DILIGENCE_MOCK,
    beneficial_owners_statement: overseas_entities_1.BeneficialOwnersStatementType.ALL_IDENTIFIED_ALL_DETAILS,
    beneficial_owners_individual: exports.BENEFICIAL_OWNER_INDIVIDUAL_MOCK_LIST,
    beneficial_owners_corporate: exports.BENEFICIAL_OWNER_CORPORATE_MOCK_LIST,
    beneficial_owners_government_or_public_authority: exports.BENEFICIAL_OWNER_GOVERNMENT_MOCK_LIST,
    managing_officers_individual: exports.MANAGING_OFFICERS_INDIVIDUAL_MOCK_LIST,
    managing_officers_corporate: exports.MANAGING_OFFICERS_CORPORATE_MOCK_LIST,
    trusts: exports.TRUSTS_MOCK,
    update: exports.UPDATE_OBJECT_MOCK,
    remove: exports.REMOVE_OBJECT_MOCK,
    is_remove: undefined,
    has_sold_land: undefined,
    is_secure_register: undefined,
    who_is_registering: undefined,
    payment: exports.PAYMENT_OBJECT_MOCK
};
exports.OVERSEAS_ENTITY_EXTRA_DETAILS_OBJECT_MOCK = {
    email_address: "private@overseasentities.test"
};
exports.BENEFICIAL_OWNER_PRIVATE_DATA_OBJECT_MOCK = {
    hashed_id: "0000000",
    usual_residential_address: officer_filing_mock_1.mockAddress1,
    date_of_birth: "1959-01-01",
    date_became_registrable: "string",
    is_service_address_same_as_usual_address: "string",
    principal_address: officer_filing_mock_1.mockAddress1
};
exports.TRUST_INDIVIDUALS_RESOURCE_MOCK = [{
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
        is_service_address_same_as_usual_residential_address: overseas_entities_1.yesNoResponse.Yes,
        ura_address_line_1: "ura_line1",
        ura_address_line_2: "ura_line2",
        ura_address_care_of: "ura_careof",
        ura_address_country: "ura_country",
        ura_address_locality: "ura_locality",
        ura_address_po_box: "ura_pobox",
        ura_address_postal_code: "ura_postcode",
        ura_address_premises: "ura_premises",
        ura_address_region: "ura_region",
        date_became_interested_person: "2004-04-30",
        is_individual_still_involved_in_trust: false,
        ceased_date: "2005-08-31",
        start_date: "2006-05-11"
    }];
exports.TRUST_CORPORATES_RESOURCE_MOCK = [{
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
        is_service_address_same_as_principal_address: overseas_entities_1.yesNoResponse.Yes,
        identification_country_registration: "123",
        identification_legal_authority: "auth",
        identification_legal_form: "form",
        identification_place_registered: "uk",
        identification_registration_number: "456",
        is_on_register_in_country_formed_in: overseas_entities_1.yesNoResponse.Yes,
        is_corporate_still_involved_in_trust: false,
        ceased_date: "2005-09-01",
        start_date: "2006-05-11"
    }];
exports.TRUST_HISTORICAL_BOS_RESOURCE_MOCK = [{
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
    }];
exports.TRUSTS_RESOURCE_MOCK = [{
        trust_id: "123",
        trust_name: "trust_name",
        ch_reference: undefined,
        creation_date: "2020-02-20",
        ceased_date: "2021-03-30",
        trust_still_involved_in_overseas_entity: false,
        unable_to_obtain_all_trust_info: false,
        INDIVIDUAL: exports.TRUST_INDIVIDUALS_RESOURCE_MOCK,
        CORPORATE: exports.TRUST_CORPORATES_RESOURCE_MOCK,
        HISTORICAL_BO: exports.TRUST_HISTORICAL_BOS_RESOURCE_MOCK
    }];
exports.REVIEW_TRUSTS_RESOURCE_MOCK = [{
        trust_id: "1234",
        trust_name: "review_trust_name",
        ch_reference: "_ecba-4TzUTXaln-g8daGtvS4a0",
        creation_date: "2023-01-02",
        ceased_date: "2024-02-02",
        trust_still_involved_in_overseas_entity: false,
        unable_to_obtain_all_trust_info: false,
        INDIVIDUAL: exports.TRUST_INDIVIDUALS_RESOURCE_MOCK,
        CORPORATE: exports.TRUST_CORPORATES_RESOURCE_MOCK,
        HISTORICAL_BO: exports.TRUST_HISTORICAL_BOS_RESOURCE_MOCK,
        review_status: {
            in_review: true,
            reviewed_trust_details: false,
            reviewed_former_bos: false,
            reviewed_individuals: false,
            reviewed_legal_entities: false
        }
    }];
exports.UPDATE_RESOURCE_MOCK = {
    date_of_creation: "2021-12-01",
    filing_date: "2023-02-01",
    bo_mo_data_fetched: false,
    registrable_beneficial_owner: overseas_entities_1.yesNoResponse.No,
    no_change: overseas_entities_1.yesNoResponse.No,
    trust_data_fetched: false,
    review_trusts: exports.REVIEW_TRUSTS_RESOURCE_MOCK,
    owned_land_relevant_period: overseas_entities_1.yesNoResponse.No,
    change_bo_relevant_period: overseas_entities_1.ChangeBoRelevantPeriodType.YES,
    trustee_involved_relevant_period: overseas_entities_1.TrusteeInvolvedRelevantPeriodType.YES,
    change_beneficiary_relevant_period: overseas_entities_1.ChangeBeneficiaryRelevantPeriodType.NO
};
exports.REMOVE_RESOURCE_MOCK = {
    is_not_proprietor_of_land: true
};
exports.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK = {
    entity_name: exports.ENTITY_NAME_BLOCK_MOCK,
    entity_number: exports.ENTITY_NUMBER_MOCK,
    presenter: exports.PRESENTER_OBJECT_MOCK,
    entity: exports.ENTITY_OBJECT_MOCK,
    due_diligence: exports.DUE_DILIGENCE_RESOURCE_MOCK,
    overseas_entity_due_diligence: exports.OE_DUE_DILIGENCE_RESOURCE_MOCK,
    beneficial_owners_statement: overseas_entities_1.BeneficialOwnersStatementType.ALL_IDENTIFIED_ALL_DETAILS,
    beneficial_owners_individual: exports.BENEFICIAL_OWNER_INDIVIDUAL_RESOURCE_MOCK_LIST,
    beneficial_owners_corporate: exports.BENEFICIAL_OWNER_CORPORATE_RESOURCE_MOCK_LIST,
    beneficial_owners_government_or_public_authority: exports.BENEFICIAL_OWNER_GOVERNMENT_RESOURCE_MOCK_LIST,
    managing_officers_individual: exports.MANAGING_OFFICERS_INDIVIDUAL_RESOURCE_MOCK_LIST,
    managing_officers_corporate: exports.MANAGING_OFFICERS_CORPORATE_RESOURCE_MOCK_LIST,
    trusts: exports.TRUSTS_RESOURCE_MOCK,
    update: exports.UPDATE_RESOURCE_MOCK,
    remove: exports.REMOVE_RESOURCE_MOCK,
    payment: exports.PAYMENT_OBJECT_MOCK
};
exports.OVERSEAS_ENTITY_EXTRA_DETAILS_RESOURCE_MOCK = {
    email_address: "private@overseasentities.test"
};
exports.requestClient = new src_1.RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "TOKEN_NOT_USED" });
exports.TRANSACTION_ID = "12345";
exports.OVERSEAS_ENTITY_ID = "00112233";
exports.UNAUTHORISED = "Unauthorised";
exports.BAD_REQUEST = "Bad Request";
exports.mockOverseasEntityCreatedResource = { id: exports.OVERSEAS_ENTITY_ID };
exports.mockPostOverseasEntityResponse = {
    201: { status: 201, body: exports.mockOverseasEntityCreatedResource },
    400: { status: 400, error: exports.BAD_REQUEST },
    401: { status: 401, error: exports.UNAUTHORISED }
};
exports.mockPutOverseasEntityResponse = {
    200: { status: 200 },
    400: { status: 400, error: exports.BAD_REQUEST }
};
exports.mockGetOverseasEntityResponse = {
    200: { status: 200, body: exports.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK },
    400: { status: 400, error: exports.BAD_REQUEST }
};
exports.mockGetOverseasEntityExtraDetailsResponse = {
    200: { status: 200, body: exports.OVERSEAS_ENTITY_EXTRA_DETAILS_RESOURCE_MOCK },
    400: { status: 400, error: exports.BAD_REQUEST }
};
exports.mockBeneficialOwnerPrivateDataResponse = {
    200: { status: 200, body: exports.BENEFICIAL_OWNER_PRIVATE_DATA_RESOURCE_MOCK },
    400: { status: 400, error: exports.BAD_REQUEST }
};
exports.mockBeneficialOwnerPrivateDataUndefinedResponse = {
    200: { status: 200, body: undefined }
};
exports.PRIVATE_TRUSTS_DATA_ID_MOCK = "123";
exports.PRIVATE_TRUSTS_DATA_MOCK = [{
        hashedTrustId: exports.PRIVATE_TRUSTS_DATA_ID_MOCK,
        trustName: "trust_name",
        creationDate: "2020-02-20",
        ceasedDate: "2023-03-03",
        trustStillInvolvedInOverseasEntityIndicator: false,
        unableToObtainAllTrustInfoIndicator: false
    }];
exports.PRIVATE_TRUSTS_DATA_RESOURCE_MOCK = [{
        hashed_trust_id: exports.PRIVATE_TRUSTS_DATA_ID_MOCK,
        trust_name: "trust_name",
        creation_date: "2020-02-20",
        ceased_date: "2023-03-03",
        trust_still_involved_in_overseas_entity_indicator: false,
        unable_to_obtain_all_trust_info_indicator: false
    }];
exports.PRIVATE_TRUSTS_NOT_CEASED_DATA_MOCK = [{
        hashedTrustId: exports.PRIVATE_TRUSTS_DATA_ID_MOCK,
        trustName: "trust_name",
        creationDate: "2020-02-20",
        unableToObtainAllTrustInfoIndicator: false
    }];
exports.PRIVATE_TRUSTS_NOT_CEASED_DATA_RESOURCE_MOCK = [{
        hashed_trust_id: exports.PRIVATE_TRUSTS_DATA_ID_MOCK,
        trust_name: "trust_name",
        creation_date: "2020-02-20",
        unable_to_obtain_all_trust_info_indicator: false
    }];
exports.TRUST_LINKS_MOCK = [{
        hashedTrustId: "123",
        hashedCorporateBodyAppointmentId: "456"
    }];
exports.TRUST_LINKS_RESOURCE_MOCK = [{
        hashed_trust_id: "123",
        hashed_corporate_body_appointment_id: "456"
    }];
exports.INDIVIDUAL_TRUSTEES_DATA_MOCK = [{
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
exports.INDIVIDUAL_TRUSTEES_DATA_RESOURCE_MOCK = [{
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
exports.CORPORATE_TRUSTEES_DATA_MOCK = [{
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
exports.CORPORATE_TRUSTEES_DATA_RESOURCE_MOCK = [{
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
//# sourceMappingURL=overseas.entities.mock.js.map