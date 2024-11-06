import { HttpResponse, IHttpClient } from "../../http";
import { LimitedPartnership, LimitedPartnershipCreated } from "./types";
import Resource, { ApiErrorResponse } from "../resource";
import { mapLimitedPartnership } from "./mapping";

export default class LimitedPartnershipsService {
    constructor (private readonly client: IHttpClient) { }

    public async postLimitedPartnership (
        body: LimitedPartnership
    ): Promise<Resource<LimitedPartnershipCreated> | ApiErrorResponse> {
        const URL = `/transactions/NO-TRANSACTION-ID/limited_partnership/partnership`;
        const response: HttpResponse = await this.client.httpPost(URL, mapLimitedPartnership(body));

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
}
