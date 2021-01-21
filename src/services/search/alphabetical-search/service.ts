import { IHttpClient } from "../../../http";
import { AlphabeticalSearchPostRequest, CompaniesResource } from "./types";
import Resource from "../../resource";

export default class AlphabeticalSearchService {
    constructor (private readonly client: IHttpClient) { }
    public async getCompanies (companyName: AlphabeticalSearchPostRequest, requestId: string): Promise<Resource<CompaniesResource>> {
        const additionalHeaders = {
            "X-Request-ID": requestId,
            "Content-Type": "application/json"
        }

        const resp = await this.client.httpPost("/alphabetical-search/corporate-name", companyName, additionalHeaders);

        const resource: Resource<CompaniesResource> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        resource.resource = resp.body as CompaniesResource;

        return resource;
    }
}
