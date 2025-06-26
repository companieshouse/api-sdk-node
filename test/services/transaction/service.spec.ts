import chai from "chai";
import sinon from "sinon";

import TransactionService from "../../../src/services/transaction/service";
import { RequestClient } from "../../../src/http";
import { Transaction, TransactionData, TransactionList, TransactionResource, Filing } from "../../../src/services/transaction";
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
        expect(castedData.errors[0]).to.equal("An error occurred");
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
        expect(castedData.resource.companyName).to.equal(mockResponseBody.company_name);
        expect(castedData.resource.companyNumber).to.equal(mockResponseBody.company_number);
        expect(castedData.resource.links.self).to.equal(mockResponseBody.links.self);
        expect(castedData.resource.reference).to.equal(mockResponseBody.reference);
        expect(castedData.resource.description).to.equal(mockResponseBody.description);
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
        expect(castedData.errors[0]).to.equal("An error occurred");
    });

    it("get maps the company field data items correctly", async () => {
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
        expect(castedData.headers["X-Payment-Required"]).to.equal("http://link-to-payment");
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
        expect(castedData.errors[0]).to.equal("Unprocessable Entity");
    });

    it("getTransactionsForResourceKind returns a transaction list with mapped filings object", async () => {
        const mockResponseBody = {
            items: [
                {
                    id: "txn1",
                    updated_at: "2024-06-25T12:00:00Z",
                    status: "closed",
                    filings: {
                        testFiling: {
                            status: "accepted",
                            company_number: "AP000042",
                            type: "acsp"
                        },
                        anotherFiling: {
                            status: "pending",
                            company_number: "AP000043",
                            type: "bcsp"
                        }
                    },
                    resume_journey_uri: "/resume/txn1"
                }
            ]
        };

        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };

        sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const transaction: TransactionService = new TransactionService(requestClient);
        const data = await transaction.getTransactionsForResourceKind("req-123", "some-kind");

        expect(data.httpStatusCode).to.equal(200);
        const castedData: Resource<TransactionList> = data as Resource<TransactionList>;
        expect(castedData.resource?.items).to.have.lengthOf(1);
        const item = castedData.resource?.items[0];
        expect(item?.id).to.equal("txn1");
        expect(item?.updatedAt).to.equal("2024-06-25T12:00:00Z");
        expect(item?.status).to.equal("closed");
        expect(item?.resumeJourneyUri).to.equal("/resume/txn1");
        expect(item?.filings).to.have.property("testFiling");
        expect(item?.filings).to.have.property("anotherFiling");
        expect(item?.filings["testFiling"]).to.deep.equal({
            status: "accepted",
            companyNumber: "AP000042",
            type: "acsp"
        });
        expect(item?.filings["anotherFiling"]).to.deep.equal({
            status: "pending",
            companyNumber: "AP000043",
            type: "bcsp"
        });
    });

    it("getTransactionsForResourceKind returns error response on failure", async () => {
        const mockGetResponse = {
            status: 500,
            error: "Internal Server Error"
        };

        sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const transaction: TransactionService = new TransactionService(requestClient);
        const data = await transaction.getTransactionsForResourceKind("req-123", "some-kind");

        expect(data.httpStatusCode).to.equal(500);
        const castedData: ApiErrorResponse = data as ApiErrorResponse;
        expect(castedData.errors[0]).to.equal("Internal Server Error");
    });

});
