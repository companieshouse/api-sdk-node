import { RegisteredOfficeAddress, ServiceAddress } from "../company-profile/types";

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
    propertyDetails?: string;
    line1?: string;
    line2?: string;
    town?: string;
    county?: string;
    country?: string;
    postcode?: string;
}

export interface nationality {
    firstNationality: string;
    secondNationality?: string;
    thirdNationality?: string;
}

export interface Company {
    companyName?: string;
    companyNumber?: string;
    status?: string;
    incorporationDate?: string;
    companyType?: string;
    registeredOfficeAddress?: RegisteredOfficeAddress;
}

export interface AmlSupervisoryBody {
    amlSupervisoryBody? : string;
    membershipId? : string;
}

export interface AcspDto {
      id: string;
      firstName?: string;
      middleName?: string;
      lastName?: string;
      email?: string;
      roleInTheBusiness?: string;
      correspondenceAddress?: Address;
      businessAddress?: Address;
      typeOfBusiness?: string;
      roleType?: string;
      dateOfBirth?: Date;
      verified?: boolean;
      nationality?: nationality;
      countryOfResidence?: string;
      businessName?: string;
      workSector?: string;
      amlSupervisoryBodies?: AmlSupervisoryBody[];
      companyDetails?: Company;
      companyAuthCodeProvided?: boolean;
      howAreYouRegisteredWithAML?: string;
}

export interface AcspData {
    id: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    email?: string;
    roleInTheBusiness?: string;
    correspondenceAddress?: Address;
    businessAddress?: Address;
    typeOfBusiness?: string;
    roleType?: string;
    dateOfBirth?: Date;
    verified?: boolean;
    nationality?: nationality;
    countryOfResidence?: string;
    businessName?: string;
    workSector?: string;
    amlSupervisoryBodies?: AmlSupervisoryBody[];
    companyDetails?: Company;
    companyAuthCodeProvided?: boolean;
    howAreYouRegisteredWithAML?: string;
}

export interface AcspResponse {
    data: AcspData;
}

export interface AcspResponseDto {
    data: AcspDto;
}
