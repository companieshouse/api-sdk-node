/**
 * Overseas Entity interface used within this SDK
 */

export interface OverseasEntity {
    presenter?: Presenter;
    entity?: Entity;
    beneficial_owners_statement?: BeneficialOwnersStatement;
}
export interface OverseasEntityCreated {
    id: string
}

/**
 * Overseas Entities interface used on OverseasEntity object
 */
export interface Presenter {
    full_name?: string
    phone_number?: string
    role?: presenterRole
    role_title?: string
    anti_money_laundering_registration_number?: string
}

export interface Entity {
    name?: string
    incorporation_country?: string
    principal_address?: Address
    is_service_address_same_as_principal_address?: yesNoResponse
    service_address?: Address
    email?: string
    legal_form?: string
    law_governed?: string
    public_register_name?: string
    registration_number?: string
}

export interface BeneficialOwnersStatement {
    beneficial_owners_statement?: BeneficialOwnersStatementType
}

/**
 * Shared Data Type
 */
export interface Address {
    property_name_number?: string
    line_1?: string
    line_2?: string
    town?: string
    county?: string
    country?: string
    postcode?: string
}

enum yesNoResponse {
    No = 0,
    Yes = 1
}

enum presenterRole {
    administrator = "administrator",
    agent = "agent",
    solicitor = "solicitor",
    beneficial_owner = "beneficial_owner",
    other = "other"
}

enum BeneficialOwnersStatementType {
    all_identified_all_details = "all_identified_all_details",
    all_identified_some_details = "all_identified_some_details",
    some_identified_all_details = "some_identified_all_details",
    some_identified_some_details = "some_identified_some_details",
    none_identified = "none_identified"
}
