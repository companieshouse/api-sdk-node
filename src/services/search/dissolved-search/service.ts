import { IHttpClient } from "../../../http";
import { CompaniesResource } from "./types";
import Resource from "../../resource";
export default class DissolvedSearchService {
    constructor (private readonly client: IHttpClient) { }
    public async getCompanies (companyName: string, requestId: string, searchType: string, startIndex: number | null, searchBefore: string | null, searchAfter: string | null, size: number | null): Promise<Resource<CompaniesResource>> {
        const additionalHeaders = {
            "X-Request-ID": requestId,
            "Content-Type": "application/json"
        }

        let dissolvedSearchURL = "/dissolved-search/companies?q=" + companyName;

        if (searchType === "alphabetical") {
            dissolvedSearchURL += "&search_type=alphabetical";
            dissolvedSearchURL += searchAfter !== null ? "&search_after=" + searchAfter : "";
            dissolvedSearchURL += searchBefore !== null ? "&search_before=" + searchBefore : "";
            dissolvedSearchURL += size !== null ? "&size=" + size : "";
        } else if (searchType === "previousNameDissolved") {
            dissolvedSearchURL += "&search_type=previous-name-dissolved";
            dissolvedSearchURL += startIndex ? "&start_index=" + startIndex : "";
        } else if (searchType === "bestMatch") {
            dissolvedSearchURL += "&search_type=best-match";
            dissolvedSearchURL += startIndex ? "&start_index=" + startIndex : "";
        }

        const resp = await this.client.httpGet(dissolvedSearchURL, additionalHeaders);

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
