/**
 * Limited Partnership interface types used within this SDK.
 */
/**
 * The data model used by the web and API for an Incorporation journey.
 * It could be a registration or a transition, determined by the 'kind'.
 */
export interface Incorporation {
    data?: {
        kind: IncorporationKind;
    };
}
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
        sic_codes?: string[];
        lawful_purpose_statement_checked?: boolean;
        partnership_number?: string;
    };
}
declare type Partner = {
    completed?: boolean;
    date_effective_from?: string;
    date_of_birth?: string;
    etag?: string;
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
};
export interface LimitedPartner {
    id?: string;
    data?: Partner & {
        contribution_currency_type?: string;
        contribution_currency_value?: string;
        contribution_sub_types?: string[];
    };
}
export interface GeneralPartner {
    id?: string;
    data?: Partner & {
        not_disqualified_statement_checked?: boolean;
        service_address?: Address;
    };
}
/**
 * The data structure returned by the API when a new Limited Partnership resource has
 * successfully been created.
 */
export interface LimitedPartnershipResourceCreated {
    id: string;
}
export declare enum IncorporationKind {
    REGISTRATION = "limited-partnership-registration",
    TRANSITION = "limited-partnership-transition"
}
export declare enum NameEndingType {
    LIMITED_PARTNERSHIP = "Limited Partnership",
    LP = "LP",
    L_DOT_P_DOT = "L.P.",
    PARTNERIAETH_CYFYNGEDIG = "Partneriaeth Cyfyngedig",
    PC = "PC",
    P_DOT_C_DOT = "P.C."
}
export declare enum PartnershipType {
    LP = "LP",
    PFLP = "PFLP",
    SLP = "SLP",
    SPFLP = "SPFLP"
}
export declare enum Jurisdiction {
    ENGLAND_AND_WALES = "england-wales",
    NORTHERN_IRELAND = "northern-ireland",
    SCOTLAND = "scotland"
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
export declare type Address = {
    address_line_1: string;
    address_line_2?: string;
    country: string;
    locality: string;
    postal_code: string;
    premises: string;
    region?: string;
};
export declare enum Term {
    BY_AGREEMENT = "BY_AGREEMENT",
    UNTIL_DISSOLUTION = "UNTIL_DISSOLUTION",
    NONE = "NONE"
}
export {};
