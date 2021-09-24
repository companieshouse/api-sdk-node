import { IHttpClient } from "../../../http";
import { Checkout, CheckoutResource } from "./types";
import Resource from "../../resource";
import CheckoutMapping from "./mapping";

export default class CheckoutService {
    constructor (private readonly client: IHttpClient) { }

    public async getCheckout (checkoutId: string): Promise<Resource<Checkout>> {
        const resp = await this.client.httpGet("/checkouts/" + checkoutId);

        const resource: Resource<Checkout> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        const body = resp.body as CheckoutResource;

        resource.resource = CheckoutMapping.mapCheckoutResourceToCheckout(body);
        return resource;
    }
}
