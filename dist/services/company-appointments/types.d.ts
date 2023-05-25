/**
 * CompanyAppointmentResource is what is returned from the api.
 */
export interface CompanyAppointmentResource {
    service_address: AddressResource;
    appointed_on?: string;
    appointed_before?: string;
    resigned_on?: string;
    country_of_residence?: string;
    date_of_birth?: DateOfBirthResource;
    former_names?: FormerNameResource[];
    identification?: IdentificationResource;
    links: CompanyOfficerResourceLinks;
    name: string;
    forename: string;
    surname: string;
    other_forenames: string;
    nationality?: string;
    occupation?: string;
    officer_role: string;
    etag: string;
    person_number: string;
    is_pre_1992_appointment: boolean;
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
    self: string;
    officer: OfficerResourceLinks;
}
export interface OfficerResourceLinks {
    appointments: string;
}
/**
 * CompanyOfficers is the interface used within this SDK.
 */
export interface CompanyAppointment {
    serviceAddress: Address;
    appointedOn?: string;
    appointedBefore?: string;
    resignedOn?: string;
    countryOfResidence?: string;
    dateOfBirth?: DateOfBirth;
    formerNames?: FormerName[];
    identification?: Identification;
    links: CompanyOfficerLinks;
    name: string;
    forename: string;
    surname: string;
    otherForenames: string;
    nationality?: string;
    occupation?: string;
    officerRole: string;
    etag: string;
    personNumber: string;
    isPre1992Appointment: boolean;
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
    self: string;
    officer: OfficerLinks;
}
export interface OfficerLinks {
    appointments: string;
}
