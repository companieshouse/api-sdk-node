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
    public async getCompanyOfficers (number: string): Promise<Resource<CompanyOfficers>> {
        const resp = await this.client.httpGet(`/company/${number}/officers`);

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
