import { Item, ItemResource } from "../order";

export interface BasketResource {
    delivery_details?: DeliveryDetailsResource;
    etag?: string;
    items?: ItemResource[];
    kind?: string;
    links?: {
        self?: string;
    };
    total_basket_cost?: string;
    enrolled: boolean;
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

export interface Basket {
    deliveryDetails?: DeliveryDetails;
    etag?: string;
    items?: Item[];
    kind?: string;
    links?: {
        self?: string;
    };
    totalBasketCost?: string;
    enrolled: boolean;
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

export interface ItemUriRequest {
    itemUri: string;
}

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
    items: any[]; // not mapping all items yet
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
  items: any[]; // not mapping all items yet
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

export interface BasketLinksResource {
    id: string;
    created_at: string;
    updated_at: string;
    data: {
        delivery_details?: DeliveryDetailsResource;
        etag?: string;
        items?: ItemUriResource[];
        kind?: string;
        links?: {
            self?: string;
        };
        total_basket_cost?: string;
        enrolled: boolean;
    }
}

export interface ItemUriResource {
    item_uri: string;
}

export interface BasketLinks {
    id: string;
    createdAt: string;
    updatedAt: string;
    data: {
        deliveryDetails?: DeliveryDetails;
        etag?: string;
        items?: ItemUri[];
        kind?: string;
        links?: {
            self?: string;
        };
        totalBasketCost?: string;
        enrolled: boolean;
    }
}

export interface ItemUri {
    itemUri: string;
}
