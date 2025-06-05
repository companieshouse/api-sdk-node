import TransactionService from "../../../src/services/transaction/service";
import { RequestClient } from "../../../src/http";
import { Transaction, TransactionData, TransactionList, TransactionResource } from "../../../src/services/transaction";
import { ApiErrorResponse, ApiResponse } from "../../../src/services/resource";
import { Resource } from "../../../src";

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

describe("transaction", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    afterEach(done => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
        done();
    });

    it("post returns an error response on failure", async () => {
        const mockPostResponse = {
            status: 401,
            error: "An error occurred"
        };

        const mockRequest = jest.spyOn(requestClient, "httpPost").mockClear().mockResolvedValue(mockPostResponse);
        const transaction : TransactionService = new TransactionService(requestClient);
        const data = await transaction.postTransaction({} as Transaction);

        expect(data.httpStatusCode).toBe(401);
        const castedData: ApiErrorResponse = data;
        expect(castedData.errors[0]).toBe("An error occurred");
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

        jest.spyOn(requestClient, "httpPost").mockClear().mockResolvedValue(mockPostResponse);
        const transaction : TransactionService = new TransactionService(requestClient);
        const data = await transaction.postTransaction({} as Transaction);

        expect(data.httpStatusCode).toBe(200);
        const castedData: Resource<Transaction> = data as Resource<Transaction>;
        expect(castedData.resource.companyName).toBe(mockResponseBody.company_name);
        expect(castedData.resource.companyNumber).toBe(mockResponseBody.company_number);
        expect(castedData.resource.links.self).toBe(mockResponseBody.links.self);
        expect(castedData.resource.reference).toBe(mockResponseBody.reference);
        expect(castedData.resource.description).toBe(mockResponseBody.description);
    });

    it("get returns an error response on failure", async () => {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };

        const mockRequest = jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetResponse);
        const transaction : TransactionService = new TransactionService(requestClient);
        const data = await transaction.getTransaction({} as string);

        expect(data.httpStatusCode).toBe(401);
        const castedData: ApiErrorResponse = data;
        expect(castedData.errors[0]).toBe("An error occurred");
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

        const mockRequest = jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetResponse);
        const transaction : TransactionService = new TransactionService(requestClient);
        const data = await transaction.getTransaction({} as string);

        expect(data.httpStatusCode).toBe(200);
        const castedData: Resource<Transaction> = data as Resource<Transaction>;
        expect(castedData.resource.companyName).toBe(mockResponseBody.company_name);
        expect(castedData.resource.companyNumber).toBe(mockResponseBody.company_number);
        expect(castedData.resource.links.self).toBe(mockResponseBody.links.self);
        expect(castedData.resource.reference).toBe(mockResponseBody.reference);
        expect(castedData.resource.description).toBe(mockResponseBody.description);
    });

    it("put returns successful response", async () => {
        const mockPutResponse = {
            headers: {
                "X-Payment-Required": "http://link-to-payment"
            },
            status: 202
        };

        jest.spyOn(requestClient, "httpPut").mockClear().mockResolvedValue(mockPutResponse);
        const transaction : TransactionService = new TransactionService(requestClient);
        const data = await transaction.putTransaction({ id: "abc" } as Transaction);

        expect(data.httpStatusCode).toBe(202);
        const castedData: ApiResponse<Transaction> = data as ApiResponse<Transaction>;
        expect(castedData.headers["X-Payment-Required"]).toBe("http://link-to-payment");
    });

    it("put returns an error response on failure", async () => {
        const mockPutResponse = {
            status: 422,
            error: "Unprocessable Entity"
        };

        const mockRequest = jest.spyOn(requestClient, "httpPut").mockClear().mockResolvedValue(mockPutResponse);
        const transaction : TransactionService = new TransactionService(requestClient);
        const data = await transaction.putTransaction({ id: "abc" } as Transaction);

        expect(data.httpStatusCode).toBe(422);
        const castedData: ApiErrorResponse = data;
        expect(castedData.errors[0]).toBe("Unprocessable Entity");
    });

    it(
        "get transaction list for resource kind returns success response ",
        async () => {
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

            const mockRequest = jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetResponse);
            const transaction : TransactionService = new TransactionService(requestClient);
            const data = await transaction.getTransactionsForResourceKind({} as string);
            expect(data.httpStatusCode).toBe(200);
            const castedData: Resource<TransactionList> = data as Resource<TransactionList>;
            expect(castedData.resource?.items[0].id).toBe(transactionList.items[0].id);
            expect(castedData.resource?.items[0].status).toBe(transactionList.items[0].status);
        }
    );
});
