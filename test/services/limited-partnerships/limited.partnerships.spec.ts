import { describe } from "mocha";
import { expect } from "chai";
import sinon from "sinon";

import * as mockValues from "./limited.partnerships.mock";
import {
    LimitedPartnership,
    LimitedPartnershipResourceCreated,
    LimitedPartnershipsService,
    LimitedPartnershipIncorporation,
    NameEndingType
} from "../../../src/services/limited-partnerships";
import Resource from "../../../src/services/resource";

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

    describe("LimitedPartnership", () => {
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
                )) as Resource<LimitedPartnershipResourceCreated>;

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
                )) as Resource<any>;

                expect(mockRequest).to.have.been.calledOnce;
                expect(
                    mockRequest.calledWith(
                        "/transactions/12345/limited-partnership/partnership",
                        { data: {} }
                    )
                ).to.be.true;

                expect(response.httpStatusCode).to.equal(401);
                expect(response.resource.error).to.equal(mockValues.UNAUTHORISED);
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
                )) as Resource<any>;

                expect(mockRequest).to.have.been.calledOnce;
                expect(
                    mockRequest.calledWith(
                        "/transactions/12345/limited-partnership/partnership",
                        { data: { name_ending: NameEndingType.LP } }
                    )
                ).to.be.true;

                expect(response.httpStatusCode).to.equal(400);
                expect(response.resource.error).to.equal(mockValues.BAD_REQUEST);
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
                    mockValues.LIMITED_PARTNERSHIP_OBJECT_MOCK.data
                );

                expect(mockRequest).to.have.been.calledOnce;
                expect(
                    mockRequest.calledWith(
                        "/transactions/12345/limited-partnership/partnership/09876",
                        mockValues.LIMITED_PARTNERSHIP_OBJECT_MOCK.data
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
                ) as Resource<any>;

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
                expect(response.resource.error).to.equal(mockValues.BAD_REQUEST);
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
                )) as Resource<any>;

                expect(mockRequest).to.have.been.calledOnce;
                expect(
                    mockRequest.calledWith(
                        "/transactions/12345/limited-partnership/partnership/09876"
                    )
                ).to.be.true;

                expect(response.httpStatusCode).to.equal(401);
                expect(response.resource.error).to.equal(mockValues.UNAUTHORISED);
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
                )) as Resource<any>;

                expect(mockRequest).to.have.been.calledOnce;
                expect(
                    mockRequest.calledWith(
                        "/transactions/12345/limited-partnership/partnership/wrong-id"
                    )
                ).to.be.true;

                expect(response.httpStatusCode).to.equal(404);
                expect(response.resource.error).to.equal(mockValues.NOT_FOUND);
            });
        })
    })

    describe("Incorporation", () => {
        describe("postLimitedPartnershipIncorporation", () => {
            it("should return object Id for postLimitedPartnershipIncorporation method", async () => {
                const mockRequest = sinon
                    .stub(mockValues.requestClient, "httpPost")
                    .resolves(mockValues.mockPostLimitedPartnershipIncorporationResponse[201]);

                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );
                const response = (await service.postLimitedPartnershipIncorporation(
                    mockValues.TRANSACTION_ID,
                    mockValues.INCORPORATION_OBJECT_MOCK
                )) as Resource<LimitedPartnershipResourceCreated>;

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
                    mockValues.TRANSACTION_ID,
                    mockValues.INCORPORATION_OBJECT_MOCK
                )) as Resource<any>;

                expect(mockRequest).to.have.been.calledOnce;
                expect(
                    mockRequest.calledWith(
                        "/transactions/12345/incorporation/limited-partnership"
                    )
                ).to.be.true;

                expect(response.httpStatusCode).to.equal(400);
                expect(response.resource.error).to.equal(mockValues.BAD_REQUEST);
            });

            it("should return error 401 (Unauthorised) for postLimitedPartnershipIncorporation method", async () => {
                const mockRequest = sinon
                    .stub(mockValues.requestClient, "httpPost")
                    .resolves(mockValues.mockPostLimitedPartnershipIncorporationResponse[401]);

                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );
                const response = (await service.postLimitedPartnershipIncorporation(
                    mockValues.TRANSACTION_ID,
                    mockValues.INCORPORATION_OBJECT_MOCK
                )) as Resource<any>;

                expect(mockRequest).to.have.been.calledOnce;
                expect(
                    mockRequest.calledWith(
                        "/transactions/12345/incorporation/limited-partnership"
                    )
                ).to.be.true;

                expect(response.httpStatusCode).to.equal(401);
                expect(response.resource.error).to.equal(mockValues.UNAUTHORISED);
            });
        });

        describe("getLimitedPartnershipIncorporation", () => {
            it("should return a status 200 and the limitedPartnershipIncorporation object no query no sub resources", async () => {
                const mockRequest = sinon
                    .stub(mockValues.requestClient, "httpGet")
                    .resolves(mockValues.mockGetLimitedPartnershipIncorporationResponse[200]);

                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );

                const response = await service.getLimitedPartnershipIncorporation(
                    mockValues.TRANSACTION_ID,
                    mockValues.FILE_RESOURCE_ID
                ) as Resource<LimitedPartnershipIncorporation>;

                expect(mockRequest).to.have.been.calledOnce;
                expect(
                    mockRequest.calledWith(
                        "/transactions/12345/incorporation/limited-partnership/a1b2c3"
                    )
                ).to.be.true;
                expect(response.httpStatusCode).to.equal(200);
                expect(response?.resource).to.eql(mockValues.LIMITED_PARTNERSHIP_INCORPORATION_OBJECT_MOCK);
            });

            it("should return a status 200 and the limitedPartnershipIncorporation object false query no sub resources", async () => {
                const mockRequest = sinon
                    .stub(mockValues.requestClient, "httpGet")
                    .resolves(mockValues.mockGetLimitedPartnershipIncorporationResponse[200]);

                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );

                const response = await service.getLimitedPartnershipIncorporation(
                    mockValues.TRANSACTION_ID,
                    mockValues.FILE_RESOURCE_ID,
                    false
                ) as Resource<LimitedPartnershipIncorporation>;

                expect(mockRequest).to.have.been.calledOnce;
                expect(
                    mockRequest.calledWith(
                        "/transactions/12345/incorporation/limited-partnership/a1b2c3"
                    )
                ).to.be.true;
                expect(response.httpStatusCode).to.equal(200);
                expect(response?.resource).to.eql(mockValues.LIMITED_PARTNERSHIP_INCORPORATION_OBJECT_MOCK);
            });

            it("should return a status 200 and the limitedPartnershipIncorporation object true query returns sub resources", async () => {
                const mockRequest = sinon
                    .stub(mockValues.requestClient, "httpGet")
                    .resolves(mockValues.mockGetLimitedPartnershipIncorporationResponseWithSub[200]);

                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );

                const response = await service.getLimitedPartnershipIncorporation(
                    mockValues.TRANSACTION_ID,
                    mockValues.FILE_RESOURCE_ID,
                    true
                ) as Resource<LimitedPartnershipIncorporation>;

                expect(mockRequest).to.have.been.calledOnce;
                expect(
                    mockRequest.calledWith(
                        "/transactions/12345/incorporation/limited-partnership/a1b2c3?include_sub_resources=true"
                    )
                ).to.be.true;
                expect(response.httpStatusCode).to.equal(200);
                expect(response?.resource).to.eql(mockValues.LIMITED_PARTNERSHIP_INCORPORATION_OBJECT_MOCK_WITH_SUB);
            });

            it("should return error 401 (Unauthorised)", async () => {
                const mockRequest = sinon
                    .stub(mockValues.requestClient, "httpGet")
                    .resolves(mockValues.mockGetLimitedPartnershipIncorporationResponse[401]);

                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );
                const response = (await service.getLimitedPartnershipIncorporation(
                    mockValues.TRANSACTION_ID,
                    mockValues.FILE_RESOURCE_ID
                )) as Resource<any>;

                expect(mockRequest).to.have.been.calledOnce;
                expect(
                    mockRequest.calledWith(
                        "/transactions/12345/incorporation/limited-partnership/a1b2c3"
                    )
                ).to.be.true;

                expect(response.httpStatusCode).to.equal(401);
                expect(response.resource.error).to.equal(mockValues.UNAUTHORISED);
            });

            it("should return error 404 (Not Found)", async () => {
                const mockRequest = sinon
                    .stub(mockValues.requestClient, "httpGet")
                    .resolves(mockValues.mockGetLimitedPartnershipIncorporationResponse[404]);

                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );
                const response = (await service.getLimitedPartnershipIncorporation(
                    mockValues.TRANSACTION_ID,
                    "wrong-id"
                )) as Resource<any>;

                expect(mockRequest).to.have.been.calledOnce;
                expect(
                    mockRequest.calledWith(
                        "/transactions/12345/incorporation/limited-partnership/wrong-id"
                    )
                ).to.be.true;

                expect(response.httpStatusCode).to.equal(404);
                expect(response.resource.error).to.equal(mockValues.NOT_FOUND);
            });
        });
    })

    describe("GeneralPartner", () => {
        describe("postGeneralPartner", () => {
            it("should return object Id for postGeneralPartner method", async () => {
                const mockRequest = sinon
                    .stub(mockValues.requestClient, "httpPost")
                    .resolves(mockValues.mockPostGeneralPartnerResponse[201]);
                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );
                const response = (await service.postGeneralPartner(
                    mockValues.TRANSACTION_ID,
                    mockValues.GENERAL_PARTNER_OBJECT_MOCK
                )) as Resource<LimitedPartnershipResourceCreated>;

                expect(mockRequest).to.have.been.calledOnce;
                expect(
                    mockRequest.calledWith(
                        "/transactions/12345/limited-partnership/general-partner",
                        mockValues.GENERAL_PARTNER_OBJECT_MOCK
                    )
                ).to.be.true;

                expect(response.httpStatusCode).to.equal(201);
                expect(response.resource?.id).to.equal(
                    mockValues.mockLimitedPartnershipCreatedResource.id
                );
            });

            it("should return error 400 (Bad Request)", async () => {
                const mockRequest = sinon
                    .stub(mockValues.requestClient, "httpPost")
                    .resolves(mockValues.mockPostGeneralPartnerResponse[400]);
                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );
                const response = (await service.postGeneralPartner(
                    mockValues.TRANSACTION_ID,
                    {}
                )) as Resource<LimitedPartnershipResourceCreated>;

                expect(mockRequest).to.have.been.calledOnce;
                expect(
                    mockRequest.calledWith(
                        "/transactions/12345/limited-partnership/general-partner",
                        {}
                    )
                ).to.be.true;

                expect(response.httpStatusCode).to.equal(400);
            });
        })
    });
});
