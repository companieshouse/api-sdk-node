import { IHttpClient } from "../../../http";
import { Basket, BasketLinks, BasketPatchRequest, Checkout, ItemUriRequest } from "./types";
import Resource, { ApiResponse, ApiResult } from "../../../services/resource";
import { Item } from "../order";
export default class BasketService {
    private readonly client;
    private static readonly EXCLUDED_FIELDS_FULL_BASKET;
    private static readonly EXCLUDED_FIELDS_SINGLE_ITEM_BASKET;
    constructor(client: IHttpClient);
    getBasket(): Promise<Resource<Basket>>;
    patchBasket(basketRequest: BasketPatchRequest): Promise<Resource<Basket>>;
    postItemToBasket(itemUriRequest: ItemUriRequest): Promise<Resource<Item>>;
    appendItemToBasket(itemUriRequest: ItemUriRequest): Promise<Resource<Item>>;
    checkoutBasket(): Promise<ApiResult<ApiResponse<Checkout>>>;
    getBasketLinks(): Promise<Resource<BasketLinks>>;
    removeBasketItem(itemUriRequest: ItemUriRequest): Promise<Resource<any>>;
    private addItemToBasket;
}
