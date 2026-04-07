export interface CompaniesResource {
    etag: string;
    top_hit: TopHit;
    items: Items[];
    kind: string;
}
export interface Items {
    company_type: string;
    company_number: string;
    company_status: string;
    company_name: string;
    ordered_alpha_key: string;
    ordered_alpha_key_with_id: string;
    kind: string;
    links: Links;
}
export interface Links {
    company_profile: string;
}
export interface TopHit {
    company_number: string;
    company_status: string;
    company_name: string;
    ordered_alpha_key_with_id: string;
    kind: string;
}
