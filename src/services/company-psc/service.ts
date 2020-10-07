import { IHttpClient } from "../../http";
import { CompanyPersonsWithSignificantControlResource, CompanyPersonsWithSignificantControl } from "./types";
import Resource from "../resource";
import Mapping from "../../mapping/mapping";

/**
 * https://developer.companieshouse.gov.uk/api/docs/company/company_number/persons-with-significant-control/listPersonsWithSignificantControl.html
 */
export default class CompanyPscService {
    constructor (private readonly client: IHttpClient) { }

    /**
   * Get the PSCs for a company.
   *
   * @param number the company number to look up
   */
    public async getCompanyPsc (number: string): Promise<Resource<CompanyPersonsWithSignificantControl>> {
        const resp = await this.client.httpGet(`/company/${number}/persons-with-significant-control`);

        const resource: Resource<CompanyPersonsWithSignificantControl> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        const body = resp.body as CompanyPersonsWithSignificantControlResource;

        resource.resource = Mapping.camelCaseKeys<CompanyPersonsWithSignificantControl>(body);

        return resource;
    }
}
