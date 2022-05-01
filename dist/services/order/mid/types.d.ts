/**
 * MidItemResource is what is returned from the api.
 */
export interface MidItemResource {
    company_name: string;
    company_number: string;
    customer_reference: string;
    description: string;
    description_identifier: string;
    description_values: Record<string, string>;
    etag: string;
    id: string;
    item_costs: ItemCostsResource[];
    item_options: ItemOptionsResource;
    kind: string;
    links: LinksResource;
    postage_cost: string;
    postal_delivery: boolean;
    quantity: number;
    total_item_cost: string;
}
export interface ItemCostsResource {
    calculated_cost: string;
    discount_applied: string;
    item_cost: string;
    product_type: string;
}
export interface ItemOptionsResource {
    filing_history_date: string;
    filing_history_description: string;
    filing_history_description_values: Record<string, string>;
    filing_history_id: string;
    filing_history_type: string;
}
export interface LinksResource {
    self: string;
}
/**
 * MidItem is the interface used within this SDK.
 */
export interface MidItem {
    companyName: string;
    companyNumber: string;
    customerReference: string;
    description: string;
    descriptionIdentifier: string;
    descriptionValues: Record<string, string>;
    etag: string;
    id: string;
    itemCosts: ItemCosts[];
    itemOptions: ItemOptions;
    kind: string;
    links: Links;
    postageCost: string;
    postalDelivery: boolean;
    quantity: number;
    totalItemCost: string;
}
export interface ItemCosts {
    calculatedCost: string;
    discountApplied: string;
    itemCost: string;
    productType: string;
}
export interface ItemOptions {
    filingHistoryDate: string;
    filingHistoryDescription: string;
    filingHistoryDescriptionValues: Record<string, any>;
    filingHistoryId: string;
    filingHistoryType: string;
}
export interface Links {
    self: string;
}
export interface MidItemPostRequest {
    companyNumber?: string;
    customerReference?: string;
    itemOptions: ItemOptionsRequest;
    quantity: number;
}
export interface ItemOptionsRequest {
    filingHistoryId: string;
}
export interface MidItemRequestResource {
    company_number?: string;
    customer_reference?: string;
    item_options: ItemOptionsRequestResource;
    quantity: number;
}
export interface ItemOptionsRequestResource {
    filing_history_id: string;
}
