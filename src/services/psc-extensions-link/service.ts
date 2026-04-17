import { PscExtension, PscExtensionData, ValidationStatusResponse } from "./types"

import { Headers, HttpResponse, IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
import Mapping from "../../mapping/mapping";
import { PersonWithSignificantControlResource } from "../psc/types";

/**
 * Service class for handling PSC (Person with Significant Control) extension-related operations.
 * This class provides methods to interact with the PSC extensions API, including creating, retrieving,
 * and checking the validation of PSC extensions request
 */
export default class PscExtensionService {
    constructor (private readonly client: IHttpClient) {}

    /**
     * Submits a new PSC extension for a given transaction.
     *
     * @param transactionId - The unique identifier of the transaction.
     * @param pscExtension - The PSC extension data to be submitted.
     * @returns A promise that resolves to either:
     * - A `Resource<PscExtension>` object containing the created PSC extension details.
     * - An `ApiErrorResponse` object if an error occurs during the request.
     */
    public async postPscExtension (transactionId: string, pscExtension: PscExtensionData, headers?: Headers): Promise<Resource<PscExtension> | ApiErrorResponse> {
        const resourceUri = `/transactions/${transactionId}/persons-with-significant-control-extensions`;
        const pscExtensionResource = Mapping.snakeCaseKeys(pscExtension);
        const response = await this.client.httpPost(resourceUri, pscExtensionResource, headers);

        if (response.error) {
            return this.handleErrorResponse(response);
        }

        return this.populateFrontEndResource(response);
    }

    /**
     * Retrieves the count of extension requests for a specific PSC notification.
     *
     * @param pscNotificationId - The unique identifier of the PSC notification.
     * @param headers - Optional headers to include in the request.
     * @returns A promise that resolves to either:
     * - A `Resource<number>` object containing the extension count (0, 1, or 2).
     * - An `ApiErrorResponse` object if an error occurs during the request.
     */
    public async getPscExtensionCount (pscNotificationId: string, headers?: Headers): Promise<Resource<number> | ApiErrorResponse> {
        const resourceUri = `/persons-with-significant-control-extensions/${pscNotificationId}/extensionCount`;
        const response = await this.client.httpGet(resourceUri, headers);

        if (response.error) {
            return this.handleErrorResponse(response);
        }

        const frontEndResource: Resource<number> = {
            httpStatusCode: response.status,
            resource: response.body as number
        };

        return frontEndResource;
    }

    /**
     * Validates whether a PSC extension request is valid for the given parameters.
     *
     * @param pscNotificationId - The unique identifier of the PSC notification.
     * @param companyNumber - The company number.
     * @param headers - Optional headers to include in the request.
     * @returns A promise that resolves to either:
     * - A `Resource<ValidationStatusResponse>` object containing validation results.
     * - An `ApiErrorResponse` object if an error occurs during the request.
     */
    public async getIsPscExtensionValid (pscNotificationId: string, companyNumber: string, headers?: Headers): Promise<Resource<ValidationStatusResponse> | ApiErrorResponse> {
        const resourceUri = `/persons-with-significant-control-extensions/${pscNotificationId}/${companyNumber}/isPscExtensionRequestValid`;
        const response = await this.client.httpGet(resourceUri, headers);

        if (response.error) {
            return this.handleErrorResponse(response);
        }

        const frontEndResource: Resource<ValidationStatusResponse> = {
            httpStatusCode: response.status,
            resource: Mapping.camelCaseKeys<ValidationStatusResponse>(response.body)
        };

        return frontEndResource;
    }

    /**
     * Maps the response body to a front-end resource format with camelCase keys.
     *
     * @param response - The HTTP response received from the API.
     * @returns A `Resource<PscExtension>` object containing the mapped resource.
     */
    private populateFrontEndResource (response: HttpResponse): Resource<PscExtension> {
        const frontEndResource: Resource<PscExtension> = {
            httpStatusCode: response.status,
            resource: response.body as PscExtension
        };

        const body = response.body as PersonWithSignificantControlResource;
        frontEndResource.resource = Mapping.camelCaseKeys<PscExtension>(body);

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
