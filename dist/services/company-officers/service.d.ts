import { IHttpClient } from "../../http";
import { CompanyOfficers } from "./types";
import Resource from "../resource";
/**
 * https://developer.companieshouse.gov.uk/api/docs/company/company_number/officers/officers.html
 */
export default class CompanyOfficersService {
    private readonly client;
    constructor(client: IHttpClient);
    /**
   * Get the officers for a company.
   *
   * @param number the company number to look up
   */
    getCompanyOfficers(number: string): Promise<Resource<CompanyOfficers>>;
}
