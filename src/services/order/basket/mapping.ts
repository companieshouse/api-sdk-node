import {
    Basket, BasketResource, BasketItem, BasketPatchRequest, BasketRequestResource,
    ItemUriPostRequest, ItemUriRequestResource, BasketItemResource, ItemCostsResource
} from "./types";

export default class BasketMapping {
    public static mapItemUriRequestToItemUriRequestResource (
        itemUriRequest: ItemUriPostRequest): ItemUriRequestResource {
        return {
            item_uri: itemUriRequest.itemUri
        };
    }

    public static mapItemUriResourceToItemUri (body: BasketItemResource): BasketItem {
        return {
            companyName: body.company_name,
            companyNumber: body.company_number,
            customerReference: body.customer_reference,
            description: body.description,
            descriptionIdentifier: body.description_identifier,
            descriptionValues: body.description_values,
            etag: body.etag,
            id: body.id,
            itemCosts: body.item_costs.map((i: ItemCostsResource) => ({
                calculatedCost: i?.calculated_cost,
                discountApplied: i?.discount_applied,
                itemCost: i?.item_cost,
                productType: i?.product_type
            })),
            //   item options not used
            itemOptions: body.item_options,
            itemUri: body.item_uri,
            kind: body.kind,
            links: {
                self: body.links.self
            },
            postageCost: body.postage_cost,
            postalDelivery: body.postal_delivery,
            quantity: body.quantity,
            totalItemCost: body.total_item_cost
        };
    }

    public static mapBasketRequestToBasketRequestResource (basketRequest: BasketPatchRequest): BasketRequestResource {
        return {
            delivery_details: {
                address_line_1: basketRequest.deliveryDetails.addressLine1,
                address_line_2: basketRequest.deliveryDetails.addressLine2,
                country: basketRequest.deliveryDetails.country,
                forename: basketRequest.deliveryDetails.forename,
                locality: basketRequest.deliveryDetails.locality,
                po_box: basketRequest.deliveryDetails.poBox,
                postal_code: basketRequest.deliveryDetails.postalCode,
                region: basketRequest.deliveryDetails.region,
                surname: basketRequest.deliveryDetails.surname
            }
        };
    }
}
