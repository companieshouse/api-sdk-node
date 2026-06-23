import { IHttpClient } from "../../../http";
import { CompaniesResource } from "./types";
import Resource from "../../resource";

export default class AlphabeticalSearchService {
    constructor (private readonly client: IHttpClient) { }
    public async getCompanies (companyName: string, requestId: string,
        searchBefore?: string, searchAfter?: string, size?: number): Promise<Resource<CompaniesResource>> {
        const SEARCH_BEFORE_QUERY = "&search_before=";
        const SEARCH_AFTER_QUERY = "&search_after=";
        const SIZE_QUERY = "&size=";
        const additionalHeaders = {
            "X-Request-ID": requestId,
            "Content-Type": "application/json"
        }
        let alphabeticalSearchURL = "/alphabetical-search/companies?q=" + companyName;

        if (searchBefore != null) {
            alphabeticalSearchURL += SEARCH_BEFORE_QUERY + searchBefore;
        }

        if (searchAfter != null) {
            alphabeticalSearchURL += SEARCH_AFTER_QUERY + searchAfter;
        }

        if (size != null) {
            alphabeticalSearchURL += SIZE_QUERY + size;
        }

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
