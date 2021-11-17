import { IHttpClient } from "../../../http";
import { CompaniesResource } from "./types";
import Resource from "../../resource";
import "url-search-params-polyfill";

export default class AdvancedSearchService {
    constructor (private readonly client: IHttpClient) { }
    public async getCompanies (startIndex: number | null, companyNameIncludes: string | null, companyNameExcludes: string | null, location: string | null, incorporatedFrom: string | null,
        incorporatedTo: string | null, sicCodes: string | null, companyStatus: string | null, companyType: string | null, dissolvedFrom: string | null,
        dissolvedTo: string | null, size: number | null, requestId: string): Promise<Resource<CompaniesResource>> {
        const START_INDEX_QUERY = "start_index";
        const COMPANY_NAME_INCLUDES_QUERY = "company_name_includes";
        const COMPANY_NAME_EXCLUDES_QUERY = "company_name_excludes"
        const LOCATION_QUERY = "location";
        const INCORPORATED_FROM_QUERY = "incorporated_from";
        const INCORPORATED_TO_QUERY = "incorporated_to";
        const SIC_CODES_QUERY = "sic_codes";
        const COMPANY_STATUS_QUERY = "company_status";
        const COMPANY_TYPE_QUERY = "company_type";
        const DISSOLVED_FROM_QUERY_PARAMETER = "dissolved_from";
        const DISSOLVED_TO_QUERY_PARAMETER = "dissolved_to";
        const SIZE_QUERY_PARAMETER = "size";
        const additionalHeaders = {
            "X-Request-ID": requestId,
            "Content-Type": "application/json"
        }

        const buildAdvancedSearchURL = new URLSearchParams("/advanced-search/companies?");

        if (startIndex !== null) {
            buildAdvancedSearchURL.append(START_INDEX_QUERY, String(startIndex));
        }

        if (companyNameIncludes !== null) {
            buildAdvancedSearchURL.append(COMPANY_NAME_INCLUDES_QUERY, companyNameIncludes)
        }

        if (companyNameExcludes !== null) {
            buildAdvancedSearchURL.append(COMPANY_NAME_EXCLUDES_QUERY, companyNameExcludes)
        }

        if (location !== null) {
            buildAdvancedSearchURL.append(LOCATION_QUERY, location)
        }

        if (incorporatedFrom !== null) {
            buildAdvancedSearchURL.append(INCORPORATED_FROM_QUERY, incorporatedFrom)
        }

        if (incorporatedTo !== null) {
            buildAdvancedSearchURL.append(INCORPORATED_TO_QUERY, incorporatedTo)
        }

        if (sicCodes !== null) {
            buildAdvancedSearchURL.append(SIC_CODES_QUERY, sicCodes)
        }

        if (companyStatus !== null) {
            buildAdvancedSearchURL.append(COMPANY_STATUS_QUERY, companyStatus);
        }

        if (companyType !== null) {
            buildAdvancedSearchURL.append(COMPANY_TYPE_QUERY, companyType)
        }

        if (dissolvedFrom !== null) {
            buildAdvancedSearchURL.append(DISSOLVED_FROM_QUERY_PARAMETER, dissolvedFrom)
        }

        if (dissolvedTo !== null) {
            buildAdvancedSearchURL.append(DISSOLVED_TO_QUERY_PARAMETER, dissolvedTo)
        }

        if (size !== null) {
            buildAdvancedSearchURL.append(SIZE_QUERY_PARAMETER, String(size))
        }

        const advancedSearchUrl = buildAdvancedSearchURL.toString();

        const resp = await this.client.httpGet(advancedSearchUrl, additionalHeaders);

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
