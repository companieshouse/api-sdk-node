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
   * @param pageSize the number of officers to show on the page
   * @param pageIndex the start position of the page
   * @param registerView Display register specific information. If given register is held at Companies House,
   * registers_view set to true and correct register_type specified, only active officers will be returned.
   * Those will also have full date of birth.Defaults to false
   * @param orderBy the field by which to order the result set
   */
    getCompanyOfficers(number: string, pageSize?: number, pageIndex?: number, registerView?: boolean, orderBy?: string): Promise<Resource<CompanyOfficers>>;
}
