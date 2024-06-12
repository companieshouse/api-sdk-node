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

export interface DateOfBirth {
    day?: string;
    month: string;
    year: string;
};

export interface ResultsLinks {
    self: string,
    personsWithSignificantControlStatementsList?: string;
};

export interface ItemLinks {
    self: string,
    statement?: string;
};

export interface LinksResource {
    self: string,
    validation_status: string
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

export interface PscVerification {
    createdAt: Date,
    updatedAt: Date,
    links: LinksResource,
    data: PscVerificationDataResource;
}

export interface PscVerificationResource {
    created_at: Date,
    updated_at: Date,
    links: LinksResource,
    data: PscVerificationDataResource;
}

export interface PscVerificationDataResource {
    company_number?: string,
    psc_appointment_id?: string,
    relevant_officer?: RelevantOfficerResource,
    verification_details?: VerificationDetailsResource
}

export interface VerificationDetailsResource {
    uvid?: string,
    name_mismatch_reason?: NameMismatchReasonResource,
    verification_statements?: VerificationStatementResource[]
}

export enum NameMismatchReasonResource {
    PREFERRED_NAME = "PREFERRED_NAME",
    MAIDEN_NAME = "MAIDEN_NAME"
}

export enum VerificationStatementResource {
    INDIVIDUAL_VERIFIED = "INDIVIDUAL_VERIFIED",
    RO_IDENTIFIED= "RO_IDENTIFIED",
    RO_VERIFIED = "RO_VERIFIED",
    RO_DECLARATION = "RO_DECLARATION"
}
