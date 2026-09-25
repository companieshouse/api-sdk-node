import { HttpResponse, IHttpClient } from "../../http";
import { ApiResult, ApiResponse } from "../resource";
import { CreatePaymentRequest, Payment, PaymentResource } from "./types";
import Mapping from "../../mapping/mapping";
import { failure, success } from "../../services/result";

export default class PaymentService {
    constructor (private readonly client: IHttpClient) { }

    /**
   * Begins a new payment session.
   *
   * @param createPaymentRequest a create payment request
   */
    public async createPayment (createPaymentRequest: CreatePaymentRequest):
    Promise<ApiResult<ApiResponse<Payment>>> {
        return this.createPaymentHandler(createPaymentRequest, "/payments");
    }

    /**
   * Begins a new payment session.
   * use this if full url is set as baseUrl (usually retrieved from X-Payment-Required header)
   * @param createPaymentRequest a create payment request
   * @deprecated Use {@link createPayment} instead. This method was a workaround for the absence of a
   * dedicated payment HTTP client. Now that `PaymentService` uses its own client with the correct
   * base URL (`PAYMENTS_API_URL`), callers should use `createPayment` which appends `/payments`.
   */
    public async createPaymentWithFullUrl (createPaymentRequest: CreatePaymentRequest):
    Promise<ApiResult<ApiResponse<Payment>>> {
        return this.createPaymentHandler(createPaymentRequest, "");
    }

    /**
   * Retrieves a payment session.
   *
   * @param paymentResourceUri the desired payment session's URI
   */
    public async getPayment (paymentResourceUri: string):
    Promise<ApiResult<ApiResponse<Payment>>> {
        const resp: HttpResponse = await this.client.httpGet(paymentResourceUri)

        return this.handlePaymentHttpResponse(resp)
    }

    private async createPaymentHandler (createPaymentRequest: CreatePaymentRequest, path: string):
    Promise<ApiResult<ApiResponse<Payment>>> {
        const createPaymentRequestResource =
      Mapping.snakeCaseKeys(createPaymentRequest);

        const resp: HttpResponse = await this.client.httpPost(path, createPaymentRequestResource);

        return this.handlePaymentHttpResponse(resp);
    }

    private handlePaymentHttpResponse (resp: HttpResponse): ApiResult<ApiResponse<Payment>> {
        const response: ApiResponse<Payment> = {
            httpStatusCode: resp.status,
            headers: resp.headers
        };

        if (resp.error) {
            return failure({
                httpStatusCode: resp.status,
                errors: resp?.error?.errors || resp.error
            });
        }

        const body: PaymentResource = resp.body;

        response.resource = Mapping.camelCaseKeys<Payment>(body);
        return success(response);
    }
}
