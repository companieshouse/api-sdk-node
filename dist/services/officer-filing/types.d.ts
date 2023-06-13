/**
* CompanyOfficerResource is what is returned from the api.
*/
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
    self: string;
    officer: OfficerResourceLinks;
}
export interface OfficerResourceLinks {
    appointments: string;
}
export interface ValidationStatusErrorResource {
    error: string;
    location: string;
    location_type: string;
    type?: string;
}
export interface ValidationStatusResponseResource {
    errors: ValidationStatusErrorResource[];
    is_valid?: boolean;
}
/**
 * CompanyOfficers is the interface used within this SDK.
 */
export interface OfficerCard {
    removeUrl: string;
    officer: CompanyOfficer;
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
    self: string;
    officer: OfficerLinks;
}
export interface OfficerLinks {
    appointments: string;
}
export interface ValidationStatusError {
    error: string;
    location: string;
    locationType: string;
    type?: string;
}
export interface ValidationStatusResponse {
    errors: ValidationStatusError[];
    isValid?: boolean;
}
/**
 * The response returned when a filing has been sent to the api. The submission ID can be used to refer back to the saved filing.
 */
export interface FilingResponse {
    submissionId: string;
}
export interface FilingResponseDto {
    submission_id: string;
}
/**
 * OfficerFiling represents the filing of an officer. It is populated with the necessary information for a filing to be processed.
 * This is used for both post and patch requests.
 */
export interface OfficerFiling {
    referenceAppointmentId?: string;
    referenceEtag?: string;
    resignedOn?: string;
}
export interface OfficerFilingDto {
    reference_appointment_id?: string;
    reference_etag?: string;
    resigned_on?: string;
}
