export interface Address {
    premises?: string;
    addressLine1?: string;
    addressLine2?: string;
    locality?: string;
    region?: string;
    country?: string;
    postalCode?: string;
}

export interface Nationality {
    firstNationality: string;
    secondNationality?: string;
    thirdNationality?: string;
}

export interface Company {
    companyName?: string;
    companyNumber?: string;
}

export interface AmlSupervisoryBody {
    amlSupervisoryBody? : string;
    membershipId? : string;
    dateOfChange?: string;
}

export interface ApplicantDetails {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    nationality?: Nationality;
    countryOfResidence?: string;
    correspondenceAddress?: Address;
    correspondenceAddressIsSameAsRegisteredOfficeAddress?: boolean;
    correspondenceEmail?: string;
}
export interface AcspData {
    id?: string;
    registeredOfficeAddress?: Address;
    typeOfBusiness?: string;
    roleType?: string;
    verified?: boolean;
    businessName?: string;
    workSector?: string;
    amlSupervisoryBodies?: AmlSupervisoryBody[];
    removedAmlSupervisoryBodies?: AmlSupervisoryBody[];
    companyDetails?: Company;
    companyAuthCodeProvided?: boolean;
    howAreYouRegisteredWithAml?: string;
    applicantDetails?: ApplicantDetails;
    acspType?: string;
    acspId?: string;
}

export interface AcspResponse {
    data: AcspDataDto;
}

// DTOs
export interface AcspDataDto {
    id: string;
    registered_office_address?: AddressDto;
    type_of_business?: string;
    role_type?: string;
    verified?: boolean;
    business_name?: string;
    work_sector?: string;
    aml_supervisory_bodies?: AmlSupervisoryBodyDto[];
    removed_aml_supervisory_bodies?: AmlSupervisoryBodyDto[];
    company_details?: CompanyDto;
    company_auth_code_provided?: boolean;
    how_are_you_registered_with_aml?: string;
    applicant_details?: ApplicantDetailsDto;
    acsp_type?: string;
    acsp_id?: string;
}

export interface ApplicantDetailsDto {
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    date_of_birth?: Date;
    nationality?: NationalityDto;
    country_of_residence?: string;
    correspondence_address?: AddressDto;
    correspondence_address_is_same_as_registered_office_address?: boolean;
    correspondence_email?: string;
}
export interface AddressDto {
    premises?: string;
    address_line_1?: string;
    address_line_2?: string;
    locality?: string;
    region?: string;
    country?: string;
    postal_code?: string;
}

export interface CompanyDto {
    company_name?: string;
    company_number?: string;
}

export interface AmlSupervisoryBodyDto {
    aml_supervisory_body? : string;
    membership_id? : string;
}

export interface NationalityDto {
    first_nationality: string;
    second_nationality?: string;
    third_nationality?: string;
}

export interface ClientVerificationEmail {
    to: string;
    clientName: string;
    referenceNumber: string;
    clientEmailAddress: string;
}
