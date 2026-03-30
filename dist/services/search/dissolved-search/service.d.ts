import { IHttpClient } from "../../../http";
import { CompaniesResource } from "./types";
import Resource from "../../resource";
export default class DissolvedSearchService {
    private readonly client;
    constructor(client: IHttpClient);
    getCompanies(companyName: string, requestId: string, searchType: string, startIndex: number | null, searchBefore: string | null, searchAfter: string | null, size: number | null): Promise<Resource<CompaniesResource>>;
}
