import { IHttpClient } from "../../../http";
import { Checkout } from "./types";
import { ApiResponse, ApiResult } from "../../resource";
export default class CheckoutService {
    private readonly client;
    private static readonly EXCLUDED_FIELDS;
    constructor(client: IHttpClient);
    getCheckout(checkoutId: string): Promise<ApiResult<ApiResponse<Checkout>>>;
}
