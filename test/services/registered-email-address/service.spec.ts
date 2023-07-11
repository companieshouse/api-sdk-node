import chai from "chai";
import sinon from "sinon";

import RegisteredEmailAddressService from "../../../src/services/registered-email-address/service";
import { RequestClient } from "../../../src/http";
import { RegisteredEmailAddressResource, RegisteredEmailAddress } from "../../../src/services/registered-email-address/types";
import { fullRegisteredEmailAddressMock } from "./mocks";

const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

describe("registered-email-address", () => {
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
        const registeredEmailAddress : RegisteredEmailAddressService = new RegisteredEmailAddressService(requestClient);
        const data = await registeredEmailAddress.getRegisteredEmailAddress("NUMBER-NOT-IMPORTANT");

        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    });

    it("maps the company field data items correctly", async () => {
        const mockResponseBody : RegisteredEmailAddressResource = fullRegisteredEmailAddressMock;

        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const registeredEmailAddress : RegisteredEmailAddressService = new RegisteredEmailAddressService(requestClient);
        const data = await registeredEmailAddress.getRegisteredEmailAddress("NUMBER-NOT-IMPORTANT");

        const resource = data.resource as RegisteredEmailAddress;

        expect(data.httpStatusCode).to.equal(200);
        expect(resource.registeredEmailAddress).to.equal(mockResponseBody.registered_email_address);
    });
});
