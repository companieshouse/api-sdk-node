import { Headers, IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
import { PersonWithSignificantControl } from "./types";
/**
 * https://developer-specs.company-information.service.gov.uk/companies-house-public-data-api/reference/persons-with-significant-control/get-individual
 */
export default class PscService {
    private readonly client;
    constructor(client: IHttpClient);
    /**
   * Get the PSC individual details including their optional verification state.
   *
   * @param companyNumber the Company Number to look up
   * @param pscNotificationId the PSC Notification ID to retrieve
   */
    getPscIndividual(companyNumber: string, pscNotificationId: string, headers?: Headers): Promise<Resource<PersonWithSignificantControl> | ApiErrorResponse>;
}
