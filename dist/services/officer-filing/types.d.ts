export interface Tm01Submission {
    resigned_on: Date;
    reference_etag: String;
    reference_appointment_id: String;
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
