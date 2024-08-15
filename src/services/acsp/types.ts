export interface AddressResource {
    address_line_1: string;
    address_line_2?: string;
    care_of?: string;
    country: string;
    locality: string;
    po_box?: string;
    postal_code?: string;
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
}

export interface AcspDto {
      id: string;
      transactionId?: string;
      roleInTheBusiness?: string;
      registeredOfficeAddress?: Address;
      typeOfBusiness?: string;
      roleType?: string;
      verified?: boolean;
      businessName?: string;
      workSector?: string;
      amlSupervisoryBodies?: AmlSupervisoryBody[];
      companyDetails?: Company;
      companyAuthCodeProvided?: boolean;
      howAreYouRegisteredWithAml?: string;
      applicantDetails?: ApplicantDetails;
}

export interface AcspData {
    id: string;
    transactionId?: string;
    roleInTheBusiness?: string;
    registeredOfficeAddress?: Address;
    typeOfBusiness?: string;
    roleType?: string;
    verified?: boolean;
    businessName?: string;
    workSector?: string;
    amlSupervisoryBodies?: AmlSupervisoryBody[];
    companyDetails?: Company;
    companyAuthCodeProvided?: boolean;
    howAreYouRegisteredWithAml?: string;
    applicantDetails?: ApplicantDetails;
}

export interface AcspResponse {
    data: AcspData;
}

export interface AcspResponseDto {
    data: AcspDto;
}
