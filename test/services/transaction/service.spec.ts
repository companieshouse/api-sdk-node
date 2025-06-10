import chai from "chai";
import sinon from "sinon";

import TransactionService from "../../../src/services/transaction/service";
import { RequestClient } from "../../../src/http";
import { Transaction, TransactionData, TransactionList, TransactionResource } from "../../../src/services/transaction";
import { ApiErrorResponse, ApiResponse } from "../../../src/services/resource";
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

    it("post returns an error response on failure", async () => {
        const mockPostResponse = {
            status: 401,
            error: "An error occurred"
        };

        const mockRequest = sinon.stub(requestClient, "httpPost").resolves(mockPostResponse);
        const transaction : TransactionService = new TransactionService(requestClient);
        const data = await transaction.postTransaction({} as Transaction);

        expect(data.httpStatusCode).to.equal(401);
        const castedData: ApiErrorResponse = data;
        expect(castedData.errors?.[0]).to.equal("An error occurred");
    });

    it("post maps the company field data items correctly", async () => {
        const mockResponseBody : TransactionResource = ({
            id: "12345678",
            company_name: "HELLO LTD",
            company_number: "88",
            links: {
                self: "/self"
            },
            reference: "ref",
            description: "desc",
            resources: {
                resource: {
                    kind: "kind",
                    links: {
                        resource: "self",
                        costs: "costs"
                    }
                }
            }
        });

        const mockPostResponse = {
            status: 200,
            body: mockResponseBody
        };

        sinon.stub(requestClient, "httpPost").resolves(mockPostResponse);
        const transaction : TransactionService = new TransactionService(requestClient);
        const data = await transaction.postTransaction({} as Transaction);

        expect(data.httpStatusCode).to.equal(200);
        const castedData: Resource<Transaction> = data as Resource<Transaction>;
        const resource = castedData.resource;
        expect(resource?.companyName).to.equal(mockResponseBody.company_name);
        expect(resource?.companyNumber).to.equal(mockResponseBody.company_number);
        expect(resource?.links?.self).to.equal(mockResponseBody.links?.self);
        expect(resource?.reference).to.equal(mockResponseBody.reference);
        expect(resource?.description).to.equal(mockResponseBody.description);
    });

    it("get returns an error response on failure", async () => {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const transaction : TransactionService = new TransactionService(requestClient);
        const data = await transaction.getTransaction({} as string);

        expect(data.httpStatusCode).to.equal(401);
        const castedData: ApiErrorResponse = data;
        expect(castedData.errors?.[0]).to.equal("An error occurred");
    });

    it("get maps the company field data items correctly", async () => {
        const mockResponseBody : TransactionResource = ({
            id: "12345678",
            company_name: "HELLO LTD",
            company_number: "88",
            filing_mode: "default",
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
        const resource = castedData.resource;
        expect(resource?.companyName).to.equal(mockResponseBody.company_name);
        expect(resource?.companyNumber).to.equal(mockResponseBody.company_number);
        expect(resource?.filingMode).to.equal(mockResponseBody.filing_mode);
        expect(resource?.links?.self).to.equal(mockResponseBody.links?.self);
        expect(resource?.reference).to.equal(mockResponseBody.reference);
        expect(resource?.description).to.equal(mockResponseBody.description);
    });

    it("put returns successful response", async () => {
        const mockPutResponse = {
            headers: {
                "X-Payment-Required": "http://link-to-payment"
            },
            status: 202
        };

        sinon.stub(requestClient, "httpPut").resolves(mockPutResponse);
        const transaction : TransactionService = new TransactionService(requestClient);
        const data = await transaction.putTransaction({ id: "abc" } as Transaction);

        expect(data.httpStatusCode).to.equal(202);
        const castedData: ApiResponse<Transaction> = data as ApiResponse<Transaction>;
        expect(castedData.headers?.["X-Payment-Required"]).to.equal("http://link-to-payment");
    });

    it("put returns an error response on failure", async () => {
        const mockPutResponse = {
            status: 422,
            error: "Unprocessable Entity"
        };

        const mockRequest = sinon.stub(requestClient, "httpPut").resolves(mockPutResponse);
        const transaction : TransactionService = new TransactionService(requestClient);
        const data = await transaction.putTransaction({ id: "abc" } as Transaction);

        expect(data.httpStatusCode).to.equal(422);
        const castedData: ApiErrorResponse = data;
        expect(castedData.errors?.[0]).to.equal("Unprocessable Entity");
    });

    it("get transaction list for resource kind returns success response ", async () => {
        const itemsArray: TransactionData[] = ([
            {
                id: "123",
                status: "closed"
            }
        ]);

        const transactionList: TransactionList = ({
            items: itemsArray
        });

        const mockGetResponse = {
            status: 200,
            body: transactionList
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const transaction : TransactionService = new TransactionService(requestClient);
        const data = await transaction.getTransactionsForResourceKind({} as string);
        expect(data.httpStatusCode).to.equal(200);
        const castedData: Resource<TransactionList> = data as Resource<TransactionList>;
        expect(castedData.resource?.items[0].id).to.equal(transactionList.items[0].id);
        expect(castedData.resource?.items[0].status).to.equal(transactionList.items[0].status);
    });
});
