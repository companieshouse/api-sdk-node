import { RequestClient } from "../../../src";
import { Incorporation, LimitedPartnership, LimitedPartnershipResourceCreated, LimitedPartnershipIncorporation, GeneralPartner } from "../../../src/services/limited-partnerships";
export declare const requestClient: RequestClient;
export declare const LIMITED_PARTNERSHIP_OBJECT_MOCK: LimitedPartnership;
export declare const GENERAL_PARTNER_OBJECT_MOCK: GeneralPartner;
export declare const INCORPORATION_OBJECT_MOCK: Incorporation;
export declare const LIMITED_PARTNERSHIP_INCORPORATION_OBJECT_MOCK: LimitedPartnershipIncorporation;
export declare const LIMITED_PARTNERSHIP_INCORPORATION_OBJECT_MOCK_WITH_SUB: LimitedPartnershipIncorporation;
export declare const TRANSACTION_ID = "12345";
export declare const SUBMISSION_ID = "09876";
export declare const GENERAL_PARTNER_ID = "00112233";
export declare const LIMITED_PARTNERSHIP_ID = "00112233";
export declare const FILE_RESOURCE_ID = "a1b2c3";
export declare const UNAUTHORISED = "Unauthorised";
export declare const BAD_REQUEST = "Bad Request";
export declare const NOT_FOUND = "Not Found";
export declare const mockLimitedPartnershipCreatedResource: LimitedPartnershipResourceCreated;
export declare const mockPostLimitedPartnershipResponse: {
    200: {
        status: number;
    };
    201: {
        status: number;
        body: LimitedPartnershipResourceCreated;
    };
    400: {
        status: number;
        body: {
            error: string;
        };
    };
    401: {
        status: number;
        body: {
            error: string;
        };
    };
};
export declare const mockGetLimitedPartnershipResponse: {
    200: {
        status: number;
        body: LimitedPartnership;
    };
    404: {
        status: number;
        body: {
            error: string;
        };
    };
    401: {
        status: number;
        body: {
            error: string;
        };
    };
};
export declare const mockPostLimitedPartnershipIncorporationResponse: {
    201: {
        status: number;
        body: LimitedPartnershipResourceCreated;
    };
    400: {
        status: number;
        body: {
            error: string;
        };
    };
    401: {
        status: number;
        body: {
            error: string;
        };
    };
};
export declare const mockGetLimitedPartnershipIncorporationResponse: {
    200: {
        status: number;
        body: LimitedPartnershipIncorporation;
    };
    404: {
        status: number;
        body: {
            error: string;
        };
    };
    401: {
        status: number;
        body: {
            error: string;
        };
    };
};
export declare const mockGetLimitedPartnershipIncorporationResponseWithSub: {
    200: {
        status: number;
        body: LimitedPartnershipIncorporation;
    };
};
export declare const mockPostGeneralPartnerResponse: {
    201: {
        status: number;
        body: LimitedPartnershipResourceCreated;
    };
    400: {
        status: number;
        body: {
            error: string;
        };
    };
    401: {
        status: number;
        body: {
            error: string;
        };
    };
};
export declare const mockGetGeneralPartnerResponse: {
    200: {
        status: number;
        body: GeneralPartner;
    };
    404: {
        status: number;
        body: {
            error: string;
        };
    };
    401: {
        status: number;
        body: {
            error: string;
        };
    };
};
export declare const mockPatchGeneralPartnerResponse: {
    200: {
        status: number;
    };
    400: {
        status: number;
        body: {
            error: string;
        };
    };
    401: {
        status: number;
        body: {
            error: string;
        };
    };
};
