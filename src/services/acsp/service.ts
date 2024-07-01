import {
    AcspData,
    AcspDto,
    AcspResponse
} from "./types";
import { HttpResponse, IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
import Mapping from "../../mapping/mapping";

export default class {
    constructor (private readonly client: IHttpClient) { }

    public async getAcsp (transactionId: string, id: string): Promise<Resource<AcspData> | ApiErrorResponse> {
        const url = `/transactions/${transactionId}/acsp/${id}`;
        const resp: HttpResponse = await this.client.httpGet(url);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error] };
        }

        const resource: Resource<AcspData> = {
            httpStatusCode: resp.status
        };

        const body = resp.body as AcspDto;

        resource.resource = Mapping.camelCaseKeys<AcspData>(body);
        return resource;
    }

    /**
     * Post an ACSP object to create on the API.
     * @param transactionId transaction id associated with the data to be saved
     * @param acsp the data to be saved
     */
    public async postACSP (transactionId: string, acsp: AcspData): Promise<Resource<AcspResponse> | ApiErrorResponse> {
        const url = `/transactions/${transactionId}/acsp`;

        const resp = await this.client.httpPost(url, acsp);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error] };
        }

        return {
            httpStatusCode: resp.status,
            resource: resp.body
        } as Resource<AcspResponse>;
    }

    /**
     * Put an ACSP object to update on the API.
     * @param transactionId transaction id associated with the data to be saved
     * @param acsp the data to be saved
     */
    public async putACSP (transactionId: string, acsp: AcspData): Promise<Resource<AcspResponse> | ApiErrorResponse> {
        const url = `/transactions/${transactionId}/acsp`;

        const resp = await this.client.httpPut(url, acsp);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error] };
        }

        return {
            httpStatusCode: resp.status,
            resource: resp.body
        } as Resource<AcspResponse>;
    }

    /* get saved application */
    public async getSavedApplication (userId: string): Promise<HttpResponse> {
        const url = `/acsp-api/user/${userId}/application`;
        const resp: HttpResponse = await this.client.httpGet(url);
        return resp;
    }

    /**
     * Delete an existing ACSP application from MongoDB
     * @param userId the id of the user whose application will be deleted
     */
    public async deleteSavedApplication (userId: string): Promise<HttpResponse> {
        const url = `/acsp-api/user/${userId}/application`;
        const resp: HttpResponse = await this.client.httpDelete(url);
        return resp;
    }

    /**
     * Send a confirmation email for application complete
     * @param userId the id of the user who will recieve the email
     * @param applicationReference the reference number of the application
     */
    public async sendConfirmationEmail (userId: string, applicationReference: string): Promise<HttpResponse> {
        const url = `/acsp-api/user/${userId}/application-submit/${applicationReference}`;
        const resp: HttpResponse = await this.client.httpPost(url);
        return resp;
    }
}
