import {
    CompanyOfficerResource
} from "../../../src/services/officer-filing";
import { RequestClient } from "../../../src";

export const requestClient = new RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "TOKEN_NOT_USED" });

export const mockAddress1 = {
    address_line_1: "123 Street",
    address_line_2: "Some area",
    care_of: "Some council",
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
    care_of: "abc",
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
    officer: {
        appointments: "officers/456/appointments"
    }
};



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
    identification: mockIdentification,
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
        identification: mockIdentification,
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
        identification: mockIdentification,
    }
]

export const mockGetListActiveDirectorsDetails = {
    200: { status: 200, body: mockListActiveDirectorDetails },
    404: { status: 404, error: "No active directors details were found" },
    500: { status: 500, error: "Internal server error" }
};
