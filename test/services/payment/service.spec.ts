import chaiAsPromised from "chai-as-promised";
import chaiHttp from "chai-http";

import PaymentService from "../../../src/services/payment/service";
import { CreatePaymentRequest, Payment, PaymentResource, CreatePaymentRequestResource } from "../../../src/services/payment/types";
import { RequestClient, HttpResponse } from "../../../src/http";
import { ApiResponse } from "../../../src/services/resource";

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
            jest.resetAllMocks();
            jest.restoreAllMocks();
        });

        afterEach(done => {
            jest.resetAllMocks();
            jest.restoreAllMocks();
            done();
        });

        it("returns an error response on failure", async () => {
            const mockPostResponse = {
                status: 401,
                error: "An error occurred"
            };

            const mockRequest = jest.spyOn(requestClient, "httpPost").mockClear().mockResolvedValue(mockPostResponse);
            const paymentService: PaymentService = new PaymentService(requestClient);
            const response = await paymentService.createPayment(mockRequestBody);
            const data = response.value as ApiResponse<Payment>;
            expect(data.httpStatusCode).toBe(401);
        });

        it("maps the payment fields", async () => {
            const mockPostResponse = {
                status: 200,
                body: mockResponseBody
            };

            const mockRequest = jest.spyOn(requestClient, "httpPost").mockClear().mockResolvedValue(mockPostResponse);
            const paymentService: PaymentService = new PaymentService(requestClient);
            const response = await paymentService.createPayment(mockRequestBody);

            const data = response.value as ApiResponse<Payment>;
            const payment = data.resource;
            expect(payment.amount).toBe(mockResponseBody.amount);
            expect(payment.availablePaymentMethods[0]).toBe(mockResponseBody.available_payment_methods[0]);
            expect(payment.availablePaymentMethods[1]).toBe(mockResponseBody.available_payment_methods[1]);
            expect(payment.companyNumber).toBe(mockResponseBody.company_number);
            expect(payment.completedAt).toBe(mockResponseBody.completed_at);
            expect(payment.createdAt).toBe(mockResponseBody.created_at);
            expect(payment.createdBy.email).toBe(mockResponseBody.created_by.email);
            expect(payment.createdBy.forename).toBe(mockResponseBody.created_by.forename);
            expect(payment.createdBy.id).toBe(mockResponseBody.created_by.id);
            expect(payment.createdBy.surname).toBe(mockResponseBody.created_by.surname);
            expect(payment.description).toBe(mockResponseBody.description);
            expect(payment.etag).toBe(mockResponseBody.etag);
            expect(payment.kind).toBe(mockResponseBody.kind);
            expect(payment.links.journey).toBe(mockResponseBody.links.journey);
            expect(payment.links.resource).toBe(mockResponseBody.links.resource);
            expect(payment.links.self).toBe(mockResponseBody.links.self);
            expect(payment.paymentMethod).toBe(mockResponseBody.payment_method);
            expect(payment.reference).toBe(mockResponseBody.reference);
            expect(payment.status).toBe(mockResponseBody.status);
        });

        it("should map the payment request fields", async () => {
            const mockPostResponse = {
                status: 200,
                body: mockResponseBody
            };
            const mockHttpPost = jest.spyOn(requestClient, "httpPost").mockClear().mockResolvedValue(mockPostResponse);
            const paymentService: PaymentService = new PaymentService(requestClient);
            await paymentService.createPayment(mockRequestBody);
            const paymentRequest: CreatePaymentRequestResource = mockHttpPost.mock.calls[0][1];
            expect(paymentRequest.redirect_uri).toBe(mockRequestBody.redirectUri);
            expect(paymentRequest.reference).toBe(mockRequestBody.reference);
            expect(paymentRequest.resource).toBe(mockRequestBody.resource);
            expect(paymentRequest.state).toBe(mockRequestBody.state);
        });
    });

    describe("get payment", () => {
        beforeEach(() => {
            jest.resetAllMocks();
            jest.restoreAllMocks();
        });

        afterEach(done => {
            jest.resetAllMocks();
            jest.restoreAllMocks();
            done();
        });

        it("returns an error response on failure", async () => {
            const mockGetResponse = {
                status: 401,
                error: "An error occurred"
            };

            jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetResponse);
            const paymentService: PaymentService = new PaymentService(requestClient);
            const response = await paymentService.getPayment("payments/TEST_ID");
            const data = response.value as ApiResponse<Payment>;

            expect(data.resource).toBeUndefined();
        });

        it("maps the payment fields", async () => {
            const mockGetResponse = {
                status: 200,
                body: mockResponseBody
            };

            jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetResponse);
            const paymentService: PaymentService = new PaymentService(requestClient);
            const response = await paymentService.getPayment("payments/TEST_ID");

            const data = response.value as ApiResponse<Payment>;
            const payment = data.resource;
            expect(payment.amount).toBe(mockResponseBody.amount);
            expect(payment.availablePaymentMethods[0]).toBe(mockResponseBody.available_payment_methods[0]);
            expect(payment.availablePaymentMethods[1]).toBe(mockResponseBody.available_payment_methods[1]);
            expect(payment.companyNumber).toBe(mockResponseBody.company_number);
            expect(payment.completedAt).toBe(mockResponseBody.completed_at);
            expect(payment.createdAt).toBe(mockResponseBody.created_at);
            expect(payment.createdBy.email).toBe(mockResponseBody.created_by.email);
            expect(payment.createdBy.forename).toBe(mockResponseBody.created_by.forename);
            expect(payment.createdBy.id).toBe(mockResponseBody.created_by.id);
            expect(payment.createdBy.surname).toBe(mockResponseBody.created_by.surname);
            expect(payment.description).toBe(mockResponseBody.description);
            expect(payment.etag).toBe(mockResponseBody.etag);
            expect(payment.kind).toBe(mockResponseBody.kind);
            expect(payment.links.journey).toBe(mockResponseBody.links.journey);
            expect(payment.links.resource).toBe(mockResponseBody.links.resource);
            expect(payment.links.self).toBe(mockResponseBody.links.self);
            expect(payment.paymentMethod).toBe(mockResponseBody.payment_method);
            expect(payment.reference).toBe(mockResponseBody.reference);
            expect(payment.status).toBe(mockResponseBody.status);
        });
    });
});
