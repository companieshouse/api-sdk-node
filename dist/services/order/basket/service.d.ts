import { IHttpClient } from "../../../http";
import { Basket, BasketPatchRequest, BasketItem, ItemUriPostRequest, Checkout } from "./types";
import Resource, { ApiResponse, ApiResult } from "../../../services/resource";
export default class BasketService {
    private readonly client;
    constructor(client: IHttpClient);
    getBasket(): Promise<Resource<Basket>>;
    patchBasket(basketRequest: BasketPatchRequest): Promise<Resource<Basket>>;
    postItemToBasket(itemUriRequest: ItemUriPostRequest): Promise<Resource<BasketItem>>;
    checkoutBasket(): Promise<ApiResult<ApiResponse<Checkout>>>;
}
