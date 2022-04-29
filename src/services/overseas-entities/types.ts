/**
 * Overseas Entity interface used within this SDK
 */

export interface OverseasEntity {
    presenter?: Presenter;
    entity?: Entity;
    beneficial_owners_statement?: BeneficialOwnersStatementType;
    beneficial_owners_individual?: BeneficialOwnerIndividual[];
    beneficial_owners_corporate?: BeneficialOwnerCorporate[];
    beneficial_owners_government_or_public_authority?: BeneficialOwnerGovernmentOrPublicAuthority[];
}

export interface OverseasEntityResource {
    presenter?: Presenter;
    entity?: Entity;
    beneficial_owners_statement?: BeneficialOwnersStatementType;
    beneficial_owners_individual?: BeneficialOwnerIndividualResource[];
    beneficial_owners_corporate?: BeneficialOwnerCorporateResource[];
    beneficial_owners_government_or_public_authority?: BeneficialOwnerGovernmentOrPublicAuthority[];
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

export interface BeneficialOwnerIndividual {
    first_name?: string
    last_name?: string
    date_of_birth?: InputDate
    nationality?: string
    usual_residential_address?: Address
    service_address?: Address
    is_service_address_same_as_usual_residential_address?: yesNoResponse
    start_date?: InputDate
    beneficial_owner_nature_of_control_types?: NatureOfControlType[]
    trustees_nature_of_control_types?: NatureOfControlType[]
    non_legal_firm_members_nature_of_control_types?: NatureOfControlType[]
    is_on_sanctions_list?: yesNoResponse
}

export interface BeneficialOwnerIndividualResource {
    first_name?: string
    last_name?: string
    date_of_birth?: string
    nationality?: string
    usual_residential_address?: Address
    service_address?: Address
    is_service_address_same_as_usual_residential_address?: yesNoResponse
    start_date?: string
    beneficial_owner_nature_of_control_types?: NatureOfControlType[]
    trustees_nature_of_control_types?: NatureOfControlType[]
    non_legal_firm_members_nature_of_control_types?: NatureOfControlType[]
    is_on_sanctions_list?: yesNoResponse
}

export interface BeneficialOwnerCorporate {
    name?: string
    principal_address?: Address
    service_address?: Address
    is_service_address_same_as_principal_address?: yesNoResponse
    legal_form?: string
    law_governed?: string
    is_on_register_in_country_formed_in?: yesNoResponse
    register_name?: string
    registration_number?: string
    start_date?: InputDate
    beneficial_owner_nature_of_control_types?: NatureOfControlType[]
    trustees_nature_of_control_types?: NatureOfControlType[]
    non_legal_firm_members_nature_of_control_types?: NatureOfControlType[]
    is_on_sanctions_list?: yesNoResponse
}

export interface BeneficialOwnerCorporateResource {
    name?: string
    principal_address?: Address
    service_address?: Address
    is_service_address_same_as_principal_address?: yesNoResponse
    legal_form?: string
    law_governed?: string
    is_on_register_in_country_formed_in?: yesNoResponse
    register_name?: string
    registration_number?: string
    start_date?: string
    beneficial_owner_nature_of_control_types?: NatureOfControlType[]
    trustees_nature_of_control_types?: NatureOfControlType[]
    non_legal_firm_members_nature_of_control_types?: NatureOfControlType[]
    is_on_sanctions_list?: yesNoResponse
}

export interface BeneficialOwnerGovernmentOrPublicAuthority {
    name?: string
    principal_address?: Address
    service_address?: Address
    is_service_address_same_as_principal_address?: yesNoResponse
    legal_form?: string
    law_governed?: string
    is_on_register_in_country_formed_in?: yesNoResponse
    register_name?: string
    registration_number?: string
    beneficial_owner_nature_of_control_types?: NatureOfControlType
    non_legal_firm_members_nature_of_control_types?: NatureOfControlType
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

export enum yesNoResponse {
    No = 0,
    Yes = 1
}

export interface InputDate {
    day: string;
    month: string;
    year: string;
  }

enum presenterRole {
    administrator = "administrator",
    agent = "agent",
    solicitor = "solicitor",
    beneficial_owner = "beneficial_owner",
    other = "other"
}

export enum BeneficialOwnersStatementType {
    all_identified_all_details = "all_identified_all_details",
    all_identified_some_details = "all_identified_some_details",
    some_identified_all_details = "some_identified_all_details",
    some_identified_some_details = "some_identified_some_details",
    none_identified = "none_identified"
}

export enum NatureOfControlType {
    over_25_percent_of_shares = "over_25_percent_of_shares",
    over_25_percent_of_voting_rights = "over_25_percent_of_voting_rights",
    appoint_or_remove_majority_board_directors = "appoint_or_remove_majority_board_directors",
    significant_influence_or_control = "significant_influence_or_control"
}
