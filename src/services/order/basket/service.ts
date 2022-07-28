import { IHttpClient } from "../../../http";
import {
    Basket,
    BasketLinks,
    BasketLinksResource,
    BasketPatchRequest,
    BasketRequestResource,
    BasketResource,
    Checkout,
    CheckoutResource,
    ItemUriRequest
} from "./types";
import Resource, { ApiResponse, ApiResult } from "../../../services/resource";
import { failure, success } from "../../result";
import Mapping from "../../../mapping/mapping";
import { Item, ItemResource } from "../order";
import BasketMapping from "./mapping";

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
        const basketRequestResource: BasketRequestResource = BasketMapping.mapBasketRequestToBasketRequestResource(basketRequest);

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

    public async postItemToBasket (itemUriRequest: ItemUriRequest): Promise<Resource<Item>> {
        return await this.addItemToBasket("/basket/items", itemUriRequest);
    }

    public async appendItemToBasket (itemUriRequest: ItemUriRequest): Promise<Resource<Item>> {
        return await this.addItemToBasket("/basket/items/append", itemUriRequest);
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

    public async getBasketLinks (): Promise<Resource<BasketLinks>> {
        const resp = await this.client.httpGet("/basket/links");

        const resource: Resource<BasketLinks> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        const body = resp.body as BasketLinksResource;

        resource.resource = Mapping.camelCaseKeys<BasketLinks>(body);
        return resource;
    }

    public async removeBasketItem (itemUriRequest: ItemUriRequest): Promise<Resource<any>> {
        const itemUriRequestResource = Mapping.snakeCaseKeys(itemUriRequest);
        const response = await this.client.httpPut("/basket/items/remove", itemUriRequestResource);

        return {
            httpStatusCode: response.status
        };
    }

    private async addItemToBasket (path: string, itemUriRequest: ItemUriRequest): Promise<Resource<Item>> {
        const itemUriRequestResource = Mapping.snakeCaseKeys(itemUriRequest);

        const resp = await this.client.httpPost(path, itemUriRequestResource);

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
}
