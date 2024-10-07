import {
    AcspData,
    AcspDataDto,
    AcspResponse
} from "./types";
import { HttpResponse, IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
import Mapping from "../../mapping/mapping";

export default class {
    constructor (private readonly client: IHttpClient) { }

    public async getAcsp (transactionId: string, acspApplicationId: string): Promise<Resource<AcspData> | ApiErrorResponse> {
        const url = `/transactions/${transactionId}/authorised-corporate-service-provider-applications/${acspApplicationId}`;
        const resp: HttpResponse = await this.client.httpGet(url);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error] };
        }

        const resource: Resource<AcspData> = {
            httpStatusCode: resp.status
        };

        const body = resp.body as AcspDataDto;

        resource.resource = Mapping.camelCaseKeys<AcspData>(body);
        return resource;
    }

    /**
     * Post an ACSP object to create on the API.
     * @param transactionId transaction id associated with the data to be saved
     * @param acsp the data to be saved
     */
    public async postACSP (transactionId: string, acsp: AcspData): Promise<Resource<AcspResponse> | ApiErrorResponse> {
        const url = `/transactions/${transactionId}/authorised-corporate-service-provider-applications`;

        const acspDto = Mapping.snakeCaseKeys(acsp);

        const resp = await this.client.httpPost(url, acspDto);

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
     * @param acspApplicationId acsp application id unique to the application
     * @param acsp the data to be saved
     */
    public async putACSP (transactionId: string, acspApplicationId: string, acsp: AcspData): Promise<Resource<AcspResponse> | ApiErrorResponse> {
        const url = `/transactions/${transactionId}/authorised-corporate-service-provider-applications/${acspApplicationId}`;
        const acspDto = Mapping.snakeCaseKeys(acsp);
        const resp = await this.client.httpPut(url, acspDto);

        if (resp.status >= 400) {
            return { httpStatusCode: resp.status, errors: [resp.error] };
        }

        return {
            httpStatusCode: resp.status,
            resource: resp.body
        } as Resource<AcspResponse>;
    }

    /* get saved application */
    public async getSavedApplication (acspApplicationId: string): Promise<HttpResponse> {
        const url = `/acsp-api/user/${acspApplicationId}/application`;
        const resp: HttpResponse = await this.client.httpGet(url);
        return resp;
    }

    /**
     * Delete an existing ACSP application from MongoDB and its corresponding transaction
     * @param transactionId the id of the transaction associated with the application. This will also be deleted.
     * @param acspApplicationId the id of the user whose application will be deleted
     */
    public async deleteSavedApplicationAndTransaction (transactionId: string, acspApplicationId: string): Promise<HttpResponse> {
        const url = `/transactions/${transactionId}/authorised-corporate-service-provider-applications/${acspApplicationId}`;
        const resp: HttpResponse = await this.client.httpDelete(url);
        return resp;
    }

    /**
     * Delete an existing ACSP application from MongoDB
     * @param acspApplicationId the id of the user whose application will be deleted
     */
    public async deleteSavedApplication (acspApplicationId: string): Promise<HttpResponse> {
        const url = `/acsp-api/user/${acspApplicationId}/application`;
        const resp: HttpResponse = await this.client.httpDelete(url);
        return resp;
    }
}
