/**
 * Overseas Entity interface used within this SDK
 */

export interface OverseasEntity {
    presenter?: Presenter;
    entity?: Entity;
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
    registrationNumber?: string
}

export interface EntityResource {
    name?: string
    incorporation_country?: string
    principal_address?: AddressResource
    is_service_address_same_as_principal_address?: yesNoResponse
    service_address?: AddressResource
    email?: string
    legal_form?: string
    law_governed?: string
    public_register_name?: string
    registration_number?: string
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

enum presenterRole {
    administrator = "administrator",
    agent = "agent",
    solicitor = "solicitor",
    beneficialOwner = "beneficialOwner",
    beneficial_owner = "beneficial_owner",
    other = "other"
}
