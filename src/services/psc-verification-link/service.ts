import {
    PscVerification, PscVerificationResource
} from "./types"

import { HttpResponse, IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";

export default class PscVerificationService {
    constructor (private readonly client: IHttpClient) {}

    public async postPscVerification (transactionId: string, pscVerification: PscVerification): Promise<Resource<PscVerificationResource> | ApiErrorResponse> {
        const url = `/transactions/${transactionId}/persons-with-significant-control-verification`;
        const response = await this.client.httpPost(url, pscVerification);

        if (response.error) {
            return {
                httpStatusCode: response.status,
                errors: [response.error]
            }
        }

        const resource: Resource<PscVerificationResource> = {
            httpStatusCode: response.status
        };
        const body = response.body as PscVerificationResource
        this.populateResource(resource, body);
        return resource;
    }

    private populateResource (resource: Resource<PscVerificationResource>, body: PscVerificationResource) {
        resource.resource = body;
    }
}
