import { IHttpClient } from "../../../http";
import { failure, Result, success } from "../../../services/result";
import Mapping from "../../../mapping/mapping";
import { Item, ItemResource } from "../order";

export type OrderItemErrorResponse = {
    httpStatusCode?: number;
    error?: string;
};

export default class OrderItemService {
    private static readonly EXCLUDED_FIELDS = {
        deep: true,
        stopPaths: [
            "description_values", // all items
            "item_options.filing_history_description_values", // missing image delivery
            "item_options.filing_history_documents.filing_history_description_values" // certified copies
        ]
    };

    constructor (private readonly client: IHttpClient) { }

    public async getOrderItem (orderId: string, itemId: string): Promise<Result<Item, OrderItemErrorResponse>> {
        const resp = await this.client.httpGet(`/orders/${orderId}/items/${itemId}`);

        if (resp.error) {
            return failure({
                httpStatusCode: resp.status,
                error: resp.error?.error
            });
        }

        const body = resp.body as ItemResource;

        const result: Item = Mapping.camelCaseKeys(body, OrderItemService.EXCLUDED_FIELDS);
        return success(result);
    }
}
