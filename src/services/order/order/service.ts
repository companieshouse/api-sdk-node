import { IHttpClient } from "../../../http";
import { Order, OrderResource } from "./types";
import {failure, Result, success} from "../../../services/result";
import Mapping from "../../../mapping/mapping";

export type OrderErrorResponse = {
    httpStatusCode?: number;
    error?: string;
};

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

    public async getOrder (orderId: string): Promise<Result<Order, OrderErrorResponse>> {
        const resp = await this.client.httpGet("/orders/" + orderId);

        if (resp.error) {
            return failure({
                httpStatusCode: resp.status,
                error: resp.error?.error
            });
        }

        const body = resp.body as OrderResource;

        const result: Order = Mapping.camelCaseKeys(body, OrderService.EXCLUDED_FIELDS);
        return success(result);
    }
}
