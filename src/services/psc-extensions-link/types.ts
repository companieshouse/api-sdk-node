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
    kind?: string
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
    kind?: string
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

export interface PscExtensionResource {
    created_at: Date,
    updated_at: Date,
    links: LinksResource,
    data: PscExtensionDataResource;
}

export interface PscExtensionDataResource {
    company_number?: string,
    psc_notification_id?: string,
    extensionDetails?: ExtensionDetailsResource
}

export interface PscExtension {
    createdAt: Date,
    updatedAt: Date,
    links: Links,
    data: PscExtensionData;
}
export interface PscExtensionData {
    requesterEmail: string,
    companyNumber?: string,
    pscNotificationId?: string,
    extensionDetails?: ExtensionDetails
}

export interface ExtensionDetailsResource {
    extensionReason?: string,
    extensionStatus?: string,
    extensionRequestDate?: string
}

export interface ExtensionDetails {
    extensionReason?: string,
    extensionStatus?: string,
    extensionRequestDate?: string
}

export interface ValidationStatusError {
    error: string;
    location: string;
    type?: string;
    locationType: string;
}
export interface ValidationStatusResponse {
    errors: ValidationStatusError[];
    valid: boolean;
}
export interface ValidationStatusErrorResource {
    error: string;
    location: string;
    location_type: string;
    type?: string;
}
export interface ValidationStatusResponseResource {
    errors: ValidationStatusErrorResource[];
    valid: boolean;
}
