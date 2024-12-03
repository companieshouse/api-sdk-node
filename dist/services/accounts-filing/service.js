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
exports.AccountsFilingService = void 0;
const types_1 = require("../../services/account-validator/types");
const mapping_1 = __importDefault(require("../../mapping/mapping"));
const result_1 = require("../result");
const util_1 = require("../../util");
const HTTP_STATUS_OK = 200;
const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;
/**
 * A service class for managing communications with the accounts filing API.
 * This class serves as the interface for various interactions with the accounts filing system.
 * Currently, it includes functionality to check the validation status of an accounts file,
 * but it is designed to accommodate additional features and communications with the accounts filing API
 * as they are implemented.
 *
 * The service handles various HTTP response scenarios, providing appropriate
 * responses based on the different statuses encountered during the file validation process
 * or other interactions with the accounts filing API.
 */
class AccountsFilingService {
    /**
     * Constructs an AccountsFilingService instance.
     * @param client - The HTTP client for making requests.
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * This service will submit the required input from the web to confirm the company.
     * @param companyNumber The company number
     * @param transactionId The transaction Id
     * @returns the company response.
     */
    confirmCompany(companyNumber, transactionId, confirmCompanyRequest, requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/transactions/${transactionId}/accounts-filing/company/${companyNumber}/confirm`;
            const headers = util_1.addRequestIdHeader(requestId);
            const resp = yield this.client.httpPut(url, confirmCompanyRequest, headers);
            const resource = {
                httpStatusCode: resp.status
            };
            if (resp.error) {
                return resource;
            }
            const body = resp.body;
            resource.resource = mapping_1.default.camelCaseKeys(body);
            return resource;
        });
    }
    /**
     * Checks the validation status of an accounts file.
     * Calls the accounts filing api, which in turn calls the accounts validation service.
     * @param fileValidationRequest - The request details for file validation.
     * @returns A promise that resolves to the validation response or an error.
     */
    checkAccountsFileValidationStatus(fileValidationRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.getFileValidationRequest(fileValidationRequest);
                return this.processResponse(response, fileValidationRequest.fileId);
            }
            catch (error) {
                return this.handleError(error);
            }
        });
    }
    /**
     * Initiates an HTTP GET request to retrieve the status of a file validation process.
     * This method queries the server for the current validation status of a specific file
     * associated with an accounts filing and transaction ID.
     *
     * @param fileValidationRequest - An object containing the identifiers needed to locate the file.
     *        This includes the file ID, accounts filing ID, and transaction ID.
     * @returns A promise that resolves to the HTTP response from the server. The response includes
     *          the current status of the file validation process.
     * @throws Will throw an error if the HTTP request fails.
     */
    getFileValidationRequest(fileValidationRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fileId, accountsFilingId, transactionId } = fileValidationRequest;
            return yield this.client.httpGet(`/transactions/${transactionId}/accounts-filing/${accountsFilingId}/file/${fileId}/status`);
        });
    }
    /**
     * Processes the HTTP response from the file validation request.
     * This method examines the HTTP status code of the response and delegates
     * to the appropriate handler based on the status code.
     *
     * @param response - The HttpResponse object received from the file validation request.
     *        It includes the status code and the response data from the server.
     * @param fileId - The unique identifier of the file whose validation status is being checked.
     * @returns Depending on the response status, this method can return:
     *          - The result of the handleOkResponse method if the status is HTTP_STATUS_OK (200),
     *            indicating a successful response from the server.
     *          - The result of the fileNotFoundResponse method if the status is HTTP_STATUS_NOT_FOUND (404),
     *            indicating that the file was not found on the server.
     *          - The result of the handleUnexpectedStatus method for any other unexpected status codes,
     *            handling any unforeseen responses.
     */
    processResponse(response, fileId) {
        switch (response.status) {
            case HTTP_STATUS_OK:
                return this.handleOkResponse(response, fileId);
            case HTTP_STATUS_NOT_FOUND:
                return this.fileNotFoundResponse(fileId);
            default:
                return this.handleUnexpectedStatus(response);
        }
    }
    /**
     * Handles unexpected HTTP response statuses received from the file validation request.
     * This method is used as a catch-all for any HTTP status codes that are not specifically
     * handled in the processResponse method. It constructs a standardized error response
     * which can be used to notify the caller of an unexpected condition.
     *
     * @param response - The HttpResponse object received from the file validation request.
     *        This includes the status code and any associated response data.
     * @returns An ApiErrorResponse object that encapsulates the unexpected status code and
     *          a descriptive error message. This response can be used to inform the user
     *          or calling function about the unexpected server behavior.
     */
    handleUnexpectedStatus(response) {
        return {
            httpStatusCode: response.status,
            errors: [{
                    error: `Unexpected server response: Status Code ${response.status}`
                }]
        };
    }
    /**
     * Handles the OK response received from the file validation request.
     * This method checks if the response body conforms to the AccountValidatorResponse structure.
     * If it does, the method returns a successful response, otherwise, it delegates to
     * the invalidResponseType method for further handling.
     *
     * @param response - The HttpResponse object received, expected with a status of HTTP_STATUS_OK.
     * @param fileId - The unique identifier of the file whose validation status is being checked.
     * @returns An object with the HTTP status code and the validated response body,
     *          or the result of the invalidResponseType method in case of an incorrect response type.
     */
    handleOkResponse(response, fileId) {
        if (types_1.isAccountValidatorResponse(response.body)) {
            return {
                httpStatusCode: response.status,
                resource: response.body
            };
        }
        return this.invalidResponseType(fileId, response);
    }
    /**
     * Generates a standardized error response for the scenario where the requested file is not found.
     *
     * @param fileId - The unique identifier of the file that was not found.
     * @returns An ApiErrorResponse object with the HTTP status of NOT FOUND and an error message.
     */
    fileNotFoundResponse(fileId) {
        return {
            httpStatusCode: HTTP_STATUS_NOT_FOUND,
            errors: [{ error: `File with ID [${fileId}] not found.` }]
        };
    }
    /**
     * Constructs an error response for situations where the file validation response is not of the expected type.
     *
     * @param fileId - The unique identifier of the file for which the validation response is incorrect.
     * @param response - The original HttpResponse object received from the file validation request.
     * @returns An ApiErrorResponse object encapsulating the actual HTTP status and a descriptive error message,
     *          including the response received for debugging purposes.
     */
    invalidResponseType(fileId, response) {
        return {
            httpStatusCode: response.status,
            errors: [{
                    error: `File validation response for file [${fileId}] is not the correct type. Response: ${JSON.stringify(response.body, null, 2)}`
                }]
        };
    }
    /**
     * Generic error handling method to capture and process exceptions or errors encountered during
     * the file validation request process. Converts unhandled errors into a standardized API error response.
     *
     * @param error - The error or exception caught during the execution of the file validation request.
     * @returns An ApiErrorResponse object with the status of INTERNAL_SERVER_ERROR for unhandled errors,
     *          or the original ApiErrorResponse if the error is already in this format.
     */
    handleError(error) {
        if (isApiErrorResponse(error)) {
            return error;
        }
        return {
            httpStatusCode: HTTP_STATUS_INTERNAL_SERVER_ERROR,
            errors: [{ error: "Internal Server Error" }]
        };
    }
    setPackageType(transactionId, accountsFilingId, packageType, requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/transactions/${transactionId}/accounts-filing/${accountsFilingId}`;
            const packageTypeRequest = {
                packageType: packageType
            };
            const requestBody = mapping_1.default.snakeCaseKeys(packageTypeRequest);
            const headers = util_1.addRequestIdHeader(requestId);
            const resp = yield this.client.httpPut(url, requestBody, headers);
            // Needed due to javascripts switch block scoping rules
            let errorMessage = "";
            switch (resp.status) {
                case 204:
                    return new result_1.Success(undefined);
                case 404:
                    // The api only checks to see if a transaction with the given id exists. No such test is performed for the accountsFilingId.
                    errorMessage = `No transaction with id [${transactionId}] found`;
                    return new result_1.Failure(new Error(errorMessage));
                default:
                    var errorMessageData = {
                        httpStatusCode: resp.status,
                        transactionId,
                        accountsFilingId,
                        responseBody: resp.body
                    };
                    errorMessage = `An unknown error occured when setting accounts filing package type. ${JSON.stringify(errorMessageData, null, 2)}`;
                    return new result_1.Failure(new Error(errorMessage));
            }
        });
    }
}
exports.AccountsFilingService = AccountsFilingService;
/**
 * Type guard function to check if a given object conforms to the ApiErrorResponse interface.
 * This function performs structural validation by checking the existence and types of certain properties
 * expected in a standard ApiErrorResponse. It is used to determine if an arbitrary object can be treated
 * as an ApiErrorResponse, typically in error handling scenarios.
 *
 * @param object - The object to be checked. It can be any type, as the function will verify its structure.
 * @returns A boolean value indicating whether the object is an ApiErrorResponse. Returns true if the object
 *          has the expected structure of an ApiErrorResponse, false otherwise.
 *
 * The function checks for the following properties:
 * - httpStatusCode: Must exist and be of type number.
 * - errors: Must exist and be an array. Each item in the array must be an object with specific properties
 *   like 'error', 'errorValues', 'location', 'locationType', and 'type', each with appropriate types.
 */
function isApiErrorResponse(object) {
    if (object.hasOwnProperty("httpStatusCode") &&
        typeof object.httpStatusCode !== "number") {
        return false;
    }
    if (object.hasOwnProperty("errors")) {
        if (!Array.isArray(object.errors)) {
            return false;
        }
        for (const error of object.errors) {
            if (typeof error !== "object" || error === null) {
                return false;
            }
            if (error.hasOwnProperty("error") && typeof error.error !== "string") {
                return false;
            }
            if (error.hasOwnProperty("errorValues") &&
                typeof error.errorValues !== "object") {
                return false;
            }
            if (error.hasOwnProperty("location") &&
                typeof error.location !== "string") {
                return false;
            }
            if (error.hasOwnProperty("locationType") &&
                typeof error.locationType !== "string") {
                return false;
            }
            if (error.hasOwnProperty("type") && typeof error.type !== "string") {
                return false;
            }
        }
    }
    return true;
}
//# sourceMappingURL=service.js.map