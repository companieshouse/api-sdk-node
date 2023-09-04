import { describe } from "mocha";
import { expect } from "chai";
import sinon from "sinon";

import * as mockValues from "./overseas.entities.mock";
import {
    BeneficialOwnersPrivateData,
    BeneficialOwnersStatementType,
    OverseasEntityCreated,
    OverseasEntityExtraDetails,
    OverseasEntityService
} from "../../../src/services/overseas-entities";
import Resource, { ApiErrorResponse } from "../../../src/services/resource";
import { mapOverseasEntity, mapOverseasEntityResource, mapOverseasEntityExtraDetails } from "../../../src/services/overseas-entities/mapping";
import Mapping from "../../../src/mapping/mapping";

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
        const data = (await oeService.getBeneficialOwnerPrivateData(
            mockValues.TRANSACTION_ID,
            mockValues.OVERSEAS_ENTITY_ID
        )) as Resource<BeneficialOwnersPrivateData>;
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource).to.deep.equal(mockValues.BENEFICIAL_OWNER_PRIVATE_DATA_RESOURCE_MOCK);
    });

    it("should return error 400 (Bad Request) for getBeneficialOwners method", async () => {
        sinon.stub(mockValues.requestClient, "httpGet").resolves(mockValues.mockBeneficialOwnerPrivateDataResponse[400]);

        const oeService = new OverseasEntityService(mockValues.requestClient);
        const data = await oeService.getBeneficialOwnerPrivateData(
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
            update: mockValues.UPDATE_OBJECT_MOCK
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
            update: undefined
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
            update: OE_RESOURCE.update
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
        expect(data.update).to.deep.equal(mockValues.UPDATE_OBJECT_MOCK);
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
            trusts: undefined
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
            trusts: undefined
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
            trusts: undefined
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
            update: mockValues.OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK.update
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
            update: mockValues.UPDATE_RESOURCE_MOCK
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
            update: updateResource
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
            update: updateResource
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

    it("maps private beneficial owner data fields correctly", async () => {
        const addressResource = {
            address_line_1: "20 Any road",
            address_line_2: "Any",
            country: "Anyland",
            locality: "Anytown",
            post_code: "1",
            premises: "premise1",
            region: "region1"
        }
        const data = Mapping.camelCaseKeys({
            bo_private_data: [
                {
                    hashed_id: "somehashedvalue2783",
                    date_became_registrable: "1965-01-01",
                    is_service_address_same_as_usual_address: "N",
                    date_of_birth: "1950-01-01",
                    usual_residential_address: addressResource,
                    principal_address: addressResource
                }
            ]
        }) as BeneficialOwnersPrivateData;
        expect(data.boPrivateData[0].hashedId).to.deep.equal(mockValues.BENEFICIAL_OWNER_PRIVATE_DATA_RESOURCE_MOCK[0].hashedId);
        expect(data.boPrivateData[0].dateOfBirth).to.deep.equal(mockValues.BENEFICIAL_OWNER_PRIVATE_DATA_RESOURCE_MOCK[0].dateOfBirth);
        expect(data.boPrivateData[0].usualResidentialAddress).to.deep.equal(mockValues.BENEFICIAL_OWNER_PRIVATE_DATA_RESOURCE_MOCK[0].usualResidentialAddress);
        expect(data.boPrivateData[0].principalAddress).to.deep.equal(mockValues.BENEFICIAL_OWNER_PRIVATE_DATA_RESOURCE_MOCK[0].principalAddress);
        expect(data.boPrivateData[0].dateBecameRegistrable).to.deep.equal(mockValues.BENEFICIAL_OWNER_PRIVATE_DATA_RESOURCE_MOCK[0].dateBecameRegistrable);
    });
});
