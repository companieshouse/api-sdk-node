import chai from "chai";
import sinon from "sinon";

import TransactionService from "../../../src/services/transaction/service";
import { RequestClient } from "../../../src/http";
import { Transaction, TransactionResource } from "../../../src/services/transaction";
import { ApiErrorResponse } from "../../../src/services/resource";
import { Resource } from "../../../src";
const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

describe("transaction", () => {
    beforeEach(() => {
        sinon.reset();
        sinon.restore();
    });

    afterEach(done => {
        sinon.reset();
        sinon.restore();
        done();
    });

    it("returns an error response on failure (post)", async () => {
        const mockPostResponse = {
            status: 401,
            error: "An error occurred"
        };

        const mockRequest = sinon.stub(requestClient, "httpPost").resolves(mockPostResponse);
        const transaction : TransactionService = new TransactionService(requestClient);
        const data = await transaction.postTransaction({} as Transaction);

        expect(data.httpStatusCode).to.equal(401);
        const castedData: ApiErrorResponse = data;
        expect(castedData.errors[0]).to.equal("An error occurred");
    });

    it("maps the company field data items correctly (post)", async () => {
        const mockResponseBody : TransactionResource = ({
            id: "12345678",
            company_name: "HELLO LTD",
            company_number: "88",
            links: {
                self: "/self"
            },
            reference: "ref",
            description: "desc"
        });

        const mockPostResponse = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpPost").resolves(mockPostResponse);
        const transaction : TransactionService = new TransactionService(requestClient);
        const data = await transaction.postTransaction({} as Transaction);

        expect(data.httpStatusCode).to.equal(200);
        const castedData: Resource<Transaction> = data as Resource<Transaction>;
        expect(castedData.resource.companyName).to.equal(mockResponseBody.company_name);
        expect(castedData.resource.companyNumber).to.equal(mockResponseBody.company_number);
        expect(castedData.resource.links.self).to.equal(mockResponseBody.links.self);
        expect(castedData.resource.reference).to.equal(mockResponseBody.reference);
        expect(castedData.resource.description).to.equal(mockResponseBody.description);
    });

    it("returns an error response on failure (get)", async () => {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const transaction : TransactionService = new TransactionService(requestClient);
        const data = await transaction.getTransaction({} as string);

        expect(data.httpStatusCode).to.equal(401);
        const castedData: ApiErrorResponse = data;
        expect(castedData.errors[0]).to.equal("An error occurred");
    });

    it("maps the company field data items correctly (get)", async () => {
        const mockResponseBody : TransactionResource = ({
            id: "12345678",
            company_name: "HELLO LTD",
            company_number: "88",
            links: {
                self: "/self"
            },
            reference: "ref",
            description: "desc"
        });

        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const transaction : TransactionService = new TransactionService(requestClient);
        const data = await transaction.getTransaction({} as string);

        expect(data.httpStatusCode).to.equal(200);
        const castedData: Resource<Transaction> = data as Resource<Transaction>;
        expect(castedData.resource.companyName).to.equal(mockResponseBody.company_name);
        expect(castedData.resource.companyNumber).to.equal(mockResponseBody.company_number);
        expect(castedData.resource.links.self).to.equal(mockResponseBody.links.self);
        expect(castedData.resource.reference).to.equal(mockResponseBody.reference);
        expect(castedData.resource.description).to.equal(mockResponseBody.description);
    });
});
