import { PlannedMaintenance, PscVerification, PscVerificationData, ValidationStatusResponse, ValidationStatusResponseResource, PscVerificationState, PscVerificationStateResource } from "./types"

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

    public async getValidationStatus (transactionId: string, pscVerificationId: string): Promise<Resource<PscVerification> | ApiErrorResponse> {
        const resourceUri = `/transactions/${transactionId}/persons-with-significant-control-verification/${pscVerificationId}/validation_status`;
        const response = await this.client.httpGet(resourceUri);

        if (response.status >= 400) {
            return { httpStatusCode: response.status, errors: [response.error] };
        }

        const resource: Resource<ValidationStatusResponse> = { httpStatusCode: response.status };

        const body = response.body as ValidationStatusResponseResource;

        resource.resource = Mapping.camelCaseKeys<ValidationStatusResponse>(body);

        return resource;
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

        return {
            httpStatusCode: response.status,
            resource: response.body as PlannedMaintenance
        };
    }

    public async getPscVerificationState (pscNotificationId: string): Promise<Resource<PscVerificationState> | ApiErrorResponse> {
        const verificationStatusUri = `/corporate-body-appointments/persons-of-significant-control/verification-state/${pscNotificationId}`;
        const response = await this.client.httpPost(verificationStatusUri);

        if (response.error) {
            return {
                httpStatusCode: response.status,
                errors: [response.error]
            }
        }

        const frontEndResource: Resource<PscVerificationState> = {
            httpStatusCode: response.status,
            resource: response.body as PscVerificationState
        };

        const body = response.body as PscVerificationStateResource;
        frontEndResource.resource = Mapping.camelCaseKeys<PscVerificationState>(body);

        return frontEndResource;
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
