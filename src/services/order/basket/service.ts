import { IHttpClient } from "../../../http";
import {
    Basket, BasketResource, BasketRequestResource, BasketPatchRequest,
    ItemUriPostRequest, CheckoutResource, Checkout
} from "./types";
import Resource, { ApiResponse, ApiResult } from "../../../services/resource";
import { failure, success } from "../../../services/result";
import Mapping from "../../../mapping/mapping";
import { Item, ItemResource } from "../order";

export default class BasketService {
    private static readonly EXCLUDED_FIELDS_FULL_BASKET = {
        deep: true,
        stopPaths: [
            "items.description_values", // all items
            "items.item_options.filing_history_description_values", // missing image delivery
            "items.item_options.filing_history_documents.filing_history_description_values" // certified copies
        ]
    };

    private static readonly EXCLUDED_FIELDS_SINGLE_ITEM_BASKET = {
        deep: true,
        stopPaths: [
            "description_values", // all items
            "item_options.filing_history_description_values", // missing image delivery
            "item_options.filing_history_documents.filing_history_description_values" // certified copies
        ]
    };

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

        resource.resource = Mapping.camelCaseKeys<Basket>(body, BasketService.EXCLUDED_FIELDS_FULL_BASKET);
        return resource;
    }

    public async patchBasket (basketRequest: BasketPatchRequest): Promise<Resource<Basket>> {
        const basketRequestResource: BasketRequestResource = Mapping.snakeCaseKeys(basketRequest);

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

        resource.resource = Mapping.camelCaseKeys<Basket>(body, BasketService.EXCLUDED_FIELDS_FULL_BASKET);
        return resource;
    }

    public async postItemToBasket (itemUriRequest: ItemUriPostRequest): Promise<Resource<Item>> {
        const itemUriRequestResource = Mapping.snakeCaseKeys(itemUriRequest);

        const resp = await this.client.httpPost("/basket/items", itemUriRequestResource);

        const resource: Resource<Item> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        const body = resp.body as ItemResource;

        resource.resource = Mapping.camelCaseKeys<Item>(body, BasketService.EXCLUDED_FIELDS_SINGLE_ITEM_BASKET);
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

        result.resource = Mapping.camelCaseKeys(body, BasketService.EXCLUDED_FIELDS_FULL_BASKET);

        return success(result);
    }
}
