import { RequestClient } from "../../../src";
import { AcspData, AcspDataDto, Address, AddressDto, ClientVerificationEmail } from "../../../src/services/acsp";
export declare const requestClient: RequestClient;
export declare const mockAddress1: {
    address_line_1: string;
    address_line_2: string;
    country: string;
    locality: string;
    po_box: string;
    postal_code: string;
    premises: string;
    region: string;
};
export declare const mockAddress2: AddressDto;
export declare const mockAddress2CamelCase: Address;
export declare const mockAcspDto: AcspDataDto;
export declare const mockAcsp: AcspData;
export declare const mockAcspResponce: {
    id: string;
    typeOfBusiness: string;
};
export declare const mockGetAcsp: {
    200: {
        status: number;
        body: AcspDataDto;
    };
    404: {
        status: number;
        error: string;
    };
    500: {
        status: number;
        error: string;
    };
};
export declare const mockPostAcsp: {
    200: {
        status: number;
        body: {
            id: string;
            typeOfBusiness: string;
        };
    };
    400: {
        status: number;
        error: string;
    };
    409: {
        status: number;
        error: string;
    };
    500: {
        status: number;
        error: string;
    };
};
export declare const mockPutAcsp: {
    200: {
        status: number;
        body: {
            id: string;
            typeOfBusiness: string;
        };
    };
    404: {
        status: number;
        error: string;
    };
    500: {
        status: number;
        error: string;
    };
};
export declare const mockDeleteAcsp: {
    204: {
        status: number;
    };
    404: {
        status: number;
    };
};
export declare const mockAcspApplicationCompleteEmail: {
    200: {
        status: number;
    };
    404: {
        status: number;
    };
    500: {
        status: number;
    };
};
export declare const mockSendEmail: {
    200: {
        status: number;
    };
    500: {
        status: number;
    };
};
export declare const mockClientVerificationEmail: ClientVerificationEmail;
