import { BasketItem, BasketPatchRequest, BasketRequestResource, ItemUriPostRequest, ItemUriRequestResource, BasketItemResource } from "./types";
export default class BasketMapping {
    static mapItemUriRequestToItemUriRequestResource(itemUriRequest: ItemUriPostRequest): ItemUriRequestResource;
    static mapItemUriResourceToItemUri(body: BasketItemResource): BasketItem;
    static mapBasketRequestToBasketRequestResource(basketRequest: BasketPatchRequest): BasketRequestResource;
}
