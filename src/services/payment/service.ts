import { HttpResponse, IHttpClient } from "../../http";
import { ApiResult, ApiResponse } from "../resource";
import { CreatePaymentRequest, Payment, CreatePaymentRequestResource, PaymentResource } from "./types";
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
        const resp = await this.client.httpGet(paymentResourceUri)

        return this.handlePaymentHttpResponse(resp)
    }

    private async createPaymentHandler (createPaymentRequest: CreatePaymentRequest, path: string):
    Promise<ApiResult<ApiResponse<Payment>>> {
        const createPaymentRequestResource: CreatePaymentRequestResource =
      Mapping.snakeCaseKeys<CreatePaymentRequestResource>(createPaymentRequest);

        const resp = await this.client.httpPost(path, createPaymentRequestResource);

        return this.handlePaymentHttpResponse(resp);
    }

    private handlePaymentHttpResponse(resp: HttpResponse): ApiResult<ApiResponse<Payment>> {
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

        const body = resp.body as PaymentResource;

        response.resource = Mapping.camelCaseKeys<Payment>(body);
        return success(response);
    }
}
