import { IHttpClient } from "../../../http";
import { Order, OrderResource } from "./types";
import { ApiResult } from "../../../services/resource";
import { failure, success } from "../../../services/result";
import OrderMapping from "./mapping";

export default class OrderService {
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

        const result = OrderMapping.mapOrderResourceToOrder(body);
        return success(result);
    }
}
