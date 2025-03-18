import { IHttpClient } from "../../http";
import Mapping from "../../mapping/mapping";
import Resource, { ApiErrorResponse } from "../resource";
import { PersonWithSignificantControl, PersonWithSignificantControlResource, PscVerificationState, PscVerificationStateResource } from "./types";

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

    public async getPscVerificationState (pscNotificationId: string): Promise<Resource<PscVerificationState> | ApiErrorResponse> {
        const verificationStatusUri = `/corporate-body-appointments/persons-of-significant-control/verification-state/${pscNotificationId}`;
        const response = await this.client.httpPost(verificationStatusUri);

        if (response.error) {
            return {
                httpStatusCode: response.status,
                errors: [response.error]
            }
        }

        const frontEndResource: Resource<PscVerificationState> = {
            httpStatusCode: response.status,
            resource: response.body as PscVerificationState
        };

        const body = response.body as PscVerificationStateResource;
        frontEndResource.resource = Mapping.camelCaseKeys<PscVerificationState>(body);

        return frontEndResource;
    }
}
