import { IHttpClient } from "../../../http";
import { failure, Result, success } from "../../../services/result";
import Mapping from "../../../mapping/mapping";
import { Item, ItemResource } from "../order";

export type CheckoutItemErrorResponse = {
    httpStatusCode?: number;
    error?: string;
};

export default class CheckoutItemService {
    private static readonly EXCLUDED_FIELDS = {
        deep: true,
        stopPaths: [
            "description_values", // all items
            "item_options.filing_history_description_values", // missing image delivery
            "item_options.filing_history_documents.filing_history_description_values" // certified copies
        ]
    };

    constructor (private readonly client: IHttpClient) { }

    public async getCheckoutItem (orderId: string, itemId: string): Promise<Result<Item, CheckoutItemErrorResponse>> {
        const resp = await this.client.httpGet(`/checkouts/${orderId}/items/${itemId}`);

        if (resp.error) {
            return failure({
                httpStatusCode: resp.status,
                error: resp.error?.error
            });
        }

        const body = resp.body as ItemResource;

        const result: Item = Mapping.camelCaseKeys(body, CheckoutItemService.EXCLUDED_FIELDS);
        return success(result);
    }
}
