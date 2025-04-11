import { CompanyOfficerResource, ValidationStatusErrorResource, ValidationStatusResponseResource, OfficerFilingDto } from "../../../src/services/officer-filing";
import { RequestClient } from "../../../src";
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
export declare const mockAddress2: {
    address_line_1: string;
    address_line_2: string;
    country: string;
    locality: string;
    po_box: string;
    postal_code: string;
    premises: string;
    region: string;
};
export declare const mockDateOfBirth: {
    month: string;
    year: string;
};
export declare const mockIdentification: {
    identification_type: string;
    legal_authority: string;
    legal_form: string;
    place_registered: string;
    registration_number: string;
};
export declare const mockLinks: {
    self: string;
    officer: {
        appointments: string;
    };
};
export declare const mockOfficerFiling: OfficerFilingDto;
export declare const mockActiveDirectorDetails: CompanyOfficerResource;
export declare const mockListActiveDirectorDetails: CompanyOfficerResource[];
export declare const mockDirectorAndTerminationDate: CompanyOfficerResource;
export declare const mockValidationStatusError: ValidationStatusErrorResource;
export declare const mockValidationStatusResponse: ValidationStatusResponseResource;
export declare const mockGetOfficerFiling: {
    200: {
        status: number;
        body: OfficerFilingDto;
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
export declare const mockPatchOfficerFiling: {
    200: {
        status: number;
        body: {
            id: string;
            data: {
                description: string;
            };
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
export declare const mockPostOfficerFiling: {
    200: {
        status: number;
        body: {
            id: string;
            data: {
                description: string;
            };
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
export declare const mockGetListActiveDirectorsDetails: {
    200: {
        status: number;
        body: CompanyOfficerResource[];
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
export declare const mockGetCurrentOrFutureDissolved: {
    200: {
        status: number;
        body: boolean;
    };
    500: {
        status: number;
        error: string;
    };
};
export declare const mockGetCurrentOrFutureDissolvedReturnsFalse: {
    200: {
        status: number;
        body: boolean;
    };
};
export declare const mockGetDirectorAndTerminationDate: {
    200: {
        status: number;
        body: CompanyOfficerResource;
    };
    500: {
        status: number;
        error: string;
    };
};
export declare const mockGetValidationStatusResponse: {
    200: {
        status: number;
        body: ValidationStatusResponseResource;
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
