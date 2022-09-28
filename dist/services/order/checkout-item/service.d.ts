import { IHttpClient } from "../../../http";
import { Result } from "../../../services/result";
import { Item } from "../order";
export declare type CheckoutItemErrorResponse = {
    httpStatusCode?: number;
    error?: string;
};
export default class CheckoutItemService {
    private readonly client;
    private static readonly EXCLUDED_FIELDS;
    constructor(client: IHttpClient);
    getCheckoutItem(orderId: string, itemId: string): Promise<Result<Item, CheckoutItemErrorResponse>>;
}