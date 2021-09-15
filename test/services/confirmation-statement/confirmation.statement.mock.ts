import {
    ActiveDirectorDetailsResource,
    CompanyValidationResponseResource,
    ConfirmationStatementCreatedResource,
    ConfirmationStatementSubmission,
    ConfirmationStatementSubmissionResource,
    EligibilityStatusCode,
    PersonOfSignificantControlResource,
    SectionStatus,
    StatementOfCapitalResource,
    ShareholderResource,
    RegisterLocationResource,
    NextMadeUpToDateResource
} from "../../../src/services/confirmation-statement";
import { RequestClient } from "../../../src";

export const requestClient = new RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "TOKEN_NOT_USED" });

export const mockAddress1 = {
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

export const mockAddress2 = {
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

export const mockStatementOfCapital: StatementOfCapitalResource = {
    class_of_shares: "Ordinary",
    currency: "GBP",
    number_allotted: "10",
    aggregate_nominal_value: "1",
    prescribed_particulars: "This is a test",
    total_number_of_shares: "10",
    total_aggregate_nominal_value: "10",
    total_amount_unpaid_for_currency: "1"
};

export const mockConfirmationStatementSubmission: ConfirmationStatementSubmission = {
    id: "abc",
    data: {
        confirmationStatementMadeUpToDate: "2021-09-10",
        personsSignificantControlData: {
            sectionStatus: SectionStatus.CONFIRMED,
            personsOfSignificantControl: []
        },
        registeredOfficeAddressData: { sectionStatus: SectionStatus.CONFIRMED },
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
        shareholderData: { sectionStatus: SectionStatus.CONFIRMED },
        tradingStatusData: { tradingStatusAnswer: true }
    },
    links: {
        self: "self/link"
    }
};

export const mockActiveDirectorDetails: ActiveDirectorDetailsResource = {
    fore_name_1: "John",
    fore_name_2: "middle name",
    surname: "Doe",
    occupation: "singer",
    nationality: "British",
    date_of_birth: "1 January 1960",
    service_address: mockAddress1,
    residential_address: mockAddress2
}

export const mockPersonsWithSignificantControlList: PersonOfSignificantControlResource[] = [
    {
        name_elements: {
            forename: "Michael",
            other_forenames: undefined,
            middle_name: undefined,
            surname: "Smith",
            title: "Mr"
        },
        address: mockAddress1,
        appointment_type: "1",
        natures_of_control: [],
        date_of_birth: {
            month: 1,
            year: 1984
        },
        date_of_birth_iso: "1984-01-23",
        nationality: "British",
        service_address_line_1: "1 Nowhere road",
        service_address_post_code: "NO1 0AA",
        service_address_post_town: "Nowhere",
        company_name: "Company1",
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
        address: mockAddress2,
        appointment_type: "1",
        natures_of_control: undefined,
        date_of_birth: {
            month: 1,
            year: 1967
        },
        nationality: "British",
        service_address_line_1: "1 Somewhere street",
        service_address_post_code: "SW1 3ZZ",
        service_address_post_town: "Somewhere",
        company_name: "Company2",
        registration_number: "123456",
        law_governed: "ENGLISH",
        legal_form: "LIMITED",
        country_of_residence: "UNITED KINGDOM"
    }
]

export const mockPscNoNameNoAddress: PersonOfSignificantControlResource[] = [
    {
        appointment_type: "1",
        natures_of_control: [],
        date_of_birth: {
            month: 1,
            year: 1984
        },
        nationality: "British",
        service_address_line_1: "1 Nowhere road",
        service_address_post_code: "NO1 0AA",
        service_address_post_town: "Nowhere",
        company_name: "Company1",
        registration_number: "67890",
        law_governed: "ENGLISH",
        legal_form: "LIMITED",
        country_of_residence: "UNITED KINGDOM"
    }
]

export const mockShareholderList: ShareholderResource[] = [
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
]

export const mockRegisterLocationsList: RegisterLocationResource[] = [
    {
        register_type_desc: "Reg Type Desc 1",
        sail_address: mockAddress1
    },
    {
        register_type_desc: "Reg Type Desc 2",
        sail_address: mockAddress2
    }
]

export const mockConfirmationStatementSubmissionResource: ConfirmationStatementSubmissionResource = {
    id: "abc",
    data: {
        confirmation_statement_made_up_to_date: "2021-09-10",
        persons_significant_control_data: {
            section_status: SectionStatus.CONFIRMED,
            persons_of_significant_control: []
        },
        active_director_details_data: { section_status: SectionStatus.CONFIRMED },
        registered_office_address_data: { section_status: SectionStatus.CONFIRMED },
        register_locations_data: { section_status: SectionStatus.CONFIRMED },
        statement_of_capital_data: {
            section_status: SectionStatus.CONFIRMED,
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
        shareholder_data: { section_status: SectionStatus.CONFIRMED },
        trading_status_data: { trading_status_answer: true }
    },
    links: {
        self: "self/link"
    }
};

export const mockConfirmationStatementSubmissionResourceNoSOC: ConfirmationStatementSubmissionResource = {
    id: "abc",
    data: {
        confirmation_statement_made_up_to_date: "2021-09-10",
        statement_of_capital_data: {
            section_status: SectionStatus.CONFIRMED
        }
    },
    links: {
        self: "self/link"
    }
};

export const mockCompanyValidationResponseResourceCompanyNotFound: CompanyValidationResponseResource = {
    eligibility_status_code: EligibilityStatusCode.COMPANY_NOT_FOUND
};

export const mockCompanyValidationResponseResourceOk: CompanyValidationResponseResource = {
    eligibility_status_code: EligibilityStatusCode.COMPANY_VALID_FOR_SERVICE
};

export const mockConfirmationStatementCreatedResource: ConfirmationStatementCreatedResource = {
    id: "00112233"
};

export const mockNextMadeUpToDateResourceIsDue: NextMadeUpToDateResource = {
    current_next_made_up_to_date: "2021-04-14",
    is_due: true
};

export const mockNextMadeUpToDateResourceIsNotDue: NextMadeUpToDateResource = {
    current_next_made_up_to_date: "2021-04-14",
    is_due: false,
    new_next_made_up_to_date: "2021-03-22"
};

export const mockNextMadeUpToDateResourceNoCs: NextMadeUpToDateResource = {
    current_next_made_up_to_date: null
};

export const mockCheckEligibility = {
    200: { status: 200, body: mockCompanyValidationResponseResourceOk },
    202: { status: 202, body: undefined },
    400: { status: 400, body: mockCompanyValidationResponseResourceCompanyNotFound },
    401: { status: 401, error: "Unauthorised" },
    404: { status: 404, error: "No Confirmation Statement found" },
    500: { status: 500, error: "Internal server error" }
};

export const mockCreatePostResponse = {
    201: { status: 201, body: mockConfirmationStatementCreatedResource },
    400: { status: 400, body: mockCompanyValidationResponseResourceCompanyNotFound },
    401: { status: 401, error: "Unauthorised" },
    404: { status: 404, error: "No Confirmation Statement found" },
    500: { status: 500, error: "Internal server error" }
};

export const mockSubmitPostResponse = {
    200: { status: 200, body: mockConfirmationStatementSubmissionResource },
    202: { status: 202, body: mockConfirmationStatementSubmissionResource },
    401: { status: 401, error: "Unauthorised" },
    404: { status: 404, error: "No Confirmation Statement found" },
    500: { status: 500, error: "Internal server error" }
};

export const mockGetStatementOfCapital = {
    200: { status: 200, body: mockStatementOfCapital },
    404: { status: 404, error: "No statement of capital data found" }
};

export const mockGetActiveDirectorDetails = {
    200: { status: 200, body: mockActiveDirectorDetails },
    404: { status: 404, error: "No active director details were found" },
    500: { status: 500, error: "Internal server error" }
};

export const mockGetPersonsOfSignificantControl = {
    200: { status: 200, body: mockPersonsWithSignificantControlList },
    500: { status: 500, error: "Internal server error" }
};

export const mockGetConfirmationStatementSubmission = {
    200: { status: 200, body: mockConfirmationStatementSubmissionResource },
    404: { status: 404, error: "No confirmation statement submission found" }
};

export const mockGetShareholder = {
    200: { status: 200, body: mockShareholderList },
    500: { status: 500, error: "Internal server error" }
};

export const mockGetRegisterLocations = {
    200: { status: 200, body: mockRegisterLocationsList },
    500: { status: 500, error: "Internal server error" }
};
