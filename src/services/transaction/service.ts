import { IHttpClient } from "../../http";
import {
    Transaction, TransactionResource

} from "./types";
import Resource from "../resource";

export default class TransactionService {
    constructor (private readonly client: IHttpClient) { }

    /**
   * Post a transaction.
   *
   * @param transaction the transaction to create
   */
    public async postTransaction (transaction: Transaction): Promise<Resource<Transaction>> {
        let url = "/transactions"
        if (transaction.id) {
            url += "/" + transaction.id
        }

        const resp = await this.client.httpPost(url);

        const resource: Resource<Transaction> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

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
