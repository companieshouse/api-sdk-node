import {
    CompanyOfficerResource, ValidationStatusErrorResource, ValidationStatusResponseResource, OfficerFilingDto
} from "../../../src/services/officer-filing";
import { RequestClient } from "../../../src";
import { Acsp, AcspDto } from "../../../src/services/acsp";

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

export const mockAcspDto: AcspDto = {
    id: "test@test.com",
    typeOfBusiness: "LIMITED_LIABILITY_PARTNERSHIP"
};

export const mockAcsp: Acsp = {
    id: "test@test.com",
    typeOfBusiness: "LIMITED_LIABILITY_PARTNERSHIP"
};

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

export const mockAcspResponce = {
    id: "test@test.com",
    typeOfBusiness: "LIMITED_LIABILITY_PARTNERSHIP"
}

export const mockGetAcsp = {
    200: { status: 200, body: mockAcspDto },
    404: { status: 404, error: "Acsp registration not found" },
    500: { status: 500, error: "Internal server error" }
};

export const mockPostAcsp = {
    200: {
        status: 200,
        body: {
            id: "test@test.com",
            typeOfBusiness: "LIMITED_LIABILITY_PARTNERSHIP"
        }
    },
    404: { status: 404, error: "Acsp registration not found" },
    500: { status: 500, error: "Internal server error" }
};
