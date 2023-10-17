export interface CompaniesResource {
    etag: string;
    top_hit: TopHit;
    items: Items[];
    kind: string;
    hits: number;
}
export interface Items {
    company_name: string;
    company_number: string;
    company_status: string;
    company_type: string;
    company_subtype: string;
    kind: string;
    links: Links;
    date_of_cessation: Date;
    date_of_creation: Date;
    registered_office_address: Address;
    sic_codes: String[];
}
export interface Address {
    address_line_1: string;
    address_line_2: string;
    locality: string;
    postal_code: string;
    premises: string;
    region: string;
    country: string;
}
export interface TopHit {
    company_name: string;
    company_number: string;
    company_status: string;
    company_type: string;
    company_subtype: string;
    kind: string;
    links: Links;
    date_of_cessation: Date;
    date_of_creation: Date;
    registered_office_address: Address;
    sic_codes: String[];
}
export interface Links {
    company_profile: string;
}
