import { IHttpClient } from "../../../http";
import {
    Basket, BasketResource, BasketRequestResource, BasketPatchRequest, BasketItem,
    ItemUriPostRequest, ItemUriRequestResource, BasketItemResource, CheckoutResource, Checkout
} from "./types";
import Resource, { ApiResponse, ApiResult } from "../../../services/resource";
import BasketMapping from "./mapping";
import { failure, success } from "../../../services/result";
import Mapping from "../../../mapping/mapping";

export default class BasketService {
    constructor (private readonly client: IHttpClient) { }

    public async getBasket (): Promise<Resource<Basket>> {
        const resp = await this.client.httpGet("/basket");

        const resource: Resource<Basket> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        const body = resp.body as BasketResource;

        resource.resource = Mapping.camelCaseKeys<Basket>(body);
        return resource;
    }

    public async patchBasket (basketRequest: BasketPatchRequest): Promise<Resource<Basket>> {
        const basketRequestResource: BasketRequestResource =
        BasketMapping.mapBasketRequestToBasketRequestResource(basketRequest);

        const additionalHeaders = {
            "Content-Type": "application/merge-patch+json"
        };
        const resp = await this.client.httpPatch("/basket", basketRequestResource, additionalHeaders);

        const resource: Resource<Basket> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        const body = resp.body as BasketResource;

        resource.resource = Mapping.camelCaseKeys<Basket>(body);
        return resource;
    }

    public async postItemToBasket (itemUriRequest: ItemUriPostRequest): Promise<Resource<BasketItem>> {
        const itemUriRequestResource: ItemUriRequestResource =
            BasketMapping.mapItemUriRequestToItemUriRequestResource(itemUriRequest);

        const resp = await this.client.httpPost("/basket/items", itemUriRequestResource);

        const resource: Resource<BasketItem> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        const body = resp.body as BasketItemResource;

        resource.resource = BasketMapping.mapItemUriResourceToItemUri(body);
        return resource;
    }

    public async checkoutBasket (): Promise<ApiResult<ApiResponse<Checkout>>> {
        const resp = await this.client.httpPost("/basket/checkouts");

        const result: ApiResponse<Checkout> = {
            httpStatusCode: resp.status,
            headers: resp.headers
        };

        if (resp.error) {
            return failure({
                httpStatusCode: resp.status,
                errors: resp?.error?.errors || resp.error
            });
        }

        const body = resp.body as CheckoutResource;

        result.resource = {
            checkedOutBy: {
                email: body.checked_out_by.email,
                id: body.checked_out_by.id
            },
            deliveryDetails: {
                addressLine1: body.delivery_details?.address_line_1,
                addressLine2: body.delivery_details?.address_line_2,
                country: body.delivery_details?.country,
                forename: body.delivery_details?.forename,
                locality: body.delivery_details?.locality,
                poBox: body.delivery_details?.po_box,
                postalCode: body.delivery_details?.postal_code,
                region: body.delivery_details?.region,
                surname: body.delivery_details?.surname
            },
            etag: body.etag,
            items: body.items,
            kind: body.kind,
            links: {
                payment: body.links.payment,
                self: body.links.self
            },
            paidAt: body.paid_at,
            paymentReference: body.payment_reference,
            reference: body.reference,
            status: body.status,
            totalOrderCost: body.total_order_cost
        };
        return success(result);
    }
}
