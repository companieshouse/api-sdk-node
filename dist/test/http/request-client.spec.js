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
const http_1 = require("../../src/http");
const nock = require("nock");
const expect = chai_1.default.expect;
describe("request-client", () => {
    const baseUrl = "http://api";
    const client = new http_1.RequestClient({ oauthToken: "123", baseUrl });
    beforeEach(() => {
        sinon_1.default.reset();
        sinon_1.default.restore();
    });
    afterEach(done => {
        sinon_1.default.reset();
        sinon_1.default.restore();
        done();
    });
    it("returns an error response when HTTP GET request fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = { error: "company not found" };
        const statusCode = 404;
        const rejectedValue = {
            status: statusCode,
            body
        };
        const mockRequest = sinon_1.default.stub(client, "request").rejects(rejectedValue).returns(rejectedValue);
        const resp = yield client.httpGet("/foo");
        expect(mockRequest).to.have.been.calledOnce;
        expect(resp.body).to.deep.equal(body);
        expect(resp.status).to.equal(statusCode);
    }));
    it("returns the correct body for successful GET calls", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = { ok: true };
        const statusCode = 200;
        const resolvedValue = {
            status: statusCode,
            body: body
        };
        const mockRequest = sinon_1.default.stub(client, "request").resolves(resolvedValue);
        const resp = yield client.httpGet("/foo");
        expect(mockRequest).to.have.been.calledOnce;
        expect(resp.error).to.be.undefined;
        expect(resp.body).to.deep.equal(body);
        expect(resp.status).to.equal(statusCode);
    }));
    it("returns an error response when HTTP POST request fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const returnedBody = { error: "company not found" };
        const statusCode = 404;
        const rejectedValue = {
            status: statusCode,
            response: {
                body: returnedBody
            }
        };
        const mockRequest = sinon_1.default.stub(client, "request").rejects(rejectedValue).returns(rejectedValue);
        const resp = yield client.httpPost("/foo", { data: "bar" });
        expect(mockRequest).to.have.been.calledOnce;
        expect(resp.status).to.equal(statusCode);
    }));
    it("returns the correct body for successful POST calls", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = { ok: true };
        const statusCode = 200;
        const resolvedValue = {
            status: statusCode,
            body: body
        };
        const mockRequest = sinon_1.default.stub(client, "request").resolves(resolvedValue);
        const resp = yield client.httpPost("/foo", { data: "bar" });
        expect(mockRequest).to.have.been.calledOnce;
        expect(resp.error).to.be.undefined;
        expect(resp.body).to.deep.equal(body);
        expect(resp.status).to.equal(statusCode);
    }));
    it("returns an error response when HTTP PATCH request fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const returnedBody = { error: "company not found" };
        const statusCode = 404;
        const rejectedValue = {
            status: statusCode,
            response: {
                body: returnedBody
            }
        };
        const mockRequest = sinon_1.default.stub(client, "request").rejects(rejectedValue).returns(rejectedValue);
        const resp = yield client.httpPatch("/foo", { data: "bar" }, { content: "bob" });
        expect(mockRequest).to.have.been.calledOnce;
        expect(resp.status).to.equal(statusCode);
    }));
    it("returns the correct body for successful PATCH calls", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = { ok: true };
        const statusCode = 200;
        const resolvedValue = {
            status: statusCode,
            body: body
        };
        const mockRequest = sinon_1.default.stub(client, "request").resolves(resolvedValue);
        const resp = yield client.httpPatch("/foo", { data: "bar" }, { content: "bob" });
        expect(mockRequest).to.have.been.calledOnce;
        expect(resp.error).to.be.undefined;
        expect(resp.body).to.deep.equal(body);
        expect(resp.status).to.equal(statusCode);
    }));
    it("propagates additional headers provided by client", () => __awaiter(void 0, void 0, void 0, function* () {
        // Given
        const client = new http_1.RequestClient({ oauthToken: "123", baseUrl: "http://localhost" });
        const scope = nock(/.*/)
            .patch("/orderable/certificates/CHS001")
            .matchHeader("Authorization", "Bearer 123")
            .matchHeader("Accept", "application/merge-patch+json")
            .matchHeader("Content-Type", "application/merge-patch+json")
            .matchHeader("Example", "Example value")
            .reply(200);
        // When
        const resp = yield client.httpPatch("/orderable/certificates/CHS001", { data: "bar" }, {
            "Content-Type": "application/merge-patch+json",
            Accept: "application/merge-patch+json",
            Example: "Example value"
        });
        // Then
        expect(resp.status).to.equal(200);
        scope.done();
    }));
    it("propagates additional headers provided by client, regardless of header name case", () => __awaiter(void 0, void 0, void 0, function* () {
        // Given
        const client = new http_1.RequestClient({ oauthToken: "123", baseUrl: "http://localhost" });
        const scope = nock(/.*/)
            .patch("/orderable/certificates/CHS001")
            .matchHeader("Authorization", "Bearer 123")
            .matchHeader("Accept", "application/merge-patch+json")
            .matchHeader("Content-Type", "application/merge-patch+json")
            .matchHeader("Example", "Example value")
            .reply(200);
        // When
        const resp = yield client.httpPatch("/orderable/certificates/CHS001", { data: "bar" }, {
            "content-type": "application/merge-patch+json",
            accept: "application/merge-patch+json",
            Example: "Example value"
        });
        // Then
        expect(resp.status).to.equal(200);
        scope.done();
    }));
    it("sets default headers correctly where not provided in additional headers", () => __awaiter(void 0, void 0, void 0, function* () {
        // Given
        const client = new http_1.RequestClient({ oauthToken: "123", baseUrl: "http://localhost" });
        const scope = nock(/.*/)
            .patch("/orderable/certificates/CHS001")
            .matchHeader("Authorization", "Bearer 123")
            .matchHeader("Accept", "application/json")
            .matchHeader("Content-Type", "application/json")
            .reply(200);
        // When
        const resp = yield client.httpPatch("/orderable/certificates/CHS001", { data: "bar" });
        // Then
        expect(resp.status).to.equal(200);
        scope.done();
    }));
    it("returns an error response when HTTP PUT request fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const returnedBody = { error: "company not found" };
        const statusCode = 404;
        const rejectedValue = {
            status: statusCode,
            response: {
                body: returnedBody
            }
        };
        const mockRequest = sinon_1.default.stub(client, "request").rejects(rejectedValue).returns(rejectedValue);
        const resp = yield client.httpPut("/foo", { data: "bar" }, { content: "bob" });
        expect(mockRequest).to.have.been.calledOnce;
        expect(resp.status).to.equal(statusCode);
    }));
    it("returns the correct body for successful PUT calls", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = { ok: true };
        const statusCode = 200;
        const resolvedValue = {
            status: statusCode,
            body: body
        };
        const mockRequest = sinon_1.default.stub(client, "request").resolves(resolvedValue);
        const resp = yield client.httpPut("/foo", { data: "bar" }, { content: "bob" });
        expect(mockRequest).to.have.been.calledOnce;
        expect(resp.error).to.be.undefined;
        expect(resp.body).to.deep.equal(body);
        expect(resp.status).to.equal(statusCode);
    }));
    it("returns an error response when HTTP DELETE request fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const returnedBody = { error: "not found" };
        const statusCode = 404;
        const rejectedValue = {
            status: statusCode,
            response: {
                body: returnedBody
            }
        };
        const mockRequest = sinon_1.default.stub(client, "request").rejects(rejectedValue).returns(rejectedValue);
        const resp = yield client.httpDelete("/foo");
        expect(mockRequest).to.have.been.calledOnce;
        expect(resp.status).to.equal(statusCode);
    }));
    it("returns the correct body for successful DELETE calls", () => __awaiter(void 0, void 0, void 0, function* () {
        const statusCode = 204;
        const resolvedValue = {
            status: statusCode
        };
        const mockRequest = sinon_1.default.stub(client, "request").resolves(resolvedValue);
        const resp = yield client.httpPatch("/foo");
        expect(mockRequest).to.have.been.calledOnce;
        expect(resp.error).to.be.undefined;
        expect(resp.status).to.equal(statusCode);
    }));
    it("returns a correctly formatted url if leading slash is missing in the uri", () => {
        const clientPrototype = Object.getPrototypeOf(client);
        const formattedUrl = clientPrototype.formatUrl(baseUrl, "path/to/end-point");
        expect(formattedUrl).to.equal(`${baseUrl}/path/to/end-point`);
    });
    it("returns a correctly formatted url if leading slash is present in the uri", () => {
        const clientPrototype = Object.getPrototypeOf(client);
        const formattedUrl = clientPrototype.formatUrl(baseUrl, "/path/to/end-point");
        expect(formattedUrl).to.equal(`${baseUrl}/path/to/end-point`);
    });
    it("returns a correctly formatted url if uri contains only a slash", () => {
        const clientPrototype = Object.getPrototypeOf(client);
        const formattedUrl = clientPrototype.formatUrl(baseUrl, "/");
        expect(formattedUrl).to.equal(`${baseUrl}`);
    });
    it("returns a correctly formatted url if uri is empty", () => {
        const clientPrototype = Object.getPrototypeOf(client);
        const formattedUrl = clientPrototype.formatUrl(baseUrl, "");
        expect(formattedUrl).to.equal(`${baseUrl}`);
    });
    it("returns url only when url starts with http", () => {
        const clientPrototype = Object.getPrototypeOf(client);
        const externalRestUrl = "http://external-rest-url";
        const formattedUrl = clientPrototype.formatUrl(baseUrl, externalRestUrl);
        expect(formattedUrl).to.equal(externalRestUrl);
    });
});
//# sourceMappingURL=request-client.spec.js.map