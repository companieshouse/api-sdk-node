import { expect } from "chai";
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
import { Failure, Success } from "../../../src/services/result";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createValidApiResponse (fileId: string) {
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
                { errorMessage: "Found 2 inline XBRL documents." },
                { errorMessage: "The submission contains a malformed XML document: image1689926429N.html" }
            ]
        }
    };
}

const TRANSACTION_ID = "000000-123456-000000";
const ACCOUNTS_FILING_ID = "acc-filing-id-456";
const FILE_ID = "f37c5268-ecd2-4b62-a19e-ecb343d2c017";
const COMPANY_NUMBER = "CN123456";

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

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

    afterEach(() => {
        sinon.restore();
    });

    // -----------------------------------------------------------------------
    // confirmCompany
    // -----------------------------------------------------------------------

    describe("confirmCompany", () => {
        const confirmCompanyRequest: ConfirmCompanyRequest = { companyName: "Test Company" };

        it("should return 200 with accountsFilingId in the resource", async () => {
            sinon.stub(httpClient, "httpPut").resolves({
                status: 200,
                body: { accountsFilingId: "mockAccountsFilingId" }
            });

            const data = await accountsFilingService.confirmCompany(
                COMPANY_NUMBER,
                TRANSACTION_ID,
                confirmCompanyRequest
            );

            expect(data.httpStatusCode).to.equal(200);
            const resource = (data as Resource<AccountsFilingCompanyResponse>).resource;
            expect(resource).to.not.be.undefined;
            expect(resource?.accountsFilingId).to.equal("mockAccountsFilingId");
        });

        it("should return the status code and no resource when the API returns an error body", async () => {
            sinon.stub(httpClient, "httpPut").resolves({
                status: 400,
                error: "Bad Request"
            });

            const data = await accountsFilingService.confirmCompany(
                "",
                TRANSACTION_ID,
                confirmCompanyRequest
            );

            expect(data.httpStatusCode).to.equal(400);
            expect((data as Resource<AccountsFilingCompanyResponse>).resource).to.be.undefined;
        });

        it("should return 400 when an invalid company number is passed", async () => {
            sinon.stub(httpClient, "httpPut").resolves({
                status: 400,
                body: "Mocked error message"
            });

            const data = await accountsFilingService.confirmCompany(
                "",
                TRANSACTION_ID,
                confirmCompanyRequest
            );

            expect(data.httpStatusCode).to.equal(400);
        });

        it("should return 400 when an invalid transaction id is passed", async () => {
            sinon.stub(httpClient, "httpPut").resolves({
                status: 400,
                body: "Mocked error message"
            });

            const data = await accountsFilingService.confirmCompany(
                COMPANY_NUMBER,
                "invalid-tx-id",
                confirmCompanyRequest
            );

            expect(data.httpStatusCode).to.equal(400);
        });

        it("should return 500 during an unhandled runtime exception (e.g. MongoDB down)", async () => {
            sinon.stub(httpClient, "httpPut").resolves({
                status: 500,
                body: "Mocked error message"
            });

            const data = await accountsFilingService.confirmCompany(
                COMPANY_NUMBER,
                TRANSACTION_ID,
                confirmCompanyRequest
            );

            expect(data.httpStatusCode).to.equal(500);
        });

        it("should pass the requestId as a header when provided", async () => {
            const putStub = sinon.stub(httpClient, "httpPut").resolves({
                status: 200,
                body: { accountsFilingId: "abc" }
            });

            await accountsFilingService.confirmCompany(
                COMPANY_NUMBER,
                TRANSACTION_ID,
                confirmCompanyRequest,
                "my-request-id"
            );

            const [, , headers] = putStub.firstCall.args;
            expect(headers).to.deep.include({ "X-Request-Id": "my-request-id" });
        });

        it("should pass undefined as headers when no requestId is provided", async () => {
            // addRequestIdHeader(undefined) returns undefined — not an empty object
            const putStub = sinon.stub(httpClient, "httpPut").resolves({
                status: 200,
                body: { accountsFilingId: "abc" }
            });

            await accountsFilingService.confirmCompany(
                COMPANY_NUMBER,
                TRANSACTION_ID,
                confirmCompanyRequest
            );

            const [, , headers] = putStub.firstCall.args;
            expect(headers).to.be.undefined;
        });

        it("should call the correct URL", async () => {
            const putStub = sinon.stub(httpClient, "httpPut").resolves({
                status: 200,
                body: { accountsFilingId: "abc" }
            });

            await accountsFilingService.confirmCompany(
                COMPANY_NUMBER,
                TRANSACTION_ID,
                confirmCompanyRequest
            );

            const [url] = putStub.firstCall.args;
            expect(url).to.equal(
                `/transactions/${TRANSACTION_ID}/accounts-filing/company/${COMPANY_NUMBER}/confirm`
            );
        });
    });

    // -----------------------------------------------------------------------
    // checkAccountsFileValidationStatus
    // -----------------------------------------------------------------------

    describe("checkAccountsFileValidationStatus", () => {
        const fileValidationRequest: AccountsFilingValidationRequest = {
            fileId: FILE_ID,
            accountsFilingId: ACCOUNTS_FILING_ID,
            transactionId: TRANSACTION_ID
        };

        it("should handle a successful 200 response correctly", async () => {
            sinon.stub(httpClient, "httpGet").resolves({
                status: 200,
                body: createValidApiResponse(FILE_ID)
            });

            const resp = await accountsFilingService.checkAccountsFileValidationStatus(
                fileValidationRequest
            );

            expect(resp.httpStatusCode).to.equal(200);
            expect(resp).to.have.property("resource");
            const resource = (resp as Resource<AccountValidatorResponse>).resource;
            expect(resource).to.not.be.undefined;
            expect(resource?.fileId).to.equal(FILE_ID);
        });

        it("should call the correct URL when checking validation status", async () => {
            const getStub = sinon.stub(httpClient, "httpGet").resolves({
                status: 200,
                body: createValidApiResponse(FILE_ID)
            });

            await accountsFilingService.checkAccountsFileValidationStatus(fileValidationRequest);

            const [url] = getStub.firstCall.args;
            expect(url).to.equal(
                `/transactions/${TRANSACTION_ID}/accounts-filing/${ACCOUNTS_FILING_ID}/file/${FILE_ID}/status`
            );
        });

        it("should return 404 with a descriptive error when the file is not found", async () => {
            sinon.stub(httpClient, "httpGet").resolves({ status: 404 });

            const resp = await accountsFilingService.checkAccountsFileValidationStatus(
                fileValidationRequest
            );

            expect(resp.httpStatusCode).to.equal(404);
            expect(resp).to.have.property("errors");
            const error = (resp as ApiErrorResponse)?.errors?.[0]?.error;
            expect(error).to.include("not found");
            expect(error).to.include(FILE_ID);
        });

        it("should return 500 with a descriptive error for an unexpected status code", async () => {
            sinon.stub(httpClient, "httpGet").resolves({
                status: 500,
                body: { message: "Unexpected error" }
            });

            const resp = await accountsFilingService.checkAccountsFileValidationStatus(
                fileValidationRequest
            );

            expect(resp.httpStatusCode).to.equal(500);
            expect(resp).to.have.property("errors");
            expect((resp as ApiErrorResponse)?.errors?.[0]?.error).to.equal(
                "Unexpected server response: Status Code 500"
            );
        });

        it("should return a 503-based unexpected status error for any unhandled status", async () => {
            sinon.stub(httpClient, "httpGet").resolves({
                status: 503,
                body: null
            });

            const resp = await accountsFilingService.checkAccountsFileValidationStatus(
                fileValidationRequest
            );

            expect(resp.httpStatusCode).to.equal(503);
            expect((resp as ApiErrorResponse)?.errors?.[0]?.error).to.include("503");
        });

        it("should return an invalidResponseType error when a 200 body does not conform to AccountValidatorResponse", async () => {
            sinon.stub(httpClient, "httpGet").resolves({
                status: 200,
                body: { unexpected: "shape" }
            });

            const resp = await accountsFilingService.checkAccountsFileValidationStatus(
                fileValidationRequest
            );

            expect(resp.httpStatusCode).to.equal(200);
            expect(resp).to.have.property("errors");
            const error = (resp as ApiErrorResponse)?.errors?.[0]?.error;
            expect(error).to.include("not the correct type");
            expect(error).to.include(FILE_ID);
        });

        it("should return an invalidResponseType error when a 200 body has an invalid status value", async () => {
            sinon.stub(httpClient, "httpGet").resolves({
                status: 200,
                body: {
                    fileId: FILE_ID,
                    fileName: "test.zip",
                    status: "unknown-status",
                    result: {
                        validationStatus: "OK",
                        data: {},
                        errorMessages: []
                    }
                }
            });

            const resp = await accountsFilingService.checkAccountsFileValidationStatus(
                fileValidationRequest
            );

            expect(resp.httpStatusCode).to.equal(200);
            expect(resp).to.have.property("errors");
        });

        // -------------------------------------------------------------------
        // isApiErrorResponse — exhaustive branch coverage via handleError
        //
        // isApiErrorResponse is module-private, reachable only via:
        //   checkAccountsFileValidationStatus → catch block → handleError
        // We make httpGet reject with a crafted object to drive every branch.
        // -------------------------------------------------------------------

        describe("isApiErrorResponse (via catch/handleError path)", () => {
            async function callWithThrownError (thrown: unknown) {
                sinon.restore();
                sinon.stub(httpClient, "httpGet").rejects(thrown as Error);
                return accountsFilingService.checkAccountsFileValidationStatus(fileValidationRequest);
            }

            // --- Branches that return false → handleError returns 500 ---

            it("returns 500 when httpStatusCode is present but is a string, not a number", async () => {
                const resp = await callWithThrownError({ httpStatusCode: "not-a-number" });
                expect(resp.httpStatusCode).to.equal(500);
                expect((resp as ApiErrorResponse).errors?.[0]?.error).to.equal("Internal Server Error");
            });

            it("returns 500 when errors is present but is a plain object, not an array", async () => {
                const resp = await callWithThrownError({ errors: { bad: true } });
                expect(resp.httpStatusCode).to.equal(500);
            });

            it("returns 500 when an error item in the errors array is a primitive (number)", async () => {
                const resp = await callWithThrownError({ errors: [42] });
                expect(resp.httpStatusCode).to.equal(500);
            });

            it("returns 500 when an error item in the errors array is null", async () => {
                const resp = await callWithThrownError({ errors: [null] });
                expect(resp.httpStatusCode).to.equal(500);
            });

            it("returns 500 when an error item has an 'error' field that is not a string", async () => {
                const resp = await callWithThrownError({ errors: [{ error: 99 }] });
                expect(resp.httpStatusCode).to.equal(500);
            });

            it("returns 500 when an error item has an 'errorValues' field that is not an object", async () => {
                const resp = await callWithThrownError({ errors: [{ errorValues: "bad" }] });
                expect(resp.httpStatusCode).to.equal(500);
            });

            it("returns 500 when an error item has a 'location' field that is not a string", async () => {
                const resp = await callWithThrownError({ errors: [{ location: 123 }] });
                expect(resp.httpStatusCode).to.equal(500);
            });

            it("returns 500 when an error item has a 'locationType' field that is not a string", async () => {
                const resp = await callWithThrownError({ errors: [{ locationType: 123 }] });
                expect(resp.httpStatusCode).to.equal(500);
            });

            it("returns 500 when an error item has a 'type' field that is not a string", async () => {
                const resp = await callWithThrownError({ errors: [{ type: 123 }] });
                expect(resp.httpStatusCode).to.equal(500);
            });

            it("returns 500 when the first error item is valid but a later one is invalid (tests loop iteration)", async () => {
                const resp = await callWithThrownError({
                    httpStatusCode: 400,
                    errors: [
                        { error: "valid item" },
                        { error: 999 }
                    ]
                });
                expect(resp.httpStatusCode).to.equal(500);
            });

            // --- Branches that return true → handleError propagates the object as-is ---

            it("propagates a plain Error (no own httpStatusCode/errors properties — isApiErrorResponse returns true)", async () => {
                // new Error() has no own 'httpStatusCode' or 'errors' properties so both
                // hasOwnProperty checks are skipped and the function returns true.
                // The error is propagated as-is; httpStatusCode is therefore undefined.
                const resp = await callWithThrownError(new Error("Network error"));
                expect(resp.httpStatusCode).to.be.undefined;
                expect(resp).to.not.have.property("errors");
            });

            it("propagates a bare empty object (neither guard property present)", async () => {
                const resp = await callWithThrownError({});
                expect(resp).to.not.have.property("errors");
            });

            it("propagates a minimal ApiErrorResponse with httpStatusCode only", async () => {
                const resp = await callWithThrownError({ httpStatusCode: 422 });
                expect(resp.httpStatusCode).to.equal(422);
            });

            it("propagates when errors is a valid empty array", async () => {
                const resp = await callWithThrownError({ httpStatusCode: 400, errors: [] });
                expect(resp.httpStatusCode).to.equal(400);
            });

            it("propagates a fully-formed ApiErrorResponse with all optional fields present", async () => {
                const fullyFormed: ApiErrorResponse = {
                    httpStatusCode: 409,
                    errors: [
                        {
                            error: "Conflict",
                            errorValues: { key: "value" },
                            location: "/some/field",
                            locationType: "body",
                            type: "ch:validation"
                        }
                    ]
                };
                const resp = await callWithThrownError(fullyFormed);
                expect(resp.httpStatusCode).to.equal(409);
                expect((resp as ApiErrorResponse).errors?.[0]?.error).to.equal("Conflict");
            });

            it("propagates when errors contains multiple valid items", async () => {
                const multiError: ApiErrorResponse = {
                    httpStatusCode: 400,
                    errors: [
                        { error: "First error" },
                        { error: "Second error", location: "/field" }
                    ]
                };
                const resp = await callWithThrownError(multiError);
                expect(resp.httpStatusCode).to.equal(400);
                expect((resp as ApiErrorResponse).errors).to.have.length(2);
            });
        });
    });

    // -----------------------------------------------------------------------
    // setPackageType
    // -----------------------------------------------------------------------

    describe("setPackageType", () => {
        it("should return a successful result when the API returns 204", async () => {
            sinon.stub(httpClient, "httpPut").resolves({ status: 204 });

            const result = await accountsFilingService.setPackageType(
                TRANSACTION_ID,
                ACCOUNTS_FILING_ID,
                "uksef"
            );

            expect(result.isSuccess()).to.be.true;
            expect((result as Success<void, Error>).value).to.be.undefined;
        });

        it("should return a Failure with a 'No transaction' message when the API returns 404", async () => {
            sinon.stub(httpClient, "httpPut").resolves({ status: 404 });

            const result = await accountsFilingService.setPackageType(
                TRANSACTION_ID,
                ACCOUNTS_FILING_ID,
                "uksef"
            );

            expect(result.isFailure()).to.be.true;
            const error = (result as Failure<void, Error>).value;
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.contain("No transaction with id");
            expect(error.message).to.contain(TRANSACTION_ID);
        });

        it("should return a Failure with a generic message for unexpected status codes", async () => {
            sinon.stub(httpClient, "httpPut").resolves({ status: 500 });

            const result = await accountsFilingService.setPackageType(
                TRANSACTION_ID,
                ACCOUNTS_FILING_ID,
                "uksef"
            );

            expect(result.isFailure()).to.be.true;
            const error = (result as Failure<void, Error>).value;
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.contain("An unknown error occured");
        });

        it("should include the transactionId and accountsFilingId in the generic failure message", async () => {
            sinon.stub(httpClient, "httpPut").resolves({ status: 503, body: { detail: "down" } });

            const result = await accountsFilingService.setPackageType(
                TRANSACTION_ID,
                ACCOUNTS_FILING_ID,
                "cic"
            );

            expect(result.isFailure()).to.be.true;
            const message = (result as Failure<void, Error>).value.message;
            expect(message).to.contain(TRANSACTION_ID);
            expect(message).to.contain(ACCOUNTS_FILING_ID);
        });

        it("should call the correct URL when setting the package type", async () => {
            const putStub = sinon.stub(httpClient, "httpPut").resolves({ status: 204 });

            await accountsFilingService.setPackageType(
                TRANSACTION_ID,
                ACCOUNTS_FILING_ID,
                "uksef"
            );

            const [url] = putStub.firstCall.args;
            expect(url).to.equal(
                `/transactions/${TRANSACTION_ID}/accounts-filing/${ACCOUNTS_FILING_ID}`
            );
        });

        it("should send the package type in snake_case in the request body", async () => {
            const putStub = sinon.stub(httpClient, "httpPut").resolves({ status: 204 });

            await accountsFilingService.setPackageType(
                TRANSACTION_ID,
                ACCOUNTS_FILING_ID,
                "uksef"
            );

            const [, body] = putStub.firstCall.args;
            expect(body).to.deep.equal({ package_type: "uksef" });
        });

        it("should pass the requestId as a header when provided", async () => {
            const putStub = sinon.stub(httpClient, "httpPut").resolves({ status: 204 });

            await accountsFilingService.setPackageType(
                TRANSACTION_ID,
                ACCOUNTS_FILING_ID,
                "uksef",
                "req-id-xyz"
            );

            const [, , headers] = putStub.firstCall.args;
            expect(headers).to.deep.include({ "X-Request-Id": "req-id-xyz" });
        });

        it("should pass undefined as headers when no requestId is provided", async () => {
            // addRequestIdHeader(undefined) returns undefined — not an empty object
            const putStub = sinon.stub(httpClient, "httpPut").resolves({ status: 204 });

            await accountsFilingService.setPackageType(
                TRANSACTION_ID,
                ACCOUNTS_FILING_ID,
                "uksef"
            );

            const [, , headers] = putStub.firstCall.args;
            expect(headers).to.be.undefined;
        });

        it("should work for every valid PackageType value", async () => {
            const packageTypes = [
                "uksef", "cic", "welsh", "limited-partnership",
                "group-package-400", "group-package-401", "overseas",
                "audit-exempt-subsidiary", "filing-exempt-subsidiary"
            ] as const;

            for (const packageType of packageTypes) {
                sinon.restore();
                sinon.stub(httpClient, "httpPut").resolves({ status: 204 });

                const result = await accountsFilingService.setPackageType(
                    TRANSACTION_ID,
                    ACCOUNTS_FILING_ID,
                    packageType
                );

                expect(result.isSuccess(), `expected success for packageType: ${packageType}`).to.be.true;
            }
        });
    });
});
