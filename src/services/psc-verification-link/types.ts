export interface PersonWithSignificantControlResource {
    address: AddressResource,
    country_of_residence: string,
    date_of_birth: DateOfBirthResource,
    ceased_on?: string,
    etag: string,
    links: ItemLinksResource,
    name: string,
    name_elements: NameElementsResource,
    nationality: string,
    natures_of_control: string[],
    notified_on: string,
    is_sanctioned?: boolean,
    kind?: string,
    identification?: IdentificationResource
};

export interface PersonWithSignificantControl {
    address: Address,
    countryOfResidence: string,
    dateOfBirth: DateOfBirth,
    ceasedOn?: string,
    etag: string,
    links: ItemLinks,
    name: string,
    nameElements: NameElements,
    nationality: string,
    naturesOfControl: string[],
    notifiedOn: string,
    isSanctioned?: boolean,
    kind?: string,
    identification?: Identification
};

export interface AddressResource {
    address_line_1: string;
    address_line_2?: string;
    careOf?: string;
    locality: string;
    poBox?: string;
    postal_code?: string;
    premises?: string;
    region?: string;
};

export interface Address {
    addressLine1: string;
    addressLine2?: string;
    careOf?: string;
    locality: string;
    poBox?: string;
    postalCode?: string;
    premises?: string;
    region?: string;
};

export interface DateOfBirthResource {
    day?: string;
    month: string;
    year: string;
};

export interface DateOfBirth {
    day?: string;
    month: string;
    year: string;
};

export interface ResultsLinksResource {
  self: string,
  persons_with_significant_control_statements_list?: string;
};

export interface ResultsLinks {
    self: string,
    personsWithSignificantControlStatementsList?: string;
};

export interface ItemLinksResource {
  self: string,
  statement?: string;
};

export interface ItemLinks {
    self: string,
    statement?: string;
};

export interface LinksResource {
    self: string,
    validation_status: string
}

export interface Links {
    self: string,
    validationStatus: string
}

export interface NameElementsResource {
    forename?: string,
    other_forenames?: string,
    middlename?: string,
    surname?: string,
    title?: string
}

export interface NameElements {
    title?: string;
    forename?: string;
    otherForenames?: string;
    middleName?: string;
    surname: string;
};

export interface IdentificationResource {
    identification_type?: string,
    legal_authority?: string,
    legal_form?: string,
    place_registered?: string,
    registration_number?: string,
    country_registered?: string
};

export interface Identification {
    identificationType?: string,
    legalAuthority?: string,
    legalForm?: string,
    placeRegistered?: string,
    registrationNumber?: string,
    countryRegistered?: string
};

export interface RelevantOfficerResource {
    name_elements?: NameElementsResource,
    date_of_birth?: Date,
    is_employee?: boolean,
    is_director?: boolean
}

export interface RelevantOfficer {
    nameElements?: NameElements,
    dateOfBirth?: Date,
    isEmployee?: boolean,
    isDirector?: boolean
}

export interface PscVerificationResource {
    created_at: Date,
    updated_at: Date,
    links: LinksResource,
    data: PscVerificationDataResource;
}

export interface PscVerification {
    createdAt: Date,
    updatedAt: Date,
    links: Links,
    data: PscVerificationData;
}

export interface PscVerificationDataResource {
    company_number?: string,
    psc_appointment_id?: string,
    relevant_officer?: RelevantOfficerResource,
    verification_details?: VerificationDetailsResource
}

export interface PscVerificationData {
    companyNumber?: string,
    pscAppointmentId?: string,
    relevantOfficer?: RelevantOfficer,
    verificationDetails?: VerificationDetails
}

export interface VerificationDetailsResource {
    uvid?: string,
    name_mismatch_reason?: NameMismatchReasonEnum,
    verification_statements?: VerificationStatementEnum[]
}

export interface VerificationDetails {
    uvid?: string,
    nameMismatchReason?: NameMismatchReasonEnum,
    verificationStatements?: VerificationStatementEnum[]
}

export enum NameMismatchReasonEnum {
    PREFERRED_NAME = "PREFERRED_NAME",
    MAIDEN_NAME = "MAIDEN_NAME"
}

export enum VerificationStatementEnum {
    INDIVIDUAL_VERIFIED = "INDIVIDUAL_VERIFIED",
    RO_IDENTIFIED= "RO_IDENTIFIED",
    RO_VERIFIED = "RO_VERIFIED",
    RO_DECLARATION = "RO_DECLARATION"
}
