export interface NameElements {
    forename?: string,
    other_forenames?: string,
    middlename?: string,
    surname?: string,
    title?: string
}

export interface RelevantOfficer {
    name_elements: NameElements,
    date_of_birth: Date,
    is_employee: boolean,
    is_director: boolean
}

export enum NameMismatchReason {
    PREFERRED_NAME = "PREFERRED_NAME",
    MAIDEN_NAME = "MAIDEN_NAME"
}

export enum VerificationStatement {
    INDIVIDUAL_VERIFIED = "INDIVIDUAL_VERIFIED",
    RO_IDENTIFIED= "RO_IDENTIFIED",
    RO_VERIFIED = "RO_VERIFIED",
    RO_DECLARATION = "RO_DECLARATION"
}

export interface VerificationDetails {
    name_mismatch_reason?: NameMismatchReason,
    verification_statements: VerificationStatement[]
}

export interface PscVerification {
    psc_appointment_id: string,
    relevant_officer?: RelevantOfficer,
    verification_details: VerificationDetails
}

export interface Links {
    self: string,
    validation_status: string
}

export interface PscVerificationResource {
    created_at: Date,
    updated_at: Date,
    links: Links,
    data: PscVerification;
}
