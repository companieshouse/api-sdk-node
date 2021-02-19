export interface CompaniesResource {
    etag: string;
    items: Items[];
    kind: string;
    top_hit: TopHit;
}

export interface Items {
    address: Address;
    company_name: string;
    company_number: string;
    company_status: string;
    date_of_cessation: string;
    date_of_creation: string;
    kind: string;
    previous_company_names: PreviousCompanyNames[];
}

export interface Address {
    locality: string;
    postal_code: string;
}

export interface PreviousCompanyNames {
    ceased_on: string;
    effective_from: string;
    name: string;
}

export interface TopHit {
    address: Address;
    company_name: string;
    company_number: string;
    company_status: string;
    date_of_cessation: string;
    date_of_creation: string;
    kind: string;
    previous_company_names: PreviousCompanyNames[];
}
