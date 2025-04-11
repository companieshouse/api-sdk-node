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
const http_1 = require("../../../src/http");
const service_1 = __importDefault(require("../../../src/services/registered-email-address/service"));
const expect = chai_1.default.expect;
const requestClient = new http_1.RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
describe("registered-email-address", () => {
    const TRANSACTION_ID = "178417-909116-690426";
    let registeredEmailAddressService;
    beforeEach(() => {
        sinon_1.default.reset();
        sinon_1.default.restore();
        registeredEmailAddressService = new service_1.default(requestClient);
    });
    afterEach(done => {
        sinon_1.default.reset();
        sinon_1.default.restore();
        done();
    });
    it("post returns an error response on failure", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPostResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpPost").resolves(mockPostResponse);
        yield registeredEmailAddressService.postRegisteredEmailAddress(TRANSACTION_ID, {}).catch((data) => {
            expect(data.status).to.equal(401);
            expect(data.error).to.equal("An error occurred");
        });
    }));
    it("post maps the registered email address field data items correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const ID = "id";
        const EMAIL_ADDRESS_TO_REGISTER = "test@test.com";
        const ACCEPT_APPROPRIATE_EMAIL_ADDRESS_STATEMENT = true;
        const ETAG = "etag";
        const KIND = "kind";
        const CREATED_AT = "created at";
        const UPDATED_AT = "updated at";
        const SELF_LINK = "self at";
        const registeredEmailAddress = {
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
        sinon_1.default.stub(requestClient, "httpPost").resolves(mockPostResponse);
        yield registeredEmailAddressService.postRegisteredEmailAddress(TRANSACTION_ID, registeredEmailAddress).then((data) => {
            expect(data.httpStatusCode).to.equal(200);
            const castedData = data;
            expect(castedData.resource.id).to.equal(ID);
            expect(castedData.resource.data.registeredEmailAddress).to.equal(EMAIL_ADDRESS_TO_REGISTER);
            expect(castedData.resource.data.acceptAppropriateEmailAddressStatement).to.equal(ACCEPT_APPROPRIATE_EMAIL_ADDRESS_STATEMENT);
            expect(castedData.resource.data.etag).to.equal(ETAG);
            expect(castedData.resource.data.kind).to.equal(KIND);
            expect(castedData.resource.createdAt).to.equal(CREATED_AT);
            expect(castedData.resource.updatedAt).to.equal(UPDATED_AT);
            expect(castedData.resource.links.self).to.equal(SELF_LINK);
        });
    }));
});
//# sourceMappingURL=service.spec.js.map