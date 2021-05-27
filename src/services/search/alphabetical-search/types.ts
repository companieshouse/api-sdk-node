export interface CompaniesResource {
    etag: string;
    searchType: string;
    topHit: TopHit;
    items: Items[];
}
export interface Items {
    company_number: string;
    company_status: string;
    corporate_name: string;
    record_type: string;
    ordered_alpha_key: string;
    ordered_alpha_key_with_id: string;
    kind: string;
    links: Links;
    company_type: string;
}
export interface Links {
    self: string;
}
export interface TopHit {
    company_name: string;
    company_number: string;
    company_status: string;
    ordered_alpha_key_with_id: string;
    kind: string;
}
