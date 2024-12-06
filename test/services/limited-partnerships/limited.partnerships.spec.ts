import { describe } from "mocha";
import { expect } from "chai";
import sinon from "sinon";

import * as mockValues from "./limited.partnerships.mock";
import {
    LimitedPartnershipCreated,
    LimitedPartnershipsService,
    NameEndingType
} from "../../../src/services/limited-partnerships";
import Resource, { ApiErrorResponse } from "../../../src/services/resource";

describe("LimitedPartnershipsService POST Tests suite", () => {
    beforeEach(() => {
        sinon.reset();
        sinon.restore();
    });

    afterEach((done) => {
        sinon.reset();
        sinon.restore();
        done();
    });

    describe("postLimitedPartnership", () => {
        it("should return object Id for postLimitedPartnership method", async () => {
            const mockRequest = sinon
                .stub(mockValues.requestClient, "httpPost")
                .resolves(mockValues.mockPostLimitedPartnershipResponse[201]);
            const service = new LimitedPartnershipsService(
                mockValues.requestClient
            );
            const response = (await service.postLimitedPartnership(
                mockValues.TRANSACTION_ID,
                mockValues.LIMITED_PARTNERSHIP_OBJECT_MOCK
            )) as Resource<LimitedPartnershipCreated>;

            expect(mockRequest).to.have.been.calledOnce;
            expect(
                mockRequest.calledWith(
                    "/transactions/12345/limited-partnership/partnership",
                    {
                        data: {
                            partnership_name: "Legalised Asset Stashing",
                            name_ending: "Limited Partnership"
                        }
                    }
                )
            ).to.be.true;

            expect(response.httpStatusCode).to.equal(201);
            expect(response.resource?.id).to.equal(
                mockValues.mockLimitedPartnershipCreatedResource.id
            );
        });

        it("should return error 401 (Unauthorised) for postLimitedPartnership method", async () => {
            const mockRequest = sinon
                .stub(mockValues.requestClient, "httpPost")
                .resolves(mockValues.mockPostLimitedPartnershipResponse[401]);

            const service = new LimitedPartnershipsService(
                mockValues.requestClient
            );
            const response = (await service.postLimitedPartnership(
                mockValues.TRANSACTION_ID,
                { data: {} }
            )) as ApiErrorResponse;

            expect(mockRequest).to.have.been.calledOnce;
            expect(
                mockRequest.calledWith(
                    "/transactions/12345/limited-partnership/partnership",
                    { data: {} }
                )
            ).to.be.true;

            expect(response.httpStatusCode).to.equal(401);
            expect(response.errors?.[0]).to.equal(mockValues.UNAUTHORISED);
        });

        it("should return error 400 (Bad Request) for postLimitedPartnership method", async () => {
            const mockRequest = sinon
                .stub(mockValues.requestClient, "httpPost")
                .resolves(mockValues.mockPostLimitedPartnershipResponse[400]);

            const service = new LimitedPartnershipsService(
                mockValues.requestClient
            );
            const response = (await service.postLimitedPartnership(
                mockValues.TRANSACTION_ID,
                { data: { name_ending: NameEndingType.LP } }
            )) as ApiErrorResponse;

            expect(mockRequest).to.have.been.calledOnce;
            expect(
                mockRequest.calledWith(
                    "/transactions/12345/limited-partnership/partnership",
                    { data: { name_ending: NameEndingType.LP } }
                )
            ).to.be.true;

            expect(response.httpStatusCode).to.equal(400);
            expect(response.errors?.[0]).to.equal(mockValues.BAD_REQUEST);
        });
    })

    describe("patchLimitedPartnership", () => {
        it("should return a status 200", async () => {
            const mockRequest = sinon
                .stub(mockValues.requestClient, "httpPatch")
                .resolves(mockValues.mockPostLimitedPartnershipResponse[200]);

            const service = new LimitedPartnershipsService(
                mockValues.requestClient
            );

            const response = await service.patchLimitedPartnership(
                mockValues.TRANSACTION_ID,
                mockValues.SUBMISSION_ID,
                {
                    type: "email",
                    data: {
                        email: "test@email.com"
                    }
                }
            );

            expect(mockRequest).to.have.been.calledOnce;
            expect(
                mockRequest.calledWith(
                    "/transactions/12345/limited-partnership/partnership/09876",
                    {
                        type: "email",
                        data: {
                            email: "test@email.com"
                        }
                    }
                )
            ).to.be.true;
            expect(response.httpStatusCode).to.equal(200);
        });
    })
});
