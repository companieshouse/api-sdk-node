/**
 * Checkout is the interface used within this SDK.
 */
export interface Checkout {
    deliveryDetails?: {
        addressLine1: string;
        addressLine2: string;
        country: string;
        forename: string;
        locality: string;
        poBox: string;
        postalCode: string;
        region: string;
        surname: string;
    };
    etag: string;
    items: Item[];
    kind: string;
    links: {
        self: string;
        payment: string;
    };
    paidAt: string;
    checkedOutBy: {
        email: string;
        id: string;
    };
    status: string;
    paymentReference: string;
    reference: string;
    totalOrderCost: string;
}
export interface Item {
    companyName: string;
    companyNumber: string;
    customerReference?: string;
    description: string;
    descriptionIdentifier: string;
    descriptionValues: Record<string, string>;
    etag: string;
    id: string;
    itemCosts: ItemCosts[];
    itemOptions: ItemOptions;
    itemUri: string;
    kind: string;
    links: {
        self: string;
    };
    postageCost: string;
    postalDelivery: boolean;
    quantity: number;
    satisfiedAt?: string;
    status: string;
    totalItemCost: string;
}
export interface ItemCosts {
    calculatedCost: string;
    discountApplied: string;
    itemCost: string;
    productType: string;
}
export interface CertificateItemOptions {
    certificateType: string;
    companyType: string;
    deliveryTimescale: string;
    designatedMemberDetails: {
        includeAddress?: boolean;
        includeAppointmentDate?: boolean;
        includeBasicInformation?: boolean;
        includeCountryOfResidence?: boolean;
        includeDobType?: string;
    };
    deliveryMethod: string;
    generalPartnerDetails: {
        includeBasicInformation?: boolean;
    };
    includeGeneralNatureOfBusinessInformation?: boolean;
    includeGoodStandingInformation?: boolean;
    includeCompanyObjectsInformation?: boolean;
    limitedPartnerDetails: {
        includeBasicInformation?: boolean;
    };
    memberDetails: {
        includeAddress?: boolean;
        includeAppointmentDate?: boolean;
        includeBasicInformation?: boolean;
        includeCountryOfResidence?: boolean;
        includeDobType?: string;
    };
    principalPlaceOfBusinessDetails: {
        includeAddressRecordsType?: string;
    };
    registeredOfficeAddressDetails: {
        includeAddressRecordsType?: string;
    };
    secretaryDetails: {
        includeBasicInformation?: boolean;
        includeAddress?: boolean;
        includeAppointmentDate?: boolean;
        includeCountryOfResidence?: boolean;
        includeNationality?: boolean;
        includeOccupation?: boolean;
        includeDobType?: string;
    };
    directorDetails: {
        includeBasicInformation?: boolean;
        includeAddress?: boolean;
        includeAppointmentDate?: boolean;
        includeCountryOfResidence?: boolean;
        includeNationality?: boolean;
        includeOccupation?: boolean;
        includeDobType?: string;
    };
    forename: string;
    surname: string;
    liquidatorsDetails: {
        includeBasicInformation?: boolean;
    };
    companyStatus: string;
    administratorsDetails: {
        includeBasicInformation?: boolean;
    };
}
export interface CertifiedCopyItemOptions {
    deliveryTimescale: string;
    deliveryMethod: string;
    filingHistoryDocuments: FilingHistoryItemOptions[];
}
export interface FilingHistoryItemOptions {
    filingHistoryDate: string;
    filingHistoryDescription: string;
    filingHistoryId: string;
    filingHistoryType: string;
    filingHistoryDescriptionValues: Record<string, any>;
    filingHistoryCost: string;
}
export interface MissingImageDeliveryItemOptions {
    filingHistoryDate: string;
    filingHistoryDescription: string;
    filingHistoryId: string;
    filingHistoryType: string;
    filingHistoryDescriptionValues: Record<string, any>;
}
export declare type ItemOptions = CertificateItemOptions | CertifiedCopyItemOptions | MissingImageDeliveryItemOptions;
/**
 * CheckoutResource is what is returned from the api.
 */
export interface CheckoutResource {
    delivery_details?: {
        address_line_1: string;
        address_line_2: string;
        country: string;
        forename: string;
        locality: string;
        po_box: string;
        postal_code: string;
        region: string;
        surname: string;
    };
    etag: string;
    items: ItemResource[];
    kind: string;
    links: {
        self: string;
        payment: string;
    };
    paid_at: string;
    checked_out_by: {
        email: string;
        id: string;
    };
    status: string;
    payment_reference: string;
    reference: string;
    total_order_cost: string;
}
export interface ItemResource {
    company_name: string;
    company_number: string;
    customer_reference?: string;
    description: string;
    description_identifier: string;
    description_values: Record<string, string>;
    etag: string;
    id: string;
    item_costs: ItemCostsResource[];
    item_options: ItemOptionsResource;
    item_uri: string;
    kind: string;
    links: {
        self: string;
    };
    postage_cost: string;
    postal_delivery: boolean;
    quantity: number;
    satisfied_at?: string;
    status: string;
    total_item_cost: string;
}
export interface ItemCostsResource {
    calculated_cost: string;
    discount_applied: string;
    item_cost: string;
    product_type: string;
}
export interface CertificateItemOptionsResource {
    certificate_type: string;
    company_type: string;
    delivery_timescale: string;
    delivery_method: string;
    designated_member_details: {
        include_address?: boolean;
        include_appointment_date?: boolean;
        include_basic_information?: boolean;
        include_country_of_residence?: boolean;
        include_dob_type?: string;
    };
    include_general_nature_of_business_information?: boolean;
    include_good_standing_information?: boolean;
    include_company_objects_information?: boolean;
    general_partner_details: {
        include_basic_information?: boolean;
    };
    limited_partner_details: {
        include_basic_information?: boolean;
    };
    member_details: {
        include_address?: boolean;
        include_appointment_date?: boolean;
        include_basic_information?: boolean;
        include_country_of_residence?: boolean;
        include_dob_type?: string;
    };
    principal_place_of_business_details: {
        include_address_records_type?: string;
    };
    registered_office_address_details: {
        include_address_records_type?: string;
    };
    secretary_details: {
        include_basic_information?: boolean;
        include_address?: boolean;
        include_appointment_date?: boolean;
        include_country_of_residence?: boolean;
        include_nationality?: boolean;
        include_occupation?: boolean;
        include_dob_type?: string;
    };
    director_details: {
        include_basic_information?: boolean;
        include_address?: boolean;
        include_appointment_date?: boolean;
        include_country_of_residence?: boolean;
        include_nationality?: boolean;
        include_occupation?: boolean;
        include_dob_type?: string;
    };
    forename: string;
    surname: string;
    liquidators_details: {
        include_basic_information?: boolean;
    };
    company_status: string;
    administrators_details: {
        include_basic_information?: boolean;
    };
}
export interface CertifiedCopyItemOptionsResource {
    delivery_timescale: string;
    delivery_method: string;
    filing_history_documents: FilingHistoryItemOptionsResource[];
}
export interface FilingHistoryItemOptionsResource {
    filing_history_date: string;
    filing_history_description: string;
    filing_history_id: string;
    filing_history_type: string;
    filing_history_description_values: Record<string, any>;
    filing_history_cost: string;
}
export interface MissingImageDeliveryItemOptionsResource {
    filing_history_date: string;
    filing_history_description: string;
    filing_history_id: string;
    filing_history_type: string;
    filing_history_description_values: Record<string, any>;
}
export declare type ItemOptionsResource = CertificateItemOptionsResource | CertifiedCopyItemOptionsResource | MissingImageDeliveryItemOptionsResource;
export interface DirectorOrSecretaryDetails {
    includeBasicInformation?: boolean;
    includeAddress?: boolean;
    includeAppointmentDate?: boolean;
    includeCountryOfResidence?: boolean;
    includeNationality?: boolean;
    includeOccupation?: boolean;
    includeDobType?: string;
}
