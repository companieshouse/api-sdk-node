import { IHttpClient } from "../../http";
import { RefreshTokenData } from "./types";
import Resource from "../resource";
export default class {
    private readonly client;
    constructor(client: IHttpClient);
    refresh(refreshToken: string, grantType: string, clientId: string, clientSecret: string): Promise<Resource<RefreshTokenData>>;
}
