import chai from "chai";
import sinon from "sinon";
import { RequestClient } from "../../../src/http";
import { ApiErrorResponse } from "../../../src/services/resource";
import { Resource } from "../../../src";
import RegisteredEmailAddressService from "../../../src/services/registered-email-address/service";
import {
    RegisteredEmailAddress,
    RegisteredEmailAddressResource
} from "../../../src/services/registered-email-address/types";

const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

describe("registered-email-address", () => {
    const REGISTERED_EMAIL_ADDRESS = "test@test.com";
    const TRANSACTION_ID = "178417-909116-690426";

    let registeredEmailAddressService: RegisteredEmailAddressService;

    beforeEach(() => {
        sinon.reset();
        sinon.restore();
        registeredEmailAddressService = new RegisteredEmailAddressService(requestClient);
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
        await registeredEmailAddressService.postRegisteredEmailAddress(TRANSACTION_ID, {} as RegisteredEmailAddress).catch((data) => {
            expect(data.httpStatusCode).to.equal(401);
            const castedData: ApiErrorResponse = data;
            expect(castedData.errors[0]).to.equal("An error occurred");
        });
    });

    it("post maps the registered email address field data items correctly", async () => {
        const registeredEmailAddress: RegisteredEmailAddress = { registeredEmailAddress: REGISTERED_EMAIL_ADDRESS };
        const mockResponseBody: RegisteredEmailAddressResource = { registered_email_address: REGISTERED_EMAIL_ADDRESS };
        const mockPostResponse = {
            status: 200, body: mockResponseBody
        };

        sinon.stub(requestClient, "httpPost").resolves(mockPostResponse);

        await registeredEmailAddressService.postRegisteredEmailAddress(TRANSACTION_ID, registeredEmailAddress).then((data) => {
            expect(data.httpStatusCode).to.equal(200);
            const castedData: Resource<RegisteredEmailAddress> = data as Resource<RegisteredEmailAddress>;
            expect(castedData.resource.registeredEmailAddress).to.equal(mockResponseBody.registered_email_address);
        });
    });
});
