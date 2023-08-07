import chai from "chai";
import sinon from "sinon";
import { RequestClient } from "../../../src/http";
import { Resource } from "../../../src";
import RegisteredEmailAddressService from "../../../src/services/registered-email-address/service";
import {
    RegisteredEmailAddress,
    RegisteredEmailAddressCreatedResource
} from "../../../src/services/registered-email-address/types";

const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

describe("registered-email-address", () => {
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
            expect(data.status).to.equal(401);
            expect(data.error).to.equal("An error occurred");
        });
    });

    it("post maps the registered email address field data items correctly", async () => {
        const ID = "id";
        const EMAIL_ADDRESS_TO_REGISTER = "test@test.com";
        const ACCEPT_APPROPRIATE_EMAIL_ADDRESS_STATEMENT = true;
        const ETAG = "etag";
        const KIND = "kind";
        const CREATED_AT = "created at";
        const UPDATED_AT = "updated at";
        const SELF_LINK = "self at";
        const registeredEmailAddress: RegisteredEmailAddress = {
            registeredEmailAddress: EMAIL_ADDRESS_TO_REGISTER,
            acceptAppropriateEmailAddressStatement: ACCEPT_APPROPRIATE_EMAIL_ADDRESS_STATEMENT
        };
        const mockPostResponse = {
            status: 200,
            body: {
                id: ID,
                data: {
                    registered_email_address: EMAIL_ADDRESS_TO_REGISTER,
                    accept_appropriate_email_address_statement: ACCEPT_APPROPRIATE_EMAIL_ADDRESS_STATEMENT,
                    etag: ETAG,
                    kind: KIND
                },
                created_at: CREATED_AT,
                updated_at: UPDATED_AT,
                links: {
                    self: SELF_LINK
                }
            }
        };

        sinon.stub(requestClient, "httpPost").resolves(mockPostResponse);

        await registeredEmailAddressService.postRegisteredEmailAddress(TRANSACTION_ID, registeredEmailAddress).then((data) => {
            expect(data.httpStatusCode).to.equal(200);
            const castedData: Resource<RegisteredEmailAddressCreatedResource> = data as Resource<RegisteredEmailAddressCreatedResource>;
            expect(castedData.resource.id).to.equal(ID);
            expect(castedData.resource.data.registeredEmailAddress).to.equal(EMAIL_ADDRESS_TO_REGISTER);
            expect(castedData.resource.data.acceptAppropriateEmailAddressStatement).to.equal(ACCEPT_APPROPRIATE_EMAIL_ADDRESS_STATEMENT);
            expect(castedData.resource.data.etag).to.equal(ETAG);
            expect(castedData.resource.data.kind).to.equal(KIND);
            expect(castedData.resource.createdAt).to.equal(CREATED_AT);
            expect(castedData.resource.updatedAt).to.equal(UPDATED_AT);
            expect(castedData.resource.links.self).to.equal(SELF_LINK);
        });
    });
});
