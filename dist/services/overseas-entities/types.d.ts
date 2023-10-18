/**
 * Overseas Entity interface used within this SDK
 */
export interface OverseasEntity {
    entity_name?: string;
    entity_number?: string;
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
    update?: Update;
}
export interface OverseasEntityResource {
    entity_name?: EntityName;
    entity_number?: string;
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
    update?: UpdateResource;
}
export interface OverseasEntityExtraDetails {
    email_address: string;
}
export interface OverseasEntityCreated {
    id: string;
}
export interface HttpStatusCode {
    httpStatusCode: number;
}
/**
 * Overseas Entities interface used on OverseasEntity object
 */
export interface EntityName {
    name?: string;
}
export interface Presenter {
    full_name?: string;
    email?: string;
}
export interface Entity {
    incorporation_country?: string;
    principal_address?: Address;
    is_service_address_same_as_principal_address?: yesNoResponse;
    service_address?: Address;
    email?: string;
    legal_form?: string;
    law_governed?: string;
    public_register_name?: string;
    registration_number?: string;
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
    name?: string;
    identity_address?: Address;
    email?: string;
    supervisory_name?: string;
    aml_number?: string;
    partner_name?: string;
}
export interface OverseasEntityDueDiligenceResource {
    identity_date?: string;
    name?: string;
    identity_address?: Address;
    email?: string;
    supervisory_name?: string;
    aml_number?: string;
    partner_name?: string;
}
export interface BeneficialOwnerIndividual {
    ch_reference?: string;
    first_name?: string;
    last_name?: string;
    date_of_birth?: InputDate;
    nationality?: string;
    second_nationality?: string;
    usual_residential_address?: Address;
    service_address?: Address;
    is_service_address_same_as_usual_residential_address?: yesNoResponse;
    start_date?: InputDate;
    ceased_date?: InputDate;
    beneficial_owner_nature_of_control_types?: NatureOfControlType[];
    trustees_nature_of_control_types?: NatureOfControlType[];
    non_legal_firm_members_nature_of_control_types?: NatureOfControlType[];
    is_on_sanctions_list?: yesNoResponse;
}
export interface BeneficialOwnerIndividualResource {
    ch_reference?: string;
    first_name?: string;
    last_name?: string;
    date_of_birth?: string;
    nationality?: string;
    second_nationality?: string;
    usual_residential_address?: Address;
    service_address?: Address;
    is_service_address_same_as_usual_residential_address?: yesNoResponse;
    start_date?: string;
    ceased_date?: string;
    beneficial_owner_nature_of_control_types?: NatureOfControlType[];
    trustees_nature_of_control_types?: NatureOfControlType[];
    non_legal_firm_members_nature_of_control_types?: NatureOfControlType[];
    is_on_sanctions_list?: yesNoResponse;
}
export interface BeneficialOwnerCorporate {
    ch_reference?: string;
    name?: string;
    principal_address?: Address;
    service_address?: Address;
    is_service_address_same_as_principal_address?: yesNoResponse;
    legal_form?: string;
    law_governed?: string;
    is_on_register_in_country_formed_in?: yesNoResponse;
    public_register_name?: string;
    registration_number?: string;
    start_date?: InputDate;
    ceased_date?: InputDate;
    beneficial_owner_nature_of_control_types?: NatureOfControlType[];
    trustees_nature_of_control_types?: NatureOfControlType[];
    non_legal_firm_members_nature_of_control_types?: NatureOfControlType[];
    is_on_sanctions_list?: yesNoResponse;
}
export interface BeneficialOwnerCorporateResource {
    ch_reference?: string;
    name?: string;
    principal_address?: Address;
    service_address?: Address;
    is_service_address_same_as_principal_address?: yesNoResponse;
    legal_form?: string;
    law_governed?: string;
    is_on_register_in_country_formed_in?: yesNoResponse;
    public_register_name?: string;
    registration_number?: string;
    start_date?: string;
    ceased_date?: string;
    beneficial_owner_nature_of_control_types?: NatureOfControlType[];
    trustees_nature_of_control_types?: NatureOfControlType[];
    non_legal_firm_members_nature_of_control_types?: NatureOfControlType[];
    is_on_sanctions_list?: yesNoResponse;
}
export interface BeneficialOwnerGovernmentOrPublicAuthority {
    ch_reference?: string;
    name?: string;
    principal_address?: Address;
    is_service_address_same_as_principal_address?: yesNoResponse;
    service_address?: Address;
    legal_form?: string;
    law_governed?: string;
    start_date?: InputDate;
    ceased_date?: InputDate;
    beneficial_owner_nature_of_control_types?: NatureOfControlType[];
    non_legal_firm_members_nature_of_control_types?: NatureOfControlType[];
}
export interface BeneficialOwnerGovernmentOrPublicAuthorityResource {
    ch_reference?: string;
    name?: string;
    principal_address?: Address;
    is_service_address_same_as_principal_address?: yesNoResponse;
    service_address?: Address;
    legal_form?: string;
    law_governed?: string;
    start_date?: string;
    ceased_date?: string;
    beneficial_owner_nature_of_control_types?: NatureOfControlType[];
    non_legal_firm_members_nature_of_control_types?: NatureOfControlType[];
}
export interface BeneficialOwnerPrivateDataResource {
    hashed_id?: string;
    date_became_registrable?: string;
    date_of_birth?: string;
    is_service_address_same_as_usual_address?: string;
    usual_residential_address?: PrivateAddressResource;
    principal_address?: PrivateAddressResource;
}
export interface BeneficialOwnerPrivateData {
    hashedId?: string;
    dateBecameRegistrable?: string;
    dateOfBirth?: string;
    isServiceAddressSameAsUsualAddress?: string;
    usualResidentialAddress?: PrivateAddress;
    principalAddress?: PrivateAddress;
}
export interface ManagingOfficerIndividual {
    ch_reference?: string;
    first_name?: string;
    last_name?: string;
    has_former_names?: yesNoResponse;
    former_names?: string;
    date_of_birth?: InputDate;
    nationality?: string;
    second_nationality?: string;
    usual_residential_address?: Address;
    service_address?: Address;
    is_service_address_same_as_usual_residential_address?: yesNoResponse;
    occupation?: string;
    role_and_responsibilities?: string;
    start_date?: InputDate;
    resigned_on?: InputDate;
}
export interface ManagingOfficerIndividualResource {
    ch_reference?: string;
    first_name?: string;
    last_name?: string;
    has_former_names?: yesNoResponse;
    former_names?: string;
    date_of_birth?: string;
    nationality?: string;
    second_nationality?: string;
    usual_residential_address?: Address;
    service_address?: Address;
    is_service_address_same_as_usual_residential_address?: yesNoResponse;
    occupation?: string;
    role_and_responsibilities?: string;
    start_date?: string;
    resigned_on?: string;
}
export interface ManagingOfficerCorporate {
    ch_reference?: string;
    name?: string;
    principal_address?: Address;
    service_address?: Address;
    is_service_address_same_as_principal_address?: yesNoResponse;
    legal_form?: string;
    law_governed?: string;
    is_on_register_in_country_formed_in?: yesNoResponse;
    public_register_name?: string;
    registration_number?: string;
    role_and_responsibilities?: string;
    start_date?: InputDate;
    resigned_on?: InputDate;
}
export interface Update {
    date_of_creation?: InputDate;
    filing_date?: InputDate;
    bo_mo_data_fetched?: boolean;
    registrable_beneficial_owner?: yesNoResponse;
    no_change?: yesNoResponse;
    review_beneficial_owners_individual?: BeneficialOwnerIndividual[];
    review_beneficial_owners_corporate?: BeneficialOwnerCorporate[];
    review_beneficial_owners_government_or_public_authority?: BeneficialOwnerGovernmentOrPublicAuthority[];
    review_managing_officers_individual?: ManagingOfficerIndividual[];
    review_managing_officers_corporate?: ManagingOfficerCorporate[];
    trust_data_fetched?: boolean;
    review_trusts?: TrustToReview[];
}
export interface UpdateResource {
    date_of_creation?: string;
    filing_date?: string;
    bo_mo_data_fetched?: boolean;
    registrable_beneficial_owner?: yesNoResponse;
    no_change?: yesNoResponse;
    review_beneficial_owners_individual?: BeneficialOwnerIndividualResource[];
    review_beneficial_owners_corporate?: BeneficialOwnerCorporateResource[];
    review_beneficial_owners_government_or_public_authority?: BeneficialOwnerGovernmentOrPublicAuthorityResource[];
    review_managing_officers_individual?: ManagingOfficerIndividualResource[];
    review_managing_officers_corporate?: ManagingOfficerCorporateResource[];
    trust_data_fetched?: boolean;
    review_trusts?: TrustToReviewResource[];
}
export interface ManagingOfficerCorporateResource {
    ch_reference?: string;
    name?: string;
    principal_address?: Address;
    service_address?: Address;
    is_service_address_same_as_principal_address?: yesNoResponse;
    legal_form?: string;
    law_governed?: string;
    is_on_register_in_country_formed_in?: yesNoResponse;
    public_register_name?: string;
    registration_number?: string;
    role_and_responsibilities?: string;
    start_date?: string;
    resigned_on?: string;
}
export interface ManagingOfficerPrivateDataResource {
    residential_address?: PrivateAddressResource;
    principal_address?: PrivateAddressResource;
    date_of_birth?: string;
    contact_name_full?: string;
    contact_email_address?: string;
    hashed_id?: string;
}
export interface ManagingOfficerPrivateData {
    residentialAddress?: PrivateAddress;
    principalAddress?: PrivateAddress;
    dateOfBirth?: string;
    contactNameFull?: string;
    contactEmailAddress?: string;
    hashedId?: string;
}
export interface PrivateAddressResource {
    address_line_1?: string;
    address_line_2?: string;
    care_of?: string;
    country?: string;
    locality?: string;
    po_box?: string;
    postal_code?: string;
    premises?: string;
    region?: string;
}
export interface PrivateAddress {
    addressLine1?: string;
    addressLine2?: string;
    careOf?: string;
    country?: string;
    locality?: string;
    poBox?: string;
    postalCode?: string;
    premises?: string;
    region?: string;
}
export interface Trust {
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
export interface TrustReviewStatus {
    in_review: boolean;
    reviewed_trust_details: boolean;
    reviewed_former_bos: boolean;
    reviewed_individuals: boolean;
    reviewed_legal_entities: boolean;
}
export interface TrustToReview extends Trust {
    review_status?: TrustReviewStatus;
}
export interface TrustToReviewResource extends TrustResource {
    review_status?: TrustReviewStatus;
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
    second_nationality?: string;
    sa_address_line_1?: string;
    sa_address_line_2?: string;
    sa_address_care_of?: string;
    sa_address_country?: string;
    sa_address_locality?: string;
    sa_address_po_box?: string;
    sa_address_postal_code?: string;
    sa_address_premises?: string;
    sa_address_region?: string;
    is_service_address_same_as_usual_residential_address?: yesNoResponse;
    ura_address_line_1?: string;
    ura_address_line_2?: string;
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
    second_nationality?: string;
    sa_address_line_1?: string;
    sa_address_line_2?: string;
    sa_address_care_of?: string;
    sa_address_country?: string;
    sa_address_locality?: string;
    sa_address_po_box?: string;
    sa_address_postal_code?: string;
    sa_address_premises?: string;
    sa_address_region?: string;
    is_service_address_same_as_usual_residential_address?: yesNoResponse;
    ura_address_line_1?: string;
    ura_address_line_2?: string;
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
    corporate_indicator?: boolean;
    corporate_name?: string;
}
export interface TrustHistoricalBeneficialOwnerResource {
    forename?: string;
    other_forenames?: string;
    surname?: string;
    notified_date?: string;
    ceased_date?: string;
    corporate_indicator?: boolean;
    corporate_name?: string;
}
export interface TrustCorporate {
    type?: string;
    name?: string;
    date_became_interested_person_day?: string;
    date_became_interested_person_month?: string;
    date_became_interested_person_year?: string;
    ro_address_line_1?: string;
    ro_address_line_2?: string;
    ro_address_care_of?: string;
    ro_address_country?: string;
    ro_address_locality?: string;
    ro_address_po_box?: string;
    ro_address_postal_code?: string;
    ro_address_premises?: string;
    ro_address_region?: string;
    sa_address_line_1?: string;
    sa_address_line_2?: string;
    sa_address_care_of?: string;
    sa_address_country?: string;
    sa_address_locality?: string;
    sa_address_po_box?: string;
    sa_address_postal_code?: string;
    sa_address_premises?: string;
    sa_address_region?: string;
    is_service_address_same_as_principal_address?: yesNoResponse;
    identification_country_registration?: string;
    identification_legal_authority?: string;
    identification_legal_form?: string;
    identification_place_registered?: string;
    identification_registration_number?: string;
    is_on_register_in_country_formed_in: yesNoResponse;
}
export interface TrustCorporateResource {
    type?: string;
    name?: string;
    date_became_interested_person?: string;
    ro_address_line_1?: string;
    ro_address_line_2?: string;
    ro_address_care_of?: string;
    ro_address_country?: string;
    ro_address_locality?: string;
    ro_address_po_box?: string;
    ro_address_postal_code?: string;
    ro_address_premises?: string;
    ro_address_region?: string;
    sa_address_line_1?: string;
    sa_address_line_2?: string;
    sa_address_care_of?: string;
    sa_address_country?: string;
    sa_address_locality?: string;
    sa_address_po_box?: string;
    sa_address_postal_code?: string;
    sa_address_premises?: string;
    sa_address_region?: string;
    is_service_address_same_as_principal_address?: yesNoResponse;
    identification_country_registration?: string;
    identification_legal_authority?: string;
    identification_legal_form?: string;
    identification_place_registered?: string;
    identification_registration_number?: string;
    is_on_register_in_country_formed_in: yesNoResponse;
}
/**
 * Trust data loaded from the API
 */
export interface TrustData {
    hashedTrustId: string;
    trustName: string;
    creationDate: string;
    ceasedDate?: string;
    unableToObtainAllTrustInfoIndicator: boolean;
}
export interface TrustDataResource {
    hashed_trust_id: string;
    trust_name: string;
    creation_date: string;
    ceased_date?: string;
    unable_to_obtain_all_trust_info_indicator: boolean;
}
export interface TrustLinkData {
    hashedTrustId: string;
    hashedCorporateBodyAppointmentId: string;
}
export interface TrustLinkDataResource {
    hashed_trust_id: string;
    hashed_corporate_body_appointment_id: string;
}
export interface IndividualTrusteeData {
    hashedTrusteeId: string;
    trusteeForename1: string;
    trusteeForename2?: string;
    trusteeSurname: string;
    dateOfBirth?: string;
    nationality?: string;
    corporateIndicator: string;
    trusteeTypeId: string;
    appointmentDate: string;
    ceasedDate?: string;
    serviceAddress?: PrivateAddress;
    usualResidentialAddress?: PrivateAddress;
}
export interface IndividualTrusteeDataResource {
    hashed_trustee_id: string;
    trustee_forename_1: string;
    trustee_forename_2?: string;
    trustee_surname: string;
    date_of_birth?: string;
    nationality?: string;
    corporate_indicator: string;
    trustee_type_id: string;
    appointment_date: string;
    ceased_date?: string;
    service_address?: PrivateAddressResource;
    usual_residential_address?: PrivateAddressResource;
}
export interface CorporateTrusteeData {
    hashedTrusteeId: string;
    trusteeName: string;
    registerLocation?: string;
    registrationNumber?: string;
    lawGoverned?: string;
    legalForm?: string;
    country?: string;
    onRegisterInCountryFormed?: string;
    corporateIndicator: string;
    trusteeTypeId: string;
    appointmentDate: string;
    ceasedDate?: string;
    serviceAddress?: PrivateAddress;
    registeredOfficeAddress?: PrivateAddress;
}
export interface CorporateTrusteeDataResource {
    hashed_trustee_id: string;
    trustee_name: string;
    register_location?: string;
    registration_number?: string;
    law_governed?: string;
    legal_form?: string;
    country?: string;
    on_register_in_country_formed?: string;
    corporate_indicator: string;
    trustee_type_id: string;
    appointment_date: string;
    ceased_date?: string;
    service_address?: PrivateAddressResource;
    registered_office_address?: PrivateAddressResource;
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
export declare enum BeneficialOwnersStatementType {
    ALL_IDENTIFIED_ALL_DETAILS = "ALL_IDENTIFIED_ALL_DETAILS",
    SOME_IDENTIFIED_ALL_DETAILS = "SOME_IDENTIFIED_ALL_DETAILS",
    NONE_IDENTIFIED = "NONE_IDENTIFIED"
}
export declare enum NatureOfControlType {
    OVER_25_PERCENT_OF_SHARES = "OVER_25_PERCENT_OF_SHARES",
    OVER_25_PERCENT_OF_VOTING_RIGHTS = "OVER_25_PERCENT_OF_VOTING_RIGHTS",
    APPOINT_OR_REMOVE_MAJORITY_BOARD_DIRECTORS = "APPOINT_OR_REMOVE_MAJORITY_BOARD_DIRECTORS",
    SIGNIFICANT_INFLUENCE_OR_CONTROL = "SIGNIFICANT_INFLUENCE_OR_CONTROL"
}
