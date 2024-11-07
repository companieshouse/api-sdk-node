import { describe } from "mocha";
import { expect } from "chai";
import sinon from "sinon";

import * as mockValues from "./limited.partnerships.mock";
import { LimitedPartnershipCreated, LimitedPartnershipsService } from "../../../src/services/limited-partnerships";
import Resource, { ApiErrorResponse } from "../../../src/services/resource";

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

    it("should return object Id for postLimitedPartnership method", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockPostLimitedPartnershipResponse[201]);
        const service = new LimitedPartnershipsService(mockValues.requestClient);
        const data = (await service.postLimitedPartnership(
            mockValues.TRANSACTION_ID,
            mockValues.LIMITED_PARTNERSHIP_OBJECT_MOCK
        )) as Resource<LimitedPartnershipCreated>;

        expect(data.httpStatusCode).to.equal(201);
        expect(data.resource?.id).to.equal(mockValues.mockLimitedPartnershipCreatedResource.id);
    });

    it("should return error 401 (Unauthorised) for postLimitedPartnership method", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockPostLimitedPartnershipResponse[401]);

        const service = new LimitedPartnershipsService(mockValues.requestClient);
        const data = await service.postLimitedPartnership(mockValues.TRANSACTION_ID, {}) as ApiErrorResponse;

        expect(data.httpStatusCode).to.equal(401);
        expect(data.errors?.[0]).to.equal(mockValues.UNAUTHORISED);
    });

    it("should return error 400 (Bad Request) for postLimitedPartnership method", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockPostLimitedPartnershipResponse[400]);

        const service = new LimitedPartnershipsService(mockValues.requestClient);
        const data = await service.postLimitedPartnership(mockValues.TRANSACTION_ID, {}) as ApiErrorResponse;

        expect(data.httpStatusCode).to.equal(400);
        expect(data.errors?.[0]).to.equal(mockValues.BAD_REQUEST);
    });
});
