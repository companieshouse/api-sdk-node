import { PenaltyList } from "./types";
import { IHttpClient } from "../../http";
import Resource from "../resource";

export default class {
    constructor (private readonly client: IHttpClient) { }

    /**
   * Get a list of penalties for a company.
   *
   * @param companyNumber the company number
   */
    public async getPenalties (companyNumber: string): Promise<Resource<PenaltyList>> {
        const resp = await this.client.httpGet(`/company/${companyNumber}/penalties/late-filing`);
        const resource: Resource<PenaltyList> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        resource.resource = {
            etag: resp.body.etag,
            itemsPerPage: resp.body.items_per_page,
            startIndex: resp.body.start_index,
            totalResults: resp.body.total_results,
            items: resp.body.items.map((i) => ({
                id: i.id,
                etag: i.etag,
                kind: i.kind,
                isDCA: i.is_dca,
                isPaid: i.is_paid,
                dueDate: i.due_date,
                madeUpDate: i.made_up_date,
                transactionDate: i.transaction_date,
                originalAmount: i.original_amount,
                outstandingAmount: i.outstanding,
                type: i.type
            }))
        };

        return resource;
    }
}
