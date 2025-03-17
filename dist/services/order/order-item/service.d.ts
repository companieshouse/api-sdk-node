import { IHttpClient } from "../../../http";
import { Result } from "../../../services/result";
import { Item } from "../order";
export declare type OrderItemErrorResponse = {
    httpStatusCode?: number;
    error?: string;
};
export default class OrderItemService {
    private readonly client;
    private static readonly EXCLUDED_FIELDS;
    constructor(client: IHttpClient);
    getOrderItem(orderId: string, itemId: string): Promise<Result<Item, OrderItemErrorResponse>>;
}
