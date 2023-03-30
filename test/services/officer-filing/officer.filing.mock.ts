import {
    ActiveOfficerDetailsResource
} from "../../../src/services/officer-filing";
import { RequestClient } from "../../../src";

export const requestClient = new RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "TOKEN_NOT_USED" });

export const mockAddress1 = {
    address_line_1: "20 Any road",
    address_line_2: "Any",
    care_of: "xyz",
    country: "Anyland",
    locality: "Anytown",
    po_box: "1",
    postal_code: "AN1 1XY",
    premises: "20",
    region: "Anyshire"
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

export const mockActiveOfficerDetails: ActiveOfficerDetailsResource = {
    fore_name_1: "John",
    fore_name_2: "middle name",
    surname: "Doe",
    occupation: "singer",
    nationality: "British",
    date_of_birth: "1 January 1960",
    date_of_appointment: "1 January 2009",
    country_of_residence: "Country",
    service_address: mockAddress1,
    residential_address: mockAddress2,
    is_corporate: false,
    role: "SECRETARY",
    place_registered: "UNITED KINGDOM",
    registration_number: "012345678",
    law_governed: "INTERNATIONAL BUSINESS COMPANIES ACT 2000",
    legal_form: "INTERNATIONAL BUSINESS COMPANY",
    identification_type: "Y"
}

export const mockListActiveOfficerDetails: ActiveOfficerDetailsResource[] = [
    {
        fore_name_1: "John",
        fore_name_2: "middle name",
        surname: "Doe",
        occupation: "singer",
        nationality: "British",
        date_of_birth: "1 January 1960",
        date_of_appointment: "1 January 2009",
        country_of_residence: "Country",
        service_address: mockAddress1,
        residential_address: mockAddress2,
        is_corporate: false,
        role: "SECRETARY",
        place_registered: "UNITED KINGDOM",
        registration_number: "012345678",
        law_governed: "INTERNATIONAL BUSINESS COMPANIES ACT 2000",
        legal_form: "INTERNATIONAL BUSINESS COMPANY",
        identification_type: "Y"
    },
    {
        fore_name_1: "John",
        fore_name_2: "middle name",
        surname: "Doe",
        occupation: "singer",
        nationality: "British",
        date_of_birth: "1 January 1960",
        date_of_appointment: "1 January 2009",
        country_of_residence: "Country",
        service_address: mockAddress1,
        residential_address: mockAddress2,
        is_corporate: false,
        role: "SECRETARY",
        place_registered: "UNITED KINGDOM",
        registration_number: "012345678",
        law_governed: "INTERNATIONAL BUSINESS COMPANIES ACT 2000",
        legal_form: "INTERNATIONAL BUSINESS COMPANY",
        identification_type: "Y"
    }
]

export const mockGetListActiveOfficersDetails = {
    200: { status: 200, body: mockListActiveOfficerDetails },
    404: { status: 404, error: "No active officers details were found" },
    500: { status: 500, error: "Internal server error" }
};
