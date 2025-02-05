import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { RequestClient } from "../../../src";
import { DateOfBirthResource, PscVerificationDataResource, PscVerificationResource } from "../../../src/services/psc-verification-link/types";
import { PersonWithSignificantControlResource } from "../../../src/services/psc/types";

export const requestClient = new RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "123" });

export const COMPANY_NUMBER = "12345678";
export const PSC_ID = "67edfE436y35hetsie6zuAZtr"
export const TRANSACTION_ID = "12345";
export const FILING_ID = "00112233";
export const FIRST_DATE = new Date("2024-03-13T10:08:42Z");
export const UPDATE_DATE = new Date("2024-04-13T10:08:42Z");
export const DOB_DATE = new Date("1970-01-01");
export const SELF_LINK = `/company/${COMPANY_NUMBER}/persons-with-significant-control/individual/${PSC_ID}`;
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
export const ADDRESS = {
    postal_code: "CF14 3UZ",
    locality: "Cardiff",
    region: "South Glamorgan",
    address_line_1: "Crown Way"
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
    address: ADDRESS,
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
    psc_appointment_id: PSC_ID
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
