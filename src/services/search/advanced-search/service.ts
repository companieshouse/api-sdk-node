import { IHttpClient } from "../../../http";
import { CompaniesResource } from "./types";
import Resource from "../../resource";
import "url-search-params-polyfill";

export default class AdvancedSearchService {
    constructor (private readonly client: IHttpClient) { }
    public async getCompanies (companyNameIncludes: string | null, companyNameExcludes: string | null, location: string | null, incorporatedFrom: string | null,
        incorporatedTo: string | null, sicCodes: string | null, companyStatus: string | null, companyType: string | null, dissolvedFrom: string | null,
        dissolvedTo: string | null, requestId: string): Promise<Resource<CompaniesResource>> {
        const COMPANY_NAME_INCLUDES_QUERY = "company_name_includes";
        const COMPANY_NAME_EXCLUDES_QUERY = "company_name_excludes"
        const LOCATION_QUERY = "location";
        const INCORPORATED_FROM_QUERY = "incorporated_from";
        const INCORPORATED_TO_QUERY = "incorporated_to";
        const SIC_CODES_QUERY = "sic_codes";
        const COMPANY_STATUS_QUERY = "company_status";
        const COMPANY_TYPE_QUERY = "company_type";
        const DISSOLVED_FROM_QUERY_PARAMETER = "dissolved_from";
        const DISSOLVED_TO_QUERY_PARAMETER = "dissolved_to"
        const additionalHeaders = {
            "X-Request-ID": requestId,
            "Content-Type": "application/json"
        }

        const buildEnhancedSearchURL = new URLSearchParams("/enhanced-search/companies?");

        if (companyNameIncludes !== null) {
            buildEnhancedSearchURL.append(COMPANY_NAME_INCLUDES_QUERY, companyNameIncludes)
        }

        if (companyNameExcludes !== null) {
            buildEnhancedSearchURL.append(COMPANY_NAME_EXCLUDES_QUERY, companyNameExcludes)
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

        if (sicCodes !== null) {
            buildEnhancedSearchURL.append(SIC_CODES_QUERY, sicCodes)
        }

        if (companyStatus !== null) {
            buildEnhancedSearchURL.append(COMPANY_STATUS_QUERY, companyStatus);
        }

        if (companyType !== null) {
            buildEnhancedSearchURL.append(COMPANY_TYPE_QUERY, companyType)
        }

        if (dissolvedFrom !== null) {
            buildEnhancedSearchURL.append(DISSOLVED_FROM_QUERY_PARAMETER, dissolvedFrom)
        }

        if (dissolvedTo !== null) {
            buildEnhancedSearchURL.append(DISSOLVED_TO_QUERY_PARAMETER, dissolvedTo)
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
