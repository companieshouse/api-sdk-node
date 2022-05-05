import { IHttpClient } from "../../../http";
import { Checkout } from "./types";
import { ApiResponse, ApiResult } from "../../resource";
import { failure, success } from "../../result";
import Mapping from "../../../mapping/mapping";

export default class CheckoutService {
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
                resource: Mapping.camelCaseKeys<Checkout>(serverResponse.body)
            });
        }
    }
}
