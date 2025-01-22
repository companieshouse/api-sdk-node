import { describe } from "mocha";
import { expect } from "chai";
import sinon from "sinon";

import * as mockValues from "./limited.partnerships.mock";
import {
    LimitedPartnership,
    LimitedPartnershipCreated,
    LimitedPartnershipsService,
    NameEndingType
} from "../../../src/services/limited-partnerships";
import Resource, { ApiErrorResponse } from "../../../src/services/resource";

describe("LimitedPartnershipsService", () => {
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
                {
                    data: {
                        partnership_name: mockValues.LIMITED_PARTNERSHIP_OBJECT_MOCK.data?.partnership_name,
                        name_ending: mockValues.LIMITED_PARTNERSHIP_OBJECT_MOCK.data?.name_ending,
                        partnership_type: mockValues.LIMITED_PARTNERSHIP_OBJECT_MOCK.data?.partnership_type

                    }
                }
            )) as Resource<LimitedPartnershipCreated>;

            expect(mockRequest).to.have.been.calledOnce;
            expect(
                mockRequest.calledWith(
                    "/transactions/12345/limited-partnership/partnership",
                    {
                        data: {
                            partnership_name: "Legalised Asset Stashing",
                            name_ending: "Limited Partnership",
                            partnership_type: "LP"
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
                    email: "test@email.com"
                }
            );

            expect(mockRequest).to.have.been.calledOnce;
            expect(
                mockRequest.calledWith(
                    "/transactions/12345/limited-partnership/partnership/09876",
                    {
                        email: "test@email.com"
                    }
                )
            ).to.be.true;
            expect(response.httpStatusCode).to.equal(200);
        });

        it("should return error 400 (Bad Request)", async () => {
            const mockRequest = sinon
                .stub(mockValues.requestClient, "httpPatch")
                .resolves(mockValues.mockPostLimitedPartnershipResponse[400]);

            const service = new LimitedPartnershipsService(
                mockValues.requestClient
            );

            const response = await service.patchLimitedPartnership(
                mockValues.TRANSACTION_ID,
                mockValues.SUBMISSION_ID,
                {
                    email: "testemail.com"
                }
            ) as ApiErrorResponse;

            expect(mockRequest).to.have.been.calledOnce;
            expect(
                mockRequest.calledWith(
                    "/transactions/12345/limited-partnership/partnership/09876",
                    {
                        email: "testemail.com"
                    }
                )
            ).to.be.true;

            expect(response.httpStatusCode).to.equal(400);
            expect(response.errors?.[0]).to.equal(mockValues.BAD_REQUEST);
        });
    })

    describe("getLimitedPartnership", () => {
        it("should return a status 200 and the limitedPartnership object", async () => {
            const mockRequest = sinon
                .stub(mockValues.requestClient, "httpGet")
                .resolves(mockValues.mockGetLimitedPartnershipResponse[200]);

            const service = new LimitedPartnershipsService(
                mockValues.requestClient
            );

            const response = await service.getLimitedPartnership(
                mockValues.TRANSACTION_ID,
                mockValues.SUBMISSION_ID
            ) as Resource<LimitedPartnership>;

            expect(mockRequest).to.have.been.calledOnce;
            expect(
                mockRequest.calledWith(
                    "/transactions/12345/limited-partnership/partnership/09876"
                )
            ).to.be.true;
            expect(response.httpStatusCode).to.equal(200);
            expect(response?.resource).to.eql(mockValues.LIMITED_PARTNERSHIP_OBJECT_MOCK);
        });

        it("should return error 401 (Unauthorised)", async () => {
            const mockRequest = sinon
                .stub(mockValues.requestClient, "httpGet")
                .resolves(mockValues.mockGetLimitedPartnershipResponse[401]);

            const service = new LimitedPartnershipsService(
                mockValues.requestClient
            );
            const response = (await service.getLimitedPartnership(
                mockValues.TRANSACTION_ID,
                mockValues.SUBMISSION_ID
            )) as ApiErrorResponse;

            expect(mockRequest).to.have.been.calledOnce;
            expect(
                mockRequest.calledWith(
                    "/transactions/12345/limited-partnership/partnership/09876"
                )
            ).to.be.true;

            expect(response.httpStatusCode).to.equal(401);
            expect(response.errors?.[0]).to.equal(mockValues.UNAUTHORISED);
        });

        it("should return error 404 (Not Found)", async () => {
            const mockRequest = sinon
                .stub(mockValues.requestClient, "httpGet")
                .resolves(mockValues.mockGetLimitedPartnershipResponse[404]);

            const service = new LimitedPartnershipsService(
                mockValues.requestClient
            );
            const response = (await service.getLimitedPartnership(
                mockValues.TRANSACTION_ID,
                "wrong-id"
            )) as ApiErrorResponse;

            expect(mockRequest).to.have.been.calledOnce;
            expect(
                mockRequest.calledWith(
                    "/transactions/12345/limited-partnership/partnership/wrong-id"
                )
            ).to.be.true;

            expect(response.httpStatusCode).to.equal(404);
            expect(response.errors?.[0]).to.equal(mockValues.NOT_FOUND);
        });
    })

    describe("postLimitedPartnershipIncorporation", () => {
        it("should return object Id for postLimitedPartnershipIncorporation method", async () => {
            const mockRequest = sinon
            .stub(mockValues.requestClient, "httpPost")
            .resolves(mockValues.mockPostLimitedPartnershipIncorporationResponse[201]);

            const service = new LimitedPartnershipsService(
                mockValues.requestClient
            );
            const response = (await service.postLimitedPartnershipIncorporation(
              mockValues.TRANSACTION_ID
            )) as Resource<LimitedPartnershipCreated>;

            expect(mockRequest).to.have.been.calledOnce;
            expect(
                mockRequest.calledWith(
                    "/transactions/12345/incorporation/limited-partnership"                    
                )
            ).to.be.true;
            expect(response.httpStatusCode).to.equal(201);
            expect(response.resource?.id).to.equal(
                mockValues.mockLimitedPartnershipCreatedResource.id
            );
        });

        it("should return error 400 (Bad Request) for postLimitedPartnershipIncorporation method", async () => {
            const mockRequest = sinon
            .stub(mockValues.requestClient, "httpPost")
            .resolves(mockValues.mockPostLimitedPartnershipIncorporationResponse[400]);

            const service = new LimitedPartnershipsService(
                mockValues.requestClient
            );
            const response = (await service.postLimitedPartnershipIncorporation(
              mockValues.TRANSACTION_ID
            )) as ApiErrorResponse;

            expect(mockRequest).to.have.been.calledOnce;
            expect(
                mockRequest.calledWith(
                    "/transactions/12345/incorporation/limited-partnership"                    
                )
            ).to.be.true;

            expect(response.httpStatusCode).to.equal(400);
            expect(response.errors?.[0]).to.equal(mockValues.BAD_REQUEST);
        });

        it("should return error 401 (Unauthorised) for postLimitedPartnershipIncorporation method", async () => {
            const mockRequest = sinon
            .stub(mockValues.requestClient, "httpPost")
            .resolves(mockValues.mockPostLimitedPartnershipIncorporationResponse[401]);

            const service = new LimitedPartnershipsService(
                mockValues.requestClient
            );
            const response = (await service.postLimitedPartnershipIncorporation(
              mockValues.TRANSACTION_ID
            )) as ApiErrorResponse;

            expect(mockRequest).to.have.been.calledOnce;
            expect(
                mockRequest.calledWith(
                    "/transactions/12345/incorporation/limited-partnership"                    
                )
            ).to.be.true;

            expect(response.httpStatusCode).to.equal(401);
            expect(response.errors?.[0]).to.equal(mockValues.UNAUTHORISED);
        });
    });
});
