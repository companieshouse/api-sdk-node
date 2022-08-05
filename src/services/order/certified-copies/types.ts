import { ItemOptionsDeliveryTimescaleConfigurable } from "../types";

export interface CertifiedCopyItemResource {
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

export interface LinksResource {
    self: string;
}

export interface ItemOptionsResource {
    collection_location: string;
    contact_number: string;
    delivery_method: string
    delivery_timescale: string;
    filing_history_documents: FilingHistoryDocumentsResource[];
    forename: string;
    surname: string;
}

export interface FilingHistoryDocumentsResource {
    filing_history_date: string;
    filing_history_description: string;
    filing_history_id: string;
    filing_history_type: string;
    filing_history_description_values?: Record<string, any>;
    filing_history_cost: string;
}

export interface CertifiedCopyItem {
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

export interface ItemOptions extends ItemOptionsDeliveryTimescaleConfigurable {
    collectionLocation: string;
    contactNumber: string;
    deliveryMethod: string;
    filingHistoryDocuments: FilingHistoryDocuments[];
    forename: string;
    surname: string;
}

export interface Links {
    self: string;
}

export interface FilingHistoryDocuments {
    filingHistoryDate: string;
    filingHistoryDescription: string;
    filingHistoryId: string;
    filingHistoryType: string;
    filingHistoryDescriptionValues?: Record<string, any>;
    filingHistoryCost: string;
}

// Patch Certified Document
export interface CertifiedCopyItemPatchRequest {
    customerReference?: string;
    itemOptions?: PatchItemOptions;
    quantity?: number;
}

export interface PatchItemOptions {
    collectionLocation?: string;
    contactNumber?: string;
    deliveryMethod?: string;
    deliveryTimescale?: string;
    filingHistoryDocuments?: FilingHistoryDocuments[];
    forename?: string;
    surname?: string;
}
