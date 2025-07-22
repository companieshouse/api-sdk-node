import { PlannedMaintenance, PscVerification, PscVerificationData, ValidationStatusResponse, ValidationStatusResponseResource } from "./types"

import { Headers, HttpResponse, IHttpClient } from "../../http";
import Resource, { ApiErrorResponse, ApiResponse } from "../resource";
import Mapping from "../../mapping/mapping";
import { PersonWithSignificantControlResource } from "../psc/types";

/**
 * Service class for handling PSC (Person with Significant Control) verification-related operations.
 * This class provides methods to interact with the PSC verification API, including creating, retrieving,
 * updating, and checking the validation status of PSC verifications, as well as checking planned maintenance.
 */
export default class PscVerificationService {
    constructor (private readonly client: IHttpClient) {}

    /**
     * Submits a new PSC verification for a given transaction.
     *
     * @param transactionId - The unique identifier of the transaction.
     * @param pscVerification - The PSC verification data to be submitted.
     * @returns A promise that resolves to either:
     * - A `Resource<PscVerification>` object containing the created PSC verification details.
     * - An `ApiErrorResponse` object if an error occurs during the request.
     */
    public async postPscVerification (transactionId: string, pscVerification: PscVerificationData, headers?: Headers): Promise<Resource<PscVerification> | ApiErrorResponse> {
        const resourceUri = `/transactions/${transactionId}/persons-with-significant-control-verification`;
        const pscVerificationResource = Mapping.snakeCaseKeys(pscVerification);
        const response = await this.client.httpPost(resourceUri, pscVerificationResource, headers);

        if (response.error) {
            return this.handleErrorResponse(response);
        }

        return this.populateFrontEndResource(response);
    }

    /**
     * Retrieves a specific PSC verification by its ID for a given transaction.
     *
     * @param transactionId - The unique identifier of the transaction.
     * @param pscVerificationId - The unique identifier of the PSC verification.
     * @returns A promise that resolves to either:
     * - A `Resource<PscVerification>` object containing the PSC verification details.
     * - An `ApiErrorResponse` object if an error occurs during the request.
     */
    public async getPscVerification (transactionId: string, pscVerificationId: string, headers?: Headers): Promise<Resource<PscVerification> | ApiErrorResponse> {
        const resourceUri = `/transactions/${transactionId}/persons-with-significant-control-verification/${pscVerificationId}`;
        const response = await this.client.httpGet(resourceUri, headers);

        if (response.error) {
            return this.handleErrorResponse(response);
        }

        return this.populateFrontEndResource(response);
    }

    /**
     * Updates a PSC verification using a PATCH request for a given transaction and filing ID.
     *
     * @param transactionId - The unique identifier of the transaction.
     * @param pscVerificationId - The unique identifier of the filing.
     * @param pscVerificationPatch - The PSC verification data to be updated.
     * @returns A promise that resolves to either:
     * - A `Resource<PscVerification>` object containing the updated PSC verification details.
     * - An `ApiErrorResponse` object if an error occurs during the request.
     */
    public async patchPscVerification (transactionId: string, pscVerificationId: string, pscVerificationPatch: PscVerificationData, headers?: Headers): Promise<Resource<PscVerification> | ApiErrorResponse> {
        const additionalHeaders = {
            ...headers,
            "Content-Type": "application/merge-patch+json"
        };
        const resourceUri = `/transactions/${transactionId}/persons-with-significant-control-verification/${pscVerificationId}`;
        const pscVerificationPatchResource = Mapping.snakeCaseKeys(pscVerificationPatch);
        const response = await this.client.httpPatch(resourceUri, pscVerificationPatchResource, additionalHeaders);

        if (response.error) {
            return this.handleErrorResponse(response);
        }

        return this.populateFrontEndResource(response);
    }

    /**
     * Retrieves the validation status of a Person with Significant Control (PSC) verification.
     *
     * @param transactionId - The unique identifier of the transaction.
     * @param pscVerificationId - The unique identifier of the PSC verification.
     * @returns A promise that resolves to either:
     * - A `Resource<PscVerification>` object containing the validation status details.
     * - An `ApiErrorResponse` object if an error occurs during the request.
     *
     * The method constructs the resource URI using the provided `transactionId` and `pscVerificationId`,
     * performs an HTTP GET request, and processes the response. If an error is encountered, it is handled
     * using the `handleErrorResponse` method. Otherwise, the response body is mapped to camelCase keys
     * and returned as part of the resource.
     */
    public async getValidationStatus (transactionId: string, pscVerificationId: string, headers?: Headers): Promise<Resource<PscVerification> | ApiErrorResponse> {
        const resourceUri = `/transactions/${transactionId}/persons-with-significant-control-verification/${pscVerificationId}/validation_status`;
        const response = await this.client.httpGet(resourceUri, headers);

        if (response.error) {
            return this.handleErrorResponse(response);
        }

        const resource: Resource<ValidationStatusResponse> = { httpStatusCode: response.status };

        const body = response.body as ValidationStatusResponseResource;

        resource.resource = Mapping.camelCaseKeys<ValidationStatusResponse>(body);

        return resource;
    }

    /**
     * Checks if there is any planned maintenance for the PSC verification service.
     *
     * @returns A promise that resolves to either:
     * - An `ApiResponse<PlannedMaintenance>` object containing maintenance details.
     * - An `ApiErrorResponse` object if an error occurs during the request.
     */
    public async checkPlannedMaintenance (): Promise<ApiResponse<PlannedMaintenance> | ApiErrorResponse> {
        const maintenanceUri = `/persons-with-significant-control-verification/maintenance`;
        const response = await this.client.httpGet(maintenanceUri);

        if (response.error) {
            return this.handleErrorResponse(response);
        }

        return {
            httpStatusCode: response.status,
            resource: response.body as PlannedMaintenance
        };
    }

    /**
     * Maps the response body to a front-end resource format with camelCase keys.
     *
     * @param response - The HTTP response received from the API.
     * @returns A `Resource<PscVerification>` object containing the mapped resource.
     */
    private populateFrontEndResource (response: HttpResponse): Resource<PscVerification> {
        const frontEndResource: Resource<PscVerification> = {
            httpStatusCode: response.status,
            resource: response.body as PscVerification
        };

        const body = response.body as PersonWithSignificantControlResource;
        frontEndResource.resource = Mapping.camelCaseKeys<PscVerification>(body);

        return frontEndResource;
    }

    /**
     * Handles error responses from the API by mapping error details to camelCase keys.
     *
     * @param response - The HTTP response containing the error details.
     * @returns An `ApiErrorResponse` object with the mapped error details.
     */
    private handleErrorResponse (response: HttpResponse): ApiErrorResponse {
        return {
            httpStatusCode: response.status,
            errors: [Mapping.camelCaseKeys(response.error)]
        };
    }
}
