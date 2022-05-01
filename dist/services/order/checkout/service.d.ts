import { IHttpClient } from "../../../http";
import { Checkout } from "./types";
import Resource from "../../resource";
export default class CheckoutService {
    private readonly client;
    constructor(client: IHttpClient);
    getCheckout(checkoutId: string): Promise<Resource<Checkout>>;
}
