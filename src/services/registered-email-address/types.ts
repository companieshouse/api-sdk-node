/**
 * RegisteredEmailAddressResource is what is returned from the api.
 */
export interface RegisteredEmailAddressResource {
    registered_email_address: string;
    acceptEmailStatement:string;
}

// response resource
export interface RegisteredEmailAddress {
    registeredEmailAddress: string;
    acceptEmailStatement:string;
}
