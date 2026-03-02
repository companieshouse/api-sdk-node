import { IHttpClient } from "../../http";
import { CompanyFilingHistory } from "./types";
import Resource from "../resource";
/**
 * https://developer.companieshouse.gov.uk/api/docs/company/company_number/filing-history/getFilingHistoryList.html
 **/
export default class CompanyFilingHistoryService {
    private readonly client;
    constructor(client: IHttpClient);
    /**
   * Get the filing history for a company
   *
   */
    getCompanyFilingHistory(number: string, category?: string): Promise<Resource<CompanyFilingHistory>>;
}
