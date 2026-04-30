import { IHttpClient } from "../../../http";
import { CompaniesResource } from "./types";
import Resource from "../../resource";
import "url-search-params-polyfill";

export default class AdvancedSearchService {
    START_INDEX_QUERY = "start_index";
    COMPANY_NAME_INCLUDES_QUERY = "company_name_includes";
    COMPANY_NAME_EXCLUDES_QUERY = "company_name_excludes"
    LOCATION_QUERY = "location";
    INCORPORATED_FROM_QUERY = "incorporated_from";
    INCORPORATED_TO_QUERY = "incorporated_to";
    SIC_CODES_QUERY = "sic_codes";
    COMPANY_STATUS_QUERY = "company_status";
    COMPANY_TYPE_QUERY = "company_type";
    COMPANY_SUBTYPE_QUERY = "company_subtype";
    DISSOLVED_FROM_QUERY_PARAMETER = "dissolved_from";
    DISSOLVED_TO_QUERY_PARAMETER = "dissolved_to";
    SIZE_QUERY_PARAMETER = "size";

    constructor (private readonly client: IHttpClient) { }
    public async getCompanies (startIndex: number | null, companyNameIncludes: string | null, companyNameExcludes: string | null, location: string | null, incorporatedFrom: string | null,
        incorporatedTo: string | null, sicCodes: string | null, companyStatus: string | null, companyType: string | null, companySubtype: string | null, dissolvedFrom: string | null,
        dissolvedTo: string | null, size: number | null, requestId: string): Promise<Resource<CompaniesResource>> {
        const additionalHeaders = {
            "X-Request-ID": requestId,
            "Content-Type": "application/json"
        }

        const advancedSearchUrl = this.buildURL(startIndex, companyNameIncludes, companyNameExcludes, location, incorporatedFrom, incorporatedTo, sicCodes, companyStatus, companyType,
            companySubtype, dissolvedFrom, dissolvedTo, size, "/advanced-search/companies?");

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

    public async getCompaniesAsCsv (startIndex: number | null, companyNameIncludes: string | null, companyNameExcludes: string | null, location: string | null, incorporatedFrom: string | null,
        incorporatedTo: string | null, sicCodes: string | null, companyStatus: string | null, companyType: string | null, companySubtype: string | null, dissolvedFrom: string | null,
        dissolvedTo: string | null, size: number | null, requestId: string): Promise<Resource<string>> {
        const additionalHeaders = {
            "X-Request-ID": requestId,
            "Content-Type": "application/json"
        }

        const advancedSearchUrl = this.buildURL(startIndex, companyNameIncludes, companyNameExcludes, location, incorporatedFrom, incorporatedTo, sicCodes, companyStatus, companyType,
            companySubtype, dissolvedFrom, dissolvedTo, size, "/advanced-search/csv?");

        const resp = await this.client.httpGet(advancedSearchUrl, additionalHeaders);

        const resource: Resource<string> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        resource.resource = resp.body as string;
        return resource;
    }

    private buildURL (startIndex: number | null, companyNameIncludes: string | null, companyNameExcludes: string | null, location: string | null, incorporatedFrom: string | null,
        incorporatedTo: string | null, sicCodes: string | null, companyStatus: string | null, companyType: string | null, companySubtype: string | null, dissolvedFrom: string | null,
        dissolvedTo: string | null, size: number | null, baseUrl: string): string {    
        const buildAdvancedSearchURL = new URLSearchParams(baseUrl)
        if (startIndex !== null) {
            buildAdvancedSearchURL.append(this.START_INDEX_QUERY, String(startIndex));
        }

        if (companyNameIncludes !== null) {
            buildAdvancedSearchURL.append(this.COMPANY_NAME_INCLUDES_QUERY, companyNameIncludes)
        }

        if (companyNameExcludes !== null) {
            buildAdvancedSearchURL.append(this.COMPANY_NAME_EXCLUDES_QUERY, companyNameExcludes)
        }

        if (location !== null) {
            buildAdvancedSearchURL.append(this.LOCATION_QUERY, location)
        }

        if (incorporatedFrom !== null) {
            buildAdvancedSearchURL.append(this.INCORPORATED_FROM_QUERY, incorporatedFrom)
        }

        if (incorporatedTo !== null) {
            buildAdvancedSearchURL.append(this.INCORPORATED_TO_QUERY, incorporatedTo)
        }

        if (sicCodes !== null) {
            buildAdvancedSearchURL.append(this.SIC_CODES_QUERY, sicCodes)
        }

        if (companyStatus !== null) {
            buildAdvancedSearchURL.append(this.COMPANY_STATUS_QUERY, companyStatus);
        }

        if (companyType !== null) {
            buildAdvancedSearchURL.append(this.COMPANY_TYPE_QUERY, companyType)
        }

        if (companySubtype !== null) {
            buildAdvancedSearchURL.append(this.COMPANY_SUBTYPE_QUERY, companySubtype)
        }

        if (dissolvedFrom !== null) {
            buildAdvancedSearchURL.append(this.DISSOLVED_FROM_QUERY_PARAMETER, dissolvedFrom)
        }

        if (dissolvedTo !== null) {
            buildAdvancedSearchURL.append(this.DISSOLVED_TO_QUERY_PARAMETER, dissolvedTo)
        }

        if (size !== null) {
            buildAdvancedSearchURL.append(this.SIZE_QUERY_PARAMETER, String(size))
        }
        return buildAdvancedSearchURL.toString();
    }
}
