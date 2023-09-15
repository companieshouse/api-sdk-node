import { IHttpClient } from "../../http";
import { Transaction } from "./types";
import Resource, { ApiErrorResponse, ApiResponse } from "../resource";
export default class TransactionService {
    private readonly client;
    constructor(client: IHttpClient);
    /**
   * Post a transaction.
   *
   * @param transaction the transaction to create
   */
    postTransaction(transaction: Transaction): Promise<Resource<Transaction> | ApiErrorResponse>;
    /**
     * Put a transaction
     *
     * @param replacment transaction
     */
    putTransaction(transaction: Transaction): Promise<ApiResponse<Transaction> | ApiErrorResponse>;
    private populateResource;
    /**
     * Get a transaction.
     *
     * @param transactionId the id of the transaction to retrieve
     */
    getTransaction(transactionId: string): Promise<Resource<Transaction> | ApiErrorResponse>;
    private mapToResource;
}
