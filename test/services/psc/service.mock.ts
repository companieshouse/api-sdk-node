import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { RequestClient } from "../../../src";
import { DateOfBirthResource } from "../../../src/services/psc-verification-link/types";
import { KindEnum, PersonWithSignificantControl, PersonWithSignificantControlResource, VerificationState, VerificationStateResource, VerificationStatusEnum } from "../../../src/services/psc/types";

export const requestClient = new RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "123" });
export const COMPANY_NUMBER = "12345678";
export const PSC_NOTIFICATION_ID = "67edfE436y35hetsie6zuAZtr"
const SELF_LINK = `/company/${COMPANY_NUMBER}/persons-with-significant-control/individual/${PSC_NOTIFICATION_ID}`;
const NATURE_OF_CONTROL = ["ownership-of-shares-75-to-100-percent", "voting-rights-75-to-100-percent-as-trust"]
const NAME = "Sir Forename Middlename Surname";
const NATIONALITY = "British";
const NOTIFICATION_DATE = "2023-01-02";
const ETAG = "etag";

const NAME_ELEMENTS = {
    title: "Sir",
    forename: "Forename",
    middlename: "Middlename",
    surname: "Surname"
};

const ADDRESS_RESOURCE = {
    postal_code: "CF14 3UZ",
    locality: "Cardiff",
    region: "South Glamorgan",
    address_line_1: "Crown Way"
};

const ADDRESS = {
    postalCode: "CF14 3UZ",
    locality: "Cardiff",
    region: "South Glamorgan",
    addressLine1: "Crown Way"
};

const COUNTRY_OF_RESIDENCE = "Wales";

const VERIFICATION_START_DATE = new Date("2024-04-13");
const VERIFICATION_DUE_DATE = new Date("2024-04-27");
const VERIFICATION_STATUS = VerificationStatusEnum.UNVERIFIED;

const VERIFICATION_STATE: VerificationState = {
    verificationStatus: VERIFICATION_STATUS,
    verificationStartDate: VERIFICATION_START_DATE,
    verificationStatementDueDate: VERIFICATION_DUE_DATE
}

const VERIFICATION_STATE_RESOURCE: VerificationStateResource = {
    verification_status: VERIFICATION_STATUS,
    verification_start_date: VERIFICATION_START_DATE,
    verification_statement_due_date: VERIFICATION_DUE_DATE
}

const PSC_INDIVIDUAL_DOB: DateOfBirthResource = {
    day: undefined,
    month: "10",
    year: "21"
}

const PSC_INDIVIDUAL_RESOURCE: PersonWithSignificantControlResource = {
    natures_of_control: NATURE_OF_CONTROL,
    kind: KindEnum.INDIVIDUAL_PERSON_WITH_SIGNIFICANT_CONTROL,
    name: NAME,
    name_elements: NAME_ELEMENTS,
    nationality: NATIONALITY,
    address: ADDRESS_RESOURCE,
    country_of_residence: COUNTRY_OF_RESIDENCE,
    links: {
        self: SELF_LINK
    },
    date_of_birth: PSC_INDIVIDUAL_DOB,
    etag: ETAG,
    notified_on: NOTIFICATION_DATE,
    verification_state: VERIFICATION_STATE_RESOURCE
};

export const PSC_INDIVIDUAL: PersonWithSignificantControl = {
    naturesOfControl: NATURE_OF_CONTROL,
    kind: KindEnum.INDIVIDUAL_PERSON_WITH_SIGNIFICANT_CONTROL,
    name: NAME,
    nameElements: NAME_ELEMENTS,
    nationality: NATIONALITY,
    address: ADDRESS,
    countryOfResidence: COUNTRY_OF_RESIDENCE,
    links: {
        self: SELF_LINK
    },
    dateOfBirth: PSC_INDIVIDUAL_DOB,
    etag: ETAG,
    notifiedOn: NOTIFICATION_DATE,
    verificationState: VERIFICATION_STATE
};

export const mockIndividualResponse = {
    200: { status: StatusCodes.OK, body: PSC_INDIVIDUAL_RESOURCE },
    400: { status: StatusCodes.BAD_REQUEST, error: ReasonPhrases.BAD_REQUEST },
    401: { status: StatusCodes.UNAUTHORIZED, error: ReasonPhrases.UNAUTHORIZED },
    404: { status: StatusCodes.NOT_FOUND, error: ReasonPhrases.NOT_FOUND },
    500: { status: StatusCodes.INTERNAL_SERVER_ERROR, error: ReasonPhrases.INTERNAL_SERVER_ERROR }
};
