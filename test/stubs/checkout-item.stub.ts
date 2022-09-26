import { CheckoutResource } from "../../src/services/order/checkout";
import { certifiedCopyItemStub, itemResourceStub } from "./item.stub";

export const CERTIFIED_COPY_CHECKOUT_ID = "ORD-1111111-1111111";
export const MISSING_IMAGE_DELIVERY_CHECKOUT_ID = "ORD-222222-222222";

export const mockCertifiedCopyCheckoutResponseBody: CheckoutResource = {
    status: "paid",
    payment_reference: "PN8h8EHBLddO94R",
    etag: "f90bd3844c44b640728be9ee70ffbda8ff5ec316",
    delivery_details: {
        country: "United Kingdom",
        forename: "bob",
        locality: "local",
        postal_code: "postcode",
        region: "region",
        surname: "bob",
        address_line_1: "address line 1",
        address_line_2: "address line 2",
        company_name: "company name",
        po_box: "po box"
    },
    items: [certifiedCopyItemStub],
    kind: "order",
    total_order_cost: "45",
    reference: CERTIFIED_COPY_CHECKOUT_ID,
    paid_at: "2020-08-28T11:43:36.817",
    checked_out_by: {
        email: "example@email.com",
        id: "Y2VkZWVlMzhlZWFjY2M4MzQ3MT"
    },
    links: {
        self: `/checkouts/${CERTIFIED_COPY_CHECKOUT_ID}`,
        payment: `/basket/checkouts/${CERTIFIED_COPY_CHECKOUT_ID}/payment`
    }
}

export const mockMissingImageDeliveryCheckoutResponseBody: CheckoutResource = {
    status: "paid",
    payment_reference: "q4nn5UxZiZxVG2e",
    etag: "80bd2953c79729aa0885f6987208690341376db0",
    items: [itemResourceStub],
    kind: "order",
    total_order_cost: "3",
    reference: MISSING_IMAGE_DELIVERY_CHECKOUT_ID,
    paid_at: "2020-10-07T11:09:46.196",
    checked_out_by: {
        email: "demo@ch.gov.uk",
        id: "67ZeMsvAEgkBWs7tNKacdrPvOmQ"
    },
    links: {
        self: `/checkouts/${MISSING_IMAGE_DELIVERY_CHECKOUT_ID}`,
        payment: `/basket/checkouts/${MISSING_IMAGE_DELIVERY_CHECKOUT_ID}/payment`
    }
};
