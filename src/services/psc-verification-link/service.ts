import {
    PscVerification, PscVerificationResource
} from "./types"

import { HttpResponse, IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";

export default class PscVerificationService {
    constructor (private readonly client: IHttpClient) {}

    public async postPscVerification (transactionId: string, pscVerification: PscVerification): Promise<Resource<PscVerificationResource> | ApiErrorResponse> {
        const resourceUri = `/transactions/${transactionId}/persons-with-significant-control-verification`;
        const response = await this.client.httpPost(resourceUri, pscVerification);

        if (response.error) {
            return {
                httpStatusCode: response.status,
                errors: [response.error]
            }
        }

        return this.populateResource(response);
    }

    public async getPscVerification (transactionId: string, pscVerificationId: string): Promise<Resource<PscVerificationResource> | ApiErrorResponse> {
        const resourceUri = `/transactions/${transactionId}/persons-with-significant-control-verification/${pscVerificationId}`;
        const response = await this.client.httpGet(resourceUri);

        if (response.error) {
            return {
                httpStatusCode: response.status,
                errors: [response.error]
            }
        }

        return this.populateResource(response);
    }

    public async patchPscVerification (transactionId: string, filingId: string, pscVerificationPatch: PscVerification): Promise<Resource<PscVerificationResource> | ApiErrorResponse> {
        const resourceUri = `/transactions/${transactionId}/persons-with-significant-control-verification/${filingId}`;
        const additionalHeaders = {
            "Content-Type": "application/merge-patch+json"
        };
        const response = await this.client.httpPatch(resourceUri, pscVerificationPatch, additionalHeaders);

        if (response.error) {
            return {
                httpStatusCode: response.status,
                errors: [response.error]
            }
        }

        const resource: Resource<PscVerificationResource> = {
            httpStatusCode: response.status,
            resource: response.body
        };

        return resource;
    }

    private populateResource (response: HttpResponse): Resource<PscVerificationResource> {
        const resource: Resource<PscVerificationResource> = {
            httpStatusCode: response.status,
            resource: response.body as PscVerificationResource
        };

        return resource;
    }
}
