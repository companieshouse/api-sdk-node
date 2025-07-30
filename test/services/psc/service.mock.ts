import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { RequestClient } from "../../../src";
import { DateOfBirthResource } from "../../../src/services/psc-verification-link/types";
import { KindEnum, PersonWithSignificantControl, PersonWithSignificantControlResource, VerificationState as IdentityVerificationDetails, VerificationStateResource as IdentityVerificationDetailsResource } from "../../../src/services/psc/types";

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

const APPT_VERIFICATION_END_ON = undefined;
const APPT_VERIFICATION_STATEMENT_DATE = new Date("2024-04-13");
const APPT_VERIFICATION_STATEMENT_DUE_ON = new Date("2024-04-27");
const APPT_VERIFICATION_START_ON = undefined;

const IDENTITY_VERIFICATION_DETAILS: IdentityVerificationDetails = {
    appointmentVerificationEndOn: APPT_VERIFICATION_END_ON,
    appointmentVerificationStatementDate: APPT_VERIFICATION_STATEMENT_DATE,
    appointmentVerificationStatementDueOn: APPT_VERIFICATION_STATEMENT_DUE_ON,
    appointmentVerificationStartOn: APPT_VERIFICATION_START_ON
}

const IDENTITY_VERIFICATION_DETAILS_RESOURCE: IdentityVerificationDetailsResource = {
    appointment_verification_end_on: APPT_VERIFICATION_END_ON,
    appointment_verification_statement_date: APPT_VERIFICATION_STATEMENT_DATE,
    appointment_verification_statement_due_on: APPT_VERIFICATION_STATEMENT_DUE_ON,
    appointment_verification_start_on: APPT_VERIFICATION_START_ON
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
    verification_state: IDENTITY_VERIFICATION_DETAILS_RESOURCE
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
    verificationState: IDENTITY_VERIFICATION_DETAILS
};

export const mockIndividualResponse = {
    200: { status: StatusCodes.OK, body: PSC_INDIVIDUAL_RESOURCE },
    400: { status: StatusCodes.BAD_REQUEST, error: ReasonPhrases.BAD_REQUEST },
    401: { status: StatusCodes.UNAUTHORIZED, error: ReasonPhrases.UNAUTHORIZED },
    404: { status: StatusCodes.NOT_FOUND, error: ReasonPhrases.NOT_FOUND },
    500: { status: StatusCodes.INTERNAL_SERVER_ERROR, error: ReasonPhrases.INTERNAL_SERVER_ERROR }
};
