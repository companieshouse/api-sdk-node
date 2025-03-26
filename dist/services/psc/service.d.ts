import { IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
import { PersonWithSignificantControl, PscIndWithVerificationState } from "./types";
/**
 * https://developer-specs.company-information.service.gov.uk/companies-house-public-data-api/reference/persons-with-significant-control/get-individual
 */
export default class PscService {
    private readonly client;
    constructor(client: IHttpClient);
    /**
   * Get the PSC details for an individual person.
   *
   * @param companyNumber the company number to look up
   * @param notificationId the PSC Notification Id to retrieve
   */
    getPscIndividual(companyNumber: string, notificationId: string): Promise<Resource<PersonWithSignificantControl> | ApiErrorResponse>;
    /**
   * Get the PSC individual details with their verification state.
   *
   * @param companyNumber the company number to look up
   * @param notificationId the PSC Notification Id to retrieve
   */
    getPscIndWithVerificationState(companyNumber: string, pscNotificationId: string): Promise<Resource<PscIndWithVerificationState> | ApiErrorResponse>;
}
