import { IHttpClient } from "../../http";
import { RefreshTokenData } from "./types";
import Resource from "../resource";

export default class {
    constructor (private readonly client: IHttpClient) {}

    public async refresh (refreshToken: string, grantType: string, clientId: string,
        clientSecret: string): Promise<Resource<RefreshTokenData>> {
        const url: string = `/oauth2/token?grant_type=${grantType}&refresh_token=${refreshToken}&client_id=${clientId}` +
            `&client_secret=${clientSecret}`;

        const response = await this.client.httpPost(url);

        const resource: Resource<RefreshTokenData> = {
            httpStatusCode: response.status
        };

        if (response.error) {
            return resource;
        }

        const body = response.body as RefreshTokenData;

        resource.resource = {
            expires_in: body.expires_in,
            token_type: body.token_type,
            access_token: body.access_token
        };

        return resource;
    }
}
