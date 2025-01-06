import { PlannedMaintenance, PscVerification, PscVerificationData } from "./types"

import { HttpResponse, IHttpClient } from "../../http";
import Resource, { ApiErrorResponse, ApiResponse } from "../resource";
import Mapping from "../../mapping/mapping";
import { PersonWithSignificantControlResource } from "../psc/types";
/**
 * The PSC Verification Service expects request body data to be configured in camelCase format and will
 * unwrap this data into snake case format before submitting this on to the PSC verification API. Response
 * body data received from the API is then converted from snake case back into camel case before it is returned.
 */
export default class PscVerificationService {
    constructor (private readonly client: IHttpClient) {}

    public async postPscVerification (transactionId: string, pscVerification: PscVerificationData): Promise<Resource<PscVerification> | ApiErrorResponse> {
        const resourceUri = `/transactions/${transactionId}/persons-with-significant-control-verification`;
        const pscVerificationResource = Mapping.snakeCaseKeys(pscVerification);
        const response = await this.client.httpPost(resourceUri, pscVerificationResource);

        if (response.error) {
            return {
                httpStatusCode: response.status,
                errors: [response.error]
            }
        }

        return this.populateFrontEndResource(response);
    }

    public async getPscVerification (transactionId: string, pscVerificationId: string): Promise<Resource<PscVerification> | ApiErrorResponse> {
        const resourceUri = `/transactions/${transactionId}/persons-with-significant-control-verification/${pscVerificationId}`;
        const response = await this.client.httpGet(resourceUri);

        if (response.error) {
            return {
                httpStatusCode: response.status,
                errors: [response.error]
            }
        }

        return this.populateFrontEndResource(response);
    }

    public async patchPscVerification (transactionId: string, filingId: string, pscVerificationPatch: PscVerificationData): Promise<Resource<PscVerification> | ApiErrorResponse> {
        const additionalHeaders = { "Content-Type": "application/merge-patch+json" };
        const resourceUri = `/transactions/${transactionId}/persons-with-significant-control-verification/${filingId}`;
        const pscVerificationPatchResource = Mapping.snakeCaseKeys(pscVerificationPatch);
        const response = await this.client.httpPatch(resourceUri, pscVerificationPatchResource, additionalHeaders);

        if (response.error) {
            return {
                httpStatusCode: response.status,
                errors: [response.error]
            }
        }

        return this.populateFrontEndResource(response);
    }

    public async checkPlannedMaintenance (): Promise<ApiResponse<PlannedMaintenance> | ApiErrorResponse> {
        const maintenanceUri = `/persons-with-significant-control-verification/maintenance`;
        const response = await this.client.httpGet(maintenanceUri);

        if (response.error) {
            return {
                httpStatusCode: response.status,
                errors: [response.error]
            }
        }

        const frontEndResponse: ApiResponse<PlannedMaintenance> = {
            httpStatusCode: response.status,
            resource: response.body as PlannedMaintenance
        };

        return frontEndResponse;
    }

    private populateFrontEndResource (response: HttpResponse): Resource<PscVerification> {
        const frontEndResource: Resource<PscVerification> = {
            httpStatusCode: response.status,
            resource: response.body as PscVerification
        };

        const body = response.body as PersonWithSignificantControlResource;
        frontEndResource.resource = Mapping.camelCaseKeys<PscVerification>(body);

        return frontEndResource;
    }
}
