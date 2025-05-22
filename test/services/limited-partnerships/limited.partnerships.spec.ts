import * as mockValues from "./limited.partnerships.mock";
import {
    LimitedPartnership,
    LimitedPartnershipResourceCreated,
    LimitedPartnershipsService,
    LimitedPartnershipIncorporation,
    NameEndingType,
    GeneralPartner,
    LimitedPartner
} from "../../../src/services/limited-partnerships";
import Resource from "../../../src/services/resource";

describe("LimitedPartnershipsService", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    afterEach((done) => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
        done();
    });

    describe("LimitedPartnership", () => {
        describe("postLimitedPartnership", () => {
            it("should return object Id for postLimitedPartnership method", async () => {
                const mockRequest = jest.spyOn(mockValues.requestClient, "httpPost").mockClear()
                    .mockResolvedValue(mockValues.mockPostLimitedPartnershipResponse[201]);
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

                expect(mockRequest).toHaveBeenCalledTimes(1);
                expect(
                    mockRequest
                ).toHaveBeenCalledWith("/transactions/12345/limited-partnership/partnership", {
                    data: {
                        partnership_name: "Legalised Asset Stashing",
                        name_ending: "Limited Partnership",
                        partnership_type: "LP"
                    }
                });

                expect(response.httpStatusCode).toBe(201);
                expect(response.resource?.id).toBe(mockValues.mockLimitedPartnershipCreatedResource.id);
            });

            it(
                "should return error 401 (Unauthorised) for postLimitedPartnership method",
                async () => {
                    const mockRequest = jest.spyOn(mockValues.requestClient, "httpPost").mockClear()
                        .mockResolvedValue(mockValues.mockPostLimitedPartnershipResponse[401]);

                    const service = new LimitedPartnershipsService(
                        mockValues.requestClient
                    );
                    const response = (await service.postLimitedPartnership(
                        mockValues.TRANSACTION_ID,
                        { data: {} }
                    )) as Resource<any>;

                    expect(mockRequest).toHaveBeenCalledTimes(1);
                    expect(
                        mockRequest
                    ).toHaveBeenCalledWith("/transactions/12345/limited-partnership/partnership", { data: {} });

                    expect(response.httpStatusCode).toBe(401);
                    expect(response.resource.error).toBe(mockValues.UNAUTHORISED);
                }
            );

            it(
                "should return error 400 (Bad Request) for postLimitedPartnership method",
                async () => {
                    const mockRequest = jest.spyOn(mockValues.requestClient, "httpPost").mockClear()
                        .mockResolvedValue(mockValues.mockPostLimitedPartnershipResponse[400]);

                    const service = new LimitedPartnershipsService(
                        mockValues.requestClient
                    );
                    const response = (await service.postLimitedPartnership(
                        mockValues.TRANSACTION_ID,
                        { data: { name_ending: NameEndingType.LP } }
                    )) as Resource<any>;

                    expect(mockRequest).toHaveBeenCalledTimes(1);
                    expect(
                        mockRequest
                    ).toHaveBeenCalledWith(
                        "/transactions/12345/limited-partnership/partnership",
                        { data: { name_ending: NameEndingType.LP } }
                    );

                    expect(response.httpStatusCode).toBe(400);
                    expect(response.resource.error).toBe(mockValues.BAD_REQUEST);
                }
            );
        })

        describe("patchLimitedPartnership", () => {
            it("should return a status 200", async () => {
                const mockRequest = jest.spyOn(mockValues.requestClient, "httpPatch").mockClear()
                    .mockResolvedValue(mockValues.mockPostLimitedPartnershipResponse[200]);

                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );

                const response = await service.patchLimitedPartnership(
                    mockValues.TRANSACTION_ID,
                    mockValues.SUBMISSION_ID,
                    mockValues.LIMITED_PARTNERSHIP_OBJECT_MOCK.data
                );

                expect(mockRequest).toHaveBeenCalledTimes(1);
                expect(
                    mockRequest
                ).toHaveBeenCalledWith(
                    "/transactions/12345/limited-partnership/partnership/09876",
                    mockValues.LIMITED_PARTNERSHIP_OBJECT_MOCK.data
                );
                expect(response.httpStatusCode).toBe(200);
            });

            it("should return error 400 (Bad Request)", async () => {
                const mockRequest = jest.spyOn(mockValues.requestClient, "httpPatch").mockClear()
                    .mockResolvedValue(mockValues.mockPostLimitedPartnershipResponse[400]);

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

                expect(mockRequest).toHaveBeenCalledTimes(1);
                expect(
                    mockRequest
                ).toHaveBeenCalledWith("/transactions/12345/limited-partnership/partnership/09876", {
                    email: "testemail.com"
                });

                expect(response.httpStatusCode).toBe(400);
                expect(response.resource.error).toBe(mockValues.BAD_REQUEST);
            });
        })

        describe("getLimitedPartnership", () => {
            it(
                "should return a status 200 and the limitedPartnership object",
                async () => {
                    const mockRequest = jest.spyOn(mockValues.requestClient, "httpGet").mockClear()
                        .mockResolvedValue(mockValues.mockGetLimitedPartnershipResponse[200]);

                    const service = new LimitedPartnershipsService(
                        mockValues.requestClient
                    );

                    const response = await service.getLimitedPartnership(
                        mockValues.TRANSACTION_ID,
                        mockValues.SUBMISSION_ID
                    ) as Resource<LimitedPartnership>;

                    expect(mockRequest).toHaveBeenCalledTimes(1);
                    expect(
                        mockRequest
                    ).toHaveBeenCalledWith("/transactions/12345/limited-partnership/partnership/09876");

                    expect(response.httpStatusCode).toBe(200);
                    expect(response?.resource).toEqual(mockValues.LIMITED_PARTNERSHIP_OBJECT_MOCK);
                }
            );

            it("should return error 401 (Unauthorised)", async () => {
                const mockRequest = jest.spyOn(mockValues.requestClient, "httpGet").mockClear()
                    .mockResolvedValue(mockValues.mockGetLimitedPartnershipResponse[401]);

                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );
                const response = (await service.getLimitedPartnership(
                    mockValues.TRANSACTION_ID,
                    mockValues.SUBMISSION_ID
                )) as Resource<any>;

                expect(mockRequest).toHaveBeenCalledTimes(1);
                expect(
                    mockRequest
                ).toHaveBeenCalledWith("/transactions/12345/limited-partnership/partnership/09876");

                expect(response.httpStatusCode).toBe(401);
                expect(response.resource.error).toBe(mockValues.UNAUTHORISED);
            });

            it("should return error 404 (Not Found)", async () => {
                const mockRequest = jest.spyOn(mockValues.requestClient, "httpGet").mockClear()
                    .mockResolvedValue(mockValues.mockGetLimitedPartnershipResponse[404]);

                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );
                const response = (await service.getLimitedPartnership(
                    mockValues.TRANSACTION_ID,
                    "wrong-id"
                )) as Resource<any>;

                expect(mockRequest).toHaveBeenCalledTimes(1);
                expect(
                    mockRequest
                ).toHaveBeenCalledWith("/transactions/12345/limited-partnership/partnership/wrong-id");

                expect(response.httpStatusCode).toBe(404);
                expect(response.resource.error).toBe(mockValues.NOT_FOUND);
            });
        })
    })

    describe("Incorporation", () => {
        describe("postLimitedPartnershipIncorporation", () => {
            it(
                "should return object Id for postLimitedPartnershipIncorporation method",
                async () => {
                    const mockRequest = jest.spyOn(mockValues.requestClient, "httpPost").mockClear()
                        .mockResolvedValue(mockValues.mockPostLimitedPartnershipIncorporationResponse[201]);

                    const service = new LimitedPartnershipsService(
                        mockValues.requestClient
                    );
                    const response = (await service.postLimitedPartnershipIncorporation(
                        mockValues.TRANSACTION_ID,
                        mockValues.INCORPORATION_OBJECT_MOCK
                    )) as Resource<LimitedPartnershipResourceCreated>;

                    expect(mockRequest).toHaveBeenCalledTimes(1);
                    expect(
                        mockRequest
                    ).toHaveBeenCalledWith("/transactions/12345/incorporation/limited-partnership", {"data": {"kind": "limited-partnership-registration"}});
                    expect(response.httpStatusCode).toBe(201);
                    expect(response.resource?.id).toBe(mockValues.mockLimitedPartnershipCreatedResource.id);
                }
            );

            it(
                "should return error 400 (Bad Request) for postLimitedPartnershipIncorporation method",
                async () => {
                    const mockRequest = jest.spyOn(mockValues.requestClient, "httpPost").mockClear()
                        .mockResolvedValue(mockValues.mockPostLimitedPartnershipIncorporationResponse[400]);

                    const service = new LimitedPartnershipsService(
                        mockValues.requestClient
                    );
                    const response = (await service.postLimitedPartnershipIncorporation(
                        mockValues.TRANSACTION_ID,
                        mockValues.INCORPORATION_OBJECT_MOCK
                    )) as Resource<any>;

                    expect(mockRequest).toHaveBeenCalledTimes(1);
                    expect(
                        mockRequest
                    ).toHaveBeenCalledWith("/transactions/12345/incorporation/limited-partnership", {"data": {"kind": "limited-partnership-registration"}});

                    expect(response.httpStatusCode).toBe(400);
                    expect(response.resource.error).toBe(mockValues.BAD_REQUEST);
                }
            );

            it(
                "should return error 401 (Unauthorised) for postLimitedPartnershipIncorporation method",
                async () => {
                    const mockRequest = jest.spyOn(mockValues.requestClient, "httpPost").mockClear()
                        .mockResolvedValue(mockValues.mockPostLimitedPartnershipIncorporationResponse[401]);

                    const service = new LimitedPartnershipsService(
                        mockValues.requestClient
                    );
                    const response = (await service.postLimitedPartnershipIncorporation(
                        mockValues.TRANSACTION_ID,
                        mockValues.INCORPORATION_OBJECT_MOCK
                    )) as Resource<any>;

                    expect(mockRequest).toHaveBeenCalledTimes(1);
                    expect(
                        mockRequest
                    ).toHaveBeenCalledWith("/transactions/12345/incorporation/limited-partnership", {"data": {"kind": "limited-partnership-registration"}});

                    expect(response.httpStatusCode).toBe(401);
                    expect(response.resource.error).toBe(mockValues.UNAUTHORISED);
                }
            );
        });

        describe("getLimitedPartnershipIncorporation", () => {
            it(
                "should return a status 200 and the limitedPartnershipIncorporation object no query no sub resources",
                async () => {
                    const mockRequest = jest.spyOn(mockValues.requestClient, "httpGet").mockClear()
                        .mockResolvedValue(mockValues.mockGetLimitedPartnershipIncorporationResponse[200]);

                    const service = new LimitedPartnershipsService(
                        mockValues.requestClient
                    );

                    const response = await service.getLimitedPartnershipIncorporation(
                        mockValues.TRANSACTION_ID,
                        mockValues.FILE_RESOURCE_ID
                    ) as Resource<LimitedPartnershipIncorporation>;

                    expect(mockRequest).toHaveBeenCalledTimes(1);
                    expect(
                        mockRequest
                    ).toHaveBeenCalledWith("/transactions/12345/incorporation/limited-partnership/a1b2c3");
                    expect(response.httpStatusCode).toBe(200);
                    expect(response?.resource).toEqual(mockValues.LIMITED_PARTNERSHIP_INCORPORATION_OBJECT_MOCK);
                }
            );

            it(
                "should return a status 200 and the limitedPartnershipIncorporation object false query no sub resources",
                async () => {
                    const mockRequest = jest.spyOn(mockValues.requestClient, "httpGet").mockClear()
                        .mockResolvedValue(mockValues.mockGetLimitedPartnershipIncorporationResponse[200]);

                    const service = new LimitedPartnershipsService(
                        mockValues.requestClient
                    );

                    const response = await service.getLimitedPartnershipIncorporation(
                        mockValues.TRANSACTION_ID,
                        mockValues.FILE_RESOURCE_ID,
                        false
                    ) as Resource<LimitedPartnershipIncorporation>;

                    expect(mockRequest).toHaveBeenCalledTimes(1);
                    expect(
                        mockRequest
                    ).toHaveBeenCalledWith("/transactions/12345/incorporation/limited-partnership/a1b2c3");
                    expect(response.httpStatusCode).toBe(200);
                    expect(response?.resource).toEqual(mockValues.LIMITED_PARTNERSHIP_INCORPORATION_OBJECT_MOCK);
                }
            );

            it(
                "should return a status 200 and the limitedPartnershipIncorporation object true query returns sub resources",
                async () => {
                    const mockRequest = jest.spyOn(mockValues.requestClient, "httpGet").mockClear()
                        .mockResolvedValue(mockValues.mockGetLimitedPartnershipIncorporationResponseWithSub[200]);

                    const service = new LimitedPartnershipsService(
                        mockValues.requestClient
                    );

                    const response = await service.getLimitedPartnershipIncorporation(
                        mockValues.TRANSACTION_ID,
                        mockValues.FILE_RESOURCE_ID,
                        true
                    ) as Resource<LimitedPartnershipIncorporation>;

                    expect(mockRequest).toHaveBeenCalledTimes(1);
                    expect(
                        mockRequest
                    ).toHaveBeenCalledWith(
                        "/transactions/12345/incorporation/limited-partnership/a1b2c3?include_sub_resources=true"
                    );
                    expect(response.httpStatusCode).toBe(200);
                    expect(response?.resource).toEqual(mockValues.LIMITED_PARTNERSHIP_INCORPORATION_OBJECT_MOCK_WITH_SUB);
                }
            );

            it("should return error 401 (Unauthorised)", async () => {
                const mockRequest = jest.spyOn(mockValues.requestClient, "httpGet").mockClear()
                    .mockResolvedValue(mockValues.mockGetLimitedPartnershipIncorporationResponse[401]);

                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );
                const response = (await service.getLimitedPartnershipIncorporation(
                    mockValues.TRANSACTION_ID,
                    mockValues.FILE_RESOURCE_ID
                )) as Resource<any>;

                expect(mockRequest).toHaveBeenCalledTimes(1);
                expect(
                    mockRequest
                ).toHaveBeenCalledWith("/transactions/12345/incorporation/limited-partnership/a1b2c3");

                expect(response.httpStatusCode).toBe(401);
                expect(response.resource.error).toBe(mockValues.UNAUTHORISED);
            });

            it("should return error 404 (Not Found)", async () => {
                const mockRequest = jest.spyOn(mockValues.requestClient, "httpGet").mockClear()
                    .mockResolvedValue(mockValues.mockGetLimitedPartnershipIncorporationResponse[404]);

                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );
                const response = (await service.getLimitedPartnershipIncorporation(
                    mockValues.TRANSACTION_ID,
                    "wrong-id"
                )) as Resource<any>;

                expect(mockRequest).toHaveBeenCalledTimes(1);
                expect(
                    mockRequest
                ).toHaveBeenCalledWith("/transactions/12345/incorporation/limited-partnership/wrong-id");

                expect(response.httpStatusCode).toBe(404);
                expect(response.resource.error).toBe(mockValues.NOT_FOUND);
            });
        });
    })

    describe("GeneralPartner", () => {
        describe("postGeneralPartner", () => {
            it("should return object Id for postGeneralPartner method", async () => {
                const mockRequest = jest.spyOn(mockValues.requestClient, "httpPost").mockClear()
                    .mockResolvedValue(mockValues.mockPostGeneralPartnerResponse[201]);
                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );
                const response = (await service.postGeneralPartner(
                    mockValues.TRANSACTION_ID,
                    mockValues.GENERAL_PARTNER_OBJECT_MOCK
                )) as Resource<LimitedPartnershipResourceCreated>;

                expect(mockRequest).toHaveBeenCalledTimes(1);
                expect(
                    mockRequest
                ).toHaveBeenCalledWith(
                    "/transactions/12345/limited-partnership/general-partner",
                    mockValues.GENERAL_PARTNER_OBJECT_MOCK
                );

                expect(response.httpStatusCode).toBe(201);
                expect(response.resource?.id).toBe(mockValues.mockLimitedPartnershipCreatedResource.id);
            });

            it("should return error 400 (Bad Request)", async () => {
                const mockRequest = jest.spyOn(mockValues.requestClient, "httpPost").mockClear()
                    .mockResolvedValue(mockValues.mockPostGeneralPartnerResponse[400]);
                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );
                const response = (await service.postGeneralPartner(
                    mockValues.TRANSACTION_ID,
                    {}
                )) as Resource<LimitedPartnershipResourceCreated>;

                expect(mockRequest).toHaveBeenCalledTimes(1);
                expect(
                    mockRequest
                ).toHaveBeenCalledWith("/transactions/12345/limited-partnership/general-partner", {});

                expect(response.httpStatusCode).toBe(400);
            });
        })
    });

    describe("getGeneralPartner", () => {
        it("should return a status 200 and the generalPartner object", async () => {
            const mockRequest = jest.spyOn(mockValues.requestClient, "httpGet").mockClear()
                .mockResolvedValue(mockValues.mockGetGeneralPartnerResponse[200]);

            const service = new LimitedPartnershipsService(
                mockValues.requestClient
            );

            const response = await service.getGeneralPartner(
                mockValues.TRANSACTION_ID,
                mockValues.SUBMISSION_ID
            ) as Resource<GeneralPartner>;

            expect(mockRequest).toHaveBeenCalledTimes(1);
            expect(
                mockRequest
            ).toHaveBeenCalledWith("/transactions/12345/limited-partnership/general-partner/09876");
            expect(response.httpStatusCode).toBe(200);
            expect(response?.resource).toEqual(mockValues.GENERAL_PARTNER_OBJECT_MOCK);
        });

        it("should return error 401 (Unauthorised)", async () => {
            const mockRequest = jest.spyOn(mockValues.requestClient, "httpGet").mockClear()
                .mockResolvedValue(mockValues.mockGetGeneralPartnerResponse[401]);

            const service = new LimitedPartnershipsService(
                mockValues.requestClient
            );
            const response = (await service.getGeneralPartner(
                mockValues.TRANSACTION_ID,
                mockValues.SUBMISSION_ID
            )) as Resource<any>;

            expect(mockRequest).toHaveBeenCalledTimes(1);
            expect(
                mockRequest
            ).toHaveBeenCalledWith("/transactions/12345/limited-partnership/general-partner/09876");

            expect(response.httpStatusCode).toBe(401);
            expect(response.resource.error).toBe(mockValues.UNAUTHORISED);
        });

        it("should return error 404 (Not Found)", async () => {
            const mockRequest = jest.spyOn(mockValues.requestClient, "httpGet").mockClear()
                .mockResolvedValue(mockValues.mockGetGeneralPartnerResponse[404]);

            const service = new LimitedPartnershipsService(
                mockValues.requestClient
            );
            const response = (await service.getGeneralPartner(
                mockValues.TRANSACTION_ID,
                "wrong-id"
            )) as Resource<any>;

            expect(mockRequest).toHaveBeenCalledTimes(1);
            expect(
                mockRequest
            ).toHaveBeenCalledWith("/transactions/12345/limited-partnership/general-partner/wrong-id");

            expect(response.httpStatusCode).toBe(404);
            expect(response.resource.error).toBe(mockValues.NOT_FOUND);
        });
    })

    describe("getGeneralPartners", () => {
        it("should return a status 200 and the generalPartner object", async () => {
            const mockRequest = jest.spyOn(mockValues.requestClient, "httpGet").mockClear()
                .mockResolvedValue(mockValues.mockGetGeneralPartnersResponse[200]);

            const service = new LimitedPartnershipsService(
                mockValues.requestClient
            );

            const response = await service.getGeneralPartners(
                mockValues.TRANSACTION_ID
            ) as Resource<GeneralPartner>;

            expect(mockRequest).toHaveBeenCalledTimes(1);
            expect(
                mockRequest
            ).toHaveBeenCalledWith("/transactions/12345/limited-partnership/general-partners", {"transactionId": "12345"});
            expect(response.httpStatusCode).toBe(200);
            expect(response?.resource).toEqual([mockValues.GENERAL_PARTNER_OBJECT_MOCK]);
        });
    })

    describe("patchGeneralPartner", () => {
        it("should return 200 patchGeneralPartner method", async () => {
            const mockRequest = jest.spyOn(mockValues.requestClient, "httpPatch").mockClear()
                .mockResolvedValue(mockValues.mockPatchGeneralPartnerResponse[200]);
            const service = new LimitedPartnershipsService(
                mockValues.requestClient
            );
            const response = (await service.patchGeneralPartner(
                mockValues.TRANSACTION_ID,
                mockValues.GENERAL_PARTNER_ID,
                mockValues.GENERAL_PARTNER_OBJECT_MOCK.data
            )) as Resource<void>;

            expect(mockRequest).toHaveBeenCalledTimes(1);
            expect(
                mockRequest
            ).toHaveBeenCalledWith(
                "/transactions/12345/limited-partnership/general-partner/00112233",
                mockValues.GENERAL_PARTNER_OBJECT_MOCK.data
            );

            expect(response.httpStatusCode).toBe(200);
        });

        it("should return error 400 (Bad Request)", async () => {
            const mockRequest = jest.spyOn(mockValues.requestClient, "httpPatch").mockClear()
                .mockResolvedValue(mockValues.mockPatchGeneralPartnerResponse[400]);
            const service = new LimitedPartnershipsService(
                mockValues.requestClient
            );
            const response = (await service.patchGeneralPartner(
                mockValues.TRANSACTION_ID,
                mockValues.GENERAL_PARTNER_ID,
                {}
            )) as Resource<LimitedPartnershipResourceCreated>;

            expect(mockRequest).toHaveBeenCalledTimes(1);
            expect(
                mockRequest
            ).toHaveBeenCalledWith("/transactions/12345/limited-partnership/general-partner/00112233", {});

            expect(response.httpStatusCode).toBe(400);
        });
    })

    describe("deleteGeneralPartner", () => {
        it("should return 204 patchGeneralPartner method", async () => {
            const mockRequest = jest.spyOn(mockValues.requestClient, "httpDelete").mockClear()
                .mockResolvedValue(mockValues.mockDeleteGeneralPartnerResponse[204]);
            const service = new LimitedPartnershipsService(
                mockValues.requestClient
            );
            const response = (await service.deleteGeneralPartner(
                mockValues.TRANSACTION_ID,
                mockValues.GENERAL_PARTNER_ID
            )) as Resource<void>;

            expect(mockRequest).toHaveBeenCalledTimes(1);
            expect(
                mockRequest
            ).toHaveBeenCalledWith("/transactions/12345/limited-partnership/general-partner/00112233");

            expect(response.httpStatusCode).toBe(204);
        });
    })

    describe("LimitedPartner", () => {
        describe("postLimitedPartner", () => {
            it("should return object Id for postLimitedPartner method", async () => {
                const mockRequest = jest.spyOn(mockValues.requestClient, "httpPost").mockClear()
                    .mockResolvedValue(mockValues.mockPostLimitedPartnerResponse[201]);
                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );
                const response = (await service.postLimitedPartner(
                    mockValues.TRANSACTION_ID,
                    mockValues.LIMITED_PARTNER_OBJECT_MOCK
                )) as Resource<LimitedPartnershipResourceCreated>;

                expect(mockRequest).toHaveBeenCalledTimes(1);
                expect(
                    mockRequest
                ).toHaveBeenCalledWith(
                    "/transactions/12345/limited-partnership/limited-partner",
                    mockValues.LIMITED_PARTNER_OBJECT_MOCK
                );

                expect(response.httpStatusCode).toBe(201);
                expect(response.resource?.id).toBe(mockValues.mockLimitedPartnershipCreatedResource.id);
            });

            it("should return error 400 (Bad Request)", async () => {
                const mockRequest = jest.spyOn(mockValues.requestClient, "httpPost").mockClear()
                    .mockResolvedValue(mockValues.mockPostLimitedPartnerResponse[400]);
                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );
                const response = (await service.postLimitedPartner(
                    mockValues.TRANSACTION_ID,
                    {}
                )) as Resource<LimitedPartnershipResourceCreated>;

                expect(mockRequest).toHaveBeenCalledTimes(1);
                expect(
                    mockRequest
                ).toHaveBeenCalledWith("/transactions/12345/limited-partnership/limited-partner", {});

                expect(response.httpStatusCode).toBe(400);
            });
        });

        describe("getLimitedPartner", () => {
            it("should return a status 200 and the limitedPartner object", async () => {
                const mockRequest = jest.spyOn(mockValues.requestClient, "httpGet").mockClear()
                    .mockResolvedValue(mockValues.mockGetLimitedPartnerResponse[200]);

                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );

                const response = await service.getLimitedPartner(
                    mockValues.TRANSACTION_ID,
                    mockValues.SUBMISSION_ID
                ) as Resource<LimitedPartner>;

                expect(mockRequest).toHaveBeenCalledTimes(1);
                expect(
                    mockRequest
                ).toHaveBeenCalledWith("/transactions/12345/limited-partnership/limited-partner/09876");
                expect(response.httpStatusCode).toBe(200);
                expect(response?.resource).toEqual(mockValues.LIMITED_PARTNER_OBJECT_MOCK);
            });

            it("should return error 401 (Unauthorised)", async () => {
                const mockRequest = jest.spyOn(mockValues.requestClient, "httpGet").mockClear()
                    .mockResolvedValue(mockValues.mockGetLimitedPartnerResponse[401]);

                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );
                const response = (await service.getLimitedPartner(
                    mockValues.TRANSACTION_ID,
                    mockValues.SUBMISSION_ID
                )) as Resource<any>;

                expect(mockRequest).toHaveBeenCalledTimes(1);
                expect(
                    mockRequest
                ).toHaveBeenCalledWith("/transactions/12345/limited-partnership/limited-partner/09876");

                expect(response.httpStatusCode).toBe(401);
                expect(response.resource.error).toBe(mockValues.UNAUTHORISED);
            });

            it("should return error 404 (Not Found)", async () => {
                const mockRequest = jest.spyOn(mockValues.requestClient, "httpGet").mockClear()
                    .mockResolvedValue(mockValues.mockGetLimitedPartnerResponse[404]);

                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );
                const response = (await service.getLimitedPartner(
                    mockValues.TRANSACTION_ID,
                    "wrong-id"
                )) as Resource<any>;

                expect(mockRequest).toHaveBeenCalledTimes(1);
                expect(
                    mockRequest
                ).toHaveBeenCalledWith("/transactions/12345/limited-partnership/limited-partner/wrong-id");

                expect(response.httpStatusCode).toBe(404);
                expect(response.resource.error).toBe(mockValues.NOT_FOUND);
            });
        })

        describe("getLimitedPartners", () => {
            it("should return a status 200 and the limitedPartner object", async () => {
                const mockRequest = jest.spyOn(mockValues.requestClient, "httpGet").mockClear()
                    .mockResolvedValue(mockValues.mockGetLimitedPartnersResponse[200]);

                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );

                const response = await service.getLimitedPartners(
                    mockValues.TRANSACTION_ID
                ) as Resource<LimitedPartner>;

                expect(mockRequest).toHaveBeenCalledTimes(1);
                expect(
                    mockRequest
                ).toHaveBeenCalledWith("/transactions/12345/limited-partnership/limited-partners");
                expect(response.httpStatusCode).toBe(200);
                expect(response?.resource).toEqual([mockValues.LIMITED_PARTNER_OBJECT_MOCK]);
            });
        })

        describe("patchLimitedPartner", () => {
            it("should return 200 patchLimitedPartner method", async () => {
                const mockRequest = jest.spyOn(mockValues.requestClient, "httpPatch").mockClear()
                    .mockResolvedValue(mockValues.mockPatchLimitedPartnerResponse[200]);
                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );
                const response = (await service.patchLimitedPartner(
                    mockValues.TRANSACTION_ID,
                    mockValues.LIMITED_PARTNER_ID,
                    mockValues.LIMITED_PARTNER_OBJECT_MOCK.data
                )) as Resource<void>;

                expect(mockRequest).toHaveBeenCalledTimes(1);
                expect(
                    mockRequest
                ).toHaveBeenCalledWith(
                    "/transactions/12345/limited-partnership/limited-partner/11223344",
                    mockValues.LIMITED_PARTNER_OBJECT_MOCK.data
                );

                expect(response.httpStatusCode).toBe(200);
            });

            it("should return error 400 (Bad Request)", async () => {
                const mockRequest = jest.spyOn(mockValues.requestClient, "httpPatch").mockClear()
                    .mockResolvedValue(mockValues.mockPatchLimitedPartnerResponse[400]);
                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );
                const response = (await service.patchLimitedPartner(
                    mockValues.TRANSACTION_ID,
                    mockValues.LIMITED_PARTNER_ID,
                    {}
                )) as Resource<LimitedPartnershipResourceCreated>;

                expect(mockRequest).toHaveBeenCalledTimes(1);
                expect(
                    mockRequest
                ).toHaveBeenCalledWith("/transactions/12345/limited-partnership/limited-partner/11223344", {});

                expect(response.httpStatusCode).toBe(400);
            });
        })

        describe("deleteLimitedPartner", () => {
            it("should return 204 patchLimitedPartner method", async () => {
                const mockRequest = jest.spyOn(mockValues.requestClient, "httpDelete").mockClear()
                    .mockResolvedValue(mockValues.mockDeleteLimitedPartnerResponse[204]);
                const service = new LimitedPartnershipsService(
                    mockValues.requestClient
                );
                const response = (await service.deleteLimitedPartner(
                    mockValues.TRANSACTION_ID,
                    mockValues.LIMITED_PARTNER_ID
                )) as Resource<void>;

                expect(mockRequest).toHaveBeenCalledTimes(1);
                expect(
                    mockRequest
                ).toHaveBeenCalledWith("/transactions/12345/limited-partnership/limited-partner/11223344");

                expect(response.httpStatusCode).toBe(204);
            });
        })
    });
});
