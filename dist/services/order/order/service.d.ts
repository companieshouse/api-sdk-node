import { IHttpClient } from "../../../http";
import { Order } from "./types";
import { Result } from "../../../services/result";
export declare type OrderErrorResponse = {
    httpStatusCode?: number;
    error?: string;
};
export default class OrderService {
    private readonly client;
    private static readonly EXCLUDED_FIELDS;
    constructor(client: IHttpClient);
    getOrder(orderId: string): Promise<Result<Order, OrderErrorResponse>>;
}
