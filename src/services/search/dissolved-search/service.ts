import { IHttpClient } from "../../../http";
import { CompaniesResource } from "./types";
import Resource from "../../resource";

export default class DissolvedSearchService {
    constructor (private readonly client: IHttpClient) { }
    public async getCompanies (companyName: string, requestId: string, searchType: string, changedNameParam: string): Promise<Resource<CompaniesResource>> {
        const additionalHeaders = {
            "X-Request-ID": requestId,
            "Content-Type": "application/json"
        }
        const ALPHABETICAL_QUERY = "&search_type=alphabetical";
        const BEST_MATCH_QUERY = "&search_type=best-match";
        const PREVIOUS_NAME_QUERY = "&search_type=previous-name-dissolved";

        let dissolvedSearchURL = "/dissolved-search/companies?q=" + companyName;

        if (searchType === "alphabetical" && changedNameParam !== "previousNameDissolved") {
            dissolvedSearchURL += ALPHABETICAL_QUERY;
        }
        if (searchType === "alphabetical" && changedNameParam === "previousNameDissolved") {
            dissolvedSearchURL += PREVIOUS_NAME_QUERY;
        }
        if (searchType === "previousNameDissolved") {
            dissolvedSearchURL += PREVIOUS_NAME_QUERY;
        }
        if (searchType === "bestMatch") {
            dissolvedSearchURL += BEST_MATCH_QUERY;
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
