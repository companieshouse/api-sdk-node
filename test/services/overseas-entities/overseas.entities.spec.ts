import { describe } from "mocha";
import { expect } from "chai";
import sinon from "sinon";

import * as mockValues from "./overseas.entities.mock";
import Mapping from "../../../src/mapping/mapping";
import { ENTITY_WHO_IS_REGISTERING, PAYMENT_OBJECT_MOCK } from "./overseas.entities.mock";

import Resource, { ApiErrorResponse } from "../../../src/services/resource";

import {
    mapOverseasEntity,
    mapOverseasEntityResource,
    mapOverseasEntityExtraDetails
} from "../../../src/services/overseas-entities/mapping";

import {
    BeneficialOwnersStatementType,
    OverseasEntityCreated,
    OverseasEntityExtraDetails,
    OverseasEntityService,
    BeneficialOwnerPrivateData,
    ManagingOfficerPrivateData,
    TrustData,
    TrustLinkData,
    IndividualTrusteeDataResource,
    CorporateTrusteeDataResource,
    IndividualTrusteeData,
    OverseasEntityResource,
    OverseasEntity,
    TrustCorporate,
    TrustCorporateResource
} from "../../../src/services/overseas-entities";

describe("OverseasEntityService POST Tests suite", () => {
    beforeEach(() => {
        sinon.reset();
        sinon.restore();
    });

    afterEach(done => {
        sinon.reset();
        sinon.restore();
        done();
    });

    it("should return object Id for postOverseasEntity method", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockPostOverseasEntityResponse[201]);
        const oeService = new OverseasEntityService(mockValues.requestClient);
        const data = (await oeService.postOverseasEntity(
            mockValues.TRANSACTION_ID,
            mockValues.OVERSEAS_ENTITY_OBJECT_MOCK
        )) as Resource<OverseasEntityCreated>;

        expect(data.httpStatusCode).to.equal(201);
        expect(data.resource?.id).to.equal(mockValues.mockOverseasEntityCreatedResource.id);
    });

    it("should return error 401 (Unauthorised) for postOverseasEntity method", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockPostOverseasEntityResponse[401]);

        const oeService = new OverseasEntityService(mockValues.requestClient);
        const data = await oeService.postOverseasEntity(mockValues.TRANSACTION_ID, {}) as ApiErrorResponse;

        expect(data.httpStatusCode).to.equal(401);
        expect(data.errors?.[0]).to.equal(mockValues.UNAUTHORISED);
    });

    it("should return error 400 (Bad Request) for postOverseasEntity method", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockPostOverseasEntityResponse[400]);

        const oeService = new OverseasEntityService(mockValues.requestClient);
        const data = await oeService.postOverseasEntity(mockValues.TRANSACTION_ID, {}) as ApiErrorResponse;

        expect(data.httpStatusCode).to.equal(400);
        expect(data.errors?.[0]).to.equal(mockValues.BAD_REQUEST);
    });
});

describe("OverseasEntityService PUT Tests suite", () => {
    beforeEach(() => {
        sinon.reset();
        sinon.restore();
    });

    it("should return httpStatusCode 200 for putOverseasEntity method", async () => {
        sinon.stub(mockValues.requestClient, "httpPut").resolves(mockValues.mockPutOverseasEntityResponse[200]);

        const oeService = new OverseasEntityService(mockValues.requestClient);
        const data = (await oeService.putOverseasEntity(
            mockValues.TRANSACTION_ID,
            mockValues.OVERSEAS_ENTITY_ID,
            mockValues.OVERSEAS_ENTITY_OBJECT_MOCK
        )) as Resource<OverseasEntityCreated>;

        expect(data.httpStatusCode).to.equal(200);
    });

    it("should return error 400 (Bad Request) for putOverseasEntity method", async () => {
        sinon.stub(mockValues.requestClient, "httpPut").resolves(mockValues.mockPutOverseasEntityResponse[400]);

        const oeService = new OverseasEntityService(mockValues.requestClient);
        const data = await oeService.putOverseasEntity(
            mockValues.TRANSACTION_ID,
            mockValues.OVERSEAS_ENTITY_ID,
            {}) as ApiErrorResponse;

        expect(data.httpStatusCode).to.equal(400);
        expect(data.errors![0]).to.equal(mockValues.BAD_REQUEST);
    });
});

describe("OverseasEntityService GET Tests suite", () => {
    beforeEach(() => {
        sinon.reset();
        sinon.restore();
    });

    it("should return httpStatusCode 200 for getOverseasEntity method", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetOverseasEntityResponse[200]);

        const oeService = new OverseasEntityService(mockValues.requestClient);
        const data = (await oeService.getOverseasEntity(
            mockValues.TRANSACTION_ID,
            mockValues.OVERSEAS_ENTITY_ID
        )) as Resource<OverseasEntityCreated>;

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource).to.deep.equal(mockValues.OVERSEAS_ENTITY_OBJECT_MOCK);
    });

    it("should return error 400 (Bad Request) for getOverseasEntity method", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetOverseasEntityResponse[400]);

        const oeService = new OverseasEntityService(mockValues.requestClient);
        const data = await oeService.getOverseasEntity(
            mockValues.TRANSACTION_ID,
            mockValues.OVERSEAS_ENTITY_ID
        ) as ApiErrorResponse;

        expect(data.httpStatusCode).to.equal(400);
        expect(data.errors![0]).to.deep.equal(mockValues.BAD_REQUEST);
    });

    it("should return httpStatusCode 200 for getOverseasEntityDetails method", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetOverseasEntityExtraDetailsResponse[200]);

        const oeService = new OverseasEntityService(mockValues.requestClient);
        const data = (await oeService.getOverseasEntityDetails(
            mockValues.TRANSACTION_ID,
            mockValues.OVERSEAS_ENTITY_ID
        )) as Resource<OverseasEntityExtraDetails>;

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource).to.deep.equal(mockValues.OVERSEAS_ENTITY_EXTRA_DETAILS_OBJECT_MOCK);
    });

    it("should return error 400 (Bad Request) for getOverseasEntityDetails method", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockGetOverseasEntityExtraDetailsResponse[400]);

        const oeService = new OverseasEntityService(mockValues.requestClient);
        const data = await oeService.getOverseasEntityDetails(
            mockValues.TRANSACTION_ID,
            mockValues.OVERSEAS_ENTITY_ID
        ) as ApiErrorResponse;

        expect(data.httpStatusCode).to.equal(400);
        expect(data.errors![0]).to.deep.equal(mockValues.BAD_REQUEST);
    });

    it("should return httpStatusCode 200 for getBeneficialOwners method", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockBeneficialOwnerPrivateDataResponse[200]);

        const oeService = new OverseasEntityService(mockValues.requestClient);
        const data = (await oeService.getBeneficialOwnersPrivateData(
            mockValues.TRANSACTION_ID,
            mockValues.OVERSEAS_ENTITY_ID
        )) as Resource<BeneficialOwnerPrivateData[]>;
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource).to.deep.equal(mockValues.BENEFICIAL_OWNER_PRIVATE_DATA_RESOURCE_MOCK);
    });

    it("should return httpStatusCode 200 and empty fields if no benficial owners for getBeneficialOwners method", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockBeneficialOwnerPrivateDataUndefinedResponse[200]);

        const oeService = new OverseasEntityService(mockValues.requestClient);
        const data = (await oeService.getBeneficialOwnersPrivateData(
            mockValues.TRANSACTION_ID,
            mockValues.OVERSEAS_ENTITY_ID
        )) as Resource<BeneficialOwnerPrivateData[]>;
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource).to.deep.equal(undefined);
    });

    it("should return error 400 (Bad Request) for getBeneficialOwners method", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockBeneficialOwnerPrivateDataResponse[400]);

        const oeService = new OverseasEntityService(mockValues.requestClient);
        const data = await oeService.getBeneficialOwnersPrivateData(
            mockValues.TRANSACTION_ID,
            mockValues.OVERSEAS_ENTITY_ID
        ) as ApiErrorResponse;

        expect(data.httpStatusCode).to.equal(400);
        expect(data.errors![0]).to.deep.equal(mockValues.BAD_REQUEST);
    });
});

describe("Mapping OverseasEntity Tests suite", () => {
    it("should return OverseasEntityResource object from mapOverseasEntity method", async () => {
        const data = mapOverseasEntity({
            entity_name: mockValues.ENTITY_NAME_FIELD_MOCK,
            entity_number: mockValues.ENTITY_NUMBER_MOCK,
            presenter: mockValues.PRESENTER_OBJECT_MOCK,
            entity: mockValues.ENTITY_OBJECT_MOCK,
            due_diligence: mockValues.DUE_DILIGENCE_MOCK,
            overseas_entity_due_diligence: mockValues.OE_DUE_DILIGENCE_MOCK,
            beneficial_owners_statement: BeneficialOwnersStatementType.ALL_IDENTIFIED_ALL_DETAILS,
            beneficial_owners_individual: mockValues.BENEFICIAL_OWNER_INDIVIDUAL_MOCK_LIST,
            beneficial_owners_corporate: mockValues.BENEFICIAL_OWNER_CORPORATE_MOCK_LIST,
            beneficial_owners_government_or_public_authority: mockValues.BENEFICIAL_OWNER_GOVERNMENT_MOCK_LIST,
            managing_officers_individual: mockValues.MANAGING_OFFICERS_INDIVIDUAL_MOCK_LIST,
            managing_officers_corporate: mockValues.MANAGING_OFFICERS_CORPORATE_MOCK_LIST,
            trusts: mockValues.TRUSTS_MOCK,
            update: mockValues.UPDATE_OBJECT_MOCK,
            remove: mockValues.REMOVE_OBJECT_MOCK,
            is_remove: true,
            has_sold_land: "0",
            is_secure_register: "0",
            has_answered_relevant_period_question: true,
            who_is_registering: "agent",
            payment: mockValues.PAYMENT_OBJECT_MOCK
        });

        expect(data.entity_name).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.entity_name);
        expect(data.entity_number).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.entity_number);
        expect(data.presenter).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.presenter);
        expect(data.entity).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.entity);
        expect(data.due_diligence).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.due_diligence);
        expect(data.overseas_entity_due_diligence).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.overseas_entity_due_diligence);
        expect(data.beneficial_owners_statement).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.beneficial_owners_statement);
        expect(data.beneficial_owners_individual?.[0]).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.beneficial_owners_individual?.[0]);
        expect(data.beneficial_owners_corporate?.[0]).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.beneficial_owners_corporate?.[0]);
        expect(data.beneficial_owners_government_or_public_authority?.[0]).to.deep.equal(
            mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.beneficial_owners_government_or_public_authority?.[0]);
        expect(data.managing_officers_individual?.[0]).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.managing_officers_individual?.[0]);
        expect(data.managing_officers_corporate?.[0]).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.managing_officers_corporate?.[0]);
        expect(data.trusts?.[0]).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.trusts?.[0]);
        expect(data.update).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.update);
        expect(data.is_remove).to.deep.equal(true);
        expect(data.has_sold_land).to.deep.equal(false);
        expect(data.is_secure_register).to.deep.equal(false);
        expect(data.has_answered_relevant_period_question).to.deep.equal(true);
        expect(data.who_is_registering).to.deep.equal(ENTITY_WHO_IS_REGISTERING.AGENT);
        expect(data.remove).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.remove);
        expect(data.payment).to.deep.equal(mockValues.PAYMENT_OBJECT_MOCK);
    });

    it("should return OverseasEntityResource object from mapOverseasEntity method", async () => {
        const data = mapOverseasEntity({
            entity_name: mockValues.ENTITY_NAME_FIELD_MOCK,
            entity_number: mockValues.ENTITY_NUMBER_MOCK,
            presenter: mockValues.PRESENTER_OBJECT_MOCK,
            entity: mockValues.ENTITY_OBJECT_MOCK,
            due_diligence: mockValues.DUE_DILIGENCE_MOCK,
            overseas_entity_due_diligence: mockValues.OE_DUE_DILIGENCE_MOCK,
            beneficial_owners_statement: BeneficialOwnersStatementType.ALL_IDENTIFIED_ALL_DETAILS,
            beneficial_owners_individual: mockValues.BENEFICIAL_OWNER_INDIVIDUAL_MOCK_LIST,
            beneficial_owners_corporate: mockValues.BENEFICIAL_OWNER_CORPORATE_MOCK_LIST,
            beneficial_owners_government_or_public_authority: mockValues.BENEFICIAL_OWNER_GOVERNMENT_MOCK_LIST,
            managing_officers_individual: mockValues.MANAGING_OFFICERS_INDIVIDUAL_MOCK_LIST,
            managing_officers_corporate: mockValues.MANAGING_OFFICERS_CORPORATE_MOCK_LIST,
            trusts: mockValues.TRUSTS_MOCK,
            update: mockValues.UPDATE_OBJECT_MOCK,
            remove: mockValues.REMOVE_OBJECT_MOCK,
            is_remove: true,
            has_sold_land: "1",
            is_secure_register: "1",
            has_answered_relevant_period_question: true,
            who_is_registering: "someone_else"
        });

        expect(data.entity_name).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.entity_name);
        expect(data.entity_number).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.entity_number);
        expect(data.presenter).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.presenter);
        expect(data.entity).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.entity);
        expect(data.due_diligence).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.due_diligence);
        expect(data.overseas_entity_due_diligence).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.overseas_entity_due_diligence);
        expect(data.beneficial_owners_statement).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.beneficial_owners_statement);
        expect(data.beneficial_owners_individual?.[0]).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.beneficial_owners_individual?.[0]);
        expect(data.beneficial_owners_corporate?.[0]).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.beneficial_owners_corporate?.[0]);
        expect(data.beneficial_owners_government_or_public_authority?.[0]).to.deep.equal(
            mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.beneficial_owners_government_or_public_authority?.[0]);
        expect(data.managing_officers_individual?.[0]).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.managing_officers_individual?.[0]);
        expect(data.managing_officers_corporate?.[0]).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.managing_officers_corporate?.[0]);
        expect(data.trusts?.[0]).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.trusts?.[0]);
        expect(data.update).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.update);
        expect(data.is_remove).to.deep.equal(true);
        expect(data.has_sold_land).to.deep.equal(true);
        expect(data.is_secure_register).to.deep.equal(true);
        expect(data.has_answered_relevant_period_question).to.deep.equal(true);
        expect(data.who_is_registering).to.deep.equal(ENTITY_WHO_IS_REGISTERING.SOMEONE_ELSE);
        expect(data.remove).to.deep.equal(mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.remove);
    });

    it("should return OverseasEntityResource object from mapOverseasEntity method with all empty sub fields", async () => {
        const data = mapOverseasEntity({
            entity_name: undefined,
            entity_number: undefined,
            presenter: undefined,
            entity: undefined,
            due_diligence: undefined,
            overseas_entity_due_diligence: {},
            beneficial_owners_statement: undefined,
            beneficial_owners_individual: [],
            beneficial_owners_corporate: [],
            beneficial_owners_government_or_public_authority: [],
            managing_officers_individual: [],
            managing_officers_corporate: [],
            trusts: [],
            update: undefined,
            remove: undefined,
            is_remove: undefined,
            has_sold_land: undefined,
            is_secure_register: undefined,
            has_answered_relevant_period_question: undefined,
            who_is_registering: undefined,
            payment: undefined
        });
        expect(data.entity_name).to.deep.equal(null);
        expect(data.entity_number).to.deep.equal(null);
        expect(data.presenter).to.deep.equal(null);
        expect(data.entity).to.deep.equal(null);
        expect(data.due_diligence).to.deep.equal(null);
        expect(data.overseas_entity_due_diligence).to.deep.equal(null);
        expect(data.beneficial_owners_statement).to.deep.equal(undefined);
        expect(data.beneficial_owners_individual).to.deep.equal([]);
        expect(data.beneficial_owners_corporate).to.deep.equal([]);
        expect(data.beneficial_owners_government_or_public_authority).to.deep.equal([]);
        expect(data.managing_officers_individual).to.deep.equal([]);
        expect(data.managing_officers_corporate).to.deep.equal([]);
        expect(data.trusts).to.deep.equal([]);
        expect(data.update).to.deep.equal({});
        expect(data.remove).to.deep.equal({});
        expect(data.is_remove).to.deep.equal(null);
        expect(data.has_sold_land).to.deep.equal(undefined);
        expect(data.is_secure_register).to.deep.equal(undefined);
        expect(data.has_answered_relevant_period_question).to.deep.equal(undefined);
        expect(data.who_is_registering).to.deep.equal(undefined);
        expect(data.payment).to.deep.equal(null);
    });

    it("should return OverseasEntity object from mapOverseasEntityResource method", async () => {
        const OE_RESOURCE = mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK;
        const data = mapOverseasEntityResource({
            entity_name: OE_RESOURCE.entity_name,
            entity_number: OE_RESOURCE.entity_number,
            presenter: OE_RESOURCE.presenter,
            entity: OE_RESOURCE.entity,
            due_diligence: OE_RESOURCE.due_diligence,
            overseas_entity_due_diligence: OE_RESOURCE.overseas_entity_due_diligence,
            beneficial_owners_statement: BeneficialOwnersStatementType.ALL_IDENTIFIED_ALL_DETAILS,
            beneficial_owners_individual: OE_RESOURCE.beneficial_owners_individual,
            beneficial_owners_corporate: OE_RESOURCE.beneficial_owners_corporate,
            beneficial_owners_government_or_public_authority: OE_RESOURCE.beneficial_owners_government_or_public_authority,
            managing_officers_individual: OE_RESOURCE.managing_officers_individual,
            managing_officers_corporate: OE_RESOURCE.managing_officers_corporate,
            trusts: OE_RESOURCE.trusts,
            update: OE_RESOURCE.update,
            remove: OE_RESOURCE.remove,
            is_remove: true,
            has_sold_land: true,
            is_secure_register: true,
            has_answered_relevant_period_question: true,
            who_is_registering: ENTITY_WHO_IS_REGISTERING.AGENT,
            payment: OE_RESOURCE.payment
        });

        expect(data.entity_name).to.deep.equal(mockValues.ENTITY_NAME_FIELD_MOCK);
        expect(data.entity_number).to.deep.equal(mockValues.ENTITY_NUMBER_MOCK);
        expect(data.presenter).to.deep.equal(mockValues.PRESENTER_OBJECT_MOCK);
        expect(data.entity).to.deep.equal(mockValues.ENTITY_OBJECT_MOCK);
        expect(data.due_diligence).to.deep.equal(mockValues.DUE_DILIGENCE_MOCK);
        expect(data.overseas_entity_due_diligence).to.deep.equal(mockValues.OE_DUE_DILIGENCE_MOCK);
        expect(data.beneficial_owners_statement).to.deep.equal(BeneficialOwnersStatementType.ALL_IDENTIFIED_ALL_DETAILS);
        expect(data.beneficial_owners_individual).to.deep.equal(mockValues.BENEFICIAL_OWNER_INDIVIDUAL_MOCK_LIST);
        expect(data.beneficial_owners_corporate).to.deep.equal(mockValues.BENEFICIAL_OWNER_CORPORATE_MOCK_LIST);
        expect(data.beneficial_owners_government_or_public_authority).to.deep.equal(mockValues.BENEFICIAL_OWNER_GOVERNMENT_MOCK_LIST);
        expect(data.managing_officers_individual).to.deep.equal(mockValues.MANAGING_OFFICERS_INDIVIDUAL_MOCK_LIST);
        expect(data.managing_officers_corporate).to.deep.equal(mockValues.MANAGING_OFFICERS_CORPORATE_MOCK_LIST);
        expect(data.trusts).to.deep.equal(mockValues.TRUSTS_MOCK);
        expect(data.trusts).to.deep.equal(mockValues.TRUSTS_MOCK);
        expect(data.update).to.deep.equal(mockValues.UPDATE_OBJECT_MOCK);
        expect(data.remove).to.deep.equal(mockValues.REMOVE_OBJECT_MOCK);
        expect(data.is_remove).to.deep.equal(true);
        expect(data.has_sold_land).to.deep.equal("1");
        expect(data.is_secure_register).to.deep.equal("1");
        expect(data.has_answered_relevant_period_question).to.deep.equal(true);
        expect(data.who_is_registering).to.deep.equal("agent");
        expect(data.payment).to.deep.equal(mockValues.PAYMENT_OBJECT_MOCK);
    });

    it("should return OverseasEntity object from mapOverseasEntityResource method", async () => {
        const OE_RESOURCE = mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK;
        const data = mapOverseasEntityResource({
            entity_name: OE_RESOURCE.entity_name,
            entity_number: OE_RESOURCE.entity_number,
            presenter: OE_RESOURCE.presenter,
            entity: OE_RESOURCE.entity,
            due_diligence: OE_RESOURCE.due_diligence,
            overseas_entity_due_diligence: OE_RESOURCE.overseas_entity_due_diligence,
            beneficial_owners_statement: BeneficialOwnersStatementType.ALL_IDENTIFIED_ALL_DETAILS,
            beneficial_owners_individual: OE_RESOURCE.beneficial_owners_individual,
            beneficial_owners_corporate: OE_RESOURCE.beneficial_owners_corporate,
            beneficial_owners_government_or_public_authority: OE_RESOURCE.beneficial_owners_government_or_public_authority,
            managing_officers_individual: OE_RESOURCE.managing_officers_individual,
            managing_officers_corporate: OE_RESOURCE.managing_officers_corporate,
            trusts: OE_RESOURCE.trusts,
            update: OE_RESOURCE.update,
            remove: OE_RESOURCE.remove,
            is_remove: true,
            has_sold_land: false,
            is_secure_register: false,
            has_answered_relevant_period_question: true,
            who_is_registering: ENTITY_WHO_IS_REGISTERING.SOMEONE_ELSE
        });

        expect(data.entity_name).to.deep.equal(mockValues.ENTITY_NAME_FIELD_MOCK);
        expect(data.entity_number).to.deep.equal(mockValues.ENTITY_NUMBER_MOCK);
        expect(data.presenter).to.deep.equal(mockValues.PRESENTER_OBJECT_MOCK);
        expect(data.entity).to.deep.equal(mockValues.ENTITY_OBJECT_MOCK);
        expect(data.due_diligence).to.deep.equal(mockValues.DUE_DILIGENCE_MOCK);
        expect(data.overseas_entity_due_diligence).to.deep.equal(mockValues.OE_DUE_DILIGENCE_MOCK);
        expect(data.beneficial_owners_statement).to.deep.equal(BeneficialOwnersStatementType.ALL_IDENTIFIED_ALL_DETAILS);
        expect(data.beneficial_owners_individual).to.deep.equal(mockValues.BENEFICIAL_OWNER_INDIVIDUAL_MOCK_LIST);
        expect(data.beneficial_owners_corporate).to.deep.equal(mockValues.BENEFICIAL_OWNER_CORPORATE_MOCK_LIST);
        expect(data.beneficial_owners_government_or_public_authority).to.deep.equal(mockValues.BENEFICIAL_OWNER_GOVERNMENT_MOCK_LIST);
        expect(data.managing_officers_individual).to.deep.equal(mockValues.MANAGING_OFFICERS_INDIVIDUAL_MOCK_LIST);
        expect(data.managing_officers_corporate).to.deep.equal(mockValues.MANAGING_OFFICERS_CORPORATE_MOCK_LIST);
        expect(data.trusts).to.deep.equal(mockValues.TRUSTS_MOCK);
        expect(data.trusts).to.deep.equal(mockValues.TRUSTS_MOCK);
        expect(data.update).to.deep.equal(mockValues.UPDATE_OBJECT_MOCK);
        expect(data.remove).to.deep.equal(mockValues.REMOVE_OBJECT_MOCK);
        expect(data.is_remove).to.deep.equal(true);
        expect(data.has_sold_land).to.deep.equal("0");
        expect(data.is_secure_register).to.deep.equal("0");
        expect(data.has_answered_relevant_period_question).to.deep.equal(true);
        expect(data.who_is_registering).to.deep.equal("someone_else");
    });

    it("should return OverseasEntity object from mapOverseasEntityResource method with just EntityName data", async () => {
        const data = mapOverseasEntityResource({
            entity_name: mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.entity_name,
            entity_number: undefined,
            presenter: undefined,
            entity: undefined,
            due_diligence: undefined,
            overseas_entity_due_diligence: undefined,
            beneficial_owners_statement: undefined,
            beneficial_owners_individual: undefined,
            beneficial_owners_corporate: undefined,
            beneficial_owners_government_or_public_authority: undefined,
            managing_officers_individual: undefined,
            managing_officers_corporate: undefined,
            trusts: undefined,
            is_remove: undefined,
            has_sold_land: undefined,
            is_secure_register: undefined,
            has_answered_relevant_period_question: undefined,
            who_is_registering: undefined,
            payment: undefined
        });

        expect(data.entity_name).to.deep.equal(mockValues.ENTITY_NAME_FIELD_MOCK);
        expect(data.entity_number).to.deep.equal(undefined);
        expect(data.presenter).to.deep.equal({});
        expect(data.entity).to.deep.equal({});
        expect(data.due_diligence).to.deep.equal({});
        expect(data.overseas_entity_due_diligence).to.deep.equal({});
        expect(data.beneficial_owners_statement).to.deep.equal(undefined);
        expect(data.beneficial_owners_individual).to.deep.equal([]);
        expect(data.beneficial_owners_corporate).to.deep.equal([]);
        expect(data.beneficial_owners_government_or_public_authority).to.deep.equal([]);
        expect(data.managing_officers_individual).to.deep.equal([]);
        expect(data.managing_officers_corporate).to.deep.equal([]);
        expect(data.trusts).to.deep.equal([]);
        expect(data.is_remove).to.deep.equal(undefined);
        expect(data.has_sold_land).to.deep.equal(undefined);
        expect(data.is_secure_register).to.deep.equal(undefined);
        expect(data.has_answered_relevant_period_question).to.deep.equal(undefined);
        expect(data.payment).to.deep.equal(null);
    });

    it("should return OverseasEntity object from mapOverseasEntityResource method with just entity number data", async () => {
        const data = mapOverseasEntityResource({
            entity_name: undefined,
            entity_number: mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.entity_number,
            presenter: undefined,
            entity: undefined,
            due_diligence: undefined,
            overseas_entity_due_diligence: undefined,
            beneficial_owners_statement: undefined,
            beneficial_owners_individual: undefined,
            beneficial_owners_corporate: undefined,
            beneficial_owners_government_or_public_authority: undefined,
            managing_officers_individual: undefined,
            managing_officers_corporate: undefined,
            trusts: undefined,
            is_remove: undefined,
            has_sold_land: undefined,
            is_secure_register: undefined,
            has_answered_relevant_period_question: undefined,
            who_is_registering: undefined,
            payment: undefined
        });

        expect(data.entity_name).to.deep.equal(null);
        expect(data.entity_number).to.deep.equal(mockValues.ENTITY_NUMBER_MOCK);
        expect(data.presenter).to.deep.equal({});
        expect(data.entity).to.deep.equal({});
        expect(data.due_diligence).to.deep.equal({});
        expect(data.overseas_entity_due_diligence).to.deep.equal({});
        expect(data.beneficial_owners_statement).to.deep.equal(undefined);
        expect(data.beneficial_owners_individual).to.deep.equal([]);
        expect(data.beneficial_owners_corporate).to.deep.equal([]);
        expect(data.beneficial_owners_government_or_public_authority).to.deep.equal([]);
        expect(data.managing_officers_individual).to.deep.equal([]);
        expect(data.managing_officers_corporate).to.deep.equal([]);
        expect(data.trusts).to.deep.equal([]);
        expect(data.is_remove).to.deep.equal(undefined);
        expect(data.has_sold_land).to.deep.equal(undefined);
        expect(data.is_secure_register).to.deep.equal(undefined);
        expect(data.has_answered_relevant_period_question).to.deep.equal(undefined);
        expect(data.who_is_registering).to.deep.equal(undefined);
        expect(data.payment).to.deep.equal(null);
    });

    it("should return OverseasEntity object from mapOverseasEntityResource method with just Presenter data", async () => {
        const data = mapOverseasEntityResource({
            entity_name: undefined,
            presenter: mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.presenter,
            entity: undefined,
            due_diligence: undefined,
            overseas_entity_due_diligence: undefined,
            beneficial_owners_statement: undefined,
            beneficial_owners_individual: undefined,
            beneficial_owners_corporate: undefined,
            beneficial_owners_government_or_public_authority: undefined,
            managing_officers_individual: undefined,
            managing_officers_corporate: undefined,
            trusts: undefined,
            is_remove: undefined,
            has_sold_land: undefined,
            is_secure_register: undefined,
            has_answered_relevant_period_question: undefined,
            who_is_registering: undefined,
            payment: undefined
        });

        expect(data.entity_name).to.deep.equal(null);
        expect(data.presenter).to.deep.equal(mockValues.PRESENTER_OBJECT_MOCK);
        expect(data.entity).to.deep.equal({});
        expect(data.due_diligence).to.deep.equal({});
        expect(data.overseas_entity_due_diligence).to.deep.equal({});
        expect(data.beneficial_owners_statement).to.deep.equal(undefined);
        expect(data.beneficial_owners_individual).to.deep.equal([]);
        expect(data.beneficial_owners_corporate).to.deep.equal([]);
        expect(data.beneficial_owners_government_or_public_authority).to.deep.equal([]);
        expect(data.managing_officers_individual).to.deep.equal([]);
        expect(data.managing_officers_corporate).to.deep.equal([]);
        expect(data.trusts).to.deep.equal([]);
        expect(data.is_remove).to.deep.equal(undefined);
        expect(data.has_sold_land).to.deep.equal(undefined);
        expect(data.is_secure_register).to.deep.equal(undefined);
        expect(data.has_answered_relevant_period_question).to.deep.equal(undefined);
        expect(data.who_is_registering).to.deep.equal(undefined);
        expect(data.payment).to.deep.equal(null);
    });

    it("should return OverseasEntity object from mapOverseasEntityResource method with just Update data", async () => {
        const data = mapOverseasEntityResource({
            entity_name: undefined,
            presenter: undefined,
            entity: undefined,
            due_diligence: undefined,
            overseas_entity_due_diligence: undefined,
            beneficial_owners_statement: undefined,
            beneficial_owners_individual: undefined,
            beneficial_owners_corporate: undefined,
            beneficial_owners_government_or_public_authority: undefined,
            managing_officers_individual: undefined,
            managing_officers_corporate: undefined,
            trusts: undefined,
            update: mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.update,
            remove: undefined,
            is_remove: undefined,
            has_sold_land: undefined,
            is_secure_register: undefined,
            has_answered_relevant_period_question: undefined,
            who_is_registering: undefined,
            payment: undefined
        });

        expect(data.entity_name).to.deep.equal(null);
        expect(data.presenter).to.deep.equal({});
        expect(data.entity).to.deep.equal({});
        expect(data.due_diligence).to.deep.equal({});
        expect(data.overseas_entity_due_diligence).to.deep.equal({});
        expect(data.beneficial_owners_statement).to.deep.equal(undefined);
        expect(data.beneficial_owners_individual).to.deep.equal([]);
        expect(data.beneficial_owners_corporate).to.deep.equal([]);
        expect(data.beneficial_owners_government_or_public_authority).to.deep.equal([]);
        expect(data.managing_officers_individual).to.deep.equal([]);
        expect(data.managing_officers_corporate).to.deep.equal([]);
        expect(data.trusts).to.deep.equal([]);
        expect(data.update).to.deep.equal(mockValues.UPDATE_OBJECT_MOCK);
        expect(data.remove).to.deep.equal({});
        expect(data.is_remove).to.deep.equal(undefined);
        expect(data.has_sold_land).to.deep.equal(undefined);
        expect(data.is_secure_register).to.deep.equal(undefined);
        expect(data.has_answered_relevant_period_question).to.deep.equal(undefined);
        expect(data.who_is_registering).to.deep.equal(undefined);
        expect(data.payment).to.deep.equal(null);
    });

    it("should return OverseasEntity object from mapOverseasEntityResource method with just Remove data", async () => {
        const data = mapOverseasEntityResource({
            entity_name: undefined,
            presenter: undefined,
            entity: undefined,
            due_diligence: undefined,
            overseas_entity_due_diligence: undefined,
            beneficial_owners_statement: undefined,
            beneficial_owners_individual: undefined,
            beneficial_owners_corporate: undefined,
            beneficial_owners_government_or_public_authority: undefined,
            managing_officers_individual: undefined,
            managing_officers_corporate: undefined,
            trusts: undefined,
            update: undefined,
            remove: mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.remove,
            is_remove: undefined,
            has_sold_land: undefined,
            is_secure_register: undefined,
            has_answered_relevant_period_question: undefined,
            who_is_registering: undefined,
            payment: undefined
        });

        expect(data.entity_name).to.deep.equal(null);
        expect(data.presenter).to.deep.equal({});
        expect(data.entity).to.deep.equal({});
        expect(data.due_diligence).to.deep.equal({});
        expect(data.overseas_entity_due_diligence).to.deep.equal({});
        expect(data.beneficial_owners_statement).to.deep.equal(undefined);
        expect(data.beneficial_owners_individual).to.deep.equal([]);
        expect(data.beneficial_owners_corporate).to.deep.equal([]);
        expect(data.beneficial_owners_government_or_public_authority).to.deep.equal([]);
        expect(data.managing_officers_individual).to.deep.equal([]);
        expect(data.managing_officers_corporate).to.deep.equal([]);
        expect(data.trusts).to.deep.equal([]);
        expect(data.update).to.deep.equal({});
        expect(data.remove).to.deep.equal(mockValues.REMOVE_OBJECT_MOCK);
        expect(data.is_remove).to.deep.equal(undefined);
        expect(data.has_sold_land).to.deep.equal(undefined);
        expect(data.is_secure_register).to.deep.equal(undefined);
        expect(data.has_answered_relevant_period_question).to.deep.equal(undefined);
        expect(data.who_is_registering).to.deep.equal(undefined);
        expect(data.payment).to.deep.equal(null);
    });

    it("should return OverseasEntity object from mapOverseasEntityResource method with mapped Update dates", async () => {
        const data = mapOverseasEntityResource({
            entity_name: undefined,
            presenter: undefined,
            entity: undefined,
            due_diligence: undefined,
            overseas_entity_due_diligence: undefined,
            beneficial_owners_statement: undefined,
            beneficial_owners_individual: undefined,
            beneficial_owners_corporate: undefined,
            beneficial_owners_government_or_public_authority: undefined,
            managing_officers_individual: undefined,
            managing_officers_corporate: undefined,
            trusts: undefined,
            update: mockValues.UPDATE_RESOURCE_MOCK,
            remove: undefined,
            is_remove: undefined,
            has_sold_land: undefined,
            is_secure_register: undefined,
            has_answered_relevant_period_question: undefined,
            who_is_registering: undefined,
            payment: undefined
        });

        expect(data.update).to.deep.equal(mockValues.UPDATE_OBJECT_MOCK);
    });

    it("should return OverseasEntity object from mapOverseasEntityResource method with no Update filing date", async () => {
        const updateResource = {
            ...mockValues.UPDATE_RESOURCE_MOCK
        };
        updateResource.filing_date = undefined;

        const data = mapOverseasEntityResource({
            entity_name: undefined,
            presenter: undefined,
            entity: undefined,
            due_diligence: undefined,
            overseas_entity_due_diligence: undefined,
            beneficial_owners_statement: undefined,
            beneficial_owners_individual: undefined,
            beneficial_owners_corporate: undefined,
            beneficial_owners_government_or_public_authority: undefined,
            managing_officers_individual: undefined,
            managing_officers_corporate: undefined,
            trusts: undefined,
            update: updateResource,
            remove: undefined,
            is_remove: undefined,
            has_answered_relevant_period_question: undefined,
            has_sold_land: undefined,
            is_secure_register: undefined,
            who_is_registering: undefined,
            payment: undefined
        });

        expect(data.update?.filing_date).to.undefined;
    });

    it("should return OverseasEntity object from mapOverseasEntityResource method with no date of creation", async () => {
        const updateResource = {
            ...mockValues.UPDATE_RESOURCE_MOCK
        };
        updateResource.date_of_creation = undefined;

        const data = mapOverseasEntityResource({
            entity_name: undefined,
            presenter: undefined,
            entity: undefined,
            due_diligence: undefined,
            overseas_entity_due_diligence: undefined,
            beneficial_owners_statement: undefined,
            beneficial_owners_individual: undefined,
            beneficial_owners_corporate: undefined,
            beneficial_owners_government_or_public_authority: undefined,
            managing_officers_individual: undefined,
            managing_officers_corporate: undefined,
            trusts: undefined,
            update: updateResource,
            remove: undefined,
            is_remove: undefined,
            has_sold_land: undefined,
            is_secure_register: undefined,
            has_answered_relevant_period_question: undefined,
            who_is_registering: undefined,
            payment: undefined
        });

        expect(data.update?.date_of_creation).to.undefined;
    });

    it("should return OE Due Diligence object with identity_date as InputDate object if identity date is null", () => {
        const dataResource = mapOverseasEntityResource({
            overseas_entity_due_diligence: {
                ...mockValues.OE_DUE_DILIGENCE_RESOURCE_MOCK,
                identity_date: null as any
            }
        });

        expect(dataResource.overseas_entity_due_diligence?.identity_date).to.deep.equal({ day: "", month: "", year: "" });
    });

    it("should return OE Due Diligence object without identity_date field if identity date is undefined", () => {
        const dataResource = mapOverseasEntity({
            overseas_entity_due_diligence: {
                ...mockValues.OE_DUE_DILIGENCE_MOCK,
                identity_date: undefined
            }
        });

        expect(Object.keys(dataResource.overseas_entity_due_diligence!).indexOf("identity_date")).to.equal(-1);
    });

    it("should return OE Due Diligence object without identity_date field if identity date subfields are empty", () => {
        const dataResource = mapOverseasEntity({
            overseas_entity_due_diligence: {
                ...mockValues.OE_DUE_DILIGENCE_MOCK,
                identity_date: { day: "", month: "", year: "" }
            }
        });

        expect(Object.keys(dataResource.overseas_entity_due_diligence!).indexOf("identity_date")).to.equal(-1);
    });

    it("should return OE extra details object with email address", () => {
        const dataResource = mapOverseasEntityExtraDetails({
            email_address: "private@overseasentities.test"
        });

        expect(dataResource.email_address).to.equal("private@overseasentities.test");
    });

    it("should return OE extra details object without email address if empty", () => {
        const dataResource = mapOverseasEntityExtraDetails({} as OverseasEntityExtraDetails);

        expect(dataResource.email_address).to.equal(undefined);
    });

    it("should return OverseasEntity object from mapOverseasEntityResource method with no review trust ceased date", async () => {
        const updateResource = {
            ...mockValues.UPDATE_RESOURCE_MOCK
        };

        if (updateResource.review_trusts) {
            updateResource.review_trusts[0].ceased_date = "";
        }

        const overseasEntity = mapOverseasEntityResource({
            update: updateResource
        });

        expect(overseasEntity.update?.review_trusts?.[0].ceased_date_day).to.be.undefined;
        expect(overseasEntity.update?.review_trusts?.[0].ceased_date_month).to.be.undefined;
        expect(overseasEntity.update?.review_trusts?.[0].ceased_date_year).to.be.undefined;
        expect(overseasEntity.update?.review_trusts?.[0].trust_id).to.equal("1234");
        expect(overseasEntity.update?.review_trusts?.[0].ch_reference).to.equal("_ecba-4TzUTXaln-g8daGtvS4a0");
    });

    it("should return OverseasEntityResource object from mapOverseasEntity method with no review trust ceased date", async () => {
        const update = {
            ...mockValues.UPDATE_OBJECT_MOCK
        };

        if (update.review_trusts) {
            update.review_trusts[0].ceased_date_day = undefined;
            update.review_trusts[0].ceased_date_month = undefined;
            update.review_trusts[0].ceased_date_year = undefined;
        }

        const overseasEntityResource = mapOverseasEntity({
            update
        });

        expect(overseasEntityResource.update?.review_trusts?.[0].ceased_date).to.equal("");
        expect(overseasEntityResource.update?.review_trusts?.[0].trust_id).to.equal("1234");
        expect(overseasEntityResource.update?.review_trusts?.[0].ch_reference).to.equal("_ecba-4TzUTXaln-g8daGtvS4a0");
    });

    it("should return OverseasEntityResource object from mapOverseasEntity method with Trust data but no ceased date", async () => {
        const overseasEntity = {
            trusts: mockValues.TRUSTS_MOCK
        };

        overseasEntity.trusts[0].ceased_date_day = undefined;
        overseasEntity.trusts[0].ceased_date_month = undefined;
        overseasEntity.trusts[0].ceased_date_year = undefined;

        const overseasEntityResource: OverseasEntityResource = mapOverseasEntity(overseasEntity);

        expect(overseasEntityResource.trusts?.[0].ceased_date).to.equal("");
        expect(overseasEntityResource.trusts?.[0].trust_id).to.equal("123");
    });

    it("should return OverseasEntity object from mapOverseasEntityResource method with Trust data but no ceased date", async () => {
        const overseasEntityResource: OverseasEntityResource = {
            trusts: mockValues.TRUSTS_RESOURCE_MOCK
        };

        if (overseasEntityResource.trusts && overseasEntityResource.trusts[0]) {
            overseasEntityResource.trusts[0].ceased_date = "";
        };

        const overseasEntity: OverseasEntity = mapOverseasEntityResource(overseasEntityResource);

        expect(overseasEntity.trusts?.[0].ceased_date_day).to.be.undefined;
        expect(overseasEntity.trusts?.[0].ceased_date_month).to.be.undefined;
        expect(overseasEntity.trusts?.[0].ceased_date_year).to.be.undefined;
        expect(overseasEntity.trusts?.[0].trust_id).to.equal("123");
    });

    it("should return OverseasEntityResource object from mapOverseasEntity method with Trust data but with 'still involved' flag set to null", async () => {
        const overseasEntity = {
            trusts: mockValues.TRUSTS_MOCK
        };

        overseasEntity.trusts[0].trust_still_involved_in_overseas_entity = null as unknown as string;

        const overseasEntityResource: OverseasEntityResource = mapOverseasEntity(overseasEntity);

        expect(overseasEntityResource.trusts?.[0].trust_still_involved_in_overseas_entity).to.equal(null);
    });

    it("should return OverseasEntity object from mapOverseasEntityResource method with Trust data but with 'still involved' flag set to null", async () => {
        const overseasEntityResource: OverseasEntityResource = {
            trusts: mockValues.TRUSTS_RESOURCE_MOCK
        };

        if (overseasEntityResource.trusts && overseasEntityResource.trusts[0]) {
            overseasEntityResource.trusts[0].trust_still_involved_in_overseas_entity = null as unknown as boolean;
        };

        const overseasEntity: OverseasEntity = mapOverseasEntityResource(overseasEntityResource);

        expect(overseasEntity.trusts?.[0].trust_still_involved_in_overseas_entity).to.equal(null);
    });

    it("should return OverseasEntityResource object from mapOverseasEntity method with Trust data but with 'still involved' flag mapped from undefined to null", async () => {
        const overseasEntity = {
            trusts: mockValues.TRUSTS_MOCK
        };

        overseasEntity.trusts[0].trust_still_involved_in_overseas_entity = undefined as unknown as string;

        const overseasEntityResource: OverseasEntityResource = mapOverseasEntity(overseasEntity);

        expect(overseasEntityResource.trusts?.[0].trust_still_involved_in_overseas_entity).to.equal(null);
    });

    it("should return OverseasEntity object from mapOverseasEntityResource method with Trust data but with 'still involved' flag mapped from undefined to null", async () => {
        const overseasEntityResource: OverseasEntityResource = {
            trusts: mockValues.TRUSTS_RESOURCE_MOCK
        };

        if (overseasEntityResource.trusts && overseasEntityResource.trusts[0]) {
            overseasEntityResource.trusts[0].trust_still_involved_in_overseas_entity = undefined as unknown as boolean;
        };

        const overseasEntity: OverseasEntity = mapOverseasEntityResource(overseasEntityResource);

        expect(overseasEntity.trusts?.[0].trust_still_involved_in_overseas_entity).to.equal(null);
    });

    it("should return OverseasEntityResource object from mapOverseasEntity method with Trust Individual data but with 'is_individual_still_involved_in_trust' flag set to null", async () => {
        const overseasEntity = {
            trusts: mockValues.TRUSTS_MOCK,
            update: mockValues.UPDATE_OBJECT_MOCK
        };

        overseasEntity.trusts[0].INDIVIDUALS![0].still_involved = null as unknown as string;
        overseasEntity.update.review_trusts![0].INDIVIDUALS![0].still_involved = null as unknown as string;

        const overseasEntityResource: OverseasEntityResource = mapOverseasEntity(overseasEntity);

        expect(overseasEntityResource.trusts?.[0].INDIVIDUAL?.[0].is_individual_still_involved_in_trust).to.equal(null);
        expect(overseasEntityResource.update?.review_trusts?.[0].INDIVIDUAL?.[0].is_individual_still_involved_in_trust).to.equal(null);
    });

    it("should return OverseasEntity object from mapOverseasEntityResource method with Trust Individual data but with 'still involved' flag set to null", async () => {
        const overseasEntityResource: OverseasEntityResource = {
            trusts: mockValues.TRUSTS_RESOURCE_MOCK,
            update: mockValues.UPDATE_RESOURCE_MOCK
        };

        overseasEntityResource.trusts![0].INDIVIDUAL![0].is_individual_still_involved_in_trust = null as unknown as boolean;
        overseasEntityResource.update!.review_trusts![0].INDIVIDUAL![0].is_individual_still_involved_in_trust = null as unknown as boolean;

        const overseasEntity: OverseasEntity = mapOverseasEntityResource(overseasEntityResource);

        expect(overseasEntity.trusts?.[0].INDIVIDUALS?.[0].still_involved).to.equal(null);
        expect(overseasEntity.update?.review_trusts?.[0].INDIVIDUALS?.[0].still_involved).to.equal(null);
    });

    it("should return OverseasEntityResource object from mapOverseasEntity method with Trust Individual data but with 'is_individual_still_involved_in_trust' flag mapped from undefined to null", async () => {
        const overseasEntity = {
            trusts: mockValues.TRUSTS_MOCK,
            update: mockValues.UPDATE_OBJECT_MOCK
        };

        overseasEntity.trusts[0].INDIVIDUALS![0].still_involved = undefined as unknown as string;
        overseasEntity.update.review_trusts![0].INDIVIDUALS![0].still_involved = undefined as unknown as string;

        const overseasEntityResource: OverseasEntityResource = mapOverseasEntity(overseasEntity);

        expect(overseasEntityResource.trusts?.[0].INDIVIDUAL?.[0].is_individual_still_involved_in_trust).to.equal(null);
        expect(overseasEntityResource.update?.review_trusts?.[0].INDIVIDUAL?.[0].is_individual_still_involved_in_trust).to.equal(null);
    });

    it("should return OverseasEntity object from mapOverseasEntityResource method with Trust Individual data but with 'still involved' flag mapped from undefined to null", async () => {
        const overseasEntityResource: OverseasEntityResource = {
            trusts: mockValues.TRUSTS_RESOURCE_MOCK,
            update: mockValues.UPDATE_RESOURCE_MOCK
        };

        overseasEntityResource.trusts![0].INDIVIDUAL![0].is_individual_still_involved_in_trust = undefined as unknown as boolean;
        overseasEntityResource.update!.review_trusts![0].INDIVIDUAL![0].is_individual_still_involved_in_trust = undefined as unknown as boolean;

        const overseasEntity: OverseasEntity = mapOverseasEntityResource(overseasEntityResource);

        expect(overseasEntity.trusts?.[0].INDIVIDUALS?.[0].still_involved).to.equal(null);
        expect(overseasEntity.update?.review_trusts?.[0].INDIVIDUALS?.[0].still_involved).to.equal(null);
    });

    describe("OverseasEntityService getManagingOfficersPrivateData Tests suite", () => {
        beforeEach(() => {
            sinon.reset();
            sinon.restore();
        });

        it("should return httpStatusCode 200 for getManagingOfficersPrivateData method", async () => {
            sinon.stub(mockValues.requestClient, "httpGet").resolves({
                status: 200,
                body: mockValues.MANAGING_OFFICERS_PRIVATE_DATA_MOCK
            });

            const oeService = new OverseasEntityService(mockValues.requestClient);
            const data = (await oeService.getManagingOfficersPrivateData(
                mockValues.TRANSACTION_ID,
                mockValues.OVERSEAS_ENTITY_ID
            )) as Resource<ManagingOfficerPrivateData[]>;

            expect(data.httpStatusCode).to.equal(200);
            expect(data.resource).to.deep.equal(mockValues.MANAGING_OFFICERS_PRIVATE_DATA_MOCK);
        });

        it("should return error 400 (Bad Request) for getManagingOfficersPrivateData method", async () => {
            sinon.stub(mockValues.requestClient, "httpGet").resolves({
                status: 400,
                error: mockValues.BAD_REQUEST
            });

            const oeService = new OverseasEntityService(mockValues.requestClient);
            const data = await oeService.getManagingOfficersPrivateData(
                mockValues.TRANSACTION_ID,
                mockValues.OVERSEAS_ENTITY_ID
            ) as ApiErrorResponse;

            expect(data.httpStatusCode).to.equal(400);
            expect(data.errors![0]).to.deep.equal(mockValues.BAD_REQUEST);
        });
    });

    describe("OverseasEntityService getTrustsPrivateData Tests suite", () => {
        beforeEach(() => {
            sinon.reset();
            sinon.restore();
        });

        it("should return httpStatusCode 200 for getTrustsPrivateData method", async () => {
            sinon.stub(mockValues.requestClient, "httpGet").resolves({
                status: 200,
                body: mockValues.PRIVATE_TRUSTS_DATA_RESOURCE_MOCK
            });

            const oeService = new OverseasEntityService(mockValues.requestClient);
            const data = (await oeService.getTrustData(
                mockValues.TRANSACTION_ID,
                mockValues.OVERSEAS_ENTITY_ID
            )) as Resource<TrustData[]>;

            expect(data.httpStatusCode).to.equal(200);
            expect(data.resource).to.deep.equal(mockValues.PRIVATE_TRUSTS_DATA_MOCK);
        });

        it("should return httpStatusCode 200 for getTrustsPrivateData method when trust is not ceased", async () => {
            sinon.stub(mockValues.requestClient, "httpGet").resolves({
                status: 200,
                body: mockValues.PRIVATE_TRUSTS_NOT_CEASED_DATA_RESOURCE_MOCK
            });

            const oeService = new OverseasEntityService(mockValues.requestClient);
            const data = (await oeService.getTrustData(
                mockValues.TRANSACTION_ID,
                mockValues.OVERSEAS_ENTITY_ID
            )) as Resource<TrustData[]>;

            expect(data.httpStatusCode).to.equal(200);
            expect(data.resource).to.deep.equal(mockValues.PRIVATE_TRUSTS_NOT_CEASED_DATA_MOCK);
        });

        it("should return error 400 (Bad Request) for getTrustsPrivateData method", async () => {
            sinon.stub(mockValues.requestClient, "httpGet").resolves({
                status: 400,
                error: mockValues.BAD_REQUEST
            });

            const oeService = new OverseasEntityService(mockValues.requestClient);
            const data = await oeService.getTrustData(
                mockValues.TRANSACTION_ID,
                mockValues.OVERSEAS_ENTITY_ID
            ) as ApiErrorResponse;

            expect(data.httpStatusCode).to.equal(400);
            expect(data.errors![0]).to.deep.equal(mockValues.BAD_REQUEST);
        });
    });

    describe("OverseasEntityService getTrustLinksPrivateData Tests suite", () => {
        beforeEach(() => {
            sinon.reset();
            sinon.restore();
        });

        it("should return httpStatusCode 200 for getTrustLinksPrivateData method", async () => {
            sinon.stub(mockValues.requestClient, "httpGet").resolves({
                status: 200,
                body: mockValues.TRUST_LINKS_RESOURCE_MOCK
            });

            const oeService = new OverseasEntityService(mockValues.requestClient);
            const data = (await oeService.getTrustLinks(
                mockValues.TRANSACTION_ID,
                mockValues.OVERSEAS_ENTITY_ID
            )) as Resource<TrustLinkData[]>;

            expect(data.httpStatusCode).to.equal(200);
            expect(data.resource).to.deep.equal(mockValues.TRUST_LINKS_MOCK);
        });

        it("should return error 400 (Bad Request) for getTrustLinksPrivateData method", async () => {
            sinon.stub(mockValues.requestClient, "httpGet").resolves({
                status: 400,
                error: mockValues.BAD_REQUEST
            });

            const oeService = new OverseasEntityService(mockValues.requestClient);
            const data = await oeService.getTrustLinks(
                mockValues.TRANSACTION_ID,
                mockValues.OVERSEAS_ENTITY_ID
            ) as ApiErrorResponse;

            expect(data.httpStatusCode).to.equal(400);
            expect(data.errors![0]).to.deep.equal(mockValues.BAD_REQUEST);
        });
    });

    describe("OverseasEntityService getIndividualTrusteesPrivateData Tests suite", () => {
        beforeEach(() => {
            sinon.reset();
            sinon.restore();
        });

        it("should return httpStatusCode 200 for getIndividualTrusteesPrivateData method", async () => {
            sinon.stub(mockValues.requestClient, "httpGet").resolves({
                status: 200,
                body: mockValues.INDIVIDUAL_TRUSTEES_DATA_RESOURCE_MOCK
            });

            const oeService = new OverseasEntityService(mockValues.requestClient);
            const data = (await oeService.getIndividualTrustees(
                mockValues.TRANSACTION_ID,
                mockValues.OVERSEAS_ENTITY_ID,
                mockValues.PRIVATE_TRUSTS_DATA_ID_MOCK
            )) as Resource<IndividualTrusteeDataResource[]>;

            expect(data.httpStatusCode).to.equal(200);
            expect(data.resource).to.deep.equal(mockValues.INDIVIDUAL_TRUSTEES_DATA_MOCK);
        });

        it("should return error 400 (Bad Request) for getIndividualTrusteesPrivateData method", async () => {
            sinon.stub(mockValues.requestClient, "httpGet").resolves({
                status: 400,
                error: mockValues.BAD_REQUEST
            });

            const oeService = new OverseasEntityService(mockValues.requestClient);
            const data = await oeService.getIndividualTrustees(
                mockValues.TRANSACTION_ID,
                mockValues.OVERSEAS_ENTITY_ID,
                mockValues.PRIVATE_TRUSTS_DATA_ID_MOCK
            ) as ApiErrorResponse;

            expect(data.httpStatusCode).to.equal(400);
            expect(data.errors![0]).to.deep.equal(mockValues.BAD_REQUEST);
        });
    });

    describe("OverseasEntityService getCorporateTrusteesPrivateData Tests suite", () => {
        beforeEach(() => {
            sinon.reset();
            sinon.restore();
        });

        it("should return httpStatusCode 200 for getCorporateTrusteesPrivateData method", async () => {
            sinon.stub(mockValues.requestClient, "httpGet").resolves({
                status: 200,
                body: mockValues.CORPORATE_TRUSTEES_DATA_RESOURCE_MOCK
            });

            const oeService = new OverseasEntityService(mockValues.requestClient);
            const data = (await oeService.getCorporateTrustees(
                mockValues.TRANSACTION_ID,
                mockValues.OVERSEAS_ENTITY_ID,
                mockValues.PRIVATE_TRUSTS_DATA_ID_MOCK
            )) as Resource<CorporateTrusteeDataResource[]>;

            expect(data.httpStatusCode).to.equal(200);
            expect(data.resource).to.deep.equal(mockValues.CORPORATE_TRUSTEES_DATA_MOCK);
        });

        it("should return OverseasEntityResource object from mapOverseasEntity method with trust corporate still involved flag set to null", async () => {
            const overseasEntity = {
                trusts: mockValues.TRUSTS_MOCK
            }

            const trustCorporates = overseasEntity.trusts[0].CORPORATES as TrustCorporate[];
            trustCorporates[0].still_involved = null as unknown as string;
            const overseasEntityResource = mapOverseasEntity(overseasEntity);
            expect(overseasEntityResource.trusts?.[0].CORPORATE?.[0].is_corporate_still_involved_in_trust).to.equal(null);
        });

        it("should return OverseasEntity object from mapOverseasEntityResource method with trust corporate still involved flag set to null", async () => {
            const overseasEntityResource = {
                trusts: mockValues.TRUSTS_RESOURCE_MOCK
            }

            const trustCorporatesResource = overseasEntityResource.trusts[0].CORPORATE as TrustCorporateResource[];
            trustCorporatesResource[0].is_corporate_still_involved_in_trust = null as unknown as boolean;
            const overseasEntity = mapOverseasEntityResource(overseasEntityResource);
            expect(overseasEntity.trusts?.[0].CORPORATES?.[0].still_involved).to.equal(null);
        });

        it("should return OverseasEntityResource object from mapOverseasEntity method with trust corporate still involved flag set to true", async () => {
            const overseasEntity = {
                trusts: mockValues.TRUSTS_MOCK
            }

            const trustCorporates = overseasEntity.trusts[0].CORPORATES as TrustCorporate[];
            trustCorporates[0].still_involved = "Yes" as string;
            const overseasEntityResource = mapOverseasEntity(overseasEntity);
            expect(overseasEntityResource.trusts?.[0].CORPORATE?.[0].is_corporate_still_involved_in_trust).to.equal(true);
        });

        it("should return OverseasEntity object from mapOverseasEntityResource method with trust corporate still involved flag set to yes", async () => {
            const overseasEntityResource = {
                trusts: mockValues.TRUSTS_RESOURCE_MOCK
            }

            const trustCorporatesResource = overseasEntityResource.trusts[0].CORPORATE as TrustCorporateResource[];
            trustCorporatesResource[0].is_corporate_still_involved_in_trust = true as boolean;
            const overseasEntity = mapOverseasEntityResource(overseasEntityResource);
            expect(overseasEntity.trusts?.[0].CORPORATES?.[0].still_involved).to.equal("Yes");
        });

        it("should return OverseasEntityResource object from mapOverseasEntity method with trust corporate still involved flag set to false", async () => {
            const overseasEntity = {
                trusts: mockValues.TRUSTS_MOCK
            }

            const trustCorporates = overseasEntity.trusts[0].CORPORATES as TrustCorporate[];
            trustCorporates[0].still_involved = "No" as string;
            const overseasEntityResource = mapOverseasEntity(overseasEntity);
            expect(overseasEntityResource.trusts?.[0].CORPORATE?.[0].is_corporate_still_involved_in_trust).to.equal(false);
            expect(overseasEntityResource.trusts?.[0].CORPORATE?.[0].ceased_date).to.equal("2005-09-01");
        });

        it("should return OverseasEntity object from mapOverseasEntityResource method with trust corporate still involved flag set to no", async () => {
            const overseasEntityResource = {
                trusts: mockValues.TRUSTS_RESOURCE_MOCK
            }

            const trustCorporatesResource = overseasEntityResource.trusts[0].CORPORATE as TrustCorporateResource[];
            trustCorporatesResource[0].is_corporate_still_involved_in_trust = false as boolean;
            const overseasEntity = mapOverseasEntityResource(overseasEntityResource);
            expect(overseasEntity.trusts?.[0].CORPORATES?.[0].still_involved).to.equal("No");
            expect(overseasEntity.trusts?.[0].CORPORATES?.[0].ceased_date_day).to.equal("1");
            expect(overseasEntity.trusts?.[0].CORPORATES?.[0].ceased_date_month).to.equal("9");
            expect(overseasEntity.trusts?.[0].CORPORATES?.[0].ceased_date_year).to.equal("2005");
        });

        it("should return error 400 (Bad Request) for getCorporateTrusteesPrivateData method", async () => {
            sinon.stub(mockValues.requestClient, "httpGet").resolves({
                status: 400,
                error: mockValues.BAD_REQUEST
            });

            const oeService = new OverseasEntityService(mockValues.requestClient);
            const data = await oeService.getCorporateTrustees(
                mockValues.TRANSACTION_ID,
                mockValues.OVERSEAS_ENTITY_ID,
                mockValues.PRIVATE_TRUSTS_DATA_ID_MOCK
            ) as ApiErrorResponse;

            expect(data.httpStatusCode).to.equal(400);
            expect(data.errors![0]).to.deep.equal(mockValues.BAD_REQUEST);
        });

        it("should pass camel case though but convert snake case for trust retrieval", () => {
            const response = [
                {
                    hashedTrusteeId: "123",
                    trusteeForename1: "test",
                    trusteeForename2: undefined,
                    trustee_surname: "Smith",
                    serviceAddress: {
                        address_line_1: "line1",
                        addressLine2: "line2"
                    },
                    usual_residential_address: {
                        addressLine1: "lineA",
                        address_line_2: "lineB"
                    }
                }
            ];
            const mappedResponse = Mapping.camelCaseKeys<IndividualTrusteeData[]>(response as unknown as IndividualTrusteeDataResource[]);
            expect(mappedResponse).to.deep.equal([
                {
                    hashedTrusteeId: "123",
                    trusteeForename1: "test",
                    trusteeForename2: undefined,
                    trusteeSurname: "Smith",
                    serviceAddress: {
                        addressLine1: "line1",
                        addressLine2: "line2"
                    },
                    usualResidentialAddress: {
                        addressLine1: "lineA",
                        addressLine2: "lineB"
                    }
                }
            ]);
        });
    });
});
