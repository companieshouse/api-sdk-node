/**
 * Limited Partnership interface types used within this SDK.
 */

/**
 * The data model used by the web & API for an Incorporation journey.
 * It could be a registration or a transition, determined by the 'kind'.
 */
export interface Incorporation {
    data?: {
        kind: IncorporationKind;
    };
}

/**
 * The data model used by the web & API for a Limited Partnership.
 */
export interface LimitedPartnership {
    data?: {
        partnership_name?: string;
        name_ending?: NameEndingType;
        partnership_type?: PartnershipType;
        email?: string;
        jurisdiction?: Jurisdiction;
        registered_office_address?: Address;
        principal_place_of_business_address?: Address;
        term?: Term;
        redesignate_to_pflp_apply?: boolean;
        redesignate_to_pflp_confirm?: boolean;
        sic_codes?: string[];
        lawful_purpose_statement_checked?: boolean;
        has_person_with_significant_control?: boolean;
        partnership_number?: string;
        date_of_update?: string;
        kind?: string;
    };
}

/**
 * The common data model used by the web and API for a Partner (General Partner or Limited Partner).
 */
type Partner = {
    appointment_id?: string;
    completed?: boolean;
    date_effective_from?: string;
    date_of_birth?: string;
    forename?: string;
    former_names?: string;
    governing_law?: string;
    kind?: string;
    legal_entity_name?: string;
    legal_entity_register_name?: string;
    legal_entity_registration_location?: string;
    legal_form?: string;
    nationality1?: string;
    nationality2?: string;
    principal_office_address?: Address;
    registered_company_number?: string;
    resignation_date?: string;
    surname?: string;
    usual_residential_address?: Address;
    cease_date?: string;
    remove_confirmation_checked?: boolean;
    update_usual_residential_address_required?: boolean;
    update_service_address_required?: boolean;
    date_of_update?: string;
};

/**
 * The data model used by the web and API for a Limited Partner.
 */
export interface LimitedPartner {
    id?: string;
    data?: Partner & {
        contribution_currency_type?: string;
        contribution_currency_value?: string;
        contribution_sub_types?: string[];
    };
}

/**
 * The data model used by the web and API for a General Partner.
 */
export interface GeneralPartner {
    id?: string;
    data?: Partner & {
        not_disqualified_statement_checked?: boolean;
        service_address?: Address;
    };
}

/**
 * The data model used by the web and API for a Person with Significant Control (PSC).
 */
export interface PersonWithSignificantControl {
    id?: string;
    data?: {
        kind?: string;
        appointment_id?: string;
        country?: string;
        date_effective_from?: string;
        resignation_date?: string;
        natures_of_control?: NaturesOfControl[];
        service_address?: Address;
        forename?: string;
        former_names?: string;
        surname?: string;
        date_of_birth?: string;
        nationality1?: string;
        nationality2?: string;
        usual_residential_address?: Address;
        legal_entity_name?: string;
        legal_form?: string;
        governing_law?: string;
        legal_entity_register_name?: string;
        legal_entity_registration_location?: string;
        registered_company_number?: string;
        principal_office_address?: Address;
        type?: PersonWithSignificantControlType;
        completed?: boolean;
    }
}

export enum NaturesOfControl {
    INDIVIDUAL = "Nature of control for this individual",
    INDIVIDUAL_FIRM_CONTROL = "Nature of control by a firm over which this individual has significant control",
    INDIVIDUAL_TRUST_CONTROL = "Nature of control by a trust over which this individual has significant control",
    RLE = "Nature of control for this relevant legal entity (RLE)",
    RLE_FIRM_CONTROL = "Nature of control by a firm over which the RLE has significant control",
    RLE_TRUST_CONTROL = "Nature of control by a trust over which the RLE has significant control",
    ORP = "Nature of control for this other registrable person (ORP)",
    ORP_FIRM_CONTROL = "Nature of control by a firm over which the ORP has significant control",
    ORP_TRUST_CONTROL = "Nature of control by a trust over which the ORP has significant control",
}

export enum PersonWithSignificantControlType {
    INDIVIDUAL_PERSON = "INDIVIDUAL_PERSON",
    RELEVANT_LEGAL_ENTITY = "RELEVANT_LEGAL_ENTITY",
    OTHER_REGISTRABLE_PERSON = "OTHER_REGISTRABLE_PERSON"
}

/**
 * The data structure returned by the API when a new Limited Partnership resource has
 * successfully been created.
 */
export interface LimitedPartnershipResourceCreated {
    id: string;
}

export enum IncorporationKind {
    REGISTRATION = "limited-partnership-registration",
    TRANSITION = "limited-partnership-transition",
    POST_TRANSITION = "limited-partnership-post-transition",
}

export enum PartnerKind {
    ADD_GENERAL_PARTNER_PERSON = "limited-partnership#add-general-partner-person",
    ADD_GENERAL_PARTNER_LEGAL_ENTITY = "limited-partnership#add-general-partner-legal-entity",
    ADD_LIMITED_PARTNER_PERSON = "limited-partnership#add-limited-partner-person",
    ADD_LIMITED_PARTNER_LEGAL_ENTITY = "limited-partnership#add-limited-partner-legal-entity",
    REMOVE_GENERAL_PARTNER_PERSON = "limited-partnership#remove-general-partner-person",
    REMOVE_GENERAL_PARTNER_LEGAL_ENTITY = "limited-partnership#remove-general-partner-legal-entity",
    REMOVE_LIMITED_PARTNER_PERSON = "limited-partnership#remove-limited-partner-person",
    REMOVE_LIMITED_PARTNER_LEGAL_ENTITY = "limited-partnership#remove-limited-partner-legal-entity",
    UPDATE_GENERAL_PARTNER_PERSON = "limited-partnership#update-general-partner-person",
    UPDATE_GENERAL_PARTNER_LEGAL_ENTITY = "limited-partnership#update-general-partner-legal-entity",
    UPDATE_LIMITED_PARTNER_PERSON = "limited-partnership#update-limited-partner-person",
    UPDATE_LIMITED_PARTNER_LEGAL_ENTITY = "limited-partnership#update-limited-partner-legal-entity",
}

export enum PartnershipKind {
    UPDATE_PARTNERSHIP_REGISTERED_OFFICE_ADDRESS = "limited-partnership#update-partnership-registered-office-address",
    UPDATE_PARTNERSHIP_NAME = "limited-partnership#update-partnership-name",
    UPDATE_PARTNERSHIP_TERM = "limited-partnership#update-partnership-term",
    UPDATE_PARTNERSHIP_PRINCIPAL_PLACE_OF_BUSINESS_ADDRESS = "limited-partnership#update-partnership-principal-place-of-business-address",
    UPDATE_PARTNERSHIP_REDESIGNATE_TO_PFLP = "limited-partnership#update-partnership-redesignate-to-pflp",
}

export enum NameEndingType {
    LIMITED_PARTNERSHIP = "Limited Partnership",
    LP = "LP",
    L_DOT_P_DOT = "L.P.",
    PARTNERIAETH_CYFYNGEDIG = "Partneriaeth Cyfyngedig",
    PC = "PC",
    P_DOT_C_DOT = "P.C.",
}

export enum PartnershipType {
    LP = "LP",
    PFLP = "PFLP",
    SLP = "SLP",
    SPFLP = "SPFLP",
}

export enum Jurisdiction {
    ENGLAND_AND_WALES = "england-wales",
    NORTHERN_IRELAND = "northern-ireland",
    SCOTLAND = "scotland",
}

export interface LimitedPartnershipIncorporation {
    etag: string;
    kind: string;
    sub_resources?: {
        general_partners: any[];
        limited_partners: any[];
        partnership: LimitedPartnership;
    };
}

export type Address = {
    address_line_1: string;
    address_line_2?: string;
    country: string;
    locality: string;
    postal_code: string;
    premises: string;
    region?: string;
};

export enum Term {
    BY_AGREEMENT = "BY_AGREEMENT",
    UNTIL_DISSOLUTION = "UNTIL_DISSOLUTION",
    NONE = "NONE",
}
