import { CondensedSicCodeData } from "./types";
import { HttpResponse, IHttpClient } from "../../http";
import Resource from "../resource";

export default class {
    constructor (private readonly client: IHttpClient) {}

    public async getCondensedSicCodes (): Promise<Resource<CondensedSicCodeData[]>> {
        const url: string = "/internal/condensed-sic-codes";

        const resp: HttpResponse = await this.client.httpGet(url);

        const resource: Resource<CondensedSicCodeData[]> = {
            httpStatusCode: resp.status
        };

        if (resp.error && resp.status !== 400) {
            resource.resource = resp.error;
            return resource;
        }

        const apiResource: CondensedSicCodeData[] = resp.body ? resp.body : resp.error;

        if (!apiResource) {
            throw new Error(`No body or error body returned from ${url} API call - http status from API = ${resp.status}`);
        }
        resource.resource = apiResource;

        return resource;
    }
}
