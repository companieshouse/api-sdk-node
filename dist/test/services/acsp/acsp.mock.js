"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockClientVerificationEmail = exports.mockSendEmail = exports.mockAcspApplicationCompleteEmail = exports.mockDeleteAcsp = exports.mockPutAcsp = exports.mockPostAcsp = exports.mockGetAcsp = exports.mockAcspResponce = exports.mockAcsp = exports.mockAcspDto = exports.mockAddress2CamelCase = exports.mockAddress2 = exports.mockAddress1 = exports.requestClient = void 0;
const src_1 = require("../../../src");
exports.requestClient = new src_1.RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "TOKEN_NOT_USED" });
exports.mockAddress1 = {
    address_line_1: "123 Street",
    address_line_2: "Some area",
    country: "United Kingdom",
    locality: "Wales",
    po_box: "123",
    postal_code: "SW1",
    premises: "some premises",
    region: "South"
};
exports.mockAddress2 = {
    address_line_1: "10 This road",
    address_line_2: "This",
    country: "Thisland",
    locality: "Thistown",
    postal_code: "TH1 1AB",
    premises: "10",
    region: "Thisshire"
};
exports.mockAddress2CamelCase = {
    addressLine1: "10 This road",
    addressLine2: "This",
    country: "Thisland",
    locality: "Thistown",
    postalCode: "TH1 1AB",
    premises: "10",
    region: "Thisshire"
};
exports.mockAcspDto = {
    id: "test@test.com",
    type_of_business: "LIMITED_LIABILITY_PARTNERSHIP",
    registered_office_address: exports.mockAddress2,
    role_type: "Member",
    business_name: "Test business",
    work_sector: "AIA"
};
exports.mockAcsp = {
    id: "test@test.com",
    typeOfBusiness: "LIMITED_LIABILITY_PARTNERSHIP",
    registeredOfficeAddress: exports.mockAddress2CamelCase,
    roleType: "Member",
    businessName: "Test business",
    workSector: "AIA"
};
exports.mockAcspResponce = {
    id: "test@test.com",
    typeOfBusiness: "LIMITED_LIABILITY_PARTNERSHIP"
};
exports.mockGetAcsp = {
    200: { status: 200, body: exports.mockAcspDto },
    404: { status: 404, error: "Acsp registration not found" },
    500: { status: 500, error: "Internal server error" }
};
exports.mockPostAcsp = {
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
exports.mockPutAcsp = {
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
exports.mockDeleteAcsp = {
    204: { status: 204 },
    404: { status: 404 }
};
exports.mockAcspApplicationCompleteEmail = {
    200: { status: 200 },
    404: { status: 404 },
    500: { status: 500 }
};
exports.mockSendEmail = {
    200: { status: 200 },
    500: { status: 500 }
};
exports.mockClientVerificationEmail = {
    to: "email@acsp.com",
    clientName: "Test Client",
    referenceNumber: "123456",
    clientEmailAddress: "TestClient@clientemail.com"
};
//# sourceMappingURL=acsp.mock.js.map