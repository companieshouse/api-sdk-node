import { IHttpClient } from "../../http";
import { Transaction, TransactionResource } from "./types";
import Resource, { ApiErrorResponse, ApiResponse } from "../resource";
export default class TransactionService {
    private readonly client;
    constructor(client: IHttpClient);
    /**
   * Post a transaction.
   *
   * @param transaction the transaction to create
   */
    postTransaction(transaction: Transaction, requestId?: string): Promise<Resource<Transaction> | ApiErrorResponse>;
    /**
     * Put a transaction
     *
     * @param {Transaction} transaction The transaction object to be updated
     * @param {string} [requestId] Optional unique identifier for the request used for correlating logs between services
     * @returns {Promise<ApiResponse<Transaction> | ApiErrorResponse>} A promise resolving to the transaction update response
     */
    putTransaction(transaction: Transaction, requestId?: string): Promise<ApiResponse<Transaction> | ApiErrorResponse>;
    private populateResource;
    /**
     * Get a transaction.
     *
     * @param transactionId the id of the transaction to retrieve
     */
    getTransaction(transactionId: string, requestId?: string): Promise<Resource<Transaction> | ApiErrorResponse>;
    /**
     * Patch a transaction.
     *
     * @param transactionId the ID of the transaction to update
     * @param transactionResource the partial transaction resource with updates
     */
    patchTransaction(transactionId: string, transactionResource: Partial<TransactionResource>, requestId?: string): Promise<Resource<Transaction> | ApiErrorResponse>;
    private mapToResource;
}
