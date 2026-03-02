import { IHttpClient } from "../../http";
import Resource, { ApiErrorResponse } from "../resource";
import { AccountsFilingValidationRequest, AccountsFileValidationResponse, AccountsFilingCompanyResponse, PackageType, ConfirmCompanyRequest } from "./types";
import { Result } from "../result";
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
export declare class AccountsFilingService {
    private readonly client;
    /**
     * Constructs an AccountsFilingService instance.
     * @param client - The HTTP client for making requests.
     */
    constructor(client: IHttpClient);
    /**
     * This service will submit the required input from the web to confirm the company.
     * @param companyNumber The company number
     * @param transactionId The transaction Id
     * @returns the company response.
     */
    confirmCompany(companyNumber: string, transactionId: string, confirmCompanyRequest: ConfirmCompanyRequest, requestId?: string): Promise<Resource<AccountsFilingCompanyResponse>>;
    /**
     * Checks the validation status of an accounts file.
     * Calls the accounts filing api, which in turn calls the accounts validation service.
     * @param fileValidationRequest - The request details for file validation.
     * @returns A promise that resolves to the validation response or an error.
     */
    checkAccountsFileValidationStatus(fileValidationRequest: AccountsFilingValidationRequest): Promise<Resource<AccountsFileValidationResponse> | ApiErrorResponse>;
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
    private getFileValidationRequest;
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
    private processResponse;
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
    private handleUnexpectedStatus;
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
    private handleOkResponse;
    /**
     * Generates a standardized error response for the scenario where the requested file is not found.
     *
     * @param fileId - The unique identifier of the file that was not found.
     * @returns An ApiErrorResponse object with the HTTP status of NOT FOUND and an error message.
     */
    private fileNotFoundResponse;
    /**
     * Constructs an error response for situations where the file validation response is not of the expected type.
     *
     * @param fileId - The unique identifier of the file for which the validation response is incorrect.
     * @param response - The original HttpResponse object received from the file validation request.
     * @returns An ApiErrorResponse object encapsulating the actual HTTP status and a descriptive error message,
     *          including the response received for debugging purposes.
     */
    private invalidResponseType;
    /**
     * Generic error handling method to capture and process exceptions or errors encountered during
     * the file validation request process. Converts unhandled errors into a standardized API error response.
     *
     * @param error - The error or exception caught during the execution of the file validation request.
     * @returns An ApiErrorResponse object with the status of INTERNAL_SERVER_ERROR for unhandled errors,
     *          or the original ApiErrorResponse if the error is already in this format.
     */
    private handleError;
    setPackageType(transactionId: string, accountsFilingId: string, packageType: PackageType, requestId?: string): Promise<Result<void, Error>>;
}
