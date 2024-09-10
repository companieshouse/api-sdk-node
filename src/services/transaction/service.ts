import { IHttpClient } from "../../http";
import { Transaction, TransactionResource, TransactionList } from "./types";
import Resource, { ApiErrorResponse, ApiResponse } from "../resource";
import { addRequestIdHeader } from "../../util";

export default class TransactionService {
    constructor (private readonly client: IHttpClient) { }

    /**
   * Post a transaction.
   *
   * @param transaction the transaction to create
   */
    public async postTransaction (transaction: Transaction, requestId?: string): Promise<Resource<Transaction>|ApiErrorResponse> {
        let url = "/transactions"
        if (transaction.id) {
            url += "/" + transaction.id
        }

        const transactionResource: TransactionResource = this.mapToResource(transaction);

        const headers = addRequestIdHeader(requestId);
        const resp = await this.client.httpPost(url, transactionResource, headers);

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
     * @param {Transaction} transaction The transaction object to be updated
     * @param {string} [requestId] Optional unique identifier for the request used for correlating logs between services
     * @returns {Promise<ApiResponse<Transaction> | ApiErrorResponse>} A promise resolving to the transaction update response
     */
    public async putTransaction (transaction: Transaction, requestId?: string): Promise<ApiResponse<Transaction> | ApiErrorResponse> {
        const url = "/transactions/" + transaction.id

        const headers = addRequestIdHeader(requestId);

        const transactionResource: TransactionResource = this.mapToResource(transaction);
        const resp = await this.client.httpPut(url, transactionResource, headers);

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

        return resource;
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
            description: body.description,
            resources: body.resources
        };
    }

    /**
     * Get a transaction.
     *
     * @param transactionId the id of the transaction to retrieve
     */
    public async getTransaction (transactionId: string, requestId?: string): Promise<Resource<Transaction>|ApiErrorResponse> {
        const url = "/transactions/" + transactionId
        const headers = addRequestIdHeader(requestId);
        const resp = await this.client.httpGet(url, headers);

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
            description: body.description,
            resources: body.resources
        }
        return resource;
    }

    /**
     * Patch a transaction.
     *
     * @param transactionId the ID of the transaction to update
     * @param transactionResource the partial transaction resource with updates
     */
    public async patchTransaction (transactionId: string, transactionResource: Partial<TransactionResource>, requestId?: string): Promise<Resource<Transaction> | ApiErrorResponse> {
        const url = `/transactions/${transactionId}`;
        const headers = addRequestIdHeader(requestId);
        const resp = await this.client.httpPatch(url, transactionResource, headers);

        if (resp.error) {
            return {
                httpStatusCode: resp.status,
                errors: [resp.error]
            };
        }

        const resource: Resource<Transaction> = {
            httpStatusCode: resp.status
        };

        const body = resp.body as TransactionResource;

        this.populateResource(resource, body);

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
            resources: transaction.resources,
            status: transaction.status,
            updated_at: transaction.updatedAt
        }
    }

    public async getTransactionsForResourceKind (requestId?: string, resourceKind?: string): Promise<Resource<TransactionList>|ApiErrorResponse> {
        const url = "/transactions/?resource_kind=" + resourceKind;
        const headers = addRequestIdHeader(requestId);
        const resp = await this.client.httpGet(url, headers);

        if (resp.error) {
            return {
                httpStatusCode: resp.status,
                errors: [resp.error]
            };
        }

        const resource: Resource<TransactionList> = {
            httpStatusCode: resp.status
        };

        resource.resource = {
            etag: resp.body.etag,
            itemsPerPage: resp.body.items_per_page,
            startIndex: resp.body.start_index,
            totalResults: resp.body.total_results,
            items: resp.body.items ? resp.body.items.map((i) => ({
                id: i.id,
                etag: i.etag,
                links: i.links,
                reference: i.reference,
                status: i.status,
                kind: i.kind,
                companyName: i.company_name,
                companyNumber: i.company_number,
                createdAt: i.created_at,
                createdBy: i.created_by,
                updatedAt: i.updated_at,
                description: i.description,
                resources: i.resources
            })) : []
        };
        return resource;
    }
}
