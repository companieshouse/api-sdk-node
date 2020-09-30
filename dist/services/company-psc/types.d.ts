/**
 * CompanyPersonsWithSignificantControlResource is what is returned from the api.
 */
export interface CompanyPersonsWithSignificantControlResource {
    active_count: string;
    ceased_count: string;
    items: CompanyPersonWithSignificantControlResource[];
    items_per_page?: string;
    links: ResultsLinksResource;
    start_index?: string;
    total_results: string;
}
export interface CompanyPersonWithSignificantControlResource {
    address: AddressResource;
    country_of_residence: string;
    date_of_birth: DateOfBirthResource;
    etag: string;
    links: ItemLinksResource;
    name: string;
    name_elements: NameElementsResource;
    nationality: string;
    natures_of_control: string[];
    notified_on: string;
    identification?: IdentificationResource;
}
export interface AddressResource {
    address_line_1: string;
    address_line_2?: string;
    careOf?: string;
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
    forename?: string;
    surname: string;
}
export interface IdentificationResource {
    identification_type?: string;
    legal_authority?: string;
    legal_form?: string;
    place_registered?: string;
    registration_number?: string;
    country_registered?: string;
}
export interface ResultsLinksResource {
    self: string;
    persons_with_significant_control_statements_list?: string;
}
export interface ItemLinksResource {
    self: string;
    statement?: string;
}
export interface CompanyPersonsWithSignificantControl {
    activeCount: string;
    ceasedCount: string;
    items: CompanyPersonWithSignificantControl[];
    itemsPerPage?: string;
    links: ResultsLinks;
    startIndex?: string;
    totalResults: string;
}
export interface CompanyPersonWithSignificantControl {
    address: any;
    countryOfResidence: string;
    dateOfBirth: DateOfBirth;
    etag: string;
    links: ItemLinks;
    name: string;
    nameElements: NameElements;
    nationality: string;
    naturesOfControl: string[];
    notifiedOn: string;
    identification?: Identification;
}
export interface Address {
    addressLine1: string;
    addressLine2?: string;
    careOf?: string;
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
    forename?: string;
    surname: string;
}
export interface Identification {
    identificationType?: string;
    legalAuthority?: string;
    legalForm?: string;
    placeRegistered?: string;
    registrationNumber?: string;
    countryRegistered?: string;
}
export interface ResultsLinks {
    self: string;
    personsWithSignificantControlStatementsList?: string;
}
export interface ItemLinks {
    self: string;
    statement?: string;
}
