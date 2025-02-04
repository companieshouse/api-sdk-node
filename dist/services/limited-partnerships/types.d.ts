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
    };
}
/**
 * The data structure returned by the API when a new Limited Partnership resource has
 * successfully been created.
 */
export interface LimitedPartnershipCreated {
    id: string;
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
