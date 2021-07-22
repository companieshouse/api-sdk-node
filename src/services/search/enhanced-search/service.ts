import { IHttpClient } from "../../../http";
import { CompaniesResource } from "./types";
import Resource from "../../resource";
import "url-search-params-polyfill";

export default class EnhancedSearchService {
    constructor (private readonly client: IHttpClient) { }
    public async getCompanies (companyName: string | null, location: string | null, incorporatedFrom: string | null,
        incorporatedTo: string | null, requestId: string): Promise<Resource<CompaniesResource>> {
        const COMPANY_NAME_QUERY = "company_name";
        const LOCATION_QUERY = "location";
        const INCORPORATED_FROM_QUERY = "incorporated_from";
        const INCORPORATED_TO_QUERY = "incorporated_to";
        const additionalHeaders = {
            "X-Request-ID": requestId,
            "Content-Type": "application/json"
        }
        const buildEnhancedSearchURL = new URLSearchParams("/enhanced-search/companies?");

        if (companyName !== null) {
            buildEnhancedSearchURL.append(COMPANY_NAME_QUERY, companyName)
        }

        if (location !== null) {
            buildEnhancedSearchURL.append(LOCATION_QUERY, location)
        }

        if (incorporatedFrom !== null) {
            buildEnhancedSearchURL.append(INCORPORATED_FROM_QUERY, incorporatedFrom)
        }

        if (incorporatedTo !== null) {
            buildEnhancedSearchURL.append(INCORPORATED_TO_QUERY, incorporatedTo)
        }

        const enhancedSearchUrl = buildEnhancedSearchURL.toString();

        const resp = await this.client.httpGet(enhancedSearchUrl, additionalHeaders);

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
