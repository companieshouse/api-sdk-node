/**
 * Basket is what is returned from the api.
 */
export interface BasketResource {
    delivery_details?: DeliveryDetailsResource;
    etag?: string;
    items?: BasketItemResource[];
    kind?: string;
    links?: {
        self?: string;
    };
    total_basket_cost?: string;
}
export interface DeliveryDetailsResource {
    address_line_1: string;
    address_line_2?: string;
    country: string;
    forename: string;
    locality: string;
    po_box?: string;
    postal_code?: string;
    region?: string;
    surname: string;
}
/**
 * Basket is the interface used within the sdk.
 */
export interface Basket {
    deliveryDetails?: DeliveryDetails;
    etag?: string;
    items?: BasketItem[];
    kind?: string;
    links?: {
        self?: string;
    };
    totalBasketCost?: string;
}
export interface DeliveryDetails {
    addressLine1: string;
    addressLine2?: string;
    country: string;
    forename: string;
    locality: string;
    poBox?: string;
    postalCode?: string;
    region?: string;
    surname: string;
}
export interface BasketRequestResource {
    delivery_details?: DeliveryDetailsRequestResource;
}
export interface DeliveryDetailsRequestResource {
    address_line_1: string;
    address_line_2?: string;
    country: string;
    forename: string;
    locality: string;
    po_box?: string;
    postal_code?: string;
    region?: string;
    surname: string;
}
export interface BasketPatchRequest {
    deliveryDetails?: DeliveryDetailsRequest;
}
export interface DeliveryDetailsRequest {
    addressLine1: string;
    addressLine2?: string | null;
    country: string;
    forename: string;
    locality: string;
    poBox?: string | null;
    postalCode?: string | null;
    region?: string | null;
    surname: string;
}
/**
 * BasketItemResource is what is returned from the api.
 */
export interface BasketItemResource {
    company_name?: string;
    company_number?: string;
    customer_reference?: string;
    description: string;
    description_identifier?: string;
    description_values?: Record<string, string>;
    etag: string;
    id: string;
    item_costs: ItemCostsResource[];
    item_options: Record<string, object>;
    item_uri: string;
    kind: string;
    links: LinksResource;
    postage_cost: string;
    postal_delivery: boolean;
    quantity: number;
    total_item_cost: string;
}
export interface ItemCostsResource {
    calculated_cost: string;
    discount_applied?: string;
    item_cost: string;
    product_type: string;
}
export interface LinksResource {
    self: string;
}
/**
 * BasketItem is the interface used within the sdk.
 */
export interface BasketItem {
    companyName?: string;
    companyNumber?: string;
    customerReference?: string;
    description: string;
    descriptionIdentifier?: string;
    descriptionValues?: Record<string, string>;
    etag: string;
    id: string;
    itemCosts: BasketItemCosts[];
    itemOptions: Record<string, object>;
    itemUri: string;
    kind: string;
    links: BasketItemLinks;
    postageCost: string;
    postalDelivery: boolean;
    quantity: number;
    totalItemCost: string;
}
export interface BasketItemCosts {
    calculatedCost: string;
    discountApplied?: string;
    itemCost: string;
    productType: string;
}
export interface BasketItemLinks {
    self: string;
}
/**
 * ItemUriPostRequest
 */
export interface ItemUriPostRequest {
    itemUri: string;
}
export interface ItemUriRequestResource {
    item_uri: string;
}
/**
 * CheckoutResource is what is returned from the api.
 */
export interface CheckoutResource {
    checked_out_by: {
        email: string;
        id: string;
    };
    delivery_details: {
        address_line_1?: string;
        address_line_2?: string;
        country?: string;
        forename?: string;
        locality?: string;
        po_box?: string;
        postal_code?: string;
        region?: string;
        surname?: string;
    };
    etag: string;
    items: any[];
    kind: string;
    links: {
        payment: string;
        self: string;
    };
    paid_at: string;
    payment_reference: string;
    reference: string;
    status: string;
    total_order_cost: string;
}
/**
 * Checkout is the interface used within the sdk.
 */
export interface Checkout {
    checkedOutBy: {
        email: string;
        id: string;
    };
    deliveryDetails: {
        addressLine1?: string;
        addressLine2?: string;
        country?: string;
        forename?: string;
        locality?: string;
        poBox?: string;
        postalCode?: string;
        region?: string;
        surname?: string;
    };
    etag: string;
    items: any[];
    kind: string;
    links: {
        payment: string;
        self: string;
    };
    paidAt: string;
    paymentReference: string;
    reference: string;
    status: string;
    totalOrderCost: string;
}
