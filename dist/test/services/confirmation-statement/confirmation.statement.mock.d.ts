import { ActiveOfficerDetailsResource, CompanyValidationResponseResource, ConfirmationStatementCreatedResource, ConfirmationStatementSubmission, ConfirmationStatementSubmissionResource, PersonOfSignificantControlResource, StatementOfCapitalResource, ShareholderResource, RegisterLocationResource, NextMadeUpToDateResource } from "../../../src/services/confirmation-statement";
import { RequestClient } from "../../../src";
export declare const requestClient: RequestClient;
export declare const mockAddress1: {
    address_line_1: string;
    address_line_2: string;
    care_of: string;
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
    care_of: string;
    country: string;
    locality: string;
    po_box: string;
    postal_code: string;
    premises: string;
    region: string;
};
export declare const mockStatementOfCapital: StatementOfCapitalResource;
export declare const mockConfirmationStatementSubmission: ConfirmationStatementSubmission;
export declare const mockActiveOfficerDetails: ActiveOfficerDetailsResource;
export declare const mockListActiveOfficerDetails: ActiveOfficerDetailsResource[];
export declare const mockPersonsWithSignificantControlList: PersonOfSignificantControlResource[];
export declare const mockPscNoNameNoAddress: PersonOfSignificantControlResource[];
export declare const mockShareholderList: ShareholderResource[];
export declare const mockRegisterLocationsList: RegisterLocationResource[];
export declare const mockConfirmationStatementSubmissionResource: ConfirmationStatementSubmissionResource;
export declare const mockConfirmationStatementSubmissionResourceNoSOC: ConfirmationStatementSubmissionResource;
export declare const mockCompanyValidationResponseResourceCompanyNotFound: CompanyValidationResponseResource;
export declare const mockCompanyValidationResponseResourceOk: CompanyValidationResponseResource;
export declare const mockConfirmationStatementCreatedResource: ConfirmationStatementCreatedResource;
export declare const mockNextMadeUpToDateResourceIsDue: NextMadeUpToDateResource;
export declare const mockNextMadeUpToDateResourceIsNotDue: NextMadeUpToDateResource;
export declare const mockNextMadeUpToDateResourceNoCs: NextMadeUpToDateResource;
export declare const mockCheckEligibility: {
    200: {
        status: number;
        body: CompanyValidationResponseResource;
    };
    202: {
        status: number;
        body: any;
    };
    400: {
        status: number;
        body: CompanyValidationResponseResource;
    };
    401: {
        status: number;
        error: string;
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
export declare const mockCreatePostResponse: {
    201: {
        status: number;
        body: ConfirmationStatementCreatedResource;
    };
    400: {
        status: number;
        body: CompanyValidationResponseResource;
    };
    401: {
        status: number;
        error: string;
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
export declare const mockSubmitPostResponse: {
    200: {
        status: number;
        body: ConfirmationStatementSubmissionResource;
    };
    202: {
        status: number;
        body: ConfirmationStatementSubmissionResource;
    };
    401: {
        status: number;
        error: string;
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
export declare const mockGetStatementOfCapital: {
    200: {
        status: number;
        body: StatementOfCapitalResource;
    };
    404: {
        status: number;
        error: string;
    };
};
export declare const mockGetActiveOfficerDetails: {
    200: {
        status: number;
        body: ActiveOfficerDetailsResource;
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
export declare const mockGetListActiveOfficersDetails: {
    200: {
        status: number;
        body: ActiveOfficerDetailsResource[];
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
export declare const mockGetPersonsOfSignificantControl: {
    200: {
        status: number;
        body: PersonOfSignificantControlResource[];
    };
    500: {
        status: number;
        error: string;
    };
};
export declare const mockGetConfirmationStatementSubmission: {
    200: {
        status: number;
        body: ConfirmationStatementSubmissionResource;
    };
    404: {
        status: number;
        error: string;
    };
};
export declare const mockGetShareholder: {
    200: {
        status: number;
        body: ShareholderResource[];
    };
    500: {
        status: number;
        error: string;
    };
};
export declare const mockGetRegisterLocations: {
    200: {
        status: number;
        body: RegisterLocationResource[];
    };
    500: {
        status: number;
        error: string;
    };
};
