export interface PscDiscrepancy {
    links: LinksResource,
    etag: string,
    kind: string,
    details: string,
    psc_name: string,
    psc_date_of_birth: string
}
export interface LinksResource {
    self: string;
    "psc-discrepancy-report": string;
}
