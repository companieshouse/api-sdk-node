import { RequestClient } from "../../../src";
import { CheckoutSearchService, CheckoutSummary, SearchResponse } from "../../../src/services/order/search";
import { ApiErrorResponse, ApiResponse } from "../../../src/services/resource";
import { Failure, Success } from "../../../src/services/result";

const requestClient = new RequestClient({
    baseUrl: "URL-NOT-USED",
    oauthToken: "TOKEN-NOT-USED"
});

const expectedOrderSummary: CheckoutSummary = {
    id: "ORD-123123-123123",
    email: "demo@ch.gov.uk",
    companyNumber: "12345678",
    productLine: "Certificate",
    orderDate: "01/01/1980",
    paymentStatus: "paid",
    links: {
        self: {
            link: "/path/to/orders"
        },
        order: {
            link: "/path/to/orders"
        }
    }
};

describe("CheckoutSearchService", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    afterEach(done => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
        done();
    });

    it(
        "Fetches results from the search orders endpoint with single criteria specified",
        async () => {
            // given {the server will return HTTP 200 OK}
            const serverResponse = {
                status: 200,
                body: {
                    total_orders: 1,
                    order_summaries: [expectedOrderSummary]
                }
            };
            const mock = sinon.mock(requestClient);
            mock.expects("httpGet")
                .mockReturnValue(serverResponse)
                .calledWithExactly("/orders/search?page_size=1000");
            const searchService: CheckoutSearchService = new CheckoutSearchService(requestClient);

            // when {results are fetched from the search endpoint using a single criteria}
            const clientResult = await searchService.search({
                pageSize: 1000
            }) as Success<ApiResponse<SearchResponse>, ApiErrorResponse>;

            // then {the response status should be success}
            expect(clientResult.isSuccess()).toBe(true);
            expect(clientResult.isFailure()).toBe(false);
            expect(clientResult.value.httpStatusCode).toBe(200);

            // and {the entity returned by the endpoint should match the expected value}
            expect(clientResult.value.resource.totalOrders).toBe(1);
            expect(clientResult.value.resource.orderSummaries[0]).toEqual(expectedOrderSummary);
            mock.verify();
        }
    );

    it(
        "Fetches results from the search orders endpoint with multiple criteria specified",
        async () => {
            // given {the server will return HTTP 200 OK}
            const serverResponse = {
                status: 200,
                body: {
                    total_orders: 0,
                    order_summaries: []
                }
            };

            const mock = sinon.mock(requestClient);
            mock.expects("httpGet")
                .mockReturnValue(serverResponse)
                .calledWithExactly("/orders/search?id=ORD-123123-123123&email=demo@ch.gov.uk&company_number=12345678&page_size=1000");
            const searchService: CheckoutSearchService = new CheckoutSearchService(requestClient);

            // when {results are fetched from the search endpoint with multiple criteria specified}
            const clientResult = await searchService.search({
                id: "ORD-123123-123123",
                email: "demo@ch.gov.uk",
                companyNumber: "12345678",
                pageSize: 1000
            }) as Success<ApiResponse<SearchResponse>, ApiErrorResponse>;

            // then {the response status should be success}
            expect(clientResult.isSuccess()).toBe(true);
            expect(clientResult.isFailure()).toBe(false);
            expect(clientResult.value.httpStatusCode).toBe(200);

            // and {the entity returned by the endpoint should match the expected value}
            expect(clientResult.value.resource.totalOrders).toBe(0);
            expect(clientResult.value.resource.orderSummaries).toEqual([]);
            mock.verify();
        }
    );

    it(
        "Forwards the error returned by the search orders endpoint back to the caller",
        async () => {
            // given {the server will return an error}
            const serverResponse = {
                status: 400,
                error: {
                    errors: [{ error: "An error occurred" }]
                }
            };
            const mock = sinon.mock(requestClient);
            mock.expects("httpGet")
                .mockReturnValue(serverResponse)
                .calledWithExactly("/orders/search");
            const searchService: CheckoutSearchService = new CheckoutSearchService(requestClient);

            // when {results are fetched from the search endpoint}
            const clientResult = await searchService.search({} as any) as Failure<ApiResponse<SearchResponse>, ApiErrorResponse>;

            // then {the response status should be success}
            expect(clientResult.isFailure()).toBe(true);
            expect(clientResult.isSuccess()).toBe(false);
            expect(clientResult.value.httpStatusCode).toBe(400);

            // and {the error(s) should be returned in the response}
            expect(clientResult.value.errors[0].error).toBe("An error occurred");
        }
    );
});
