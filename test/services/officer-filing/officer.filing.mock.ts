import {
    CompanyOfficerResource, ValidationStatusErrorResource, ValidationStatusResponseResource, OfficerFilingDto
} from "../../../src/services/officer-filing";
import { RequestClient } from "../../../src";

export const requestClient = new RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "TOKEN_NOT_USED" });

export const mockAddress1 = {
    address_line_1: "123 Street",
    address_line_2: "Some area",
    country: "United Kingdom",
    locality: "Wales",
    po_box: "123",
    postal_code: "SW1",
    premises: "some premises",
    region: "South"
};

export const mockAddress2 = {
    address_line_1: "10 This road",
    address_line_2: "This",
    country: "Thisland",
    locality: "Thistown",
    po_box: "1",
    postal_code: "TH1 1AB",
    premises: "10",
    region: "Thisshire"
};

export const mockDateOfBirth = {
    month: "1",
    year: "1998"
};

export const mockIdentification = {
    identification_type: "some identification type",
    legal_authority: "some legal auth",
    legal_form: "some legal form",
    place_registered: "some place",
    registration_number: "some reg"
};

export const mockLinks = {
    self: "company/00006400/appointments/987",
    officer: {
        appointments: "officers/456/appointments"
    }
};

export const mockOfficerFiling: OfficerFilingDto = {
    reference_appointment_id: "app1",
    reference_etag: "968ada7234bb1eb65778ca4c83a4a42d36669a17",
    resigned_on: "2009-08-29"
}

export const mockActiveDirectorDetails: CompanyOfficerResource = {
    name: "Doe, James John",
    occupation: "singer",
    nationality: "British",
    date_of_birth: mockDateOfBirth,
    appointed_on: "1 January 2009",
    links: mockLinks,
    country_of_residence: "Country",
    address: mockAddress1,
    officer_role: "SECRETARY",
    identification: mockIdentification
}

export const mockListActiveDirectorDetails: CompanyOfficerResource[] = [
    {
        name: "Doe, James John",
        occupation: "singer",
        nationality: "British",
        date_of_birth: mockDateOfBirth,
        appointed_on: "1 January 2009",
        links: mockLinks,
        country_of_residence: "Country",
        address: mockAddress1,
        officer_role: "SECRETARY",
        identification: mockIdentification
    },
    {
        name: "JONES, Tim Bill",
        occupation: "singer",
        nationality: "British",
        date_of_birth: mockDateOfBirth,
        appointed_on: "1 January 2009",
        links: mockLinks,
        country_of_residence: "Country",
        address: mockAddress1,
        officer_role: "SECRETARY",
        identification: mockIdentification
    }
]

export const mockDirectorAndTerminationDate: CompanyOfficerResource = {
    name: "Doe, James John",
    occupation: "singer",
    nationality: "British",
    date_of_birth: mockDateOfBirth,
    appointed_on: "1 January 2009",
    links: mockLinks,
    country_of_residence: "Country",
    address: mockAddress1,
    officer_role: "SECRETARY",
    identification: mockIdentification,
    resigned_on: "1 January 2009"
}

export const mockValidationStatusError: ValidationStatusErrorResource = {
    error: "European public limited liability company (SE) not permitted",
    location: "$./transactions/185318-541416-850071/officers/646f2b75f8b00c631d83feb2/validation_status",
    type: "ch:validation",
    location_type: "json-path"
}

export const mockValidationStatusResponse: ValidationStatusResponseResource = {
    errors: [mockValidationStatusError],
    is_valid: false
}

export const mockGetOfficerFiling = {
    200: { status: 200, body: mockOfficerFiling },
    404: { status: 404, error: "Officer filing not found" },
    500: { status: 500, error: "Internal server error" }
};

export const mockPatchOfficerFiling = {
    200: {
        status: 200,
        body: {
            data: {
                description: "Appoint a new Director"
            }
        }
    },
    404: { status: 404, error: "Officer filing not found" },
    500: { status: 500, error: "Internal server error" }
};

export const mockPostOfficerFiling = {
    200: {
        status: 200,
        body: {
            data: {
                description: "Update a Director"
            }
        }
    },
    404: { status: 404, error: "Officer filing not found" },
    500: { status: 500, error: "Internal server error" }
};

export const mockGetListActiveDirectorsDetails = {
    200: { status: 200, body: mockListActiveDirectorDetails },
    404: { status: 404, error: "No active directors details were found" },
    500: { status: 500, error: "Internal server error" }
};

export const mockGetCurrentOrFutureDissolved = {
    200: { status: 200, body: true },
    500: { status: 500, error: "Internal server error" }
}

export const mockGetCurrentOrFutureDissolvedReturnsFalse = {
    200: { status: 200, body: false }
}

export const mockGetDirectorAndTerminationDate = {
    200: { status: 200, body: mockDirectorAndTerminationDate },
    500: { status: 500, error: "Internal server error" }
};

export const mockGetValidationStatusResponse = {
    200: { status: 200, body: mockValidationStatusResponse },
    404: { status: 404, error: "Not Found" },
    500: { status: 500, error: "Internal server error" }
};
