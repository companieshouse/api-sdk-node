/**
 * Limited Partnership interface types used within this SDK.
 */

/**
 * The data model used by the web and API for a Limited Partnership.
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
    };
}

export interface GeneralPartner {
    data?: {
        date_effective_from?: string,
        date_of_birth?: string,
        etag?: string,
        forename?: string,
        former_names?: string,
        governing_law?: string,
        kind?: string,
        legal_entity_name?: string,
        legal_entity_register_name?: string,
        legal_entity_registration_location?: string,
        legal_form?: string,
        nationality1?: string,
        nationality2?: string,
        not_disqualified_statement_checked?: boolean,
        legal_personality_statement_checked?: boolean,
        principal_office_address?: Address,
        registered_company_number?: string,
        resignation_date?: string,
        service_address?: Address,
        surname?: string,
        usual_residential_address?: Address
    }
}

/**
 * The data structure returned by the API when a new Limited Partnership resource has
 * successfully been created.
 */
export interface LimitedPartnershipResourceCreated {
    id: string;
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
    ENGLAND_AND_WALES = "England and Wales",
    NORTHERN_IRELAND = "Northern Ireland",
    SCOTLAND = "Scotland",
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
