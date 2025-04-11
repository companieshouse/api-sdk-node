import { PlannedMaintenance, PscVerification, PscVerificationData } from "./types";
import { IHttpClient } from "../../http";
import Resource, { ApiErrorResponse, ApiResponse } from "../resource";
/**
 * Service class for handling PSC (Person with Significant Control) verification-related operations.
 * This class provides methods to interact with the PSC verification API, including creating, retrieving,
 * updating, and checking the validation status of PSC verifications, as well as checking planned maintenance.
 */
export default class PscVerificationService {
    private readonly client;
    constructor(client: IHttpClient);
    /**
     * Submits a new PSC verification for a given transaction.
     *
     * @param transactionId - The unique identifier of the transaction.
     * @param pscVerification - The PSC verification data to be submitted.
     * @returns A promise that resolves to either:
     * - A `Resource<PscVerification>` object containing the created PSC verification details.
     * - An `ApiErrorResponse` object if an error occurs during the request.
     */
    postPscVerification(transactionId: string, pscVerification: PscVerificationData): Promise<Resource<PscVerification> | ApiErrorResponse>;
    /**
     * Retrieves a specific PSC verification by its ID for a given transaction.
     *
     * @param transactionId - The unique identifier of the transaction.
     * @param pscVerificationId - The unique identifier of the PSC verification.
     * @returns A promise that resolves to either:
     * - A `Resource<PscVerification>` object containing the PSC verification details.
     * - An `ApiErrorResponse` object if an error occurs during the request.
     */
    getPscVerification(transactionId: string, pscVerificationId: string): Promise<Resource<PscVerification> | ApiErrorResponse>;
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
    patchPscVerification(transactionId: string, pscVerificationId: string, pscVerificationPatch: PscVerificationData): Promise<Resource<PscVerification> | ApiErrorResponse>;
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
    getValidationStatus(transactionId: string, pscVerificationId: string): Promise<Resource<PscVerification> | ApiErrorResponse>;
    /**
     * Checks if there is any planned maintenance for the PSC verification service.
     *
     * @returns A promise that resolves to either:
     * - An `ApiResponse<PlannedMaintenance>` object containing maintenance details.
     * - An `ApiErrorResponse` object if an error occurs during the request.
     */
    checkPlannedMaintenance(): Promise<ApiResponse<PlannedMaintenance> | ApiErrorResponse>;
    /**
     * Maps the response body to a front-end resource format with camelCase keys.
     *
     * @param response - The HTTP response received from the API.
     * @returns A `Resource<PscVerification>` object containing the mapped resource.
     */
    private populateFrontEndResource;
    /**
     * Handles error responses from the API by mapping error details to camelCase keys.
     *
     * @param response - The HTTP response containing the error details.
     * @returns An `ApiErrorResponse` object with the mapped error details.
     */
    private handleErrorResponse;
}
