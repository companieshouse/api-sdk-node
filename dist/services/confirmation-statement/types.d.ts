export interface ConfirmationStatementSubmission {
    id: string;
    data: ConfirmationStatementSubmissionData;
    links: {
        self: string;
    };
}
export interface ConfirmationStatementSubmissionResource {
    id: string;
    data: ConfirmationStatementSubmissionDataResource;
    links: {
        self: string;
    };
}
export interface ConfirmationStatementSubmissionDataResource {
    active_officer_details_data?: ActiveOfficerDetailsDataResource;
    confirmation_statement_made_up_to_date: string;
    persons_significant_control_data?: PersonsOfSignificantControlDataResource;
    register_locations_data?: RegisterLocationsDataResource;
    registered_office_address_data?: RegisteredOfficeAddressDataResource;
    shareholder_data?: ShareholderDataResource;
    sic_code_data?: SicCodeDataResource;
    statement_of_capital_data?: StatementOfCapitalDataResource;
    trading_status_data?: TradingStatusDataResource;
}
export interface ConfirmationStatementSubmissionData {
    activeOfficerDetailsData?: ActiveOfficerDetailsData;
    confirmationStatementMadeUpToDate: string;
    personsSignificantControlData?: PersonsOfSignificantControlData;
    registeredOfficeAddressData?: RegisteredOfficeAddressData;
    registerLocationsData?: RegisterLocationsData;
    shareholderData?: ShareholderData;
    sicCodeData?: SicCodeData;
    statementOfCapitalData?: StatementOfCapitalData;
    tradingStatusData?: TradingStatusData;
}
export interface ConfirmationStatementSubmissionSectionResource {
    section_status: SectionStatus;
}
export interface ConfirmationStatementSubmissionSection {
    sectionStatus: SectionStatus;
}
export interface StatementOfCapitalDataResource extends ConfirmationStatementSubmissionSectionResource {
    statement_of_capital?: StatementOfCapitalResource;
}
export interface StatementOfCapitalData extends ConfirmationStatementSubmissionSection {
    statementOfCapital?: StatementOfCapital;
}
export interface PersonsOfSignificantControlDataResource extends ConfirmationStatementSubmissionSectionResource {
    persons_of_significant_control?: PersonOfSignificantControlResource[];
}
export interface PersonsOfSignificantControlData extends ConfirmationStatementSubmissionSection {
    personsOfSignificantControl?: PersonOfSignificantControl[];
}
export interface SicCodeDataResource extends ConfirmationStatementSubmissionSectionResource {
    sic_code?: SicCodeResource;
}
export interface SicCodeData extends ConfirmationStatementSubmissionSection {
    sicCode?: SicCode;
}
export interface RegisteredOfficeAddressDataResource extends ConfirmationStatementSubmissionSectionResource {
}
export interface RegisteredOfficeAddressData extends ConfirmationStatementSubmissionSection {
}
export interface ActiveOfficerDetailsDataResource extends ConfirmationStatementSubmissionSectionResource {
}
export interface ActiveOfficerDetailsData extends ConfirmationStatementSubmissionSection {
}
export interface ShareholderDataResource extends ConfirmationStatementSubmissionSectionResource {
}
export interface ShareholderData extends ConfirmationStatementSubmissionSection {
}
export interface RegisterLocationsDataResource extends ConfirmationStatementSubmissionSectionResource {
}
export interface RegisterLocationsData extends ConfirmationStatementSubmissionSection {
}
export declare enum SectionStatus {
    CONFIRMED = "CONFIRMED",
    NOT_CONFIRMED = "NOT_CONFIRMED",
    RECENT_FILING = "RECENT_FILING"
}
export declare enum EligibilityStatusCode {
    COMPANY_NOT_FOUND = "COMPANY_NOT_FOUND",
    COMPANY_VALID_FOR_SERVICE = "COMPANY_VALID_FOR_SERVICE",
    INVALID_COMPANY_APPOINTMENTS_INVALID_NUMBER_OF_OFFICERS = "INVALID_COMPANY_APPOINTMENTS_INVALID_NUMBER_OF_OFFICERS",
    INVALID_COMPANY_APPOINTMENTS_MORE_THAN_FIVE_OFFICERS = "INVALID_COMPANY_APPOINTMENTS_MORE_THAN_FIVE_OFFICERS",
    INVALID_COMPANY_APPOINTMENTS_MORE_THAN_ONE_PSC = "INVALID_COMPANY_APPOINTMENTS_MORE_THAN_ONE_PSC",
    INVALID_COMPANY_APPOINTMENTS_MORE_THAN_FIVE_PSCS = "INVALID_COMPANY_APPOINTMENTS_MORE_THAN_FIVE_PSCS",
    INVALID_COMPANY_APPOINTMENTS_MORE_THAN_ONE_SHAREHOLDER = "INVALID_COMPANY_APPOINTMENTS_MORE_THAN_ONE_SHAREHOLDER",
    INVALID_COMPANY_STATUS = "INVALID_COMPANY_STATUS",
    INVALID_COMPANY_TRADED_STATUS_USE_WEBFILING = "INVALID_COMPANY_TRADED_STATUS_USE_WEBFILING",
    INVALID_COMPANY_TYPE_CS01_FILING_NOT_REQUIRED = "INVALID_COMPANY_TYPE_CS01_FILING_NOT_REQUIRED",
    INVALID_COMPANY_TYPE_PAPER_FILING_ONLY = "INVALID_COMPANY_TYPE_PAPER_FILING_ONLY",
    INVALID_COMPANY_TYPE_USE_WEB_FILING = "INVALID_COMPANY_TYPE_USE_WEB_FILING",
    INVALID_OFFICER_COUNT = "INVALID_OFFICER_COUNT"
}
export interface CompanyValidationResponse {
    eligibilityStatusCode: EligibilityStatusCode;
}
export interface CompanyValidationResponseResource {
    eligibility_status_code: EligibilityStatusCode;
}
export interface ConfirmationStatementCreated {
    id: string;
}
export interface ConfirmationStatementCreatedResource {
    id: string;
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
export interface ActiveOfficerDetails {
    foreName1: string;
    foreName2?: string;
    surname: string;
    occupation: string;
    nationality: string;
    dateOfBirth: string;
    dateOfAppointment: string;
    countryOfResidence: string;
    serviceAddress: Address;
    residentialAddress: Address;
    isCorporate: boolean;
    role: string;
    placeRegistered?: string;
    registrationNumber?: string;
    lawGoverned?: string;
    legalForm?: string;
    identificationType?: string;
}
export interface ActiveOfficerDetailsResource {
    fore_name_1: string;
    fore_name_2?: string;
    surname: string;
    occupation: string;
    nationality: string;
    date_of_birth: string;
    date_of_appointment: string;
    country_of_residence: string;
    service_address: AddressResource;
    residential_address: AddressResource;
    is_corporate: boolean;
    role: string;
    place_registered?: string;
    registration_number?: string;
    law_governed?: string;
    legal_form?: string;
    identification_type?: string;
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
    serviceAddress?: Address;
    appointmentType: string;
    appointmentDate: string;
    naturesOfControl?: string[];
    dateOfBirth?: DateOfBirth;
    dateOfBirthIso?: string;
    nationality?: string;
    companyName?: string;
    registerLocation?: string;
    registrationNumber?: string;
    lawGoverned?: string;
    legalForm?: string;
    countryOfResidence?: string;
}
export interface NameElements {
    forename?: string;
    otherForenames?: string;
    middleName?: string;
    surname?: string;
    title?: string;
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
    service_address?: AddressResource;
    appointment_type: string;
    appointment_date: string;
    natures_of_control?: string[];
    date_of_birth?: DateOfBirth;
    date_of_birth_iso?: string;
    nationality?: string;
    company_name?: string;
    register_location?: string;
    registration_number?: string;
    law_governed?: string;
    legal_form?: string;
    country_of_residence?: string;
}
export interface NameElementsResource {
    forename?: string;
    other_forenames?: string;
    middle_name?: string;
    surname?: string;
    title?: string;
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
    current_next_made_up_to_date: string;
    is_due?: boolean;
    new_next_made_up_to_date?: string;
}
export interface NextMadeUpToDate {
    currentNextMadeUpToDate: string;
    isDue?: boolean;
    newNextMadeUpToDate?: string;
}
export interface TradingStatusDataResource {
    trading_status_answer: boolean;
}
export interface TradingStatusData {
    tradingStatusAnswer: boolean;
}
