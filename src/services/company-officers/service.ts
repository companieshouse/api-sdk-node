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
   */
    public async getCompanyOfficers (number: string, pageSize: number = 35, pageIndex: number = 0, registerView: boolean = false): Promise<Resource<CompanyOfficers>> {
        let url = `/company/${number}/officers`;
        url = url.concat("?",
            `page_size=${pageSize}`,
            "&",
            `page_index=${pageIndex}`,
            "&",
            `register_view=${registerView}`);

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
