import { HttpResponse, IHttpClient } from "../../http";
import {
    LimitedPartnership,
    LimitedPartnershipResourceCreated,
    LimitedPartnershipIncorporation,
    GeneralPartner,
} from "./types";
import Resource, { ApiErrorResponse } from "../resource";

export default class LimitedPartnershipsService {
    constructor(private readonly client: IHttpClient) {}

    public async postLimitedPartnership(
        transactionId: string,
        body: LimitedPartnership
    ): Promise<Resource<LimitedPartnershipResourceCreated> | ApiErrorResponse> {
        const URL = `/transactions/${transactionId}/limited-partnership/partnership`;
        const response: HttpResponse = await this.client.httpPost(URL, body);

        return {
            httpStatusCode: response.status,
            resource: { ...response.body }
        };
    }

    public async patchLimitedPartnership(
        transactionId: string,
        submissionId: string,
        body: LimitedPartnership["data"]
    ): Promise<Resource<void> | ApiErrorResponse> {
        const URL = `/transactions/${transactionId}/limited-partnership/partnership/${submissionId}`;
        const response: HttpResponse = await this.client.httpPatch(URL, body);

        return {
            httpStatusCode: response.status,
            resource: { ...response.body }
        };
    }

    public async getLimitedPartnership(
        transactionId: string,
        submissionId: string
    ): Promise<Resource<LimitedPartnership> | ApiErrorResponse> {
        const URL = `/transactions/${transactionId}/limited-partnership/partnership/${submissionId}`;
        const response: HttpResponse = await this.client.httpGet(URL);

        return {
            httpStatusCode: response.status,
            resource: { ...response.body }
        };
    }

    /*
     * Calls to incorporation endpoints
     */

    public async postLimitedPartnershipIncorporation(
        transactionId: string
    ): Promise<Resource<LimitedPartnershipResourceCreated> | ApiErrorResponse> {
        const URL = `/transactions/${transactionId}/incorporation/limited-partnership`;
        const response: HttpResponse = await this.client.httpPost(URL);

        return {
            httpStatusCode: response.status,
            resource: { ...response.body }
        };
    }

    public async getLimitedPartnershipIncorporation(
        transactionId: string,
        filingResourceId: string,
        includeSubResources?: boolean
    ): Promise<Resource<LimitedPartnershipIncorporation> | ApiErrorResponse> {
        const subResourcesQuery: string = includeSubResources
            ? "?include_sub_resources=" + includeSubResources
            : "";
        const URL = `/transactions/${transactionId}/incorporation/limited-partnership/${filingResourceId}${subResourcesQuery}`;

        const response: HttpResponse = await this.client.httpGet(URL);

        return {
            httpStatusCode: response.status,
            resource: { ...response.body }
        };
    }

    /*
     * Calls to general partner endpoints
     */

    public async postGeneralPartner(
        transactionId: string,
        body: GeneralPartner
    ): Promise<Resource<LimitedPartnershipResourceCreated> | ApiErrorResponse> {
        const URL = `/transactions/${transactionId}/limited-partnership/general-partner`;
        const response: HttpResponse = await this.client.httpPost(URL, body);

        return {
            httpStatusCode: response.status,
            resource: { ...response.body }
        };
    }

    public async getGeneralPartner(
        transactionId: string,
        submissionId: string
    ): Promise<Resource<GeneralPartner> | ApiErrorResponse> {
        const URL = `/transactions/${transactionId}/limited-partnership/general-partner/${submissionId}`;
        const response: HttpResponse = await this.client.httpGet(URL);

        return {
            httpStatusCode: response.status,
            resource: { ...response.body }
        };
    }
}
