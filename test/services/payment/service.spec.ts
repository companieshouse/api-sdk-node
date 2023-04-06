import chai from "chai";
import sinon from "sinon";
import chaiAsPromised from "chai-as-promised";
import chaiHttp from "chai-http";

import PaymentService from "../../../src/services/payment/service";
import { CreatePaymentRequest, Payment, PaymentResource, CreatePaymentRequestResource } from "../../../src/services/payment/types";
import { RequestClient, HttpResponse } from "../../../src/http";
import { ApiResponse } from "../../../src/services/resource";
const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

const mockResponseBody: PaymentResource = ({
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

const mockRequestBody: CreatePaymentRequest = {
    redirectUri: "redirect_uri",
    reference: "reference",
    resource: "resource",
    state: "state"
};

describe("payment service", () => {
    describe("create payment", () => {
        beforeEach(() => {
            sinon.reset();
            sinon.restore();
        });

        afterEach(done => {
            sinon.reset();
            sinon.restore();
            done();
        });

        it("returns an error response on failure", async () => {
            const mockGetResponse = {
                status: 401,
                error: "An error occurred"
            };

            const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
            const paymentService: PaymentService = new PaymentService(requestClient);
            const response = await paymentService.createPayment(mockRequestBody);
            const data = response.value as ApiResponse<Payment>;
            expect(data.httpStatusCode).to.be.oneOf([500, 504]);
        });

        it("maps the payment fields", async () => {
            const mockPostResponse = {
                status: 200,
                body: mockResponseBody
            };

            const mockRequest = sinon.stub(requestClient, "httpPost").resolves(mockPostResponse);
            const paymentService: PaymentService = new PaymentService(requestClient);
            const response = await paymentService.createPayment(mockRequestBody);

            const data = response.value as ApiResponse<Payment>;
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
        });

        it("should map the payment request fields", async () => {
            const mockPostResponse = {
                status: 200,
                body: mockResponseBody
            };
            const mockHttpPost = sinon.stub(requestClient, "httpPost").resolves(mockPostResponse);
            const paymentService: PaymentService = new PaymentService(requestClient);
            await paymentService.createPayment(mockRequestBody);
            const paymentRequest: CreatePaymentRequestResource = mockHttpPost.getCall(0).args[1];
            expect(paymentRequest.redirect_uri).to.equal(mockRequestBody.redirectUri);
            expect(paymentRequest.reference).to.equal(mockRequestBody.reference);
            expect(paymentRequest.resource).to.equal(mockRequestBody.resource);
            expect(paymentRequest.state).to.equal(mockRequestBody.state);
        });
    });

    describe("get payment", () => {
        beforeEach(() => {
            sinon.reset();
            sinon.restore();
        });

        afterEach(done => {
            sinon.reset();
            sinon.restore();
            done();
        });

        it("returns an error response on failure", async () => {
            const mockGetResponse = {
                status: 401,
                error: "An error occurred"
            };

            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
            const paymentService: PaymentService = new PaymentService(requestClient);
            const response = await paymentService.getPayment("payments/TEST_ID");
            const data = response.value as ApiResponse<Payment>;

            expect(data.resource).to.be.undefined;
        });

        it("maps the payment fields", async () => {
            const mockGetResponse = {
                status: 200,
                body: mockResponseBody
            };

            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
            const paymentService: PaymentService = new PaymentService(requestClient);
            const response = await paymentService.getPayment("payments/TEST_ID");

            const data = response.value as ApiResponse<Payment>;
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
        });
    });
});
