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
 * Service class for handling PSC (Person with Significant Control) extension-related operations.
 * This class provides methods to interact with the PSC extensions API, including creating, retrieving,
 * and checking the validation of PSC extensions request
 */
class PscExtensionService {
    constructor(client) {
        this.client = client;
    }
    /**
     * Submits a new PSC extension for a given transaction.
     *
     * @param transactionId - The unique identifier of the transaction.
     * @param pscExtension - The PSC extension data to be submitted.
     * @returns A promise that resolves to either:
     * - A `Resource<PscExtension>` object containing the created PSC extension details.
     * - An `ApiErrorResponse` object if an error occurs during the request.
     */
    postPscExtension(transactionId, pscExtension, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            const resourceUri = `/transactions/${transactionId}/persons-with-significant-control-extensions`;
            const pscExtensionResource = mapping_1.default.snakeCaseKeys(pscExtension);
            const response = yield this.client.httpPost(resourceUri, pscExtensionResource, headers);
            if (response.error) {
                return this.handleErrorResponse(response);
            }
            return this.populateFrontEndResource(response);
        });
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
    getPscExtensionCount(pscNotificationId, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            const resourceUri = `/persons-with-significant-control-extensions/${pscNotificationId}/extensionCount`;
            const response = yield this.client.httpGet(resourceUri, headers);
            if (response.error) {
                return this.handleErrorResponse(response);
            }
            const frontEndResource = {
                httpStatusCode: response.status,
                resource: response.body
            };
            return frontEndResource;
        });
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
    getIsPscExtensionValid(pscNotificationId, companyNumber, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            const resourceUri = `/persons-with-significant-control-extensions/${pscNotificationId}/${companyNumber}/isPscExtensionRequestValid`;
            const response = yield this.client.httpGet(resourceUri, headers);
            if (response.error) {
                return this.handleErrorResponse(response);
            }
            const frontEndResource = {
                httpStatusCode: response.status,
                resource: mapping_1.default.camelCaseKeys(response.body)
            };
            return frontEndResource;
        });
    }
    /**
     * Maps the response body to a front-end resource format with camelCase keys.
     *
     * @param response - The HTTP response received from the API.
     * @returns A `Resource<PscExtension>` object containing the mapped resource.
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
exports.default = PscExtensionService;
//# sourceMappingURL=service.js.map