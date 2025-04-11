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
const chai_1 = __importDefault(require("chai"));
const sinon_1 = __importDefault(require("sinon"));
const service_1 = __importDefault(require("../../../src/services/payment/service"));
const http_1 = require("../../../src/http");
const expect = chai_1.default.expect;
const requestClient = new http_1.RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
const mockResponseBody = ({
    amount: "amount",
    available_payment_methods: ["credit-card", "account"],
    company_number: "companyNumber",
    completed_at: "12-12-20",
    created_at: "12-12-20",
    created_by: {
        email: "email",
        forename: "forname",
        id: "0000001",
        surname: "surname"
    },
    description: "description",
    etag: "etag",
    kind: "kind",
    links: {
        journey: "journey",
        resource: "resource",
        self: "payment-session#payment-session"
    },
    payment_method: "credit-card",
    reference: "reference",
    status: "paid"
});
const mockRequestBody = {
    redirectUri: "redirect_uri",
    reference: "reference",
    resource: "resource",
    state: "state"
};
describe("payment service", () => {
    describe("create payment", () => {
        beforeEach(() => {
            sinon_1.default.reset();
            sinon_1.default.restore();
        });
        afterEach(done => {
            sinon_1.default.reset();
            sinon_1.default.restore();
            done();
        });
        it("returns an error response on failure", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockPostResponse = {
                status: 401,
                error: "An error occurred"
            };
            const mockRequest = sinon_1.default.stub(requestClient, "httpPost").resolves(mockPostResponse);
            const paymentService = new service_1.default(requestClient);
            const response = yield paymentService.createPayment(mockRequestBody);
            const data = response.value;
            expect(data.httpStatusCode).to.equal(401);
        }));
        it("maps the payment fields", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockPostResponse = {
                status: 200,
                body: mockResponseBody
            };
            const mockRequest = sinon_1.default.stub(requestClient, "httpPost").resolves(mockPostResponse);
            const paymentService = new service_1.default(requestClient);
            const response = yield paymentService.createPayment(mockRequestBody);
            const data = response.value;
            const payment = data.resource;
            expect(payment.amount).to.equal(mockResponseBody.amount);
            expect(payment.availablePaymentMethods[0]).to.equal(mockResponseBody.available_payment_methods[0]);
            expect(payment.availablePaymentMethods[1]).to.equal(mockResponseBody.available_payment_methods[1]);
            expect(payment.companyNumber).to.equal(mockResponseBody.company_number);
            expect(payment.completedAt).to.equal(mockResponseBody.completed_at);
            expect(payment.createdAt).to.equal(mockResponseBody.created_at);
            expect(payment.createdBy.email).to.equal(mockResponseBody.created_by.email);
            expect(payment.createdBy.forename).to.equal(mockResponseBody.created_by.forename);
            expect(payment.createdBy.id).to.equal(mockResponseBody.created_by.id);
            expect(payment.createdBy.surname).to.equal(mockResponseBody.created_by.surname);
            expect(payment.description).to.equal(mockResponseBody.description);
            expect(payment.etag).to.equal(mockResponseBody.etag);
            expect(payment.kind).to.equal(mockResponseBody.kind);
            expect(payment.links.journey).to.equal(mockResponseBody.links.journey);
            expect(payment.links.resource).to.equal(mockResponseBody.links.resource);
            expect(payment.links.self).to.equal(mockResponseBody.links.self);
            expect(payment.paymentMethod).to.equal(mockResponseBody.payment_method);
            expect(payment.reference).to.equal(mockResponseBody.reference);
            expect(payment.status).to.equal(mockResponseBody.status);
        }));
        it("should map the payment request fields", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockPostResponse = {
                status: 200,
                body: mockResponseBody
            };
            const mockHttpPost = sinon_1.default.stub(requestClient, "httpPost").resolves(mockPostResponse);
            const paymentService = new service_1.default(requestClient);
            yield paymentService.createPayment(mockRequestBody);
            const paymentRequest = mockHttpPost.getCall(0).args[1];
            expect(paymentRequest.redirect_uri).to.equal(mockRequestBody.redirectUri);
            expect(paymentRequest.reference).to.equal(mockRequestBody.reference);
            expect(paymentRequest.resource).to.equal(mockRequestBody.resource);
            expect(paymentRequest.state).to.equal(mockRequestBody.state);
        }));
    });
    describe("get payment", () => {
        beforeEach(() => {
            sinon_1.default.reset();
            sinon_1.default.restore();
        });
        afterEach(done => {
            sinon_1.default.reset();
            sinon_1.default.restore();
            done();
        });
        it("returns an error response on failure", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockGetResponse = {
                status: 401,
                error: "An error occurred"
            };
            sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
            const paymentService = new service_1.default(requestClient);
            const response = yield paymentService.getPayment("payments/TEST_ID");
            const data = response.value;
            expect(data.resource).to.be.undefined;
        }));
        it("maps the payment fields", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockGetResponse = {
                status: 200,
                body: mockResponseBody
            };
            sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
            const paymentService = new service_1.default(requestClient);
            const response = yield paymentService.getPayment("payments/TEST_ID");
            const data = response.value;
            const payment = data.resource;
            expect(payment.amount).to.equal(mockResponseBody.amount);
            expect(payment.availablePaymentMethods[0]).to.equal(mockResponseBody.available_payment_methods[0]);
            expect(payment.availablePaymentMethods[1]).to.equal(mockResponseBody.available_payment_methods[1]);
            expect(payment.companyNumber).to.equal(mockResponseBody.company_number);
            expect(payment.completedAt).to.equal(mockResponseBody.completed_at);
            expect(payment.createdAt).to.equal(mockResponseBody.created_at);
            expect(payment.createdBy.email).to.equal(mockResponseBody.created_by.email);
            expect(payment.createdBy.forename).to.equal(mockResponseBody.created_by.forename);
            expect(payment.createdBy.id).to.equal(mockResponseBody.created_by.id);
            expect(payment.createdBy.surname).to.equal(mockResponseBody.created_by.surname);
            expect(payment.description).to.equal(mockResponseBody.description);
            expect(payment.etag).to.equal(mockResponseBody.etag);
            expect(payment.kind).to.equal(mockResponseBody.kind);
            expect(payment.links.journey).to.equal(mockResponseBody.links.journey);
            expect(payment.links.resource).to.equal(mockResponseBody.links.resource);
            expect(payment.links.self).to.equal(mockResponseBody.links.self);
            expect(payment.paymentMethod).to.equal(mockResponseBody.payment_method);
            expect(payment.reference).to.equal(mockResponseBody.reference);
            expect(payment.status).to.equal(mockResponseBody.status);
        }));
    });
});
//# sourceMappingURL=service.spec.js.map