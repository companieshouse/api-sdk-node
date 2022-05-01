import { IHttpClient } from "../../../http";
import { Order } from "./types";
import { ApiResult } from "../../../services/resource";
export default class OrderService {
    private readonly client;
    constructor(client: IHttpClient);
    getOrder(orderId: string): Promise<ApiResult<Order>>;
}
