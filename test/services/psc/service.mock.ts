import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { RequestClient } from "../../../src";
import { DateOfBirthResource, PscVerificationDataResource, PscVerificationResource } from "../../../src/services/psc-verification-link/types";
import { PersonWithSignificantControlResource, PscIndWithVerificationState, PscIndWithVerificationStateResource, VerificationState, VerificationStateResource, VerificationStatusEnum } from "../../../src/services/psc/types";

export const requestClient = new RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "123" });

export const COMPANY_NUMBER = "12345678";
export const PSC_NOTIFICATION_ID = "67edfE436y35hetsie6zuAZtr"
export const TRANSACTION_ID = "12345";
export const FILING_ID = "00112233";
export const FIRST_DATE = new Date("2024-03-13T10:08:42Z");
export const UPDATE_DATE = new Date("2024-04-13T10:08:42Z");
export const DOB_DATE = new Date("1970-01-01");
export const SELF_LINK = `/company/${COMPANY_NUMBER}/persons-with-significant-control/individual/${PSC_NOTIFICATION_ID}`;
export const KIND_INDIVIDUAL = "individual-person-with-significant-control";
export const NATURE_OF_CONTROL = ["ownership-of-shares-75-to-100-percent", "voting-rights-75-to-100-percent-as-trust"]
export const NAME = "Sir Forename Middlename Surname";
export const NATIONALITY = "British";
export const NAME_ELEMENTS = {
    title: "Sir",
    forename: "Forename",
    middlename: "Middlename",
    surname: "Surname"
};
export const ADDRESS_RESOURCE = {
    postal_code: "CF14 3UZ",
    locality: "Cardiff",
    region: "South Glamorgan",
    address_line_1: "Crown Way"
};

export const ADDRESS = {
    postalCode: "CF14 3UZ",
    locality: "Cardiff",
    region: "South Glamorgan",
    addressLine1: "Crown Way"
};

export const COUNTRY_OF_RESIDENCE = "Wales";

export const PSC_VERIFICATION_CREATED_RESOURCE: PscVerificationDataResource = {
    company_number: COMPANY_NUMBER
};

const PSC_INDIVIDUAL_DOB: DateOfBirthResource = {
    day: undefined,
    month: "10",
    year: "21"
}

export const PSC_INDIVIDUAL: PersonWithSignificantControlResource = {
    natures_of_control: NATURE_OF_CONTROL,
    kind: KIND_INDIVIDUAL,
    name: NAME,
    name_elements: NAME_ELEMENTS,
    nationality: NATIONALITY,
    address: ADDRESS_RESOURCE,
    country_of_residence: COUNTRY_OF_RESIDENCE,
    links: {
        self: SELF_LINK
    },
    date_of_birth: PSC_INDIVIDUAL_DOB,
    etag: "",
    notified_on: ""
};

export const mockPscVerificationCreatedResource: PscVerificationResource = {
    created_at: FIRST_DATE,
    updated_at: FIRST_DATE,
    data: PSC_VERIFICATION_CREATED_RESOURCE,
    links: {
        self: SELF_LINK,
        validation_status: `${SELF_LINK}/validation_status`
    }
};

export const PSC_VERIFICATION_INDV_PATCH: PscVerificationDataResource = {
    psc_notification_id: PSC_NOTIFICATION_ID
};

export const mockPscVerificationCreatedResponse = {
    201: { status: StatusCodes.CREATED, body: mockPscVerificationCreatedResource },
    400: { status: StatusCodes.BAD_REQUEST, error: ReasonPhrases.BAD_REQUEST },
    401: { status: StatusCodes.UNAUTHORIZED, error: ReasonPhrases.UNAUTHORIZED }
};

export const mockIndividualResponse = {
    200: { status: StatusCodes.OK, body: PSC_INDIVIDUAL },
    401: { status: StatusCodes.UNAUTHORIZED, error: ReasonPhrases.UNAUTHORIZED },
    404: { status: StatusCodes.NOT_FOUND, error: ReasonPhrases.NOT_FOUND }
};

// Verification status
const VERIFICATION_START_DATE = new Date("2024-04-13");
const VERIFICATION_DUE_DATE = new Date("2024-04-27");
const VERIFICATION_STATUS = VerificationStatusEnum.UNVERIFIED;
const ETAG = "etag";

export const VERIFICATION_STATE: VerificationState = {
    verificationStatus: VERIFICATION_STATUS,
    verificationStartDate: VERIFICATION_START_DATE,
    verificationStatementDueDate: VERIFICATION_DUE_DATE
}

export const VERIFICATION_STATE_RESOURCE: VerificationStateResource = {
    verification_status: VERIFICATION_STATUS,
    verification_start_date: VERIFICATION_START_DATE,
    verification_statement_due_date: VERIFICATION_DUE_DATE
}

const PSC_WITH_VERIFICATION_STATE_RESOURCE: PscIndWithVerificationStateResource = {
    country_of_residence: COUNTRY_OF_RESIDENCE,
    date_of_birth: PSC_INDIVIDUAL_DOB,
    name: NAME,
    name_elements: NAME_ELEMENTS,
    notified_on: FIRST_DATE,
    links: {
        self: SELF_LINK
    },
    nationality: NATIONALITY,
    address: ADDRESS_RESOURCE,
    natures_of_control: [],
    etag: ETAG,
    verification_state: VERIFICATION_STATE_RESOURCE
}

export const PSC_WITH_VERIFICATION_STATE: PscIndWithVerificationState = {
    countryOfResidence: COUNTRY_OF_RESIDENCE,
    dateOfBirth: PSC_INDIVIDUAL_DOB,
    name: NAME,
    nameElements: NAME_ELEMENTS,
    notifiedOn: FIRST_DATE,
    links: {
        self: SELF_LINK
    },
    nationality: NATIONALITY,
    address: ADDRESS,
    naturesOfControl: [],
    etag: ETAG,
    verificationState: VERIFICATION_STATE
}

export const mockPscVerificationStateResponse = {
    200: { status: StatusCodes.OK, body: PSC_WITH_VERIFICATION_STATE_RESOURCE },
    400: { status: StatusCodes.BAD_REQUEST, error: ReasonPhrases.BAD_REQUEST },
    404: { status: StatusCodes.NOT_FOUND, error: ReasonPhrases.NOT_FOUND },
    500: { status: StatusCodes.INTERNAL_SERVER_ERROR, error: ReasonPhrases.INTERNAL_SERVER_ERROR }
};
