import { RequestClient } from "../../../src/http";
import { RefreshTokenService } from "../../../src/services/refresh-token";
import chai from "chai";
import sinon from "sinon";
const expect = chai.expect;
const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

describe("refresh token", () => {
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
        sinon.stub(requestClient, "httpPost").resolves({
            status: 400,
            error: "Invalid parameter"
        });

        const refreshToken: RefreshTokenService = new RefreshTokenService(requestClient);

        const data = await refreshToken.refresh("REFRESH_TOKEN", "GRANT_TYPE", "CLIENT_ID",
            "CLIENT_SECRET");

        expect(data.httpStatusCode).to.be.equal(400);
        expect(data.resource).to.be.undefined;
    });

    it("maps the refresh token data correctly", async () => {
        const mockResponseBody = ({
            access_token: "string",
            token_type: "string",
            expires_in: 1
        });

        sinon.stub(requestClient, "httpPost").resolves({
            status: 200,
            body: mockResponseBody
        });

        const refreshToken: RefreshTokenService = new RefreshTokenService(requestClient);

        const data = await refreshToken.refresh("REFRESH_TOKEN", "GRANT_TYPE", "CLIENT_ID",
            "CLIENT_SECRET");

        expect(data.httpStatusCode).to.be.equal(200);
        expect(data.resource.access_token).to.be.equal(mockResponseBody.access_token);
        expect(data.resource.token_type).to.be.equal(mockResponseBody.token_type);
        expect(data.resource.expires_in).to.be.equal(mockResponseBody.expires_in);
    });

    it("maps the refresh token data correctly when fields are missing", async () => {
        const mockResponseBody = ({
            access_token: "string",
            token_type: undefined,
            expires_in: 1
        });

        sinon.stub(requestClient, "httpPost").resolves({
            status: 200,
            body: mockResponseBody
        });

        const refreshToken: RefreshTokenService = new RefreshTokenService(requestClient);

        const data = await refreshToken.refresh("REFRESH_TOKEN", "GRANT_TYPE", "CLIENT_ID",
            "CLIENT_SECRET");

        expect(data.httpStatusCode).to.be.equal(200);
        expect(data.resource.access_token).to.be.equal(mockResponseBody.access_token);
        expect(data.resource.token_type).to.be.equal(undefined);
        expect(data.resource.expires_in).to.be.equal(mockResponseBody.expires_in);
    });
});
