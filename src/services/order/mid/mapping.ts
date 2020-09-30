import { 
    MidItemResource, 
    MidItemPostRequest, 
    MidItemRequestResource, 
    ItemOptionsRequest, 
    MidItem, 
    ItemOptionsResource, 
    ItemCostsResource } from "./types";

export default class MidMapping {
    public static mapMidItemRequestToMidItemRequestResource (midItemRequest: MidItemPostRequest): MidItemRequestResource {
        const itemOptions: ItemOptionsRequest = midItemRequest.itemOptions;

        return {
            company_number: midItemRequest.companyNumber,
            customer_reference: midItemRequest.customerReference,
            item_options: {
                filing_history_id: itemOptions.filingHistoryId
            },
            quantity: midItemRequest.quantity
        };
    };

    public static mapMidItemResourceToMidItem (body: MidItemResource): MidItem {
        const io = body.item_options as ItemOptionsResource;

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
    };
};
