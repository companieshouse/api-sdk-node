import { RequestClient } from "../../../src";
import { AcspData, AcspDto } from "../../../src/services/acsp";

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

export const mockAcspDto: AcspDto = {
    id: "test@test.com",
    typeOfBusiness: "LIMITED_LIABILITY_PARTNERSHIP"
};

export const mockAcsp: AcspData = {
    id: "test@test.com",
    typeOfBusiness: "LIMITED_LIABILITY_PARTNERSHIP"
};

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
