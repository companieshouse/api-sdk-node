export interface CompaniesResource {
    etag: string;
    items: Items[];
    kind: string;
    top_hit: TopHit;
    hits: number;
}

export interface Items {
    registered_office_address: Address;
    company_name: string;
    company_number: string;
    company_status: string;
    date_of_cessation: Date;
    date_of_creation: Date;
    kind: string;
    ordered_alpha_key_with_id: string;
    previous_company_names: PreviousCompanyNames[];
}

export interface Address {
    address_line_1: string;
    address_line_2: string;
    locality: string;
    post_code: string;
}

export interface PreviousCompanyNames {
    ceased_on: Date;
    effective_from: Date;
    name: string;
}

export interface TopHit {
    registered_office_address: Address;
    company_name: string;
    company_number: string;
    company_status: string;
    date_of_cessation: Date;
    date_of_creation: Date;
    kind: string;
    ordered_alpha_key_with_id: string;
    previous_company_names: PreviousCompanyNames[];
}
