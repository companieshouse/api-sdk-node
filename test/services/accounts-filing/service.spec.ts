import sinon from "sinon";
import { IHttpClient, RequestClient } from "../../../src/http";
import { AccountsFilingService } from "../../../src/services/accounts-filing/service";
import { AccountValidatorResponse } from "../../../src/services/account-validator/types";
import Resource, { ApiErrorResponse } from "../../../src/services/resource";
import {
    AccountsFilingValidationRequest,
    AccountsFilingCompanyResponse,
    ConfirmCompanyRequest
} from "../../../src/services/accounts-filing/types";
import { Failure } from "../../../src/services/result";

function createApiResponse (fileId: string) {
    return {
        fileId,
        fileName: "1mb.zip",
        status: "complete",
        result: {
            validationStatus: "FAILED",
            data: {
                balance_sheet_date: "UNKNOWN",
                accounts_type: "00",
                companieshouse_registered_number: "UNKNOWN"
            },
            errorMessages: [
                {
                    errorMessage: "Found 2 inline XBRL documents."
                },
                {
                    errorMessage:
                        "The submission contains a malformed XML document: image1689926429N.html"
                }
            ]
        }
    };
}

describe("AccountsFilingService", () => {
    let httpClient: IHttpClient;
    let accountsFilingService: AccountsFilingService;

    beforeEach(() => {
        httpClient = new RequestClient({
            baseUrl: "URL-NOT-USED",
            oauthToken: "TOKEN-NOT-USED"
        });
        accountsFilingService = new AccountsFilingService(httpClient);
    });

    describe("confirmCompany", () => {
        it("should returns 200 response with accountsFilingId", async () => {
            const mockCompanyResponse = {
                status: 200,
                body: {
                    accountsFilingId: "mockAccountsFilingId"
                }
            };

            const companyNumber = "CN123456";
            const transactionId = "000000-123456-000000";
            const confirmCompanyRequest: ConfirmCompanyRequest = {
                companyName: "Test Company"
            };

            sinon.stub(httpClient, "httpPut").resolves(mockCompanyResponse);
            await accountsFilingService
                .confirmCompany(
                    companyNumber,
                    transactionId,
                    confirmCompanyRequest
                )
                .then((data) => {
                    expect(data.httpStatusCode).toBe(200);
                    const castedData: Resource<AccountsFilingCompanyResponse> =
                        data as Resource<AccountsFilingCompanyResponse>;

                    expect(castedData?.resource?.accountsFilingId).toBe("mockAccountsFilingId");
                });
        });

        it("get returns a 400 when invalid company number is passed", async () => {
            const mockErrorResponse = {
                status: 400,
                body: "Mocked error message"
            };

            const companyNumber = "";
            const transactionId = "000000-123456-000000";
            const confirmCompanyRequest: ConfirmCompanyRequest = {
                companyName: "Test Company"
            };

            sinon.stub(httpClient, "httpPut").resolves(mockErrorResponse);
            await accountsFilingService
                .confirmCompany(
                    companyNumber,
                    transactionId,
                    confirmCompanyRequest
                )
                .then((data) => {
                    expect(data.httpStatusCode).toBe(400);
                });
        });

        it("get returns a 400 when invalid transaction id is passed", async () => {
            const mockErrorResponse = {
                status: 400,
                body: "Mocked error message"
            };

            const companyNumber = "CN123456";
            const transactionId = "123456-000000";
            const confirmCompanyRequest: ConfirmCompanyRequest = {
                companyName: "Test Company"
            };

            sinon.stub(httpClient, "httpPut").resolves(mockErrorResponse);
            await accountsFilingService
                .confirmCompany(
                    companyNumber,
                    transactionId,
                    confirmCompanyRequest
                )
                .then((data) => {
                    expect(data.httpStatusCode).toBe(400);
                });
        });

        it(
            "Return 500 during unhandled runtime exception. For example mongodb services are down. ",
            async () => {
                const mockErrorResponse = {
                    status: 500,
                    body: "Mocked error message"
                };

                const companyNumber = "CN123456";
                const transactionId = "000000-123456-000000";
                const confirmCompanyRequest: ConfirmCompanyRequest = {
                    companyName: "Test Company"
                };

                sinon.stub(httpClient, "httpPut").resolves(mockErrorResponse);
                await accountsFilingService
                    .confirmCompany(
                        companyNumber,
                        transactionId,
                        confirmCompanyRequest
                    )
                    .then((data) => {
                        expect(data.httpStatusCode).toBe(500);
                    });
            }
        );
    });

    describe("checkAccountsFileValidationStatus", () => {
        it("should handle a successful response correctly", async () => {
            const fileId = "f37c5268-ecd2-4b62-a19e-ecb343d2c017";
            const accountsFilingApiResponse = createApiResponse(fileId);

            const getStub = sinon.stub(httpClient, "httpGet").resolves({
                status: 200,
                body: accountsFilingApiResponse
            });

            const fileValidationRequest: AccountsFilingValidationRequest = {
                fileId,
                accountsFilingId: "456",
                transactionId: "789"
            };

            const resp =
                await accountsFilingService.checkAccountsFileValidationStatus(
                    fileValidationRequest
                );

            expect(resp.httpStatusCode).toBe(200);
            expect(resp).toHaveProperty("resource");

            const _resp = resp as Resource<AccountValidatorResponse>;
            expect(_resp.resource).toBeDefined();
            expect(_resp.resource?.fileId).toBe(fileId);

            getStub.restore();
        });

        it("should handle a 'file not found' response correctly", async () => {
            const fileId = "f37c5268-ecd2-4b62-a19e-ecb343d2c017";

            const getStub = sinon.stub(httpClient, "httpGet").resolves({
                status: 404
            });

            const fileValidationRequest: AccountsFilingValidationRequest = {
                fileId,
                accountsFilingId: "456",
                transactionId: "789"
            };

            const resp =
                await accountsFilingService.checkAccountsFileValidationStatus(
                    fileValidationRequest
                );

            expect(resp.httpStatusCode).toBe(404);
            expect(resp).toHaveProperty("errors");
            expect((resp as ApiErrorResponse)?.errors?.[0]?.error).toEqual(expect.arrayContaining(["not found"]));

            getStub.restore();
        });

        it("should handle an unexpected error response correctly", async () => {
            const fileId = "123";
            const unexpectedError = { message: "Unexpected error" };

            const getStub = sinon.stub(httpClient, "httpGet").resolves({
                status: 500,
                body: unexpectedError
            });

            const fileValidationRequest: AccountsFilingValidationRequest = {
                fileId,
                accountsFilingId: "456",
                transactionId: "789"
            };

            const resp =
                await accountsFilingService.checkAccountsFileValidationStatus(
                    fileValidationRequest
                );

            expect(resp).toBeInstanceOf(Object);
            expect(resp.httpStatusCode).toBe(500);
            expect(resp).toHaveProperty("errors");
            expect((resp as ApiErrorResponse)?.errors?.[0]?.error).toBe("Unexpected server response: Status Code 500");

            getStub.restore();
        });

        it("should handle exceptions correctly", async () => {
            const fileId = "123";
            const errorMessage = "Network error";

            const getStub = sinon
                .stub(httpClient, "httpGet")
                .rejects(new Error(errorMessage));

            const fileValidationRequest: AccountsFilingValidationRequest = {
                fileId,
                accountsFilingId: "456",
                transactionId: "789"
            };

            try {
                await accountsFilingService.checkAccountsFileValidationStatus(
                    fileValidationRequest
                );
                expect.fail("Expected method to throw an error.");
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe("Expected method to throw an error.");
            } finally {
                getStub.restore();
            }
        });
    });

    describe("setPackageType", () => {
        it(
            "Should return a successful result if the return status is 204",
            async () => {
                const putStub = sinon.stub(httpClient, "httpPut").resolves({
                    status: 204
                });

                try {
                    const result = await accountsFilingService.setPackageType(
                        "tx_id",
                        "af_id",
                        "uksef"
                    );
                    expect(result.isSuccess()).toBe(true);
                } finally {
                    putStub.restore();
                }
            }
        );

        it(
            "Should return a failure message when the return status is 404",
            async () => {
                const putStub = sinon.stub(httpClient, "httpPut").resolves({
                    status: 404
                });

                try {
                    const result = await accountsFilingService.setPackageType(
                        "tx_id",
                        "af_id",
                        "uksef"
                    );

                    expect(result.isFailure()).toBe(true);
                    const value = (result as Failure<void, Error>).value;
                    expect(value).toBeInstanceOf(Error);
                    expect(value.message).toEqual(expect.arrayContaining(["No transaction with id"]));
                } finally {
                    putStub.restore();
                }
            }
        );

        it(
            "Should return a generic failure message when the return status is not 204 or 404",
            async () => {
                const putStub = sinon.stub(httpClient, "httpPut").resolves({
                    status: 500
                });

                try {
                    const result = await accountsFilingService.setPackageType(
                        "tx_id",
                        "af_id",
                        "uksef"
                    );

                    expect(result.isFailure()).toBe(true);
                    const value = (result as Failure<void, Error>).value;
                    expect(value).toBeInstanceOf(Error);
                    expect(value.message).toEqual(expect.arrayContaining(["An unknown error occured"]));
                } finally {
                    putStub.restore();
                }
            }
        );
    });
});
