import {
    CompanyOfficer,
    CompanyOfficerResource
} from "./types";
import { HttpResponse, IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
import Mapping from "../../mapping/mapping";

export default class {
    constructor (private readonly client: IHttpClient) { }

    public async getListActiveDirectorDetails (transactionId: string): Promise<Resource<CompanyOfficer[]> | ApiErrorResponse> {
        const url = `${this.getOfficerFilingUrlIncTransactionId(transactionId)}/active-directors-details`;
        const resp: HttpResponse = await this.client.httpGet(url);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error] };
        }

        const resource: Resource<CompanyOfficer[]> = { httpStatusCode: resp.status };

        const body = resp.body as CompanyOfficerResource[];

        resource.resource = Mapping.camelCaseKeys<CompanyOfficer[]>(body);

        return resource;
    }

    private getOfficerFilingUrlIncTransactionId (transactionId: string) {
        return `/transactions/${transactionId}/officers`;
    }

    private getOfficerFilingUrlIncTransactionIdAndSubmissionId (transactionId: string, submissionId: string) {
        return `/transactions/${transactionId}/officers/submissionId/${submissionId}/`;
    }

/**
* Get the director details including the termination date out of the filing.
* to be used on the check your answers page for TM01.
*
* @params transaction id and submission id to look up the filing
*/

    public async getDirectorAndTerminationDate (transactionId: string, submissionId: string): Promise<Resource<CompanyOfficer> | ApiErrorResponse> {
        const url = `${this.getOfficerFilingUrlIncTransactionIdAndSubmissionId(transactionId, submissionId)}/check-answers-directors-details`;
        const resp: HttpResponse = await this.client.httpGet(url);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error] };
        }

        const resource: Resource<CompanyOfficer> = { httpStatusCode: resp.status };

        const body = resp.body as CompanyOfficerResource;

        resource.resource = Mapping.camelCaseKeys<CompanyOfficer>(body);

        return resource;
    }

    public async getCurrentOrFutureDissolved (companyNumber: String): Promise<Resource<Boolean> | ApiErrorResponse> {
        const url = `/officer-filing/company/${companyNumber}/eligibility-check/past-future-dissolved`;
        const resp: HttpResponse = await this.client.httpGet(url);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error] };
        }

        return { httpStatusCode: resp.status, resource: resp.body as Boolean };
    }
}
