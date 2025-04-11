"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockIndividualResponse = exports.PSC_INDIVIDUAL = exports.PSC_NOTIFICATION_ID = exports.COMPANY_NUMBER = exports.requestClient = void 0;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("../../../src");
const types_1 = require("../../../src/services/psc/types");
exports.requestClient = new src_1.RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "123" });
exports.COMPANY_NUMBER = "12345678";
exports.PSC_NOTIFICATION_ID = "67edfE436y35hetsie6zuAZtr";
const SELF_LINK = `/company/${exports.COMPANY_NUMBER}/persons-with-significant-control/individual/${exports.PSC_NOTIFICATION_ID}`;
const NATURE_OF_CONTROL = ["ownership-of-shares-75-to-100-percent", "voting-rights-75-to-100-percent-as-trust"];
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
const VERIFICATION_STATUS = types_1.VerificationStatusEnum.UNVERIFIED;
const VERIFICATION_STATE = {
    verificationStatus: VERIFICATION_STATUS,
    verificationStartDate: VERIFICATION_START_DATE,
    verificationStatementDueDate: VERIFICATION_DUE_DATE
};
const VERIFICATION_STATE_RESOURCE = {
    verification_status: VERIFICATION_STATUS,
    verification_start_date: VERIFICATION_START_DATE,
    verification_statement_due_date: VERIFICATION_DUE_DATE
};
const PSC_INDIVIDUAL_DOB = {
    day: undefined,
    month: "10",
    year: "21"
};
const PSC_INDIVIDUAL_RESOURCE = {
    natures_of_control: NATURE_OF_CONTROL,
    kind: types_1.KindEnum.INDIVIDUAL_PERSON_WITH_SIGNIFICANT_CONTROL,
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
exports.PSC_INDIVIDUAL = {
    naturesOfControl: NATURE_OF_CONTROL,
    kind: types_1.KindEnum.INDIVIDUAL_PERSON_WITH_SIGNIFICANT_CONTROL,
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
exports.mockIndividualResponse = {
    200: { status: http_status_codes_1.StatusCodes.OK, body: PSC_INDIVIDUAL_RESOURCE },
    400: { status: http_status_codes_1.StatusCodes.BAD_REQUEST, error: http_status_codes_1.ReasonPhrases.BAD_REQUEST },
    401: { status: http_status_codes_1.StatusCodes.UNAUTHORIZED, error: http_status_codes_1.ReasonPhrases.UNAUTHORIZED },
    404: { status: http_status_codes_1.StatusCodes.NOT_FOUND, error: http_status_codes_1.ReasonPhrases.NOT_FOUND },
    500: { status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, error: http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR }
};
//# sourceMappingURL=service.mock.js.map