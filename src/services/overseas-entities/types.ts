/**
 * Overseas Entity interface used within this SDK
 */

export interface OverseasEntity {
    presenter?: Presenter;
    entity?: Entity;
    beneficialOwnerIndividual?: BeneficialOwnerIndividual[];
    beneficialOwnerOther?: BeneficialOwnerOther[];
    beneficialOwnerGov?: BeneficialOwnerGov[];
    managingOfficerIndividual?: ManagingOfficerIndividual[];
    managingOfficerCorporate?: ManagingOfficerCorporate[];
}

export interface OverseasEntityResource {
    presenter?: PresenterResource;
    entity?: EntityResource;
}

export interface OverseasEntityCreated {
    id: string
}

/**
 * Overseas Entities interface used on OverseasEntity object
 */

export interface Presenter {
    fullName?: string
    phoneNumber?: string
    role?: presenterRole
    roleTitle?: string
    registrationNumber?: number
}

export interface PresenterResource {
    full_name?: string
    phone_number?: string
    role?: presenterRole
    role_title?: string
    anti_money_laundering_registration_number?: number
}

export interface Entity {
    overseasEntityName?: string
    incorporationCountry?: string
    principalAddress?: Address
    isAddressSameAsPrincipalAddress?: yesNoResponse
    serviceAddress?: Address
    email?: string
    legalForm?: string
    governedLaw?: string
    publicRegister?: string
    registrationNumber?: number
}

export interface EntityResource {
    name?: string
    incorporation_country?: string
    principal_address?: Address
    is_service_address_same_as_principal_address?: yesNoResponse
    service_address?: Address
    email?: string
    legal_form?: string
    law_governed?: string
    public_register_entity_registered_on?: string
    registration_number?: string
}

export interface BeneficialOwnerIndividual {
    fullName?: string
    dateOfBirth?: InputDate
    ownerNationality?: string
    usualResidentialAddress?: Address
    isAddressSameAsUsusalResidentialAddress?: yesNoResponse
    serviceAddress?: Address
    startDate?: InputDate
    natureOfControl?: natureOfControl
    trustee?: yesNoResponse
    onSanctionsList?: yesNoResponse
}

export interface BeneficialOwnerOther {
    corporationName?: string
    principalAddress?: Address
    isSameAddress?: yesNoResponse
    serviceAddress?: Address
    lawGoverned?: string
    startDate?: InputDate
    natureOfControl?: natureOfControl
    statementCondition?: statementCondition
    isSanctioned?: yesNoResponse
}

export interface BeneficialOwnerGov {
    corporationName?: string
    principalAddress?: Address
    serviceAddress?: Address
    isServiceAddressSameAsPrincipalAddress?: yesNoResponse
    corporationLawGoverned?: string
    corporationStartDate?: InputDate
    corporationNatureOfControl?: corpNatureOfControl
    isOnSanctionsList?: yesNoResponse
}

export interface ManagingOfficerIndividual {
    fullName?: string
    hasAFormerName?: yesNoResponse
    formerName?: string
    dateOfBirth?: InputDate
    nationality?: string
    usualResidentialAddress?: Address
    businessOccupation?: string
    roleAndResponsibilities?: string
}

export interface ManagingOfficerCorporate {
    officerName?: string,
    usualResidentialAddress?: Address,
    serviceAddress?: Address,
    isSameAddress?: yesNoResponse,
    whereOfficerRegistered?: string,
    legalForm?: string,
    legalAuthority?: string,
    registrationNumber?: string,
    startDate?: InputDate
}

/**
 * Shared Data Type
 */

 interface Address {
    propertyNameNumber?: string
    addressLine1?: string
    addressLine2?: string
    town?: string
    county?: string
    country?: string
    postcode?: string
}

interface AddressResource {
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

interface InputDate {
    day: number
    month: number
    year: number
}

enum natureOfControl {
    over25upTo50Percent = "25",
    over50under75Percent = "50",
    atLeast75Percent = "75"
}

enum corpNatureOfControl {
    shares = "shares",
    voting = "voting",
    appoint = "appoint",
    influence = "influence"
}

enum statementCondition {
    statement1 = "statement1",
    statement2 = "statement2"
}

enum presenterRole {
    administrator = "administrator",
    agent = "agent",
    solicitor = "solicitor",
    beneficialOwner = "beneficialOwner",
    beneficial_owner = "beneficial_owner",
    other = "other"
}
