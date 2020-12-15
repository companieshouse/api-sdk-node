/**
 * CertificateItemResource is what is returned from the api.
 */

export interface CertificateItemResource {
    company_name: string;
    company_number: string;
    customer_reference: string;
    description: string;
    description_identifier: string;
    description_values: Record<string, string>;
    etag: string;
    id: string;
    item_costs: ItemCostsResource[];
    item_options: ItemOptionsResource;
    kind: string;
    links: LinksResource;
    postage_cost: string;
    postal_delivery: boolean;
    quantity: number;
    total_item_cost: string;
  }

export interface ItemCostsResource {
    calculated_cost: string;
    discount_applied: string;
    item_cost: string;
    product_type: string;
}

export interface ItemOptionsResource {
    certificate_type: string;
    collection_location: string;
    contact_number: string;
    delivery_method: string;
    delivery_timescale: string;
    director_details: DirectorOrSecretaryDetailsResource;
    forename: string;
    include_company_objects_information: boolean;
    include_email_copy: boolean;
    include_good_standing_information: boolean;
    registered_office_address_details: RegisteredOfficeAddressDetailsResource;
    secretary_details: DirectorOrSecretaryDetailsResource;
    surname: string;
}

export interface DirectorOrSecretaryDetailsResource {
    include_address?: boolean;
    include_appointment_date?: boolean;
    include_basic_information?: boolean;
    include_country_of_residence?: boolean;
    include_dob_type?: string;
    include_nationality?: boolean;
    include_occupation?: boolean;
}

export interface RegisteredOfficeAddressDetailsResource {
    include_address_records_type: string;
    include_dates: boolean;
}

export interface LinksResource {
    self: string;
}

/**
 * CertificateItem is the interface used within this SDK.
 */

export interface CertificateItem {
    companyName: string;
    companyNumber: string;
    customerReference: string;
    description: string;
    descriptionIdentifier: string;
    descriptionValues: Record<string, string>;
    etag: string;
    id: string;
    itemCosts: ItemCosts[];
    itemOptions: ItemOptions;
    kind: string;
    links: LinksResource;
    postageCost: string;
    postalDelivery: boolean;
    quantity: number;
    totalItemCost: string;
}

export interface ItemCosts {
    calculatedCost: string;
    discountApplied: string;
    itemCost: string;
    productType: string;
}

export interface ItemOptions {
    certificateType: string;
    collectionLocation: string;
    contactNumber: string;
    deliveryMethod: string;
    deliveryTimescale: string;
    directorDetails: DirectorOrSecretaryDetails;
    forename: string;
    includeCompanyObjectsInformation: boolean;
    includeEmailCopy: boolean;
    includeGoodStandingInformation: boolean;
    registeredOfficeAddressDetails: RegisteredOfficeAddressDetails;
    secretaryDetails: DirectorOrSecretaryDetails;
    surname: string;
}

export interface DirectorOrSecretaryDetails {
    includeAddress?: boolean;
    includeAppointmentDate?: boolean;
    includeBasicInformation?: boolean;
    includeCountryOfResidence?: boolean;
    includeDobType?: string;
    includeNationality?: boolean;
    includeOccupation?: boolean;
}

export interface RegisteredOfficeAddressDetails {
    includeAddressRecordsType: string;
    includeDates: boolean;
}

export interface Links {
    self: string;
}

// CertificateItemPostRequest
export interface CertificateItemPostRequest {
    companyNumber?: string;
    customerReference?: string;
    itemOptions: ItemOptionsRequest;
    quantity: number;
}

// CertificateItemPatchRequest
export interface CertificateItemPatchRequest {
  companyNumber?: string;
  customerReference?: string;
  itemOptions: ItemOptionsRequest;
  quantity?: number;
}

export interface ItemOptionsRequest {
    certificateType?: string;
    collectionLocation?: string;
    contactNumber?: string;
    deliveryMethod?: string;
    deliveryTimescale?: string;
    directorDetails?: DirectorOrSecretaryDetailsRequest;
    forename?: string;
    includeCompanyObjectsInformation?: boolean | null;
    includeEmailCopy?: boolean;
    includeGoodStandingInformation?: boolean | null;
    registeredOfficeAddressDetails?: RegisteredOfficeAddressDetailsRequest;
    secretaryDetails?: DirectorOrSecretaryDetailsRequest;
    surname?: string;
}

export interface DirectorOrSecretaryDetailsRequest {
    includeAddress?: boolean;
    includeAppointmentDate?: boolean;
    includeBasicInformation: boolean | null;
    includeCountryOfResidence?: boolean;
    includeDobType?: string | null;
    includeNationality?: boolean;
    includeOccupation?: boolean;
}

export interface RegisteredOfficeAddressDetailsRequest {
    includeAddressRecordsType?: string | null;
    includeDates?: boolean;
}

// CertificateItemRequestResource
export interface CertificateItemRequestResource {
  company_number?: string;
  customer_reference?: string;
  item_options?: ItemOptionsResource;
  quantity: number;
}
