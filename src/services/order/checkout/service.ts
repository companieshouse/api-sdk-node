import { IHttpClient } from "../../../http";
import { Checkout, CheckoutResource } from "./types";
import { ApiResult } from "../../../services/resource";
import { failure, success } from "../../../services/result";
import CheckoutMapping from "./mapping";

export default class CheckoutService {
    constructor (private readonly client: IHttpClient) { }

    public async getCheckout (checkoutId: string): Promise<ApiResult<Checkout>> {
        const resp = await this.client.httpGet("/checkouts/" + checkoutId);

        if (resp.error) {
            return failure({
                httpStatusCode: resp.status,
                errors: resp?.error?.errors || resp.error
            });
        }

        const body = resp.body as CheckoutResource;

        const result = CheckoutMapping.mapCheckoutResourceToCheckout(body);
        return success(result);
    }
}
