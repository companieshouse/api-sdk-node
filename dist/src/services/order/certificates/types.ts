import { ItemOptionsDeliveryTimescaleConfigurable } from "../types";

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
    user_id: string;
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
    company_type?: string;
    contact_number: string;
    delivery_method: string;
    delivery_timescale: string;
    designated_member_details: DesignatedMemberDetailsResource;
    director_details: DirectorOrSecretaryDetailsResource;
    forename: string;
    general_partner_details: GeneralPartnerDetailsResource;
    include_company_objects_information: boolean;
    include_email_copy: boolean;
    include_general_nature_of_business_information: boolean;
    include_good_standing_information: boolean;
    limited_partner_details: LimitedPartnerDetailsResource;
    member_details: OrdinaryMemberDetailsResource;
    principal_place_of_business_details: PrincipalPlaceOfBusinessDetailsResource;
    registered_office_address_details: RegisteredOfficeAddressDetailsResource;
    secretary_details: DirectorOrSecretaryDetailsResource;
    surname: string;
    liquidators_details: LiquidatorsDetailsResource;
    company_status: string;
    administrators_details: AdministratorsDetailsResource;
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

export interface AddressDetailsResource {
    include_address_records_type?: string;
    include_dates?: boolean;
}

export interface RegisteredOfficeAddressDetailsResource extends AddressDetailsResource {
}

export interface PrincipalPlaceOfBusinessDetailsResource extends AddressDetailsResource {
}

export interface MemberDetailsResource {
    include_address?: boolean;
    include_appointment_date?: boolean;
    include_basic_information?: boolean;
    include_country_of_residence?: boolean;
    include_dob_type?: string;
}

export interface OrdinaryMemberDetailsResource extends MemberDetailsResource {
}

export interface DesignatedMemberDetailsResource extends MemberDetailsResource {
}

export interface BasicInformationResource {
    include_basic_information?: boolean;
}

export interface PartnerDetailsResource extends BasicInformationResource {
}

export interface GeneralPartnerDetailsResource extends PartnerDetailsResource {
}

export interface LimitedPartnerDetailsResource extends PartnerDetailsResource {
}

export interface LiquidatorsDetailsResource extends BasicInformationResource {
}

export interface AdministratorsDetailsResource extends BasicInformationResource {
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
    userId: string;
}

export interface ItemCosts {
    calculatedCost: string;
    discountApplied: string;
    itemCost: string;
    productType: string;
}

export interface ItemOptions extends ItemOptionsDeliveryTimescaleConfigurable {
    certificateType: string;
    collectionLocation: string;
    companyType: string;
    contactNumber: string;
    deliveryMethod: string;
    designatedMemberDetails?: DesignatedMemberDetails;
    directorDetails?: DirectorOrSecretaryDetails;
    forename: string;
    generalPartnerDetails?: GeneralPartnerDetails;
    includeCompanyObjectsInformation: boolean;
    includeEmailCopy: boolean;
    includeGeneralNatureOfBusinessInformation: boolean;
    includeGoodStandingInformation: boolean;
    limitedPartnerDetails?: LimitedPartnerDetails;
    memberDetails?: OrdinaryMemberDetails;
    principalPlaceOfBusinessDetails?: PrincipalPlaceOfBusinessDetails;
    registeredOfficeAddressDetails?: RegisteredOfficeAddressDetails;
    secretaryDetails?: DirectorOrSecretaryDetails;
    surname: string;
    liquidatorsDetails: LiquidatorsDetails;
    companyStatus: string;
    administratorsDetails: AdministratorsDetails;
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

export interface AddressDetails {
    includeAddressRecordsType?: string;
    includeDates?: boolean;
}

export interface RegisteredOfficeAddressDetails extends AddressDetails {
}

export interface PrincipalPlaceOfBusinessDetails extends AddressDetails {
}

export interface MemberDetails {
    includeAddress?: boolean;
    includeAppointmentDate?: boolean;
    includeBasicInformation?: boolean;
    includeCountryOfResidence?: boolean;
    includeDobType?: string;
}

export interface OrdinaryMemberDetails extends MemberDetails {
}

export interface DesignatedMemberDetails extends MemberDetails {
}

export interface BasicInformation {
    includeBasicInformation?: boolean;
}

export interface PartnerDetails extends BasicInformation {
}

export interface GeneralPartnerDetails extends PartnerDetails {
}

export interface LimitedPartnerDetails extends PartnerDetails {
}

export interface LiquidatorsDetails extends BasicInformation {
}

export interface AdministratorsDetails extends BasicInformation {
}

export interface Links {
    self: string;
}

// CertificateItemPostRequest
export interface CertificateItemPostRequest {
    companyNumber: string;
    customerReference?: string;
    itemOptions: ItemOptionsRequest;
    quantity: number;
}

// CertificateItemInitialRequest
export interface CertificateItemInitialRequest {
    companyNumber: string;
}

// CertificateItemPatchRequest
export interface CertificateItemPatchRequest {
  customerReference?: string;
  itemOptions?: ItemOptionsRequest;
  quantity?: number;
}

export interface ItemOptionsRequest {
    collectionLocation?: string;
    contactNumber?: string;
    deliveryMethod?: string;
    deliveryTimescale?: string;
    designatedMemberDetails?: DesignatedMemberDetailsRequest;
    directorDetails?: DirectorOrSecretaryDetailsRequest;
    forename?: string;
    generalPartnerDetails?: GeneralPartnerDetailsRequest;
    includeCompanyObjectsInformation?: boolean | null;
    includeEmailCopy?: boolean;
    includeGeneralNatureOfBusinessInformation?: boolean | null;
    includeGoodStandingInformation?: boolean | null;
    limitedPartnerDetails?: LimitedPartnerDetailsRequest;
    memberDetails?: OrdinaryMemberDetailsRequest;
    principalPlaceOfBusinessDetails?: PrincipalPlaceOfBusinessDetailsRequest;
    registeredOfficeAddressDetails?: RegisteredOfficeAddressDetailsRequest;
    secretaryDetails?: DirectorOrSecretaryDetailsRequest;
    surname?: string;
    liquidatorsDetails?: LiquidatorsDetailsRequest;
    administratorsDetails?: AdministratorsDetailsRequest;
}

export interface DirectorOrSecretaryDetailsRequest {
    includeAddress?: boolean | null;
    includeAppointmentDate?: boolean | null;
    includeBasicInformation: boolean | null;
    includeCountryOfResidence?: boolean | null;
    includeDobType?: string | null;
    includeNationality?: boolean | null;
    includeOccupation?: boolean | null;
}

export interface AddressDetailsRequest {
    includeAddressRecordsType?: string | null;
    includeDates?: boolean;
}

export interface RegisteredOfficeAddressDetailsRequest extends AddressDetailsRequest {
}

export interface PrincipalPlaceOfBusinessDetailsRequest extends AddressDetailsRequest {
}

export interface MemberDetailsRequest {
    includeAddress?: boolean | null;
    includeAppointmentDate?: boolean | null;
    includeBasicInformation?: boolean | null;
    includeCountryOfResidence?: boolean | null;
    includeDobType?: string | null;
}

export interface OrdinaryMemberDetailsRequest extends MemberDetailsRequest {
}

export interface DesignatedMemberDetailsRequest extends MemberDetailsRequest {
}

export interface BasicInformationRequest {
    includeBasicInformation?: boolean | null;
}

export interface PartnerDetailsRequest extends BasicInformationRequest {
}

export interface GeneralPartnerDetailsRequest extends PartnerDetailsRequest {
}

export interface LimitedPartnerDetailsRequest extends PartnerDetailsRequest {
}

export interface LiquidatorsDetailsRequest extends BasicInformationRequest {
}

export interface AdministratorsDetailsRequest extends BasicInformationRequest {
}

export interface CertificateItemRequestResource {
  company_number?: string;
  customer_reference?: string;
  item_options?: ItemOptionsResource;
  quantity: number;
}
