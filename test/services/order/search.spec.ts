import sinon from "sinon";
import { RequestClient } from "../../../src";
import { OrderSearchService, SearchResponse } from "../../../src/services/order/search";
import { expect } from "chai";
import { ApiErrorResponse, ApiResponse } from "../../../src/services/resource";
import { Failure, Success } from "../../../src/services/result";

const requestClient = new RequestClient({
    baseUrl: "URL-NOT-USED",
    oauthToken: "TOKEN-NOT-USED"
});

const expectedOrderSummary = {
    id: "ORD-123123-123123",
    email: "demo@ch.gov.uk",
    companyNumber: "12345678",
    productLine: "Certificate",
    orderDate: "01/01/1980",
    paymentStatus: "paid"
};

describe("OrderSearchService", () => {
    beforeEach(() => {
        sinon.reset();
        sinon.restore();
    });

    afterEach(done => {
        sinon.reset();
        sinon.restore();
        done();
    });

    it("Fetches results from the search orders endpoint", async () => {
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
            .returns(serverResponse)
            .calledWithExactly("/orders/search");
        const searchService: OrderSearchService = new OrderSearchService(requestClient);

        // when {results are fetched from the search endpoint}
        const clientResult = await searchService.search({}) as Success<ApiResponse<SearchResponse>, ApiErrorResponse>;

        // then {the response status should be success}
        expect(clientResult.isSuccess()).to.be.true;
        expect(clientResult.isFailure()).to.be.false;
        expect(clientResult.value.httpStatusCode).to.equal(200);

        // and {the entity returned in the response should match the expected value}
        expect(clientResult.value.resource.totalOrders).to.equal(1);
        expect(clientResult.value.resource.orderSummaries[0]).to.deep.equal(expectedOrderSummary);
        mock.verify();
    });

    it("Fetches results from the search orders endpoint with single criteria specified", async () => {
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
            .returns(serverResponse)
            .calledWithExactly("/orders/search?company_number=12345678");
        const searchService: OrderSearchService = new OrderSearchService(requestClient);

        // when {results are fetched from the search endpoint using a single criteria}
        const clientResult = await searchService.search({
            companyNumber: "12345678"
        }) as Success<ApiResponse<SearchResponse>, ApiErrorResponse>;

        // then {the response status should be success}
        expect(clientResult.isSuccess()).to.be.true;
        expect(clientResult.isFailure()).to.be.false;
        expect(clientResult.value.httpStatusCode).to.equal(200);

        // and {the entity returned by the endpoint should match the expected value}
        expect(clientResult.value.resource.totalOrders).to.equal(1);
        expect(clientResult.value.resource.orderSummaries[0]).to.deep.equal(expectedOrderSummary);
        mock.verify();
    });

    it("Fetches results from the search orders endpoint with multiple criteria specified", async () => {
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
            .returns(serverResponse)
            .calledWithExactly("/orders/search?order_number=ORD-123123-123123&email=demo@ch.gov.uk&company_number=12345678");
        const searchService: OrderSearchService = new OrderSearchService(requestClient);

        // when {results are fetched from the search endpoint with multiple criteria specified}
        const clientResult = await searchService.search({
            orderNumber: "ORD-123123-123123",
            email: "demo@ch.gov.uk",
            companyNumber: "12345678"
        }) as Success<ApiResponse<SearchResponse>, ApiErrorResponse>;

        // then {the response status should be success}
        expect(clientResult.isSuccess()).to.be.true;
        expect(clientResult.isFailure()).to.be.false;
        expect(clientResult.value.httpStatusCode).to.equal(200);

        // and {the entity returned by the endpoint should match the expected value}
        expect(clientResult.value.resource.totalOrders).to.equal(0);
        expect(clientResult.value.resource.orderSummaries).to.deep.equal([]);
        mock.verify();
    });

    it("Forwards the error returned by the search orders endpoint back to the caller", async () => {
        // given {the server will return an error}
        const serverResponse = {
            status: 401,
            error: {
                errors: [{ error: "An error occurred" }]
            }
        };
        const mock = sinon.mock(requestClient);
        mock.expects("httpGet")
            .returns(serverResponse)
            .calledWithExactly("/orders/search");
        const searchService: OrderSearchService = new OrderSearchService(requestClient);

        // when {results are fetched from the search endpoint}
        const clientResult = await searchService.search({}) as Failure<ApiResponse<SearchResponse>, ApiErrorResponse>;

        // then {the response status should be success}
        expect(clientResult.isFailure()).to.be.true;
        expect(clientResult.isSuccess()).to.be.false;
        expect(clientResult.value.httpStatusCode).to.equal(401);

        // and {the error(s) should be returned in the response}
        expect(clientResult.value.errors[0].error).to.equal("An error occurred");
    });
});
