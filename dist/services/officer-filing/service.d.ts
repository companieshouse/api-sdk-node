import { CompanyOfficer, FilingResponse, OfficerFiling, ValidationStatusResponse } from "./types";
import { IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
export default class {
    private readonly client;
    constructor(client: IHttpClient);
    getListActiveDirectorDetails(transactionId: string): Promise<Resource<CompanyOfficer[]> | ApiErrorResponse>;
    getValidationStatus(transactionId: string, submissionId: string): Promise<Resource<ValidationStatusResponse> | ApiErrorResponse>;
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
    private getValidationStatusResponse;
    getOfficerFiling(transactionId: string, filingId: string): Promise<Resource<OfficerFiling> | ApiErrorResponse>;
    /**
     * Post an officer filing object to update on the API.
     */
    postOfficerFiling(transactionId: string, officerFiling: OfficerFiling): Promise<Resource<FilingResponse> | ApiErrorResponse>;
    /**
     * Patch an officer filing object to update on the API.
     */
    patchOfficerFiling(transactionId: string, filingId: string, officerFiling: OfficerFiling): Promise<Resource<FilingResponse> | ApiErrorResponse>;
    /**
     * Map an OfficerFiling object to an OfficerFilingDto which represents the expected json data model
     */
    private mapToDto;
    /**
     * Map an OfficerFilingDto to an OfficerFiling object
     */
    private mapFromDto;
    /**
     * Map a FilingResponseDto in its json data model to a regular FilingResponse object
     * @param resource Where the FilingResponse fields will be set
     * @param body The FilingResponseDto json data model that will be mapped
     */
    private populateResource;
    private getCompanyOfficerDetails;
}
