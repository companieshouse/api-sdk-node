/**
 * RegisteredEmailAddressResource is what is returned from the api.
 */
export interface RegisteredEmailAddressResource {
    registered_email_address: string;
    accept_appropriate_email_address_statement: string;
}

// response resource
export interface RegisteredEmailAddress {
    registeredEmailAddress: string;
    acceptAppropriateEmailAddressStatement: string;
}
