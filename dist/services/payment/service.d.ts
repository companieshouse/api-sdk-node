import { IHttpClient } from "../../http";
import { ApiResult, ApiResponse } from "../resource";
import { CreatePaymentRequest, Payment } from "./types";
export default class PaymentService {
    private readonly client;
    constructor(client: IHttpClient);
    /**
   * Begins a new payment session.
   *
   * @param createPaymentRequest a create payment request
   */
    createPayment(createPaymentRequest: CreatePaymentRequest): Promise<ApiResult<ApiResponse<Payment>>>;
    /**
   * Begins a new payment session.
   * use this if full url is set as baseUrl (usually retrieved from X-Payment-Required header)
   * @param createPaymentRequest a create payment request
   */
    createPaymentWithFullUrl(createPaymentRequest: CreatePaymentRequest): Promise<ApiResult<ApiResponse<Payment>>>;
    /**
   * Retrieves a payment session.
   *
   * @param paymentResourceUri the desired payment session's URI
   */
    getPayment(paymentResourceUri: string): Promise<ApiResult<ApiResponse<Payment>>>;
    private createPaymentHandler;
    private handlePaymentHttpResponse;
}
