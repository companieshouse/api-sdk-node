import { RequestClient } from "../../../src";
import { Address, Entity, OverseasEntity, OverseasEntityCreated, Presenter } from "../../../src/services/overseas-entities";

export const ADDRESS: Address = {
    property_name_number: "property name 1",
    line_1: "addressLine1",
    line_2: "addressLine2",
    town: "town",
    county: "county",
    country: "country",
    postcode: "BY 2"
};

export const PRESENTER_OBJECT_MOCK = {
    full_name: "string",
    phone_number: "string",
    role: "solicitor",
    role_title: "string",
    anti_money_laundering_registration_number: "string"
} as Presenter;

export const ENTITY_OBJECT_MOCK: Entity = {
    name: "overseasEntityName",
    incorporation_country: "incorporationCountry",
    principal_address: ADDRESS,
    is_service_address_same_as_principal_address: 0,
    service_address: {},
    email: "email",
    legal_form: "legalForm",
    law_governed: "governedLaw",
    public_register_name: "publicRegister",
    registration_number: "123"
};

export const OVERSEAS_ENTITY_OBJECT_MOCK: OverseasEntity = {
    presenter: PRESENTER_OBJECT_MOCK,
    entity: ENTITY_OBJECT_MOCK
};

export const requestClient = new RequestClient({ baseUrl: "URL_NOT_USED", oauthToken: "TOKEN_NOT_USED" });

export const TRANSACTION_ID = "12345";
export const UNAUTHORISED = "Unauthorised";

export const mockOverseasEntityCreatedResource: OverseasEntityCreated = { id: "00112233" };
export const mockPostOverseasEntityResponse = {
    201: { status: 201, body: mockOverseasEntityCreatedResource },
    401: { status: 401, error: UNAUTHORISED }
};
