import { describe } from "mocha";
import { expect } from "chai";
import sinon from "sinon";

import * as mockValues from "./overseas.entities.mock";
import {
    BeneficialOwnersStatementType,
    OverseasEntityCreated,
    OverseasEntityService
} from "../../../src/services/overseas-entities";
import Resource, { ApiErrorResponse } from "../../../src/services/resource";
import { mapOverseasEntity } from "../../../src/services/overseas-entities/mapping";

describe("OverseasEntityService Tests suite", () => {
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

describe("Mapping OverseasEntity Tests suite", () => {
    it("should return OverseasEntity object from mapOverseasEntity method", async () => {
        const data = mapOverseasEntity({
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
            trusts: mockValues.TRUSTS_MOCK
        });

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
    });

    it("should return OverseasEntity object from mapOverseasEntity method with all empty sub fields", async () => {
        const data = mapOverseasEntity({
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
            trusts: []
        });

        expect(data.presenter).to.deep.equal({});
        expect(data.entity).to.deep.equal({});
        expect(data.due_diligence).to.deep.equal(null);
        expect(data.overseas_entity_due_diligence).to.deep.equal(null);
        expect(data.beneficial_owners_statement).to.deep.equal(undefined);
        expect(data.beneficial_owners_individual).to.deep.equal([]);
        expect(data.beneficial_owners_corporate).to.deep.equal([]);
        expect(data.beneficial_owners_government_or_public_authority).to.deep.equal([]);
        expect(data.managing_officers_individual).to.deep.equal([]);
        expect(data.managing_officers_corporate).to.deep.equal([]);
        expect(data.trusts).to.deep.equal([]);
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
});
