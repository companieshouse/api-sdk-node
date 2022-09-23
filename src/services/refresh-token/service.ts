import { IHttpClient } from "../../http";
import { RefreshTokenData } from "./types";
import Resource, { ApiErrorResponse } from "../resource";

export default class {
    constructor (private readonly client: IHttpClient) {}

    public async refresh (
        refreshToken: string,
        grantType: string,
        clientId: string,
        clientSecret: string
    ): Promise<Resource<RefreshTokenData> | ApiErrorResponse> {
        const url: string = `/oauth2/token?grant_type=${grantType}&refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}`;
        const params = {
            refresh_token: refreshToken,
            grant_type: grantType,
            client_id: clientId,
            client_secret: clientSecret
        }
        const response = await this.client.httpPost(url, params);

        if (response.error) {
            return {
                httpStatusCode: response.status,
                errors: [response.error]
            };
        }
        const resource: Resource<RefreshTokenData> = {
            httpStatusCode: response.status
        };

        resource.resource = { ...response.body };

        return resource;
    }
}
