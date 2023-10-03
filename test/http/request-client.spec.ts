import chai from "chai";
import sinon from "sinon";

import { RequestClient } from "../../src/http";
import nock = require("nock");
const expect = chai.expect;

describe("request-client", () => {
    const baseUrl: string = "http://api";
    const client = new RequestClient({ oauthToken: "123", baseUrl });

    beforeEach(() => {
        sinon.reset();
        sinon.restore();
    });

    afterEach(done => {
        sinon.reset();
        sinon.restore();
        done();
    });

    it("returns an error response when HTTP GET request fails", async () => {
        const body = { error: "company not found" };
        const statusCode = 404;
        const rejectedValue = {
            status: statusCode,
            body
        };
        const mockRequest = sinon.stub(client, "request" as any).rejects(rejectedValue).returns(rejectedValue);
        const resp = await client.httpGet("/foo");
        expect(mockRequest).to.have.been.calledOnce;
        expect(resp.body).to.deep.equal(body);
        expect(resp.status).to.equal(statusCode);
    });

    it("returns the correct body for successful GET calls", async () => {
        const body = { ok: true };
        const statusCode = 200;

        const resolvedValue = {
            status: statusCode,
            body: body
        };

        const mockRequest = sinon.stub(client, "request" as any).resolves(resolvedValue);
        const resp = await client.httpGet("/foo");

        expect(mockRequest).to.have.been.calledOnce;
        expect(resp.error).to.be.undefined;
        expect(resp.body).to.deep.equal(body);
        expect(resp.status).to.equal(statusCode);
    });

    it("returns an error response when HTTP POST request fails", async () => {
        const returnedBody = { error: "company not found" };
        const statusCode = 404;

        const rejectedValue = {
            status: statusCode,
            response: {
                body: returnedBody
            }
        };

        const mockRequest = sinon.stub(client, "request" as any).rejects(rejectedValue).returns(rejectedValue);
        const resp = await client.httpPost("/foo", { data: "bar" });

        expect(mockRequest).to.have.been.calledOnce;
        expect(resp.status).to.equal(statusCode);
    });

    it("returns the correct body for successful POST calls", async () => {
        const body = { ok: true };
        const statusCode = 200;

        const resolvedValue = {
            status: statusCode,
            body: body
        };

        const mockRequest = sinon.stub(client, "request" as any).resolves(resolvedValue);
        const resp = await client.httpPost("/foo", { data: "bar" });

        expect(mockRequest).to.have.been.calledOnce;
        expect(resp.error).to.be.undefined;
        expect(resp.body).to.deep.equal(body);
        expect(resp.status).to.equal(statusCode);
    });

    it("returns an error response when HTTP PATCH request fails", async () => {
        const returnedBody = { error: "company not found" };
        const statusCode = 404;

        const rejectedValue = {
            status: statusCode,
            response: {
                body: returnedBody
            }
        };

        const mockRequest = sinon.stub(client, "request" as any).rejects(rejectedValue).returns(rejectedValue);
        const resp = await client.httpPatch("/foo", { data: "bar" }, { content: "bob" });

        expect(mockRequest).to.have.been.calledOnce;
        expect(resp.status).to.equal(statusCode);
    });

    it("returns the correct body for successful PATCH calls", async () => {
        const body = { ok: true };
        const statusCode = 200;

        const resolvedValue = {
            status: statusCode,
            body: body
        };

        const mockRequest = sinon.stub(client, "request" as any).resolves(resolvedValue);
        const resp = await client.httpPatch("/foo", { data: "bar" }, { content: "bob" });

        expect(mockRequest).to.have.been.calledOnce;
        expect(resp.error).to.be.undefined;
        expect(resp.body).to.deep.equal(body);
        expect(resp.status).to.equal(statusCode);
    });

    it("propagates additional headers provided by client", async () => {
        // Given
        const client = new RequestClient({ oauthToken: "123", baseUrl: "http://localhost" });
        const scope = nock(/.*/)
            .patch("/orderable/certificates/CHS001")
            .matchHeader("Authorization", "Bearer 123")
            .matchHeader("Accept", "application/merge-patch+json")
            .matchHeader("Content-Type", "application/merge-patch+json")
            .matchHeader("Example", "Example value")
            .reply(200);

        // When
        const resp = await client.httpPatch("/orderable/certificates/CHS001",
            { data: "bar" },
            {
                "Content-Type": "application/merge-patch+json",
                Accept: "application/merge-patch+json",
                Example: "Example value"
            });

        // Then
        expect(resp.status).to.equal(200);
        scope.done();
    });

    it("propagates additional headers provided by client, regardless of header name case", async () => {
        // Given
        const client = new RequestClient({ oauthToken: "123", baseUrl: "http://localhost" });
        const scope = nock(/.*/)
            .patch("/orderable/certificates/CHS001")
            .matchHeader("Authorization", "Bearer 123")
            .matchHeader("Accept", "application/merge-patch+json")
            .matchHeader("Content-Type", "application/merge-patch+json")
            .matchHeader("Example", "Example value")
            .reply(200);

        // When
        const resp = await client.httpPatch("/orderable/certificates/CHS001",
            { data: "bar" },
            {
                "content-type": "application/merge-patch+json",
                accept: "application/merge-patch+json",
                Example: "Example value"
            });

        // Then
        expect(resp.status).to.equal(200);
        scope.done();
    });

    it("sets default headers correctly where not provided in additional headers", async () => {
        // Given
        const client = new RequestClient({ oauthToken: "123", baseUrl: "http://localhost" });
        const scope = nock(/.*/)
            .patch("/orderable/certificates/CHS001")
            .matchHeader("Authorization", "Bearer 123")
            .matchHeader("Accept", "application/json")
            .matchHeader("Content-Type", "application/json")
            .reply(200);

        // When
        const resp = await client.httpPatch("/orderable/certificates/CHS001", { data: "bar" });

        // Then
        expect(resp.status).to.equal(200);
        scope.done();
    });

    it("returns an error response when HTTP PUT request fails", async () => {
        const returnedBody = { error: "company not found" };
        const statusCode = 404;

        const rejectedValue = {
            status: statusCode,
            response: {
                body: returnedBody
            }
        };

        const mockRequest = sinon.stub(client, "request" as any).rejects(rejectedValue).returns(rejectedValue);
        const resp = await client.httpPut("/foo", { data: "bar" }, { content: "bob" });

        expect(mockRequest).to.have.been.calledOnce;
        expect(resp.status).to.equal(statusCode);
    });

    it("returns the correct body for successful PUT calls", async () => {
        const body = { ok: true };
        const statusCode = 200;

        const resolvedValue = {
            status: statusCode,
            body: body
        };

        const mockRequest = sinon.stub(client, "request" as any).resolves(resolvedValue);
        const resp = await client.httpPut("/foo", { data: "bar" }, { content: "bob" });

        expect(mockRequest).to.have.been.calledOnce;
        expect(resp.error).to.be.undefined;
        expect(resp.body).to.deep.equal(body);
        expect(resp.status).to.equal(statusCode);
    });

    it("returns an error response when HTTP DELETE request fails", async () => {
        const returnedBody = { error: "not found" };
        const statusCode = 404;

        const rejectedValue = {
            status: statusCode,
            response: {
                body: returnedBody
            }
        };

        const mockRequest = sinon.stub(client, "request" as any).rejects(rejectedValue).returns(rejectedValue);
        const resp = await client.httpDelete("/foo");

        expect(mockRequest).to.have.been.calledOnce;
        expect(resp.status).to.equal(statusCode);
    });

    it("returns the correct body for successful DELETE calls", async () => {
        const statusCode = 204;

        const resolvedValue = {
            status: statusCode
        };

        const mockRequest = sinon.stub(client, "request" as any).resolves(resolvedValue);
        const resp = await client.httpPatch("/foo");

        expect(mockRequest).to.have.been.calledOnce;
        expect(resp.error).to.be.undefined;
        expect(resp.status).to.equal(statusCode);
    });

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
        const externalRestUrl = "http://external-rest-url"
        const formattedUrl = clientPrototype.formatUrl(baseUrl, externalRestUrl);
        expect(formattedUrl).to.equal(externalRestUrl);
    });
});
