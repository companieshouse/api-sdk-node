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

export interface Address {
    addressLine1: string;
    addressLine2?: string;
    country: string;
    locality: string;
    poBox?: string;
    postalCode?: string;
    premises?: string;
    region?: string;
}

export interface DateOfBirth {
    day?: string;
    month: string;
    year: string;
}

export interface Address {
    propertyDetails: string;
    line1: string;
    line2: string;
    town: string;
    county: string;
    country: string;
    postcode: string;
}

export interface nationality {
    firstNationality: string;
    secondNationality: string;
    thirdNationality: string;
}

export interface AcspDto {
    id: string;
    firstName: string;
    lastName: string;
    addresses: Address[];
    TypeOfBusiness: string;
    RoleType: string;
    dateOfBirth: string;
    verified: boolean;
    nationality: nationality[];
    countryOfResidence: string;
    businessName: string;
    workSector: string;
    companyAuthCodeProvided: boolean;
}
