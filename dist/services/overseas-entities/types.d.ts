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
    beneficial_owners_government_or_public_authority?: BeneficialOwnerGovernmentOrPublicAuthorityResource[];
}
export interface OverseasEntityCreated {
    id: string;
}
/**
 * Overseas Entities interface used on OverseasEntity object
 */
export interface Presenter {
    full_name?: string;
    phone_number?: string;
    role?: presenterRole;
    role_title?: string;
    anti_money_laundering_registration_number?: string;
}
export interface Entity {
    name?: string;
    incorporation_country?: string;
    principal_address?: Address;
    is_service_address_same_as_principal_address?: yesNoResponse;
    service_address?: Address;
    email?: string;
    legal_form?: string;
    law_governed?: string;
    public_register_name?: string;
    registration_number?: string;
}
export interface BeneficialOwnerIndividual {
    first_name?: string;
    last_name?: string;
    date_of_birth?: InputDate;
    nationality?: string;
    usual_residential_address?: Address;
    service_address?: Address;
    is_service_address_same_as_usual_residential_address?: yesNoResponse;
    start_date?: InputDate;
    beneficial_owner_nature_of_control_types?: NatureOfControlType[];
    trustees_nature_of_control_types?: NatureOfControlType[];
    non_legal_firm_members_nature_of_control_types?: NatureOfControlType[];
    is_on_sanctions_list?: yesNoResponse;
}
export interface BeneficialOwnerIndividualResource {
    first_name?: string;
    last_name?: string;
    date_of_birth?: string;
    nationality?: string;
    usual_residential_address?: Address;
    service_address?: Address;
    is_service_address_same_as_usual_residential_address?: yesNoResponse;
    start_date?: string;
    beneficial_owner_nature_of_control_types?: NatureOfControlType[];
    trustees_nature_of_control_types?: NatureOfControlType[];
    non_legal_firm_members_nature_of_control_types?: NatureOfControlType[];
    is_on_sanctions_list?: yesNoResponse;
}
export interface BeneficialOwnerCorporate {
    name?: string;
    principal_address?: Address;
    service_address?: Address;
    is_service_address_same_as_principal_address?: yesNoResponse;
    legal_form?: string;
    law_governed?: string;
    is_on_register_in_country_formed_in?: yesNoResponse;
    register_name?: string;
    registration_number?: string;
    start_date?: InputDate;
    beneficial_owner_nature_of_control_types?: NatureOfControlType[];
    trustees_nature_of_control_types?: NatureOfControlType[];
    non_legal_firm_members_nature_of_control_types?: NatureOfControlType[];
    is_on_sanctions_list?: yesNoResponse;
}
export interface BeneficialOwnerCorporateResource {
    name?: string;
    principal_address?: Address;
    service_address?: Address;
    is_service_address_same_as_principal_address?: yesNoResponse;
    legal_form?: string;
    law_governed?: string;
    is_on_register_in_country_formed_in?: yesNoResponse;
    register_name?: string;
    registration_number?: string;
    start_date?: string;
    beneficial_owner_nature_of_control_types?: NatureOfControlType[];
    trustees_nature_of_control_types?: NatureOfControlType[];
    non_legal_firm_members_nature_of_control_types?: NatureOfControlType[];
    is_on_sanctions_list?: yesNoResponse;
}
export interface BeneficialOwnerGovernmentOrPublicAuthority {
    name?: string;
    principal_address?: Address;
    is_service_address_same_as_principal_address?: yesNoResponse;
    service_address?: Address;
    legal_form?: string;
    law_governed?: string;
    start_date?: InputDate;
    beneficial_owner_nature_of_control_types?: NatureOfControlType[];
    non_legal_firm_members_nature_of_control_types?: NatureOfControlType[];
}
export interface BeneficialOwnerGovernmentOrPublicAuthorityResource {
    name?: string;
    principal_address?: Address;
    is_service_address_same_as_principal_address?: yesNoResponse;
    service_address?: Address;
    legal_form?: string;
    law_governed?: string;
    start_date?: string;
    beneficial_owner_nature_of_control_types?: NatureOfControlType[];
    non_legal_firm_members_nature_of_control_types?: NatureOfControlType[];
}
/**
 * Shared Data Type
 */
export interface Address {
    property_name_number?: string;
    line_1?: string;
    line_2?: string;
    town?: string;
    county?: string;
    country?: string;
    postcode?: string;
}
export declare enum yesNoResponse {
    No = 0,
    Yes = 1
}
export interface InputDate {
    day: string;
    month: string;
    year: string;
}
declare enum presenterRole {
    administrator = "administrator",
    agent = "agent",
    solicitor = "solicitor",
    beneficial_owner = "beneficial_owner",
    other = "other"
}
export declare enum BeneficialOwnersStatementType {
    ALL_IDENTIFIED_ALL_DETAILS = "ALL_IDENTIFIED_ALL_DETAILS",
    ALL_IDENTIFIED_SOME_DETAILS = "ALL_IDENTIFIED_SOME_DETAILS",
    SOME_IDENTIFIED_ALL_DETAILS = "SOME_IDENTIFIED_ALL_DETAILS",
    SOME_IDENTIFIED_SOME_DETAILS = "SOME_IDENTIFIED_SOME_DETAILS",
    NONE_IDENTIFIED = "NONE_IDENTIFIED"
}
export declare enum NatureOfControlType {
    OVER_25_PERCENT_OF_SHARES = "OVER_25_PERCENT_OF_SHARES",
    OVER_25_PERCENT_OF_VOTING_RIGHTS = "OVER_25_PERCENT_OF_VOTING_RIGHTS",
    APPOINT_OR_REMOVE_MAJORITY_BOARD_DIRECTORS = "APPOINT_OR_REMOVE_MAJORITY_BOARD_DIRECTORS",
    SIGNIFICANT_INFLUENCE_OR_CONTROL = "SIGNIFICANT_INFLUENCE_OR_CONTROL"
}
export {};
