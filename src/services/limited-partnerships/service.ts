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

        if (response.error) {
            return {
                httpStatusCode: response.status,
                errors: [response.error]
            };
        }

        const resource: Resource<LimitedPartnershipCreated> = {
            httpStatusCode: response.status
        };

        resource.resource = { ...response.body };
        return resource;
    }

    public async patchLimitedPartnership (
        transactionId: string,
        submissionId: string,
        body: { type: string; data: Record<string, any> }
    ): Promise<Resource<void> | ApiErrorResponse> {
        const URL = `/transactions/${transactionId}/limited-partnership/partnership/${submissionId}`;
        const response: HttpResponse = await this.client.httpPatch(URL, body);

        if (response.error) {
            return {
                httpStatusCode: response.status,
                errors: [response.error]
            };
        }

        return {
            httpStatusCode: response.status
        };
    }
}
