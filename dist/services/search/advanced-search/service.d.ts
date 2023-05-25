import { IHttpClient } from "../../../http";
import { CompaniesResource } from "./types";
import Resource from "../../resource";
import "url-search-params-polyfill";
export default class AdvancedSearchService {
    private readonly client;
    constructor(client: IHttpClient);
    getCompanies(startIndex: number | null, companyNameIncludes: string | null, companyNameExcludes: string | null, location: string | null, incorporatedFrom: string | null, incorporatedTo: string | null, sicCodes: string | null, companyStatus: string | null, companyType: string | null, companySubtype: string | null, dissolvedFrom: string | null, dissolvedTo: string | null, size: number | null, requestId: string): Promise<Resource<CompaniesResource>>;
}
