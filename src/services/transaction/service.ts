import { IHttpClient } from "../../http";
import { Transaction, TransactionResource } from "./types";
import Resource, { ApiErrorResponse, ApiResponse } from "../resource";

export default class TransactionService {
    constructor (private readonly client: IHttpClient) { }

    /**
   * Post a transaction.
   *
   * @param transaction the transaction to create
   */
    public async postTransaction (transaction: Transaction): Promise<Resource<Transaction>|ApiErrorResponse> {
        let url = "/transactions"
        if (transaction.id) {
            url += "/" + transaction.id
        }

        const transactionResource: TransactionResource = this.mapToResource(transaction);

        const resp = await this.client.httpPost(url, transactionResource);

        if (resp.error) {
            return {
                httpStatusCode: resp.status,
                errors: [resp.error]
            };
        }

        const resource: Resource<Transaction> = {
            httpStatusCode: resp.status
        };

        // cast the response body to the expected type
        const body = resp.body as TransactionResource;

        this.populateResource(resource, body);

        return resource;
    }

    /**
     * Put a transaction
     *
     * @param replacment transaction
     */
    public async putTransaction (transaction: Transaction): Promise<ApiResponse<Transaction>|ApiErrorResponse> {
        if (transaction.id) {
            const url = "/transactions/" + transaction.id

            const transactionResource: TransactionResource = this.mapToResource(transaction);
            const resp = await this.client.httpPut(url, transactionResource);

            if (resp.error) {
                return {
                    httpStatusCode: resp.status,
                    errors: [resp.error]
                };
            }

            const resource: ApiResponse<Transaction> = {
                headers: resp.headers,
                httpStatusCode: resp.status
            };

            // cast the response body to the expected type
            const body: TransactionResource = resp.body as TransactionResource;

            this.populateResource(resource, body);

            return resource;
        }

        return {
            httpStatusCode: 400,
            errors: [{ error: "Cannot update transaction - id not found" }]
        };
    }

    private populateResource (resource:Resource<Transaction>, body:TransactionResource) {
        resource.resource = {
            id: body.id,
            etag: body.etag,
            links: body.links,
            reference: body.reference,
            status: body.status,
            kind: body.kind,
            companyName: body.company_name,
            companyNumber: body.company_number,
            createdAt: body.created_at,
            createdBy: body.created_by,
            updatedAt: body.updated_at,
            description: body.description
        };
    }

    /**
     * Get a transaction.
     *
     * @param transactionId the id of the transaction to retrieve
     */
    public async getTransaction (transactionId: string): Promise<Resource<Transaction>|ApiErrorResponse> {
        const url = "/transactions/" + transactionId
        const resp = await this.client.httpGet(url);

        if (resp.error) {
            return {
                httpStatusCode: resp.status,
                errors: [resp.error]
            };
        }

        const resource: Resource<Transaction> = {
            httpStatusCode: resp.status
        };

        // cast the response body to the expected type
        const body = resp.body as TransactionResource;

        resource.resource = {
            id: body.id,
            etag: body.etag,
            links: body.links,
            reference: body.reference,
            status: body.status,
            kind: body.kind,
            companyName: body.company_name,
            companyNumber: body.company_number,
            createdAt: body.created_at,
            createdBy: body.created_by,
            updatedAt: body.updated_at,
            description: body.description
        }
        return resource;
    }

    private mapToResource (transaction:Transaction):TransactionResource {
        return {
            company_name: transaction.companyName,
            company_number: transaction.companyNumber,
            created_at: transaction.createdAt,
            created_by: transaction.createdBy,
            description: transaction.description,
            etag: transaction.etag,
            id: transaction.id,
            kind: transaction.kind,
            links: transaction.links,
            reference: transaction.reference,
            status: transaction.status,
            updated_at: transaction.updatedAt
        }
    }
}
