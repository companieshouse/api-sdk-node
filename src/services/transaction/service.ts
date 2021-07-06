import { IHttpClient } from "../../http";
import { Transaction, TransactionResource } from "./types";
import Resource, { ApiErrorResponse } from "../resource";

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

        const resp = await this.client.httpPost(url, transaction);

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
}
