import { IHttpClient } from "../../../http";
import { CompaniesResource } from "./types";
import Resource from "../../resource";
export default class AlphabeticalSearchService {
    private readonly client;
    constructor(client: IHttpClient);
    getCompanies(companyName: string, requestId: string, searchBefore: string | null, searchAfter: string | null, size: number | null): Promise<Resource<CompaniesResource>>;
}
