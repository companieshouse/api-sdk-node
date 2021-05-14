import { IHttpClient } from "../../../http";
import { CompaniesResource } from "./types";
import Resource from "../../resource";

export default class AlphabeticalSearchService {
    constructor (private readonly client: IHttpClient) { }
    public async getCompanies (companyName: string, requestId: string): Promise<Resource<CompaniesResource>> {
        const additionalHeaders = {
            "X-Request-ID": requestId,
            "Content-Type": "application/json"
        }
        const alphabeticalSearchURL = "/alphabetical-search/companies?q=" + companyName;

        const resp = await this.client.httpGet(alphabeticalSearchURL, additionalHeaders);

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
