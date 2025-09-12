import { Headers, IHttpClient } from "../../http";
import Mapping from "../../mapping/mapping";
import Resource, { ApiErrorResponse } from "../resource";
import { PersonWithSignificantControl, PersonWithSignificantControlResource } from "./types";

/**
 * https://developer-specs.company-information.service.gov.uk/companies-house-public-data-api/reference/persons-with-significant-control/get-individual
 */
export default class PscService {
    constructor (private readonly client: IHttpClient) { }

    /**
   * Get the PSC individual details including their optional identity verification details.
   *
   * @param companyNumber the Company Number to look up
   * @param pscNotificationId the PSC Notification ID to retrieve
   */
    public async getPscIndividual (companyNumber: string, pscNotificationId: string, headers?: Headers): Promise<Resource<PersonWithSignificantControl> | ApiErrorResponse> {
        const resourceUri = `/company/${companyNumber}/persons-with-significant-control/individual/${pscNotificationId}`;
        const response = await this.client.httpGet(resourceUri, headers);

        if (response.error) {
            return {
                httpStatusCode: response.status,
                errors: [response.error]
            }
        }

        const frontEndResource: Resource<PersonWithSignificantControl> = {
            httpStatusCode: response.status
        };

        const body = response.body as PersonWithSignificantControlResource;
        frontEndResource.resource = Mapping.camelCaseKeys<PersonWithSignificantControl>(body);

        return frontEndResource;
    }
}
