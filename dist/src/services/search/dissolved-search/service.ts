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
        const ALPHABETICAL_QUERY = "&search_type=alphabetical";
        const BEST_MATCH_QUERY = "&search_type=best-match";
        const PREVIOUS_NAME_QUERY = "&search_type=previous-name-dissolved";
        const START_INDEX_QUERY = "&start_index=";
        const SEARCH_BEFORE_QUERY = "&search_before=";
        const SEARCH_AFTER_QUERY = "&search_after=";
        const SIZE_QUERY = "&size=";

        let dissolvedSearchURL = "/dissolved-search/companies?q=" + companyName;

        if (searchType === "alphabetical") {
            dissolvedSearchURL += ALPHABETICAL_QUERY
            if (searchAfter !== null) {
                dissolvedSearchURL += SEARCH_AFTER_QUERY + searchAfter;
            }
            if (searchBefore !== null) {
                dissolvedSearchURL += SEARCH_BEFORE_QUERY + searchBefore;
            }
            if (size !== null) {
                dissolvedSearchURL += SIZE_QUERY + size;
            }
        }

        if (!startIndex && searchType === "previousNameDissolved") {
            dissolvedSearchURL += PREVIOUS_NAME_QUERY;
        }

        if (startIndex && searchType === "previousNameDissolved") {
            dissolvedSearchURL += PREVIOUS_NAME_QUERY + START_INDEX_QUERY + startIndex;
        }

        if (!startIndex && searchType === "bestMatch") {
            dissolvedSearchURL += BEST_MATCH_QUERY;
        }

        if (startIndex && searchType === "bestMatch") {
            dissolvedSearchURL += BEST_MATCH_QUERY + START_INDEX_QUERY + startIndex;
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
