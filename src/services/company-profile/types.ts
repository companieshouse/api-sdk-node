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
  service_address?: ServiceAddressResource;
  accounts: AccountsResource;
  confirmation_statement?: ConfirmationStatementResource;
  foreign_company_details?: ForeignCompanyDetailsResource;
  is_on_register_in_country_formed_in?: string;
  links: LinksResource;
}

export interface ForeignCompanyDetailsResource {
  business_activity?: string;
  governed_by: string;
  originating_registry?: OriginatingRegistryResource;
  is_a_credit_finacial_institution?: boolean;
  legal_form: string
}

export interface OriginatingRegistryResource {
  name: string;
  country: string
}

export interface OfficeAddressResource {
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

export interface RegisteredOfficeAddressResource extends OfficeAddressResource {};
export interface ServiceAddressResource extends OfficeAddressResource {};

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

export interface OfficeAddress {
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

export interface RegisteredOfficeAddress extends OfficeAddress {};
export interface ServiceAddress extends OfficeAddress {};

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

export interface ForeignCompanyDetails {
  businessActivity?: string;
  governedBy: string;
  originatingRegistry?: OriginatingRegistry;
  isACreditFinacialInstitution?: boolean;
  legalForm: string
}

export interface OriginatingRegistry {
  name: string;
  country: string
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
  serviceAddress?: ServiceAddress;
  accounts: Accounts;
  confirmationStatement?: ConfirmationStatement;
  foreignCompanyDetails?: ForeignCompanyDetails;
  isOnRegisterInCountryFormedIn?: boolean;
  links: Links;
}
