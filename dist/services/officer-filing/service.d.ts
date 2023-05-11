import { CompanyOfficer } from "./types";
import { IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
export default class {
    private readonly client;
    constructor(client: IHttpClient);
    getListActiveDirectorDetails(transactionId: string): Promise<Resource<CompanyOfficer[]> | ApiErrorResponse>;
    private getOfficerFilingUrlIncTransactionId;
    private getOfficerFilingUrlIncTransactionIdAndSubmissionId;
    /**
    * Get the director details including the termination date out of the filing.
    * to be used on the check your answers page for TM01.
    *
    * @params transaction id and submission id to look up the filing
    */
    getDirectorAndTerminationDate(transactionId: string, submissionId: string): Promise<Resource<CompanyOfficer> | ApiErrorResponse>;
    getCurrentOrFutureDissolved(companyNumber: String): Promise<Resource<Boolean> | ApiErrorResponse>;
    private getCompanyOfficerDetails;
}
