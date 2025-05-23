import { HttpResponse, IHttpClient } from "../../http";
import {
    Incorporation,
    LimitedPartnership,
    LimitedPartnershipResourceCreated,
    LimitedPartnershipIncorporation,
    GeneralPartner,
    LimitedPartner
} from "./types";
import Resource, { ApiErrorResponse } from "../resource";

export default class LimitedPartnershipsService {
    constructor (private readonly client: IHttpClient) {}

    public async postLimitedPartnership (
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

    public async patchLimitedPartnership (
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

    public async getLimitedPartnership (
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

    public async postLimitedPartnershipIncorporation (
        transactionId: string,
        body: Incorporation
    ): Promise<Resource<LimitedPartnershipResourceCreated> | ApiErrorResponse> {
        const URL = `/transactions/${transactionId}/incorporation/limited-partnership`;
        const response: HttpResponse = await this.client.httpPost(URL, body);

        return {
            httpStatusCode: response.status,
            resource: { ...response.body }
        };
    }

    public async getLimitedPartnershipIncorporation (
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

    public async postGeneralPartner (
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

    public async getGeneralPartner (
        transactionId: string,
        generalPartnerId: string
    ): Promise<Resource<GeneralPartner> | ApiErrorResponse> {
        const URL = `/transactions/${transactionId}/limited-partnership/general-partner/${generalPartnerId}`;
        const response: HttpResponse = await this.client.httpGet(URL);

        return {
            httpStatusCode: response.status,
            resource: { ...response.body }
        };
    }

    public async getGeneralPartners (
        transactionId: string
    ): Promise<Resource<GeneralPartner[]> | ApiErrorResponse> {
        const URL = `/transactions/${transactionId}/limited-partnership/general-partners`;
        const response: HttpResponse = await this.client.httpGet(URL, { transactionId });

        return {
            httpStatusCode: response.status,
            resource: response.body
        };
    }

    public async patchGeneralPartner (
        transactionId: string,
        generalPartnerId: string,
        body: GeneralPartner["data"]
    ): Promise<Resource<void> | ApiErrorResponse> {
        const URL = `/transactions/${transactionId}/limited-partnership/general-partner/${generalPartnerId}`;
        const response: HttpResponse = await this.client.httpPatch(URL, body);

        return {
            httpStatusCode: response.status,
            resource: { ...response.body }
        };
    }

    public async deleteGeneralPartner (
        transactionId: string,
        generalPartnerId: string
    ): Promise<Resource<void> | ApiErrorResponse> {
        const URL = `/transactions/${transactionId}/limited-partnership/general-partner/${generalPartnerId}`;
        const response: HttpResponse = await this.client.httpDelete(URL);

        return {
            httpStatusCode: response.status,
            resource: { ...response.body }
        };
    }

    /*
    * Calls to limited partner endpoints
    */

    public async postLimitedPartner (
        transactionId: string,
        body: LimitedPartner
    ): Promise<Resource<LimitedPartnershipResourceCreated> | ApiErrorResponse> {
        const URL = `/transactions/${transactionId}/limited-partnership/limited-partner`;
        const response: HttpResponse = await this.client.httpPost(URL, body);

        return {
            httpStatusCode: response.status,
            resource: { ...response.body }
        };
    }

    public async getLimitedPartner (
        transactionId: string,
        limitedPartnerId: string
    ): Promise<Resource<LimitedPartner> | ApiErrorResponse> {
        const URL = `/transactions/${transactionId}/limited-partnership/limited-partner/${limitedPartnerId}`;
        const response: HttpResponse = await this.client.httpGet(URL);

        return {
            httpStatusCode: response.status,
            resource: { ...response.body }
        };
    }

    public async getLimitedPartners (
        transactionId: string
    ): Promise<Resource<LimitedPartner[]> | ApiErrorResponse> {
        const URL = `/transactions/${transactionId}/limited-partnership/limited-partners`;
        const response: HttpResponse = await this.client.httpGet(URL);

        return {
            httpStatusCode: response.status,
            resource: response.body
        };
    }

    public async patchLimitedPartner (
        transactionId: string,
        limitedPartnerId: string,
        body: LimitedPartner["data"]
    ): Promise<Resource<void> | ApiErrorResponse> {
        const URL = `/transactions/${transactionId}/limited-partnership/limited-partner/${limitedPartnerId}`;
        const response: HttpResponse = await this.client.httpPatch(URL, body);

        return {
            httpStatusCode: response.status,
            resource: { ...response.body }
        };
    }

    public async deleteLimitedPartner (
        transactionId: string,
        limitedPartnerId: string
    ): Promise<Resource<void> | ApiErrorResponse> {
        const URL = `/transactions/${transactionId}/limited-partnership/limited-partner/${limitedPartnerId}`;
        const response: HttpResponse = await this.client.httpDelete(URL);

        return {
            httpStatusCode: response.status,
            resource: { ...response.body }
        };
    }
}
