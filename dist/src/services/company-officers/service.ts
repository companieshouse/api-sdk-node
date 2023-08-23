import { IHttpClient } from "../../http";
import { CompanyOfficersResource, CompanyOfficers } from "./types";
import Resource from "../resource";
import Mapping from "../../mapping/mapping";

/**
 * https://developer.companieshouse.gov.uk/api/docs/company/company_number/officers/officers.html
 */
export default class CompanyOfficersService {
    constructor (private readonly client: IHttpClient) { }

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
    public async getCompanyOfficers (number: string, pageSize: number = 35, pageIndex: number = 0, registerView: boolean = false, orderBy?: string): Promise<Resource<CompanyOfficers>> {
        let url = `/company/${number}/officers`;
        url = url.concat("?",
            `page_size=${pageSize}`,
            "&",
            `page_index=${pageIndex}`,
            "&",
            `register_view=${registerView}`);
        if (orderBy) {
            url = url.concat(`&order_by=${orderBy}`);
        }

        const resp = await this.client.httpGet(url);

        const resource: Resource<CompanyOfficers> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        const body = resp.body as CompanyOfficersResource;

        resource.resource = Mapping.camelCaseKeys<CompanyOfficers>(body);

        return resource;
    }
}
