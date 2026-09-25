import chai from "chai";

import { createApiClient } from "../src/index";
import { API_URL, ACCOUNT_URL, PAYMENT_URL } from "../src/config";

const expect = chai.expect;

describe("createApiClient", () => {
    describe("backwards compatibility", () => {
        it("should not throw when called with only an api key", () => {
            expect(() => createApiClient("api-key")).not.to.throw();
        });

        it("should not throw when called with only an oauth token", () => {
            expect(() => createApiClient(undefined, "oauth-token")).not.to.throw();
        });

        it("should not throw when called with api key and custom base url", () => {
            expect(() => createApiClient("api-key", undefined, "https://custom-api.example.com")).not.to.throw();
        });

        it("should not throw when called with api key, custom base url and custom account url", () => {
            expect(() => createApiClient("api-key", undefined, "https://custom-api.example.com", "https://custom-account.example.com")).not.to.throw();
        });

        it("should throw when both api key and oauth token are provided", () => {
            expect(() => createApiClient("api-key", "oauth-token")).to.throw(
                "You cannot set both api key and oauth token to create a client. Please use one or the other"
            );
        });
    });

    describe("payment url configuration", () => {
        it("should configure the payment client with the default PAYMENT_URL when no payment url is supplied", () => {
            const client = createApiClient(undefined, "oauth-token");

            const paymentClient = (client as any).paymentClient;
            expect((paymentClient as any).options.baseUrl).to.equal(PAYMENT_URL);
        });

        it("should configure the payment client with a custom url when basePaymentUrl is supplied", () => {
            const customPaymentUrl = "https://custom-payments.example.com";
            const client = createApiClient(
                "api-key",
                undefined,
                API_URL,
                ACCOUNT_URL,
                customPaymentUrl
            );

            const paymentClient = (client as any).paymentClient;
            expect((paymentClient as any).options.baseUrl).to.equal(customPaymentUrl);
        });

        it("should not affect the api client base url when a custom payment url is supplied", () => {
            const client = createApiClient(
                "api-key",
                undefined,
                API_URL,
                ACCOUNT_URL,
                "https://custom-payments.example.com"
            );

            const apiClient = (client as any).apiClient;
            expect((apiClient as any).options.baseUrl).to.equal(API_URL);
        });

        it("should not affect the account client base url when a custom payment url is supplied", () => {
            const client = createApiClient(
                "api-key",
                undefined,
                API_URL,
                ACCOUNT_URL,
                "https://custom-payments.example.com"
            );

            const accountClient = (client as any).accountClient;
            expect((accountClient as any).options.baseUrl).to.equal(ACCOUNT_URL);
        });
    });
});
