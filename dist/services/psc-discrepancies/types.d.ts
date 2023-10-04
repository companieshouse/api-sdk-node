export interface PSCDiscrepancy {
    links: LinksResource;
    etag: string;
    kind: string;
    details: string;
    psc_name: string;
    psc_date_of_birth: string;
    psc_type: string;
}
export interface LinksResource {
    self: string;
    psc_discrepancy_report: string;
}
