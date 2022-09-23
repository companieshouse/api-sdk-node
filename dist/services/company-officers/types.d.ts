/**
 * CompanyOfficersResource is what is returned from the api.
 */
export interface CompanyOfficersResource {
    active_count: string;
    etag: string;
    inactive_count: string;
    items: CompanyOfficerResource[];
    items_per_page: string;
    kind: string;
    links: CompanyOfficersResourceLinks;
    resigned_count: string;
    start_index: string;
    total_results?: string;
}
export interface CompanyOfficersResourceLinks {
    self: string;
}
export interface CompanyOfficerResource {
    address: AddressResource;
    appointed_on: string;
    country_of_residence?: string;
    date_of_birth?: DateOfBirthResource;
    former_names?: FormerNameResource[];
    identification?: IdentificationResource;
    links: CompanyOfficerResourceLinks;
    name: string;
    nationality?: string;
    occupation?: string;
    officer_role: string;
    resigned_on?: string;
}
export interface AddressResource {
    address_line_1: string;
    address_line_2?: string;
    care_of?: string;
    country: string;
    locality: string;
    po_box?: string;
    postal_code?: string;
    premises?: string;
    region?: string;
}
export interface DateOfBirthResource {
    day?: string;
    month: string;
    year: string;
}
export interface FormerNameResource {
    forenames?: string;
    surname?: string;
}
export interface IdentificationResource {
    identification_type?: string;
    legal_authority?: string;
    legal_form?: string;
    place_registered?: string;
    registration_number?: string;
}
export interface CompanyOfficerResourceLinks {
    officer: OfficerResourceLinks;
}
export interface OfficerResourceLinks {
    appointments: string;
}
/**
 * CompanyOfficers is the interface used within this SDK.
 */
export interface CompanyOfficers {
    activeCount: string;
    etag: string;
    inactiveCount: string;
    items: CompanyOfficer[];
    itemsPerPage: string;
    kind: string;
    links: CompanyOfficersLinks;
    resignedCount: string;
    startIndex: string;
    totalResults?: string;
}
export interface CompanyOfficersLinks {
    self: string;
}
export interface CompanyOfficer {
    address: Address;
    appointedOn: string;
    countryOfResidence?: string;
    dateOfBirth?: DateOfBirth;
    formerNames?: FormerName[];
    identification?: Identification;
    links: CompanyOfficerLinks;
    name: string;
    nationality?: string;
    occupation?: string;
    officerRole: string;
    resignedOn?: string;
}
export interface Address {
    addressLine1: string;
    addressLine2: string;
    careOf?: string;
    country: string;
    locality: string;
    poBox?: string;
    postalCode?: string;
    premises?: string;
    region?: string;
}
export interface DateOfBirth {
    day?: string;
    month: string;
    year: string;
}
export interface FormerName {
    forenames?: string;
    surname?: string;
}
export interface Identification {
    identificationType?: string;
    legalAuthority?: string;
    legalForm?: string;
    placeRegistered?: string;
    registrationNumber?: string;
}
export interface CompanyOfficerLinks {
    officer: OfficerLinks;
}
export interface OfficerLinks {
    appointments: string;
}
