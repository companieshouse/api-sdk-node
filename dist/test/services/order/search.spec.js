"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = __importDefault(require("sinon"));
const src_1 = require("../../../src");
const search_1 = require("../../../src/services/order/search");
const chai_1 = require("chai");
const requestClient = new src_1.RequestClient({
    baseUrl: "URL-NOT-USED",
    oauthToken: "TOKEN-NOT-USED"
});
const expectedOrderSummary = {
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
        sinon_1.default.reset();
        sinon_1.default.restore();
    });
    afterEach(done => {
        sinon_1.default.reset();
        sinon_1.default.restore();
        done();
    });
    it("Fetches results from the search orders endpoint with single criteria specified", () => __awaiter(void 0, void 0, void 0, function* () {
        // given {the server will return HTTP 200 OK}
        const serverResponse = {
            status: 200,
            body: {
                total_orders: 1,
                order_summaries: [expectedOrderSummary]
            }
        };
        const mock = sinon_1.default.mock(requestClient);
        mock.expects("httpGet")
            .returns(serverResponse)
            .calledWithExactly("/orders/search?page_size=1000");
        const searchService = new search_1.CheckoutSearchService(requestClient);
        // when {results are fetched from the search endpoint using a single criteria}
        const clientResult = yield searchService.search({
            pageSize: 1000
        });
        // then {the response status should be success}
        chai_1.expect(clientResult.isSuccess()).to.be.true;
        chai_1.expect(clientResult.isFailure()).to.be.false;
        chai_1.expect(clientResult.value.httpStatusCode).to.equal(200);
        // and {the entity returned by the endpoint should match the expected value}
        chai_1.expect(clientResult.value.resource.totalOrders).to.equal(1);
        chai_1.expect(clientResult.value.resource.orderSummaries[0]).to.deep.equal(expectedOrderSummary);
        mock.verify();
    }));
    it("Fetches results from the search orders endpoint with multiple criteria specified", () => __awaiter(void 0, void 0, void 0, function* () {
        // given {the server will return HTTP 200 OK}
        const serverResponse = {
            status: 200,
            body: {
                total_orders: 0,
                order_summaries: []
            }
        };
        const mock = sinon_1.default.mock(requestClient);
        mock.expects("httpGet")
            .returns(serverResponse)
            .calledWithExactly("/orders/search?id=ORD-123123-123123&email=demo@ch.gov.uk&company_number=12345678&page_size=1000");
        const searchService = new search_1.CheckoutSearchService(requestClient);
        // when {results are fetched from the search endpoint with multiple criteria specified}
        const clientResult = yield searchService.search({
            id: "ORD-123123-123123",
            email: "demo@ch.gov.uk",
            companyNumber: "12345678",
            pageSize: 1000
        });
        // then {the response status should be success}
        chai_1.expect(clientResult.isSuccess()).to.be.true;
        chai_1.expect(clientResult.isFailure()).to.be.false;
        chai_1.expect(clientResult.value.httpStatusCode).to.equal(200);
        // and {the entity returned by the endpoint should match the expected value}
        chai_1.expect(clientResult.value.resource.totalOrders).to.equal(0);
        chai_1.expect(clientResult.value.resource.orderSummaries).to.deep.equal([]);
        mock.verify();
    }));
    it("Forwards the error returned by the search orders endpoint back to the caller", () => __awaiter(void 0, void 0, void 0, function* () {
        // given {the server will return an error}
        const serverResponse = {
            status: 400,
            error: {
                errors: [{ error: "An error occurred" }]
            }
        };
        const mock = sinon_1.default.mock(requestClient);
        mock.expects("httpGet")
            .returns(serverResponse)
            .calledWithExactly("/orders/search");
        const searchService = new search_1.CheckoutSearchService(requestClient);
        // when {results are fetched from the search endpoint}
        const clientResult = yield searchService.search({});
        // then {the response status should be success}
        chai_1.expect(clientResult.isFailure()).to.be.true;
        chai_1.expect(clientResult.isSuccess()).to.be.false;
        chai_1.expect(clientResult.value.httpStatusCode).to.equal(400);
        // and {the error(s) should be returned in the response}
        chai_1.expect(clientResult.value.errors[0].error).to.equal("An error occurred");
    }));
});
//# sourceMappingURL=search.spec.js.map