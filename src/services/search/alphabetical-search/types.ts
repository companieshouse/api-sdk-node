export interface CompaniesResource {
    searchType: string;
    topHit: string;
    results: Result[];
}

export interface Result {
    ID: string;
    company_type: string;
    items: Items;
    links: Links;
}

export interface Items {
    company_number: string;
    company_status: string;
    corporate_name: string;
    record_type: string;
}

export interface Links {
    self: string;
}

// AlphabeticalSearchPostRequest
export interface AlphabeticalSearchPostRequest {
    company_name: string
}
