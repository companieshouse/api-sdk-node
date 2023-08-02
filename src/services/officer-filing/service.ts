import {
    CompanyOfficer,
    CompanyOfficerResource,
    FilingResponse,
    FilingResponseDto,
    OfficerFiling,
    OfficerFilingDto,
    ValidationStatusResponse,
    ValidationStatusResponseResource
} from "./types";
import { HttpResponse, IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
import Mapping from "../../mapping/mapping";

export default class {
    constructor (private readonly client: IHttpClient) { }

    public async getListActiveDirectorDetails (transactionId: string): Promise<Resource<CompanyOfficer[]> | ApiErrorResponse> {
        const url = `${this.getOfficerFilingUrlIncTransactionId(transactionId)}/active-directors-details`;
        return this.getCompanyOfficerDetails(url);
    }

    public async getValidationStatus (transactionId: string, submissionId: string): Promise<Resource<ValidationStatusResponse> | ApiErrorResponse> {
        const url = `${this.getOfficerFilingUrlIncTransactionIdAndSubmissionId(transactionId, submissionId)}/validation_status`;
        return this.getValidationStatusResponse(url);
    }

    private getOfficerFilingUrlIncTransactionId (transactionId: string) {
        return `/transactions/${transactionId}/officers`;
    }

    private getOfficerFilingUrlIncTransactionIdAndSubmissionId (transactionId: string, submissionId: string) {
        return `/transactions/${transactionId}/officers/${submissionId}/`;
    }

    /**
    * Get the director details including the termination date out of the filing.
    * to be used on the check your answers page for TM01.
    *
    * @params transaction id and submission id to look up the filing
    */
    public async getDirectorAndTerminationDate (transactionId: string, submissionId: string): Promise<Resource<CompanyOfficer> | ApiErrorResponse> {
        const url = `${this.getOfficerFilingUrlIncTransactionIdAndSubmissionId(transactionId, submissionId)}/tm01-check-answers-directors-details`;
        return this.getCompanyOfficerDetails(url);
    }

    public async getCurrentOrFutureDissolved (companyNumber: String): Promise<Resource<Boolean> | ApiErrorResponse> {
        const url = `/officer-filing/company/${companyNumber}/eligibility-check/past-future-dissolved`;
        const resp: HttpResponse = await this.client.httpGet(url);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error] };
        }

        return { httpStatusCode: resp.status, resource: resp.body as Boolean };
    }

    private async getValidationStatusResponse (url: string): Promise<Resource<ValidationStatusResponse> | ApiErrorResponse> {
        const resp: HttpResponse = await this.client.httpGet(url);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error] };
        }

        const resource: Resource<ValidationStatusResponse> = { httpStatusCode: resp.status };

        const body = resp.body as ValidationStatusResponseResource[];

        resource.resource = Mapping.camelCaseKeys<ValidationStatusResponse>(body);

        return resource;
    }

    public async getOfficerFiling (transactionId: string, filingId: string): Promise<Resource<OfficerFiling> | ApiErrorResponse> {
        const url = `/transactions/${transactionId}/officers/${filingId}`;
        const resp: HttpResponse = await this.client.httpGet(url);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error] };
        }

        const resource: Resource<OfficerFiling> = {
            httpStatusCode: resp.status
        };

        const body = resp.body as OfficerFilingDto;

        resource.resource = Mapping.camelCaseKeys<OfficerFiling>(body);

        return resource;
    }

    /**
     * Post an officer filing object to update on the API.
     */
    public async postOfficerFiling (transactionId: string, officerFiling: OfficerFiling): Promise<Resource<FilingResponse> | ApiErrorResponse> {
        const url = `/transactions/${transactionId}/officers`;
        const officerFilingResource: OfficerFilingDto = this.mapToDto(officerFiling);

        const resp = await this.client.httpPost(url, officerFilingResource);
        if (resp.error) {
            return {
                httpStatusCode: resp.status,
                errors: [resp.error]
            };
        }

        const resource: Resource<FilingResponse> = {
            httpStatusCode: resp.status
        };
        const body = resp.body as FilingResponseDto;
        this.populateResource(resource, body);
        return resource;
    }

    /**
     * Patch an officer filing object to update on the API.
     */
    public async patchOfficerFiling (transactionId: string, filingId: string, officerFiling: OfficerFiling): Promise<Resource<FilingResponse> | ApiErrorResponse> {
        const url = `/transactions/${transactionId}/officers/${filingId}`;
        const officerFilingResource: OfficerFilingDto = this.mapToDto(officerFiling);

        const resp = await this.client.httpPatch(url, officerFilingResource);
        if (resp.error) {
            return {
                httpStatusCode: resp.status,
                errors: [resp.error]
            };
        }

        const resource: Resource<FilingResponse> = {
            httpStatusCode: resp.status
        };
        const body = resp.body as FilingResponseDto;
        this.populateResource(resource, body);
        return resource;
    }

    /**
     * Map an OfficerFiling object to an OfficerFilingDto which represents the expected json data model
     */
    private mapToDto (officerFiling: OfficerFiling): OfficerFilingDto {
        return {
            reference_appointment_id: officerFiling.referenceAppointmentId,
            reference_etag: officerFiling.referenceEtag,
            resigned_on: officerFiling.resignedOn,
            name: officerFiling.name
        }
    }

    /**
     * Map a FilingResponseDto in its json data model to a regular FilingResponse object
     * @param resource Where the FilingResponse fields will be set
     * @param body The FilingResponseDto json data model that will be mapped
     */
    private populateResource (resource: Resource<FilingResponse>, body: FilingResponseDto) {
        resource.resource = {
            id: body.id
        };
    }

    private async getCompanyOfficerDetails (url: string): Promise<Resource<CompanyOfficer[]> | ApiErrorResponse> {
        const resp: HttpResponse = await this.client.httpGet(url);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error] };
        }

        const resource: Resource<CompanyOfficer[]> = { httpStatusCode: resp.status };

        const body = resp.body as CompanyOfficerResource[];

        resource.resource = Mapping.camelCaseKeys<CompanyOfficer[]>(body);

        return resource;
    }
}
