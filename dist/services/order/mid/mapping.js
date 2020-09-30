"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MidMapping {
    static mapMidItemRequestToMidItemRequestResource(midItemRequest) {
        const itemOptions = midItemRequest.itemOptions;
        return {
            company_number: midItemRequest.companyNumber,
            customer_reference: midItemRequest.customerReference,
            item_options: {
                filing_history_id: itemOptions.filingHistoryId
            },
            quantity: midItemRequest.quantity
        };
    }
    ;
    static mapMidItemResourceToMidItem(body) {
        const io = body.item_options;
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
            itemOptions: {
                filingHistoryDate: body.item_options.filing_history_date,
                filingHistoryDescription: body.item_options.filing_history_description,
                filingHistoryDescriptionValues: body.item_options.filing_history_description_values,
                filingHistoryId: body.item_options.filing_history_id,
                filingHistoryType: body.item_options.filing_history_type
            },
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
    ;
}
exports.default = MidMapping;
;
//# sourceMappingURL=mapping.js.map