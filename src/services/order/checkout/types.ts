import { Item, ItemResource } from "../order";

export interface Checkout {
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
        payment: string;
    };
    paidAt?: string;
    checkedOutBy: {
        email: string;
        id: string
    };
    status: string;
    paymentReference?: string;
    reference: string;
    totalOrderCost: string;
}

export interface CheckoutResource {
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
        payment: string;
    };
    paid_at: string;
    checked_out_by: {
        email: string;
        id: string
    };
    status: string;
    payment_reference: string;
    reference: string;
    total_order_cost: string;
}
