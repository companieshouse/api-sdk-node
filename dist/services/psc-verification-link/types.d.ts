export interface PersonWithSignificantControlResource {
    address: AddressResource;
    country_of_residence: string;
    date_of_birth: DateOfBirthResource;
    ceased_on?: string;
    etag: string;
    links: ItemLinksResource;
    name: string;
    name_elements: NameElementsResource;
    nationality: string;
    natures_of_control: string[];
    notified_on: string;
    is_sanctioned?: boolean;
    kind?: string;
}
export interface PersonWithSignificantControl {
    address: Address;
    countryOfResidence: string;
    dateOfBirth: DateOfBirth;
    ceasedOn?: string;
    etag: string;
    links: ItemLinks;
    name: string;
    nameElements: NameElements;
    nationality: string;
    naturesOfControl: string[];
    notifiedOn: string;
    isSanctioned?: boolean;
    kind?: string;
}
export interface AddressResource {
    address_line_1: string;
    address_line_2?: string;
    careOf?: string;
    locality: string;
    poBox?: string;
    postal_code?: string;
    premises?: string;
    region?: string;
}
export interface Address {
    addressLine1: string;
    addressLine2?: string;
    careOf?: string;
    locality: string;
    poBox?: string;
    postalCode?: string;
    premises?: string;
    region?: string;
}
export interface DateOfBirthResource {
    day?: string;
    month: string;
    year: string;
}
export interface DateOfBirth {
    day?: string;
    month: string;
    year: string;
}
export interface ResultsLinksResource {
    self: string;
    persons_with_significant_control_statements_list?: string;
}
export interface ResultsLinks {
    self: string;
    personsWithSignificantControlStatementsList?: string;
}
export interface ItemLinksResource {
    self: string;
    statement?: string;
}
export interface ItemLinks {
    self: string;
    statement?: string;
}
export interface LinksResource {
    self: string;
    validation_status: string;
}
export interface Links {
    self: string;
    validationStatus: string;
}
export interface NameElementsResource {
    forename?: string;
    other_forenames?: string;
    middlename?: string;
    surname?: string;
    title?: string;
}
export interface NameElements {
    title?: string;
    forename?: string;
    otherForenames?: string;
    middleName?: string;
    surname: string;
}
export interface PscVerificationResource {
    created_at: Date;
    updated_at: Date;
    links: LinksResource;
    data: PscVerificationDataResource;
}
export interface PscVerificationDataResource {
    company_number?: string;
    psc_notification_id?: string;
    verification_details?: VerificationDetailsResource;
}
export interface PscVerification {
    createdAt: Date;
    updatedAt: Date;
    links: Links;
    data: PscVerificationData;
}
export interface PscVerificationData {
    companyNumber?: string;
    pscNotificationId?: string;
    verificationDetails?: VerificationDetails;
}
export interface VerificationDetailsResource {
    uvid?: string;
    name_mismatch_reason?: NameMismatchReasonEnum;
    verification_statements?: VerificationStatementEnum[];
}
export interface VerificationDetails {
    uvid?: string;
    nameMismatchReason?: NameMismatchReasonEnum;
    verificationStatements?: VerificationStatementEnum[];
}
export interface PlannedMaintenance {
    status: string;
    message: string;
    maintenance_start_time: Date;
    maintenance_end_time: Date;
}
export declare enum NameMismatchReasonEnum {
    PREFERRED_NAME = "PREFERRED_NAME",
    LEGALLY_CHANGED = "LEGALLY_CHANGED",
    TRANSLATION_OR_DIFF_CONV = "TRANSLATION_OR_DIFF_CONV",
    REGISTER_ERROR = "REGISTER_ERROR",
    NOT_TO_SAY = "NOT_TO_SAY"
}
export declare enum VerificationStatementEnum {
    INDIVIDUAL_VERIFIED = "INDIVIDUAL_VERIFIED"
}
export interface ValidationStatusError {
    error: string;
    location: string;
    type?: string;
    locationType: string;
}
export interface ValidationStatusResponse {
    errors: ValidationStatusError[];
    isValid?: boolean;
}
export interface ValidationStatusErrorResource {
    error: string;
    location: string;
    location_type: string;
    type?: string;
}
export interface ValidationStatusResponseResource {
    errors: ValidationStatusErrorResource[];
    is_valid?: boolean;
}
