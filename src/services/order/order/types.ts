import { ItemOptions as MissingImageDeliveryItemOptions, ItemOptionsResource as MissingImageDeliveryItemOptionsResource } from "../mid/types";
import { ItemOptions as CertificateItemOptions, ItemOptionsResource as CertificateItemOptionsResource } from "../certificates/types";
import { ItemOptions as CertifiedCopyItemOptions, ItemOptionsResource as CertifiedCopyItemOptionsResource } from "../certified-copies/types";
/**
 * Order is the interface used within this SDK.
 */

export interface Order {
    deliveryDetails?: {
        addressLine1: string;
        addressLine2: string;
        country: string;
        forename: string;
        locality: string;
        poBox: string;
        postalCode: string;
        region: string;
        surname: string
    };
    etag: string;
    items: Item[];
    kind: string;
    links: {
        self: string;
    };
    orderedAt: string;
    orderedBy: {
        email: string;
        id: string
    };
    paymentReference: string;
    reference: string;
    totalOrderCost: string;
}

export interface Item {
    companyName: string;
    companyNumber: string;
    customerReference?: string;
    description: string;
    descriptionIdentifier: string;
    descriptionValues: Record<string, string>;
    etag: string;
    id: string;
    itemCosts: ItemCosts[];
    itemOptions: ItemOptions;
    itemUri: string;
    kind: string;
    links: {
        self: string;
    };
    postageCost: string;
    postalDelivery: boolean;
    quantity: number;
    satisfiedAt?: string;
    status: string;
    totalItemCost: string;
}

export interface ItemCosts {
    calculatedCost: string;
    discountApplied: string;
    itemCost: string;
    productType: string;
}

export type ItemOptions = CertificateItemOptions | CertifiedCopyItemOptions | MissingImageDeliveryItemOptions;

/**
 * OrderResource is what is returned from the api.
 */

export interface OrderResource {
    delivery_details?: {
        address_line_1: string;
        address_line_2: string;
        country: string;
        forename: string;
        locality: string;
        po_box: string;
        postal_code: string;
        region: string;
        surname: string
    };
    etag: string;
    items: ItemResource[];
    kind: string;
    links: {
        self: string;
    };
    ordered_at: string;
    ordered_by: {
        email: string;
        id: string
    };
    payment_reference: string;
    reference: string;
    total_order_cost: string;
}

export interface ItemResource {
    company_name: string;
    company_number: string;
    customer_reference?: string;
    description: string;
    description_identifier: string;
    description_values: Record<string, string>;
    etag: string;
    id: string;
    item_costs: ItemCostsResource[];
    item_options: ItemOptionsResource;
    item_uri: string;
    kind: string;
    links: {
        self: string;
    };
    postage_cost: string;
    postal_delivery: boolean;
    quantity: number;
    satisfied_at?: string;
    status: string;
    total_item_cost: string
}

export interface ItemCostsResource {
    calculated_cost: string;
    discount_applied: string;
    item_cost: string;
    product_type: string;
}

export type ItemOptionsResource = CertificateItemOptionsResource | CertifiedCopyItemOptionsResource
   | MissingImageDeliveryItemOptionsResource;
