/**
 * Limited Partnership interface types used within this SDK.
 */


/**
 * The data model used by the web application for a Limited Partnership.
 */
export interface LimitedPartnership {
    data?: {
        partnership_name?: string;
        name_ending?: NameEndingType;
    }
}

/**
 * The data model used by the API that represents a Limited Partnership resource.
 */
export interface LimitedPartnershipResource {
    data: {
        partnership_name: string;
        name_ending: NameEndingType;
    }
}

/**
 * The data structure returned by the API when a new Limited Partnership resource has
 * successfully been created. 
 */
export interface LimitedPartnershipCreated {
    id: string
}

export enum NameEndingType {
    LIMITED_PARTNERSHIP = "LIMITED_PARTNERSHIP",
    LP = "LP",
    L_DOT_P_DOT = "L_DOT_P_DOT",    // Represents 'L.P.'
    PARTNERIAETH_CYFYNGEDIG = "PARTNERIAETH_CYFYNGEDIG",
    PC = "PC",
    P_DOT_C_DOT = "P_DOT_C_DOT"     // Represents 'P.C.'
}
