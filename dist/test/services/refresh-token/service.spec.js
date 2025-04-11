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
const refresh_token_1 = require("../../../src/services/refresh-token");
const expect = chai_1.default.expect;
const requestClient = new http_1.RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
describe("refresh token", () => {
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
        const mockErrorResponseBody = {
            status: 400,
            error: "Invalid parameter"
        };
        sinon_1.default.stub(requestClient, "httpPost").resolves(mockErrorResponseBody);
        const refreshToken = new refresh_token_1.RefreshTokenService(requestClient);
        const data = yield refreshToken.refresh("REFRESH_TOKEN", "GRANT_TYPE", "CLIENT_ID", "CLIENT_SECRET");
        expect(data).to.deep.equal({
            httpStatusCode: mockErrorResponseBody.status,
            errors: [mockErrorResponseBody.error]
        });
    }));
    it("maps the refresh token data correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockResponseBody = ({
            access_token: "string",
            token_type: "string",
            expires_in: 1
        });
        sinon_1.default.stub(requestClient, "httpPost").resolves({
            status: 200,
            body: mockResponseBody
        });
        const refreshToken = new refresh_token_1.RefreshTokenService(requestClient);
        const data = yield refreshToken.refresh("REFRESH_TOKEN", "GRANT_TYPE", "CLIENT_ID", "CLIENT_SECRET");
        expect(data.httpStatusCode).to.be.equal(200);
        expect(data.resource.access_token).to.be.equal(mockResponseBody.access_token);
        expect(data.resource.token_type).to.be.equal(mockResponseBody.token_type);
        expect(data.resource.expires_in).to.be.equal(mockResponseBody.expires_in);
    }));
    it("maps the refresh token data correctly when fields are missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockResponseBody = ({
            access_token: "string",
            token_type: undefined,
            expires_in: 1
        });
        sinon_1.default.stub(requestClient, "httpPost").resolves({
            status: 200,
            body: mockResponseBody
        });
        const refreshToken = new refresh_token_1.RefreshTokenService(requestClient);
        const data = yield refreshToken.refresh("REFRESH_TOKEN", "GRANT_TYPE", "CLIENT_ID", "CLIENT_SECRET");
        expect(data.httpStatusCode).to.be.equal(200);
        expect(data.resource.access_token).to.be.equal(mockResponseBody.access_token);
        expect(data.resource.token_type).to.be.equal(undefined);
        expect(data.resource.expires_in).to.be.equal(mockResponseBody.expires_in);
    }));
});
//# sourceMappingURL=service.spec.js.map