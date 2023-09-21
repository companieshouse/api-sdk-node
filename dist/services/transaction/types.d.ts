/**
 * TransactionResource is what is returned from the api.
 */
export interface TransactionResource {
    id?: string;
    etag?: string;
    links?: {
        self: string;
    };
    reference: string;
    status?: string;
    kind?: string;
    company_name?: string;
    company_number: string;
    created_at?: string;
    created_by?: {
        language: string;
        id: string;
        email: string;
    };
    updated_at?: string;
    description: string;
    resources?: {
        [key: string]: {
            kind: string;
            links: {
                resource: string;
                costs?: string;
            };
        };
    };
}
export interface Transaction {
    id?: string;
    etag?: string;
    links?: {
        self: string;
    };
    reference: string;
    status?: string;
    kind?: string;
    companyName?: string;
    companyNumber?: string;
    createdAt?: string;
    createdBy?: {
        language: string;
        id: string;
        email: string;
    };
    updatedAt?: string;
    description: string;
    resources?: {
        [key: string]: {
            kind: string;
            links: {
                resource: string;
                costs?: string;
            };
        };
    };
}
