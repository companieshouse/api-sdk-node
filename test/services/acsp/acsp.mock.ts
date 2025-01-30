import { RequestClient } from "../../../src";
import { AcspData, AcspDataDto, Address, AddressDto, ClientVerificationEmail } from "../../../src/services/acsp";

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

export const mockAddress2: AddressDto = {
    address_line_1: "10 This road",
    address_line_2: "This",
    country: "Thisland",
    locality: "Thistown",
    postal_code: "TH1 1AB",
    premises: "10",
    region: "Thisshire"
};

export const mockAddress2CamelCase: Address = {
    addressLine1: "10 This road",
    addressLine2: "This",
    country: "Thisland",
    locality: "Thistown",
    postalCode: "TH1 1AB",
    premises: "10",
    region: "Thisshire"
};

export const mockAcspDto: AcspDataDto = {
    id: "test@test.com",
    type_of_business: "LIMITED_LIABILITY_PARTNERSHIP",
    registered_office_address: mockAddress2,
    role_type: "Member",
    business_name: "Test business",
    work_sector: "AIA"
};

export const mockAcsp: AcspData = {
    id: "test@test.com",
    typeOfBusiness: "LIMITED_LIABILITY_PARTNERSHIP",
    registeredOfficeAddress: mockAddress2CamelCase,
    roleType: "Member",
    businessName: "Test business",
    workSector: "AIA"
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
    400: { status: 400, error: "Error saving data" },
    409: { status: 409, error: "A document already exist with this id" },
    500: { status: 500, error: "Internal server error" }
};

export const mockPutAcsp = {
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

export const mockDeleteAcsp = {
    204: { status: 204 },
    404: { status: 404 }
};

export const mockAcspApplicationCompleteEmail = {
    200: { status: 200 },
    404: { status: 404 },
    500: { status: 500 }
};

export const mockSendEmail = {
    200: { status: 200 },
    500: { status: 500 }
};

export const mockClientVerificationEmail: ClientVerificationEmail = {
    to: "email@acsp.com",
    clientName: "Test Client",
    referenceNumber: "123456",
    clientEmailAddress: "TestClient@clientemail.com"
};
