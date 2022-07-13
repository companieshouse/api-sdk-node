import { IHttpClient } from "../../../http";
import { Checkout } from "./types";
import { ApiResponse, ApiResult } from "../../resource";
import { failure, success } from "../../result";
import Mapping from "../../../mapping/mapping";

export default class CheckoutService {
    private static readonly EXCLUDED_FIELDS = {
        deep: true,
        stopPaths: [
            "items.description_values", // all items
            "items.item_options.filing_history_description_values", // missing image delivery
            "items.item_options.filing_history_documents.filing_history_description_values" // certified copies
        ]
    };

    constructor (private readonly client: IHttpClient) { }

    public async getCheckout (checkoutId: string): Promise<ApiResult<ApiResponse<Checkout>>> {
        const serverResponse = await this.client.httpGet("/checkouts/" + checkoutId);

        if (serverResponse.error) {
            return failure({
                httpStatusCode: serverResponse.status,
                errors: [{
                    error: serverResponse.error
                }]
            });
        } else {
            return success({
                httpStatusCode: serverResponse.status,
                resource: Mapping.camelCaseKeys<Checkout>(serverResponse.body, CheckoutService.EXCLUDED_FIELDS)
            });
        }
    }
}
