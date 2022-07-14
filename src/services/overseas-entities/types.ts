/**
 * Overseas Entity interface used within this SDK
 */

export interface OverseasEntity {
    presenter?: Presenter;
    entity?: Entity;
    due_diligence?: DueDiligence;
    overseas_entity_due_diligence?: OverseasEntityDueDiligence;
    beneficial_owners_statement?: BeneficialOwnersStatementType;
    beneficial_owners_individual?: BeneficialOwnerIndividual[];
    beneficial_owners_corporate?: BeneficialOwnerCorporate[];
    beneficial_owners_government_or_public_authority?: BeneficialOwnerGovernmentOrPublicAuthority[];
    managing_officers_individual?: ManagingOfficerIndividual[];
    managing_officers_corporate?: ManagingOfficerCorporate[];
    trusts?: Trust[];
}

export interface OverseasEntityResource {
    presenter?: Presenter;
    entity?: Entity;
    due_diligence?: DueDiligenceResource;
    overseas_entity_due_diligence?: OverseasEntityDueDiligenceResource;
    beneficial_owners_statement?: BeneficialOwnersStatementType;
    beneficial_owners_individual?: BeneficialOwnerIndividualResource[];
    beneficial_owners_corporate?: BeneficialOwnerCorporateResource[];
    beneficial_owners_government_or_public_authority?: BeneficialOwnerGovernmentOrPublicAuthorityResource[];
    managing_officers_individual?: ManagingOfficerIndividualResource[];
    managing_officers_corporate?: ManagingOfficerCorporateResource[];
    trusts?: TrustResource[];
}
export interface OverseasEntityCreated {
    id: string
}

/**
 * Overseas Entities interface used on OverseasEntity object
 */
export interface Presenter {
    full_name?: string
    email?: string
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
    is_on_register_in_country_formed_in?: yesNoResponse;
}

export interface DueDiligence {
    identity_date?: InputDate;
    name?: string;
    identity_address?: Address;
    email?: string;
    supervisory_name?: string;
    aml_number?: string;
    agent_code?: string;
    partner_name?: string;
    diligence?: string;
}

export interface DueDiligenceResource {
    identity_date?: string;
    name?: string;
    identity_address?: Address;
    email?: string;
    supervisory_name?: string;
    aml_number?: string;
    agent_code?: string;
    partner_name?: string;
    diligence?: string;
}

export interface OverseasEntityDueDiligence {
    identity_date?: InputDate;
    name?: string
    identity_address?: Address;
    email?: string
    supervisory_name?: string
    aml_number?: string
    partner_name?: string
}

export interface OverseasEntityDueDiligenceResource {
    identity_date?: string;
    name?: string
    identity_address?: Address;
    email?: string
    supervisory_name?: string
    aml_number?: string
    partner_name?: string
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
    public_register_name?: string
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
    public_register_name?: string
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
    is_service_address_same_as_principal_address?: yesNoResponse
    service_address?: Address
    legal_form?: string
    law_governed?: string
    start_date?: InputDate
    beneficial_owner_nature_of_control_types?: NatureOfControlType[];
    non_legal_firm_members_nature_of_control_types?: NatureOfControlType[];
}
export interface BeneficialOwnerGovernmentOrPublicAuthorityResource {
    name?: string
    principal_address?: Address
    is_service_address_same_as_principal_address?: yesNoResponse
    service_address?: Address
    legal_form?: string
    law_governed?: string
    start_date?: string
    beneficial_owner_nature_of_control_types?: NatureOfControlType[];
    non_legal_firm_members_nature_of_control_types?: NatureOfControlType[];
}

export interface ManagingOfficerIndividual {
    first_name?: string
    last_name?: string
    has_former_names?: yesNoResponse
    former_names?: string
    date_of_birth?: InputDate
    nationality?: string
    usual_residential_address?: Address
    service_address?: Address
    is_service_address_same_as_usual_residential_address?: yesNoResponse
    occupation?: string
    role_and_responsibilities?: string
}

export interface ManagingOfficerIndividualResource {
    first_name?: string
    last_name?: string
    has_former_names?: yesNoResponse
    former_names?: string
    date_of_birth?: string
    nationality?: string
    usual_residential_address?: Address
    service_address?: Address
    is_service_address_same_as_usual_residential_address?: yesNoResponse
    occupation?: string
    role_and_responsibilities?: string
}

export interface ManagingOfficerCorporate {
    name?: string
    principal_address?: Address
    service_address?: Address
    is_service_address_same_as_principal_address?: yesNoResponse
    legal_form?: string
    law_governed?: string
    is_on_register_in_country_formed_in?: yesNoResponse
    public_register_name?: string
    registration_number?: string
    role_and_responsibilities?: string
}

export interface ManagingOfficerCorporateResource extends ManagingOfficerCorporate { }

export interface Trust{
    trust_id: string;
    trust_name: string;
    creation_date_day: string;
    creation_date_month: string;
    creation_date_year: string;
    unable_to_obtain_all_trust_info: string;
    INDIVIDUALS?: TrustIndividual[];
    HISTORICAL_BO?: TrustHistoricalBeneficialOwner[];
    CORPORATES?: TrustCorporate[];
}

export interface TrustResource {
    trust_id: string;
    trust_name: string;
    creation_date: string;
    unable_to_obtain_all_trust_info: boolean;
    INDIVIDUAL?: TrustIndividualResource[];
    HISTORICAL_BO?: TrustHistoricalBeneficialOwnerResource[];
    CORPORATE?: TrustCorporateResource[];
}

export interface TrustIndividual {
    type?: string;
    forename?: string;
    other_forenames?: string;
    surname?: string;
    dob_day?: string;
    dob_month?: string;
    dob_year?: string;
    nationality?: string;
    sa_address_line1?: string;
    sa_address_line2?: string;
    sa_address_care_of?: string;
    sa_address_country?: string;
    sa_address_locality?: string;
    sa_address_po_box?: string;
    sa_address_postal_code?: string;
    sa_address_premises?: string;
    sa_address_region?: string;
    ura_address_line1?: string;
    ura_address_line2?: string;
    ura_address_care_of?: string;
    ura_address_country?: string;
    ura_address_locality?: string;
    ura_address_po_box?: string;
    ura_address_postal_code?: string;
    ura_address_premises?: string;
    ura_address_region?: string;
    date_became_interested_person_day?: string;
    date_became_interested_person_month?: string;
    date_became_interested_person_year?: string;
  }

export interface TrustIndividualResource {
    type?: string;
    forename?: string;
    other_forenames?: string;
    surname?: string;
    date_of_birth?: string;
    nationality?: string;
    sa_address_line1?: string;
    sa_address_line2?: string;
    sa_address_care_of?: string;
    sa_address_country?: string;
    sa_address_locality?: string;
    sa_address_po_box?: string;
    sa_address_postal_code?: string;
    sa_address_premises?: string;
    sa_address_region?: string;
    ura_address_line1?: string;
    ura_address_line2?: string;
    ura_address_care_of?: string;
    ura_address_country?: string;
    ura_address_locality?: string;
    ura_address_po_box?: string;
    ura_address_postal_code?: string;
    ura_address_premises?: string;
    ura_address_region?: string;
    date_became_interested_person?: string;
}

export interface TrustHistoricalBeneficialOwner {
    forename?: string;
    other_forenames?: string;
    surname?: string;
    notified_date_day?: string;
    notified_date_month?: string;
    notified_date_year?: string;
    ceased_date_day?: string;
    ceased_date_month?: string;
    ceased_date_year?: string;
}

export interface TrustHistoricalBeneficialOwnerResource {
    forename?: string;
    other_forenames?: string;
    surname?: string;
    notified_date?: string;
    ceased_date?: string;
}

export interface TrustCorporate {
    type?: string;
    name?: string;
    date_became_interested_person_day?: string;
    date_became_interested_person_month?: string;
    date_became_interested_person_year?: string;
    ro_address_line1?: string;
    ro_address_line2?: string;
    ro_address_care_of?: string;
    ro_address_country?: string;
    ro_address_locality?: string;
    ro_address_po_box?: string;
    ro_address_postal_code?: string;
    ro_address_premises?: string;
    ro_address_region?: string;
    sa_address_line1?: string;
    sa_address_line2?: string;
    sa_address_care_of?: string;
    sa_address_country?: string;
    sa_address_locality?: string;
    sa_address_po_box?: string;
    sa_address_postal_code?: string;
    sa_address_premises?: string;
    sa_address_region?: string;
    identification_country_registration?: string;
    identification_legal_authority?: string;
    identification_legal_form?: string;
    identification_place_registered?: string;
    identification_registration_number?: string;
}

export interface TrustCorporateResource {
    type?: string;
    name?: string;
    date_became_interested_person?: string;
    ro_address_line1?: string;
    ro_address_line2?: string;
    ro_address_care_of?: string;
    ro_address_country?: string;
    ro_address_locality?: string;
    ro_address_po_box?: string;
    ro_address_postal_code?: string;
    ro_address_premises?: string;
    ro_address_region?: string;
    sa_address_line1?: string;
    sa_address_line2?: string;
    sa_address_care_of?: string;
    sa_address_country?: string;
    sa_address_locality?: string;
    sa_address_po_box?: string;
    sa_address_postal_code?: string;
    sa_address_premises?: string;
    sa_address_region?: string;
    identification_country_registration?: string;
    identification_legal_authority?: string;
    identification_legal_form?: string;
    identification_place_registered?: string;
    identification_registration_number?: string;
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

export enum BeneficialOwnersStatementType {
    ALL_IDENTIFIED_ALL_DETAILS = "ALL_IDENTIFIED_ALL_DETAILS",
    SOME_IDENTIFIED_ALL_DETAILS = "SOME_IDENTIFIED_ALL_DETAILS",
    NONE_IDENTIFIED = "NONE_IDENTIFIED"
}

export enum NatureOfControlType {
    OVER_25_PERCENT_OF_SHARES = "OVER_25_PERCENT_OF_SHARES",
    OVER_25_PERCENT_OF_VOTING_RIGHTS = "OVER_25_PERCENT_OF_VOTING_RIGHTS",
    APPOINT_OR_REMOVE_MAJORITY_BOARD_DIRECTORS = "APPOINT_OR_REMOVE_MAJORITY_BOARD_DIRECTORS",
    SIGNIFICANT_INFLUENCE_OR_CONTROL = "SIGNIFICANT_INFLUENCE_OR_CONTROL"
}
