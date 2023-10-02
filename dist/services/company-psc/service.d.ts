import { IHttpClient } from "../../http";
import { CompanyPersonsWithSignificantControl } from "./types";
import Resource from "../resource";
/**
 * https://developer.companieshouse.gov.uk/api/docs/company/company_number/persons-with-significant-control/listPersonsWithSignificantControl.html
 */
export default class CompanyPscService {
    private readonly client;
    constructor(client: IHttpClient);
    /**
   * Get the PSCs for a company.
   *
   * @param number the company number to look up
   */
    getCompanyPsc(number: string): Promise<Resource<CompanyPersonsWithSignificantControl>>;
}
