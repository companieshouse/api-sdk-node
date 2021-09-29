export interface ConfirmationStatementSubmission {
    id: string,
    data: ConfirmationStatementSubmissionData,
    links: {
        self: string,
    },
}

export interface ConfirmationStatementSubmissionResource {
    id: string,
    data: ConfirmationStatementSubmissionDataResource,
    links: {
        self: string,
    },
}

export interface ConfirmationStatementSubmissionDataResource {
    active_director_details_data?: ActiveDirectorDetailsDataResource,
    confirmation_statement_made_up_to_date: string,
    persons_significant_control_data?: PersonsOfSignificantControlDataResource,
    register_locations_data?: RegisterLocationsDataResource,
    registered_office_address_data?: RegisteredOfficeAddressDataResource,
    shareholder_data?: ShareholderDataResource,
    sic_code_data?: SicCodeDataResource,
    statement_of_capital_data?: StatementOfCapitalDataResource,
    trading_status_data?: TradingStatusDataResource
}

export interface ConfirmationStatementSubmissionData {
    activeDirectorDetailsData?: ActiveDirectorDetailsData,
    confirmationStatementMadeUpToDate: string,
    personsSignificantControlData?: PersonsOfSignificantControlData,
    registeredOfficeAddressData?: RegisteredOfficeAddressData,
    registerLocationsData?: RegisterLocationsData,
    shareholderData?: ShareholderData,
    sicCodeData?: SicCodeData,
    statementOfCapitalData?: StatementOfCapitalData,
    tradingStatusData?: TradingStatusData
}

export interface ConfirmationStatementSubmissionSectionResource {
    section_status: SectionStatus
}

export interface ConfirmationStatementSubmissionSection {
    sectionStatus: SectionStatus
}

export interface StatementOfCapitalDataResource extends ConfirmationStatementSubmissionSectionResource {
    statement_of_capital?: StatementOfCapitalResource
}

export interface StatementOfCapitalData extends ConfirmationStatementSubmissionSection {
    statementOfCapital?: StatementOfCapital
}

export interface PersonsOfSignificantControlDataResource extends ConfirmationStatementSubmissionSectionResource {
    persons_of_significant_control?: PersonOfSignificantControlResource[]
}

export interface PersonsOfSignificantControlData extends ConfirmationStatementSubmissionSection {
    personsOfSignificantControl?: PersonOfSignificantControl[]
}

export interface SicCodeDataResource extends ConfirmationStatementSubmissionSectionResource {
    sic_code?: SicCodeResource
}

export interface SicCodeData extends ConfirmationStatementSubmissionSection {
    sicCode?: SicCode
}

export interface RegisteredOfficeAddressDataResource extends ConfirmationStatementSubmissionSectionResource {
}

export interface RegisteredOfficeAddressData extends ConfirmationStatementSubmissionSection {
}

export interface ActiveDirectorDetailsDataResource extends ConfirmationStatementSubmissionSectionResource {
}

export interface ActiveDirectorDetailsData extends ConfirmationStatementSubmissionSection {
}

export interface ShareholderDataResource extends ConfirmationStatementSubmissionSectionResource {
}

export interface ShareholderData extends ConfirmationStatementSubmissionSection {
}

export interface RegisterLocationsDataResource extends ConfirmationStatementSubmissionSectionResource {
}

export interface RegisterLocationsData extends ConfirmationStatementSubmissionSection {
}

export enum SectionStatus {
    CONFIRMED = "CONFIRMED",
    NOT_CONFIRMED = "NOT_CONFIRMED",
    RECENT_FILING = "RECENT_FILING"
}

export enum EligibilityStatusCode {
    // Note use of String enums to ensure that correct status values are mapped to/from API calls
    // Otherwise, the enums translate to a number representing their position in the enum list
    COMPANY_NOT_FOUND = "COMPANY_NOT_FOUND",
    COMPANY_VALID_FOR_SERVICE = "COMPANY_VALID_FOR_SERVICE",
    INVALID_COMPANY_APPOINTMENTS_INVALID_NUMBER_OF_OFFICERS = "INVALID_COMPANY_APPOINTMENTS_INVALID_NUMBER_OF_OFFICERS",
    INVALID_COMPANY_APPOINTMENTS_MORE_THAN_ONE_PSC = "INVALID_COMPANY_APPOINTMENTS_MORE_THAN_ONE_PSC",
    INVALID_COMPANY_APPOINTMENTS_MORE_THAN_ONE_SHAREHOLDER = "INVALID_COMPANY_APPOINTMENTS_MORE_THAN_ONE_SHAREHOLDER",
    INVALID_COMPANY_STATUS = "INVALID_COMPANY_STATUS",
    INVALID_COMPANY_TRADED_STATUS_USE_WEBFILING = "INVALID_COMPANY_TRADED_STATUS_USE_WEBFILING",
    INVALID_COMPANY_TYPE_CS01_FILING_NOT_REQUIRED = "INVALID_COMPANY_TYPE_CS01_FILING_NOT_REQUIRED",
    INVALID_COMPANY_TYPE_PAPER_FILING_ONLY = "INVALID_COMPANY_TYPE_PAPER_FILING_ONLY",
    INVALID_COMPANY_TYPE_USE_WEB_FILING = "INVALID_COMPANY_TYPE_USE_WEB_FILING",
    INVALID_OFFICER_COUNT = "INVALID_OFFICER_COUNT"
}

export interface CompanyValidationResponse {
    eligibilityStatusCode: EligibilityStatusCode
}

export interface CompanyValidationResponseResource {
    eligibility_status_code: EligibilityStatusCode
}

export interface ConfirmationStatementCreated {
    id: string
}
export interface ConfirmationStatementCreatedResource {
    id: string
}

export interface StatementOfCapital {
    classOfShares: string;
    currency: string;
    numberAllotted: string;
    aggregateNominalValue: string;
    prescribedParticulars: string;
    totalNumberOfShares: string;
    totalAggregateNominalValue: string;
    totalAmountUnpaidForCurrency: string;
}

export interface StatementOfCapitalResource {
    class_of_shares: string;
    currency: string;
    number_allotted: string;
    aggregate_nominal_value: string;
    prescribed_particulars: string;
    total_number_of_shares: string;
    total_aggregate_nominal_value: string;
    total_amount_unpaid_for_currency: string;
}

export interface ActiveDirectorDetails {
    foreName1: string;
    foreName2?: string;
    surname: string;
    occupation: string;
    nationality: string;
    dateOfBirth: string;
    serviceAddress: Address;
    residentialAddress: Address;
}

export interface ActiveDirectorDetailsResource {
    fore_name_1: string;
    fore_name_2?: string;
    surname: string;
    occupation: string;
    nationality: string;
    date_of_birth: string;
    service_address: AddressResource;
    residential_address: AddressResource;
}

export interface RegisterLocation {
    registerTypeDesc: string;
    sailAddress?: Address;
}

export interface RegisterLocationResource {
    register_type_desc: string;
    sail_address?: Address;
}

export interface PersonOfSignificantControl {
    nameElements?: NameElements;
    address?: Address;
    appointmentType: string
    naturesOfControl?: string[];
    dateOfBirth?: DateOfBirth;
    dateOfBirthIso?: string,
    nationality?: string;
    serviceAddressLine1?: string;
    serviceAddressPostCode?: string;
    serviceAddressPostTown?: string;
    serviceAddressPoBox?: string;
    serviceAddressCountryName?: string;
    serviceAddressCareOf?: string;
    serviceAddressRegion?: string;
    serviceAddressArea?: string;
    companyName?: string;
    registrationNumber?: string;
    lawGoverned?: string;
    legalForm?: string;
    countryOfResidence?: string;
}

export interface NameElements {
    forename?: string,
    otherForenames?: string,
    middleName?: string,
    surname?: string,
    title?: string,
}

export interface Address {
    addressLine1?: string;
    addressLine2?: string;
    careOf?: string;
    country?: string;
    locality?: string;
    poBox?: string;
    postalCode?: string;
    premises?: string;
    region?: string;
}

export interface DateOfBirth {
    month?: number;
    year?: number;
}

export interface PersonOfSignificantControlResource {
    name_elements?: NameElementsResource;
    address?: AddressResource;
    appointment_type: string
    natures_of_control?: string[];
    date_of_birth?: DateOfBirth;
    date_of_birth_iso?: string,
    nationality?: string;
    service_address_line_1?: string;
    service_address_post_code?: string;
    service_address_post_town?: string;
    service_address_po_box?: string;
    service_address_country_name?: string;
    service_address_care_of?: string;
    service_address_region?: string;
    service_address_area?: string;
    company_name?: string;
    registration_number?: string;
    law_governed?: string;
    legal_form?: string;
    country_of_residence?: string;
}

export interface NameElementsResource {
    forename?: string,
    other_forenames?: string,
    middle_name?: string,
    surname?: string,
    title?: string,
}

export interface AddressResource {
    address_line_1?: string;
    address_line_2?: string;
    care_of?: string;
    country?: string;
    locality?: string;
    po_box?: string;
    postal_code?: string;
    premises?: string;
    region?: string;
}

export interface SicCode {
    code: string;
    description: string;
}

export interface SicCodeResource {
    code: string;
    description: string;
}

export interface Shareholder {
    foreName1: string;
    foreName2?: string;
    surname: string;
    shares: string;
    classOfShares: string;
    currency: string;
}

export interface ShareholderResource {
    fore_name_1: string;
    fore_name_2?: string;
    surname: string;
    shares: string;
    class_of_shares: string;
    currency: string;
}

export interface NextMadeUpToDateResource {
    current_next_made_up_to_date: string,
    is_due?: boolean,
    new_next_made_up_to_date?: string
}

export interface NextMadeUpToDate {
    currentNextMadeUpToDate: string,
    isDue?: boolean,
    newNextMadeUpToDate?: string
}

export interface TradingStatusDataResource {
    trading_status_answer: boolean
}

export interface TradingStatusData {
    tradingStatusAnswer: boolean
}
