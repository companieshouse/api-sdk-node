"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BasketMapping {
    static mapItemUriRequestToItemUriRequestResource(itemUriRequest) {
        return {
            item_uri: itemUriRequest.itemUri
        };
    }
    static mapItemUriResourceToItemUri(body) {
        return {
            companyName: body.company_name,
            companyNumber: body.company_number,
            customerReference: body.customer_reference,
            description: body.description,
            descriptionIdentifier: body.description_identifier,
            descriptionValues: body.description_values,
            etag: body.etag,
            id: body.id,
            itemCosts: body.item_costs.map((i) => ({
                calculatedCost: i === null || i === void 0 ? void 0 : i.calculated_cost,
                discountApplied: i === null || i === void 0 ? void 0 : i.discount_applied,
                itemCost: i === null || i === void 0 ? void 0 : i.item_cost,
                productType: i === null || i === void 0 ? void 0 : i.product_type
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
    static mapBasketRequestToBasketRequestResource(basketRequest) {
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
exports.default = BasketMapping;
//# sourceMappingURL=mapping.js.map