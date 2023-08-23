/**
 * RegisteredEmailAddressResource - what is sent to the api.
 */
export interface RegisteredEmailAddressResource {
    registered_email_address: string;
    accept_appropriate_email_address_statement: boolean;
}

/**
 * RegisteredEmailAddressResponse - what is returned from the api.
 */
export interface RegisteredEmailAddressResponse {
    id: string,
    data: {
        registered_email_address: string;
        accept_appropriate_email_address_statement: boolean;
        etag: string,
        kind: string
    }
    created_at: string,
    updated_at: string,
    links: {
        self: string
    }
}

/**
 * RegisteredEmailAddressCreated - transposed api response data for web use.
 */
export interface RegisteredEmailAddressCreatedResource {
    id: string,
    data: {
        registeredEmailAddress: string;
        acceptAppropriateEmailAddressStatement: boolean;
        etag: string,
        kind: string
    }
    createdAt: string,
    updatedAt: string,
    links: {
        self: string;
    }
}

/**
 * RegisteredEmailAddress holds registered email address for web use.
 */
export interface RegisteredEmailAddress {
    registeredEmailAddress: string;
    acceptAppropriateEmailAddressStatement: boolean;
}
