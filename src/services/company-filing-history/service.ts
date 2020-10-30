import {IHttpClient} from "../../http";
import {CompanyFilingHistory, CompanyFilingHistoryResource, FilingHistoryItemResource} from "./types";
import Resource from "../resource";
import {CompanyProfile, CompanyProfileResource} from "../company-profile";
import Mapping from "../../mapping/mapping";
import {CompanyOfficers} from "../company-officers";

/**
 * https://developer.companieshouse.gov.uk/api/docs/company/company_number/filing-history/getFilingHistoryList.html
 **/
export default class CompanyFilingHistoryService {
  constructor (private readonly client: IHttpClient) { }

  /**
   * Get the filing history for a company
   *
   */
  public async getCompanyFilingHistory (number: string, category?: string): Promise<Resource<CompanyFilingHistory>> {
    let queryString;
    if (category) {
      queryString = `?category=${category}`;
    }

    let url = `/company/${number}/filing-history`;

    if (queryString) {
      url = url.concat(queryString);
    }

    const resp = await this.client.httpGet(url);

    const resource: Resource<CompanyFilingHistory> = {
      httpStatusCode: resp.status
    };

    if (resp.error) {
      return resource;
    }

    // cast the response body to the expected type
    const body = resp.body as CompanyFilingHistoryResource;

    resource.resource = Mapping.camelCaseKeys<CompanyFilingHistory>(body);

    return resource;
  }
}
