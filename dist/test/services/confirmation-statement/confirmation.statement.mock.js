"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockGetRegisterLocations = exports.mockGetShareholder = exports.mockGetConfirmationStatementSubmission = exports.mockGetPersonsOfSignificantControl = exports.mockGetListActiveOfficersDetails = exports.mockGetActiveOfficerDetails = exports.mockGetStatementOfCapital = exports.mockSubmitPostResponse = exports.mockCreatePostResponse = exports.mockCheckEligibility = exports.mockNextMadeUpToDateResourceNoCs = exports.mockNextMadeUpToDateResourceIsNotDue = exports.mockNextMadeUpToDateResourceIsDue = exports.mockConfirmationStatementCreatedResource = exports.mockCompanyValidationResponseResourceOk = exports.mockCompanyValidationResponseResourceCompanyNotFound = exports.mockConfirmationStatementSubmissionResourceNoSOC = exports.mockConfirmationStatementSubmissionResource = exports.mockRegisterLocationsList = exports.mockShareholderList = exports.mockPscNoNameNoAddress = exports.mockPersonsWithSignificantControlList = exports.mockListActiveOfficerDetails = exports.mockActiveOfficerDetails = exports.mockConfirmationStatementSubmission = exports.mockStatementOfCapital = exports.mockAddress2 = exports.mockAddress1 = exports.requestClient = void 0;
const confirmation_statement_1 = require("../../../src/services/confirmation-statement");
const src_1 = require("../../../src");
exports.requestClient = new src_1.RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "TOKEN_NOT_USED" });
exports.mockAddress1 = {
    address_line_1: "20 Any road",
    address_line_2: "Any",
    care_of: "xyz",
    country: "Anyland",
    locality: "Anytown",
    po_box: "1",
    postal_code: "AN1 1XY",
    premises: "20",
    region: "Anyshire"
};
exports.mockAddress2 = {
    address_line_1: "10 This road",
    address_line_2: "This",
    care_of: "abc",
    country: "Thisland",
    locality: "Thistown",
    po_box: "1",
    postal_code: "TH1 1AB",
    premises: "10",
    region: "Thisshire"
};
exports.mockStatementOfCapital = {
    class_of_shares: "Ordinary",
    currency: "GBP",
    number_allotted: "10",
    aggregate_nominal_value: "1",
    prescribed_particulars: "This is a test",
    total_number_of_shares: "10",
    total_aggregate_nominal_value: "10",
    total_amount_unpaid_for_currency: "1"
};
exports.mockConfirmationStatementSubmission = {
    id: "abc",
    data: {
        confirmationStatementMadeUpToDate: "2021-09-10",
        personsSignificantControlData: {
            sectionStatus: confirmation_statement_1.SectionStatus.CONFIRMED,
            personsOfSignificantControl: []
        },
        registeredOfficeAddressData: { sectionStatus: confirmation_statement_1.SectionStatus.CONFIRMED },
        registeredEmailAddressData: {
            sectionStatus: confirmation_statement_1.SectionStatus.INITIAL_FILING,
            registeredEmailAddress: "ch@mock-test.co.uk"
        },
        statementOfCapitalData: {
            sectionStatus: null,
            statementOfCapital: {
                classOfShares: "ORDINARY",
                currency: "GBP",
                numberAllotted: "100",
                aggregateNominalValue: "0.01",
                prescribedParticulars: "THE QUICK BROWN FOX",
                totalNumberOfShares: "100",
                totalAggregateNominalValue: "1",
                totalAmountUnpaidForCurrency: "2"
            }
        },
        sicCodeData: {
            sectionStatus: null,
            sicCode: {
                code: "123",
                description: "TEST SIC CODE DETAILS"
            }
        },
        shareholderData: { sectionStatus: confirmation_statement_1.SectionStatus.CONFIRMED },
        tradingStatusData: { tradingStatusAnswer: true }
    },
    links: {
        self: "self/link"
    }
};
exports.mockActiveOfficerDetails = {
    fore_name_1: "John",
    fore_name_2: "middle name",
    surname: "Doe",
    occupation: "singer",
    nationality: "British",
    date_of_birth: "1 January 1960",
    date_of_appointment: "1 January 2009",
    country_of_residence: "Country",
    service_address: exports.mockAddress1,
    residential_address: exports.mockAddress2,
    is_corporate: false,
    role: "SECRETARY",
    place_registered: "UNITED KINGDOM",
    registration_number: "012345678",
    law_governed: "INTERNATIONAL BUSINESS COMPANIES ACT 2000",
    legal_form: "INTERNATIONAL BUSINESS COMPANY",
    identification_type: "Y"
};
exports.mockListActiveOfficerDetails = [
    {
        fore_name_1: "John",
        fore_name_2: "middle name",
        surname: "Doe",
        occupation: "singer",
        nationality: "British",
        date_of_birth: "1 January 1960",
        date_of_appointment: "1 January 2009",
        country_of_residence: "Country",
        service_address: exports.mockAddress1,
        residential_address: exports.mockAddress2,
        is_corporate: false,
        role: "SECRETARY",
        place_registered: "UNITED KINGDOM",
        registration_number: "012345678",
        law_governed: "INTERNATIONAL BUSINESS COMPANIES ACT 2000",
        legal_form: "INTERNATIONAL BUSINESS COMPANY",
        identification_type: "Y"
    },
    {
        fore_name_1: "John",
        fore_name_2: "middle name",
        surname: "Doe",
        occupation: "singer",
        nationality: "British",
        date_of_birth: "1 January 1960",
        date_of_appointment: "1 January 2009",
        country_of_residence: "Country",
        service_address: exports.mockAddress1,
        residential_address: exports.mockAddress2,
        is_corporate: false,
        role: "SECRETARY",
        place_registered: "UNITED KINGDOM",
        registration_number: "012345678",
        law_governed: "INTERNATIONAL BUSINESS COMPANIES ACT 2000",
        legal_form: "INTERNATIONAL BUSINESS COMPANY",
        identification_type: "Y"
    }
];
exports.mockPersonsWithSignificantControlList = [
    {
        name_elements: {
            forename: "Michael",
            other_forenames: undefined,
            middle_name: undefined,
            surname: "Smith",
            title: "Mr"
        },
        address: exports.mockAddress1,
        service_address: exports.mockAddress2,
        appointment_type: "1",
        appointment_date: "2006-04-25",
        natures_of_control: [],
        date_of_birth: {
            month: 1,
            year: 1984
        },
        date_of_birth_iso: "1984-01-23",
        nationality: "British",
        company_name: "Company1",
        register_location: "ENGLAND",
        registration_number: "67890",
        law_governed: "ENGLISH",
        legal_form: "LIMITED",
        country_of_residence: "UNITED KINGDOM"
    },
    {
        name_elements: {
            forename: "John",
            other_forenames: "",
            middle_name: "",
            surname: "Johnson",
            title: "Mr"
        },
        address: exports.mockAddress2,
        service_address: exports.mockAddress1,
        appointment_type: "1",
        appointment_date: "2006-04-25",
        natures_of_control: undefined,
        date_of_birth: {
            month: 1,
            year: 1967
        },
        nationality: "British",
        company_name: "Company2",
        register_location: "ENGLAND",
        registration_number: "123456",
        law_governed: "ENGLISH",
        legal_form: "LIMITED",
        country_of_residence: "UNITED KINGDOM"
    }
];
exports.mockPscNoNameNoAddress = [
    {
        appointment_type: "1",
        appointment_date: "2006-04-25",
        natures_of_control: [],
        date_of_birth: {
            month: 1,
            year: 1984
        },
        nationality: "British",
        company_name: "Company1",
        register_location: "ENGLAND",
        registration_number: "67890",
        law_governed: "ENGLISH",
        legal_form: "LIMITED",
        country_of_residence: "UNITED KINGDOM"
    }
];
exports.mockShareholderList = [
    {
        fore_name_1: "John",
        surname: "Lewis",
        shares: "123",
        class_of_shares: "ORDINARY",
        currency: "GBP"
    },
    {
        fore_name_1: "James",
        fore_name_2: "R",
        surname: "Bond",
        shares: "456",
        class_of_shares: "ORDINARY A",
        currency: "USD"
    }
];
exports.mockRegisterLocationsList = [
    {
        register_type_desc: "Reg Type Desc 1",
        sail_address: exports.mockAddress1
    },
    {
        register_type_desc: "Reg Type Desc 2",
        sail_address: exports.mockAddress2
    }
];
exports.mockConfirmationStatementSubmissionResource = {
    id: "abc",
    data: {
        confirmation_statement_made_up_to_date: "2021-09-10",
        persons_significant_control_data: {
            section_status: confirmation_statement_1.SectionStatus.CONFIRMED,
            persons_of_significant_control: []
        },
        active_officer_details_data: { section_status: confirmation_statement_1.SectionStatus.CONFIRMED },
        registered_office_address_data: { section_status: confirmation_statement_1.SectionStatus.CONFIRMED },
        registered_email_address_data: {
            section_status: confirmation_statement_1.SectionStatus.INITIAL_FILING,
            registered_email_address: "ch@mock-test.co.uk"
        },
        register_locations_data: { section_status: confirmation_statement_1.SectionStatus.CONFIRMED },
        statement_of_capital_data: {
            section_status: confirmation_statement_1.SectionStatus.CONFIRMED,
            statement_of_capital: {
                class_of_shares: "ORDINARY",
                currency: "GBP",
                number_allotted: "100",
                aggregate_nominal_value: "0.01",
                prescribed_particulars: "THE QUICK BROWN FOX",
                total_number_of_shares: "100",
                total_aggregate_nominal_value: "1",
                total_amount_unpaid_for_currency: "2"
            }
        },
        sic_code_data: {
            section_status: null,
            sic_code: {
                code: "123",
                description: "TEST SIC CODE DETAILS"
            }
        },
        shareholder_data: { section_status: confirmation_statement_1.SectionStatus.CONFIRMED },
        trading_status_data: { trading_status_answer: true },
        accept_lawful_purpose_statement: true
    },
    links: {
        self: "self/link"
    }
};
exports.mockConfirmationStatementSubmissionResourceNoSOC = {
    id: "abc",
    data: {
        confirmation_statement_made_up_to_date: "2021-09-10",
        statement_of_capital_data: {
            section_status: confirmation_statement_1.SectionStatus.CONFIRMED
        }
    },
    links: {
        self: "self/link"
    }
};
exports.mockCompanyValidationResponseResourceCompanyNotFound = {
    eligibility_status_code: confirmation_statement_1.EligibilityStatusCode.COMPANY_NOT_FOUND
};
exports.mockCompanyValidationResponseResourceOk = {
    eligibility_status_code: confirmation_statement_1.EligibilityStatusCode.COMPANY_VALID_FOR_SERVICE
};
exports.mockConfirmationStatementCreatedResource = {
    id: "00112233"
};
exports.mockNextMadeUpToDateResourceIsDue = {
    current_next_made_up_to_date: "2021-04-14",
    is_due: true
};
exports.mockNextMadeUpToDateResourceIsNotDue = {
    current_next_made_up_to_date: "2021-04-14",
    is_due: false,
    new_next_made_up_to_date: "2021-03-22"
};
exports.mockNextMadeUpToDateResourceNoCs = {
    current_next_made_up_to_date: null
};
exports.mockCheckEligibility = {
    200: { status: 200, body: exports.mockCompanyValidationResponseResourceOk },
    202: { status: 202, body: undefined },
    400: { status: 400, body: exports.mockCompanyValidationResponseResourceCompanyNotFound },
    401: { status: 401, error: "Unauthorised" },
    404: { status: 404, error: "No Confirmation Statement found" },
    500: { status: 500, error: "Internal server error" }
};
exports.mockCreatePostResponse = {
    201: { status: 201, body: exports.mockConfirmationStatementCreatedResource },
    400: { status: 400, body: exports.mockCompanyValidationResponseResourceCompanyNotFound },
    401: { status: 401, error: "Unauthorised" },
    404: { status: 404, error: "No Confirmation Statement found" },
    500: { status: 500, error: "Internal server error" }
};
exports.mockSubmitPostResponse = {
    200: { status: 200, body: exports.mockConfirmationStatementSubmissionResource },
    202: { status: 202, body: exports.mockConfirmationStatementSubmissionResource },
    401: { status: 401, error: "Unauthorised" },
    404: { status: 404, error: "No Confirmation Statement found" },
    500: { status: 500, error: "Internal server error" }
};
exports.mockGetStatementOfCapital = {
    200: { status: 200, body: exports.mockStatementOfCapital },
    404: { status: 404, error: "No statement of capital data found" }
};
exports.mockGetActiveOfficerDetails = {
    200: { status: 200, body: exports.mockActiveOfficerDetails },
    404: { status: 404, error: "No active director details were found" },
    500: { status: 500, error: "Internal server error" }
};
exports.mockGetListActiveOfficersDetails = {
    200: { status: 200, body: exports.mockListActiveOfficerDetails },
    404: { status: 404, error: "No active officers details were found" },
    500: { status: 500, error: "Internal server error" }
};
exports.mockGetPersonsOfSignificantControl = {
    200: { status: 200, body: exports.mockPersonsWithSignificantControlList },
    500: { status: 500, error: "Internal server error" }
};
exports.mockGetConfirmationStatementSubmission = {
    200: { status: 200, body: exports.mockConfirmationStatementSubmissionResource },
    404: { status: 404, error: "No confirmation statement submission found" }
};
exports.mockGetShareholder = {
    200: { status: 200, body: exports.mockShareholderList },
    500: { status: 500, error: "Internal server error" }
};
exports.mockGetRegisterLocations = {
    200: { status: 200, body: exports.mockRegisterLocationsList },
    500: { status: 500, error: "Internal server error" }
};
//# sourceMappingURL=confirmation.statement.mock.js.map