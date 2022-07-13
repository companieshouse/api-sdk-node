import { IHttpClient } from "../../../http";
import { Order, OrderResource } from "./types";
import { ApiResult } from "../../../services/resource";
import { failure, success } from "../../../services/result";
import Mapping from "../../../mapping/mapping";

export default class OrderService {
    private static readonly EXCLUDED_FIELDS = {
        deep: true,
        stopPaths: [
            "items.description_values", // all items
            "items.item_options.filing_history_description_values", // missing image delivery
            "items.item_options.filing_history_documents.filing_history_description_values" // certified copies
        ]
    };

    constructor (private readonly client: IHttpClient) { }

    public async getOrder (orderId: string): Promise<ApiResult<Order>> {
        const resp = await this.client.httpGet("/orders/" + orderId);

        if (resp.error) {
            return failure({
                httpStatusCode: resp.status,
                errors: resp?.error?.errors || resp.error
            });
        }

        const body = resp.body as OrderResource;

        const result: Order = Mapping.camelCaseKeys(body, OrderService.EXCLUDED_FIELDS);
        return success(result);
    }
}
