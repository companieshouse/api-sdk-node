import { HttpResponse, IHttpClient } from "../../http";
import { LimitedPartnership, LimitedPartnershipCreated } from "./types";
import Resource, { ApiErrorResponse } from "../resource";

export default class LimitedPartnershipsService {
    constructor (private readonly client: IHttpClient) {}

    public async postLimitedPartnership (
        transactionId: string,
        body: LimitedPartnership
    ): Promise<Resource<LimitedPartnershipCreated> | ApiErrorResponse> {
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
}
