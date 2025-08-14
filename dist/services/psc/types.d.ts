/**
 * PersonWithSignificantControlResource is what is returned from the PSC data API, and will apply to individual PSC types only.
 */
export interface PersonWithSignificantControlResource {
    address: AddressResource;
    country_of_residence: string;
    date_of_birth: DateOfBirthResource;
    ceased_on?: string;
    etag: string;
    links: ItemLinksResource;
    name: string;
    name_elements: NameElementsResource;
    nationality: string;
    natures_of_control: string[];
    notified_on: string;
    is_sanctioned?: boolean;
    kind?: KindEnum;
    identity_verification_details?: IdentityVerificationDetailsResource;
}
export interface AddressResource {
    address_line_1: string;
    address_line_2?: string;
    careOf?: string;
    country?: string;
    locality: string;
    poBox?: string;
    postal_code?: string;
    premises?: string;
    region?: string;
}
export interface DateOfBirthResource {
    day?: string;
    month: string;
    year: string;
}
export interface NameElementsResource {
    title?: string;
    forename?: string;
    other_forenames?: string;
    middle_name?: string;
    surname: string;
}
export interface ResultsLinksResource {
    self: string;
    persons_with_significant_control_statements_list?: string;
}
export interface ItemLinksResource {
    self: string;
    statement?: string;
}
export interface IdentityVerificationDetailsResource {
    appointment_verification_end_on?: Date;
    appointment_verification_statement_date?: Date;
    appointment_verification_statement_due_on?: Date;
    appointment_verification_start_on?: Date;
}
export declare enum KindEnum {
    INDIVIDUAL_PERSON_WITH_SIGNIFICANT_CONTROL = "individual-person-with-significant-control"
}
export interface PersonWithSignificantControl {
    address: any;
    countryOfResidence: string;
    dateOfBirth: DateOfBirth;
    ceasedOn?: string;
    etag: string;
    links: ItemLinks;
    name: string;
    nameElements: NameElements;
    nationality: string;
    naturesOfControl: string[];
    notifiedOn: string;
    isSanctioned?: boolean;
    kind?: KindEnum;
    identityVerificationDetails?: IdentityVerificationDetails;
}
export interface Address {
    addressLine1: string;
    addressLine2?: string;
    careOf?: string;
    country?: string;
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
export interface NameElements {
    title?: string;
    forename?: string;
    otherForenames?: string;
    middleName?: string;
    surname: string;
}
export interface ResultsLinks {
    self: string;
    personsWithSignificantControlStatementsList?: string;
}
export interface ItemLinks {
    self: string;
    statement?: string;
}
export interface IdentityVerificationDetails {
    appointmentVerificationEndOn?: Date;
    appointmentVerificationStatementDate?: Date;
    appointmentVerificationStatementDueOn?: Date;
    appointmentVerificationStartOn?: Date;
}
