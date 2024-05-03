import { IHttpClient } from "../../http";
import Mapping from "../../mapping/mapping";
import Resource from "../resource";
import { PersonWithSignificantControl, PersonWithSignificantControlResource } from "./types";

/**
 * https://developer-specs.company-information.service.gov.uk/companies-house-public-data-api/reference/persons-with-significant-control/get-individual
 */
export default class PscService {
    constructor (private readonly client: IHttpClient) { }

    /**
   * Get the PSC details for an individual person.
   *
   * @param companyNumber the company number to look up
   * @param notificationId the PSC Id to retrieve
   */
    public async getPscIndividual (companyNumber: string, notificationId: string ): Promise<Resource<PersonWithSignificantControl>> {
        const resp = await this.client.httpGet(`/company/${companyNumber}/persons-with-significant-control/individual/${notificationId}`);

        const resource: Resource<PersonWithSignificantControl> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        const body = resp.body as PersonWithSignificantControlResource;

        resource.resource = Mapping.camelCaseKeys<PersonWithSignificantControl>(body);

        return resource;
    }
}
