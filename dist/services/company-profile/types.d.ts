/**
 * CompanyProfileResource is what is returned from the api.
 */
export interface CompanyProfileResource {
    company_name: string;
    company_number: string;
    company_status: string;
    company_status_detail: string;
    date_of_creation: string;
    jurisdiction: string;
    sic_codes: string[];
    has_been_liquidated: boolean;
    has_super_secure_pscs?: boolean;
    type: string;
    has_charges: boolean;
    has_insolvency_history: boolean;
    registered_office_address: RegisteredOfficeAddressResource;
    accounts: AccountsResource;
    confirmation_statement?: ConfirmationStatementResource;
    links: LinksResource;
}
export interface RegisteredOfficeAddressResource {
    address_line_1: string;
    address_line_2: string;
    care_of: string;
    country: string;
    locality: string;
    po_box: string;
    postal_code: string;
    premises: string;
    region: string;
}
export interface AccountsResource {
    next_accounts: NextAccountsResource;
    next_due: string;
    overdue: boolean;
}
export interface NextAccountsResource {
    period_end_on: string;
    period_start_on: string;
}
export interface ConfirmationStatementResource {
    last_made_up_to?: string;
    next_due: string;
    next_made_up_to: string;
    overdue: boolean;
}
export interface LinksResource {
    filing_history?: string;
}
export interface RegisteredOfficeAddress {
    addressLineOne: string;
    addressLineTwo: string;
    careOf: string;
    country: string;
    locality: string;
    poBox: string;
    postalCode: string;
    premises: string;
    region: string;
}
export interface Accounts {
    nextAccounts: NextAccounts;
    nextDue: string;
    overdue: boolean;
}
export interface NextAccounts {
    periodEndOn: string;
    periodStartOn: string;
}
export interface ConfirmationStatement {
    lastMadeUpTo?: string;
    nextDue: string;
    nextMadeUpTo: string;
    overdue: boolean;
}
export interface Links {
    filingHistory?: string;
}
/**
 * CompanyProfile is the interface used within this SDK.
 */
export interface CompanyProfile {
    companyName: string;
    companyNumber: string;
    companyStatus: string;
    companyStatusDetail: string;
    dateOfCreation: string;
    jurisdiction: string;
    sicCodes: string[];
    hasBeenLiquidated: boolean;
    hasSuperSecurePscs?: boolean;
    type: string;
    hasCharges: boolean;
    hasInsolvencyHistory: boolean;
    registeredOfficeAddress: RegisteredOfficeAddress;
    accounts: Accounts;
    confirmationStatement?: ConfirmationStatement;
    links: Links;
}
