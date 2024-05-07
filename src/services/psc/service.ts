import { IHttpClient } from "../../http";
import Mapping from "../../mapping/mapping";
import Resource, { ApiErrorResponse } from "../resource";
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
   * @param notificationId the PSC Notification Id to retrieve
   */
    public async getPscIndividual (companyNumber: string, notificationId: string): Promise<Resource<PersonWithSignificantControl> | ApiErrorResponse> {
        const response = await this.client.httpGet(`/company/${companyNumber}/persons-with-significant-control/individual/${notificationId}`);

        const resource: Resource<PersonWithSignificantControl> = {
            httpStatusCode: response.status
        };

        if (response.error) {
            return {
                httpStatusCode: response.status,
                errors: [response.error]
            }
        }

        const body = response.body as PersonWithSignificantControlResource;
        resource.resource = Mapping.camelCaseKeys<PersonWithSignificantControl>(body);

        return resource;
    }
}
