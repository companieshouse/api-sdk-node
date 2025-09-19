import { describe } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import { PscExtensionService, PscExtensionResponseResource } from "../../../src/services/psc-extensions";
import * as mockValues from "./mock";

import Resource, { ApiErrorResponse } from "../../../src/services/resource";

describe("PscExtensionService", () => {
    beforeEach(() => {
        sinon.reset();
        sinon.restore();
    });

    afterEach((done) => {
        sinon.reset();
        sinon.restore();
        done();
    });

    describe("PSC Extensions", () => {
        describe("postPscExtension", () => {
            it("should return PscExtensionResponseResource for postPscExtension method", async () => {
                const mockRequest = sinon
                    .stub(mockValues.requestClient, "httpPost")
                    .resolves(mockValues.mockPostPscExtensionResponse[201]);
                const service = new PscExtensionService(
                    mockValues.requestClient
                );
                const response = (await service.postPscExtension(
                    mockValues.TRANSACTION_ID,
                    {
                        companyNumber: "123456",
                        pscNotificationId: "abc123",
                        extensionDetails: {
                            extensionReason: "Awaiting additional documentation",
                            extensionStatus: "PENDING",
                            extensionRequestDate: "2024-01-15"
                        }
                    }
                )) as Resource<PscExtensionResponseResource>;

                expect(mockRequest).to.have.been.calledOnce;
                expect(
                    mockRequest.calledWith(
                        "/transactions/12345/persons-with-significant-control-extensions",
                        {
                            company_number: "123456",
                            psc_notification_id: "abc123",
                            extension_details: {
                                extension_reason: "Awaiting additional documentation",
                                extension_status: "PENDING",
                                extension_request_date: "2024-01-15"
                            }
                        }
                    )
                ).to.be.true;

                expect(response.httpStatusCode).to.equal(201);
            });

            it("should return error 400 for postPscExtension method", async () => {
                const mockRequest = sinon
                    .stub(mockValues.requestClient, "httpPost")
                    .resolves(mockValues.mockPostPscExtensionResponse[400]);

                const service = new PscExtensionService(
                    mockValues.requestClient
                );
                const response = (await service.postPscExtension(
                    mockValues.TRANSACTION_ID,
                    {
                        companyNumber: "bad_number",
                        pscNotificationId: "bad_id",
                        extensionDetails: {
                            extensionReason: "Awaiting additional documentation",
                            extensionStatus: "PENDING",
                            extensionRequestDate: "2024-01-15"
                        }
                    }
                )) as ApiErrorResponse;

                expect(mockRequest).to.have.been.calledOnce;
                expect(
                    mockRequest.calledWith(
                        "/transactions/12345/persons-with-significant-control-extensions", {
                            company_number: "bad_number",
                            psc_notification_id: "bad_id",
                            extension_details: {
                                extension_reason: "Awaiting additional documentation",
                                extension_status: "PENDING",
                                extension_request_date: "2024-01-15"
                            }
                        }
                    )
                ).to.be.true;

                expect(response.httpStatusCode).to.equal(400);
                expect(response.errors).to.be.equal(mockValues.mockPostPscExtensionResponse[400].error.errors);
            });

            it("should return error 500 for postPscExtension method", async () => {
                const mockRequest = sinon
                    .stub(mockValues.requestClient, "httpPost")
                    .resolves(mockValues.mockPostPscExtensionResponse[500]);

                const service = new PscExtensionService(
                    mockValues.requestClient
                );
                const response = (await service.postPscExtension(
                    mockValues.TRANSACTION_ID,
                    {
                        companyNumber: "bad_number",
                        pscNotificationId: "bad_id",
                        extensionDetails: {
                            extensionReason: "string",
                            extensionStatus: "string",
                            extensionRequestDate: "string"
                        }
                    }
                )) as ApiErrorResponse;

                expect(mockRequest).to.have.been.calledOnce;
                expect(
                    mockRequest.calledWith(
                        "/transactions/12345/persons-with-significant-control-extensions",
                        {
                            company_number: "bad_number",
                            psc_notification_id: "bad_id",
                            extension_details: {
                                extension_reason: "string",
                                extension_status: "string",
                                extension_request_date: "string"
                            }
                        }
                    )
                ).to.be.true;

                expect(response.httpStatusCode).to.equal(500);
                expect(response.errors).to.be.equal(mockValues.mockPostPscExtensionResponse[500].error.errors);
            });
        });
    });
});
