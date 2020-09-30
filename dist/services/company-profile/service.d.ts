import { IHttpClient } from "../../http";
import { CompanyProfile } from "./types";
import Resource from "../resource";
/**
 * https://developer.companieshouse.gov.uk/api/docs/company/company_number/company_number.html
 */
export default class CompanyProfileService {
    private readonly client;
    constructor(client: IHttpClient);
    /**
   * Get the profile for a company.
   *
   * @param number the company number to look up
   */
    getCompanyProfile(number: string): Promise<Resource<CompanyProfile>>;
}
