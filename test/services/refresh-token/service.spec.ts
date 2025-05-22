import Resource, { ApiErrorResponse } from "../../../src/services/resource";
import { RequestClient } from "../../../src/http";
import { RefreshTokenData, RefreshTokenService } from "../../../src/services/refresh-token";

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

describe("refresh token", () => {
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
        const mockErrorResponseBody = {
            status: 400,
            error: "Invalid parameter"
        };
        jest.spyOn(requestClient, "httpPost").mockClear().mockResolvedValue(mockErrorResponseBody);

        const refreshToken: RefreshTokenService = new RefreshTokenService(requestClient);

        const data = await refreshToken.refresh("REFRESH_TOKEN", "GRANT_TYPE", "CLIENT_ID",
            "CLIENT_SECRET") as ApiErrorResponse;

        expect(data).toEqual({
            httpStatusCode: mockErrorResponseBody.status,
            errors: [mockErrorResponseBody.error]
        });
    });

    it("maps the refresh token data correctly", async () => {
        const mockResponseBody = ({
            access_token: "string",
            token_type: "string",
            expires_in: 1
        });

        jest.spyOn(requestClient, "httpPost").mockClear().mockResolvedValue({
            status: 200,
            body: mockResponseBody
        });

        const refreshToken: RefreshTokenService = new RefreshTokenService(requestClient);

        const data = await refreshToken.refresh("REFRESH_TOKEN", "GRANT_TYPE", "CLIENT_ID",
            "CLIENT_SECRET") as Resource<RefreshTokenData>;

        expect(data.httpStatusCode).toBe(200);
        expect(data.resource!.access_token).toBe(mockResponseBody.access_token);
        expect(data.resource!.token_type).toBe(mockResponseBody.token_type);
        expect(data.resource!.expires_in).toBe(mockResponseBody.expires_in);
    });

    it(
        "maps the refresh token data correctly when fields are missing",
        async () => {
            const mockResponseBody = ({
                access_token: "string",
                token_type: undefined,
                expires_in: 1
            });

            jest.spyOn(requestClient, "httpPost").mockClear().mockResolvedValue({
                status: 200,
                body: mockResponseBody
            });

            const refreshToken: RefreshTokenService = new RefreshTokenService(requestClient);

            const data = await refreshToken.refresh("REFRESH_TOKEN", "GRANT_TYPE", "CLIENT_ID",
                "CLIENT_SECRET") as Resource<RefreshTokenData>;

            expect(data.httpStatusCode).toBe(200);
            expect(data.resource!.access_token).toBe(mockResponseBody.access_token);
            expect(data.resource!.token_type).toBeUndefined();
            expect(data.resource!.expires_in).toBe(mockResponseBody.expires_in);
        }
    );
});
