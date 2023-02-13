import { expect } from "chai";
import sinon from "sinon";
import { RequestClient } from "../../../src/http";
import IHttpClient from "../../../src/http/http-client";
import {
    AccountValidator,
    AccountValidatorRequest,
} from "../../../src/services/account-validator";

describe("AccountValidator", () => {
    let httpClient: IHttpClient;
    let accountValidator: AccountValidator;

    beforeEach(() => {
        httpClient = new RequestClient({
            baseUrl: "URL-NOT-USED",
            oauthToken: "TOKEN-NOT-USED",
        });
        accountValidator = new AccountValidator(httpClient);
    });

    describe("postFileForValidation", () => {
        it("should return a resource when the response is successful", async () => {
            const expectedResponse = { resource: { data: "file data" } };
            const request: AccountValidatorRequest = {
                fileName: "file.xhtml",
                id: "fileId",
            };
            const postStub = sinon.stub(httpClient, "httpPost").resolves({
                status: 200,
                body: expectedResponse,
            });

            const result = await accountValidator.postFileForValidation(
                request
            );

            expect(postStub.calledOnceWith("/validate", request)).to.be.true;
            expect(result).to.deep.equal({
                httpStatusCode: 200,
                resource: expectedResponse,
            });

            postStub.restore();
        });

        it("should return an error when the response is not successful", async () => {
            const expectedResponse = { errors: [] };
            const request: AccountValidatorRequest = {
                fileName: "file.xhtml",
                id: "fileId",
            };
            const postStub = sinon.stub(httpClient, "httpPost").resolves({
                status: 400,
                body: expectedResponse,
            });

            const result = await accountValidator.postFileForValidation(
                request
            );

            expect(postStub.calledOnceWith("/validate", request)).to.be.true;
            expect(result).to.deep.equal({
                httpStatusCode: 400,
                errors: [],
            });

            postStub.restore();
        });
    });

    describe("getFileValidationStatus", () => {
        it("should return a resource when the response is successful", async () => {
            const fileId = "fileId";
            const expectedResponse = { resource: { data: "file data" } };
            const getStub = sinon.stub(httpClient, "httpGet").resolves({
                status: 200,
                body: expectedResponse,
            });

            const result = await accountValidator.getFileValidationStatus(
                fileId
            );

            expect(getStub.calledOnceWith(`/validate/check/${fileId}`)).to.be
                .true;
            expect(result).to.deep.equal({
                httpStatusCode: 200,
                resource: expectedResponse,
            });

            getStub.restore();
        });

        it("should return an error when the response is not successful", async () => {
            const fileId = "fileId";
            const expectedResponse = { errors: [] };
            const getStub = sinon.stub(httpClient, "httpGet").resolves({
                status: 400,
                body: expectedResponse,
            });

            const result = await accountValidator.getFileValidationStatus(
                fileId
            );

            expect(getStub.calledOnceWith(`/validate/check/${fileId}`)).to.be
                .true;
            expect(result).to.deep.equal({
                httpStatusCode: 400,
                errors: [],
            });

            getStub.restore();
        });
    });
});
