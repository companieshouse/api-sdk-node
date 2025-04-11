"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mapping_1 = __importDefault(require("../../mapping/mapping"));
/**
 * Service class for handling PSC (Person with Significant Control) verification-related operations.
 * This class provides methods to interact with the PSC verification API, including creating, retrieving,
 * updating, and checking the validation status of PSC verifications, as well as checking planned maintenance.
 */
class PscVerificationService {
    constructor(client) {
        this.client = client;
    }
    /**
     * Submits a new PSC verification for a given transaction.
     *
     * @param transactionId - The unique identifier of the transaction.
     * @param pscVerification - The PSC verification data to be submitted.
     * @returns A promise that resolves to either:
     * - A `Resource<PscVerification>` object containing the created PSC verification details.
     * - An `ApiErrorResponse` object if an error occurs during the request.
     */
    postPscVerification(transactionId, pscVerification) {
        return __awaiter(this, void 0, void 0, function* () {
            const resourceUri = `/transactions/${transactionId}/persons-with-significant-control-verification`;
            const pscVerificationResource = mapping_1.default.snakeCaseKeys(pscVerification);
            const response = yield this.client.httpPost(resourceUri, pscVerificationResource);
            if (response.error) {
                return this.handleErrorResponse(response);
            }
            return this.populateFrontEndResource(response);
        });
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
    getPscVerification(transactionId, pscVerificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resourceUri = `/transactions/${transactionId}/persons-with-significant-control-verification/${pscVerificationId}`;
            const response = yield this.client.httpGet(resourceUri);
            if (response.error) {
                return this.handleErrorResponse(response);
            }
            return this.populateFrontEndResource(response);
        });
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
    patchPscVerification(transactionId, pscVerificationId, pscVerificationPatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const additionalHeaders = { "Content-Type": "application/merge-patch+json" };
            const resourceUri = `/transactions/${transactionId}/persons-with-significant-control-verification/${pscVerificationId}`;
            const pscVerificationPatchResource = mapping_1.default.snakeCaseKeys(pscVerificationPatch);
            const response = yield this.client.httpPatch(resourceUri, pscVerificationPatchResource, additionalHeaders);
            if (response.error) {
                return this.handleErrorResponse(response);
            }
            return this.populateFrontEndResource(response);
        });
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
    getValidationStatus(transactionId, pscVerificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resourceUri = `/transactions/${transactionId}/persons-with-significant-control-verification/${pscVerificationId}/validation_status`;
            const response = yield this.client.httpGet(resourceUri);
            if (response.error) {
                return this.handleErrorResponse(response);
            }
            const resource = { httpStatusCode: response.status };
            const body = response.body;
            resource.resource = mapping_1.default.camelCaseKeys(body);
            return resource;
        });
    }
    /**
     * Checks if there is any planned maintenance for the PSC verification service.
     *
     * @returns A promise that resolves to either:
     * - An `ApiResponse<PlannedMaintenance>` object containing maintenance details.
     * - An `ApiErrorResponse` object if an error occurs during the request.
     */
    checkPlannedMaintenance() {
        return __awaiter(this, void 0, void 0, function* () {
            const maintenanceUri = `/persons-with-significant-control-verification/maintenance`;
            const response = yield this.client.httpGet(maintenanceUri);
            if (response.error) {
                return this.handleErrorResponse(response);
            }
            return {
                httpStatusCode: response.status,
                resource: response.body
            };
        });
    }
    /**
     * Maps the response body to a front-end resource format with camelCase keys.
     *
     * @param response - The HTTP response received from the API.
     * @returns A `Resource<PscVerification>` object containing the mapped resource.
     */
    populateFrontEndResource(response) {
        const frontEndResource = {
            httpStatusCode: response.status,
            resource: response.body
        };
        const body = response.body;
        frontEndResource.resource = mapping_1.default.camelCaseKeys(body);
        return frontEndResource;
    }
    /**
     * Handles error responses from the API by mapping error details to camelCase keys.
     *
     * @param response - The HTTP response containing the error details.
     * @returns An `ApiErrorResponse` object with the mapped error details.
     */
    handleErrorResponse(response) {
        return {
            httpStatusCode: response.status,
            errors: [mapping_1.default.camelCaseKeys(response.error)]
        };
    }
}
exports.default = PscVerificationService;
//# sourceMappingURL=service.js.map