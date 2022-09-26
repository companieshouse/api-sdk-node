import { IHttpClient } from "../../../http";
import { failure, Result, success } from "../../../services/result";
import Mapping from "../../../mapping/mapping";
import {Checkout, CheckoutResource} from "../checkout";

export type CheckoutItemErrorResponse = {
    httpStatusCode?: number;
    error?: string;
};

export default class CheckoutItemService {
    private static readonly EXCLUDED_FIELDS = {
        deep: true,
        stopPaths: [
            "items.description_values", // all items
            "items.item_options.filing_history_description_values", // missing image delivery
            "items.item_options.filing_history_documents.filing_history_description_values" // certified copies
        ]
    };

    constructor (private readonly client: IHttpClient) { }

    public async getCheckoutItem (orderId: string, itemId: string): Promise<Result<Checkout, CheckoutItemErrorResponse>> {
        const resp = await this.client.httpGet(`/checkouts/${orderId}/items/${itemId}`);

        if (resp.error) {
            return failure({
                httpStatusCode: resp.status,
                error: resp.error?.error
            });
        }

        const body = resp.body as CheckoutResource;

        if (body.items.length !== 1) {
            return failure({
                httpStatusCode: resp.status,
                error: "Expected checkout returned by api to have exactly one embedded item."
            })
        }

        const result: Checkout = Mapping.camelCaseKeys(body, CheckoutItemService.EXCLUDED_FIELDS);

        return success(result);
    }
}
