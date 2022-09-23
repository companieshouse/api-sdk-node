export interface PSCDiscrepancyReport {
    obliged_entity_organisation_name: string;
    obliged_entity_name: string;
    obliged_entity_contact_name: string;
    obliged_entity_email: string;
    obliged_entity_telephone_number: string;
    obliged_entity_type: string;
    company_number: string;
    submission_reference: string;
    status: string;
    etag: string;
    kind: string;
    links: LinksResource;
}
export interface LinksResource {
    self: string;
}
