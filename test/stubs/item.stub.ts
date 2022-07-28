import { ItemUriRequest } from "../../src/services/order/basket";
import { ItemResource } from "../../src/services/order/order";
import { ItemOptionsResource as MissingImageDeliveryItemOptionsResource } from "../../src/services/order/mid";

export const itemUriRequestStub: ItemUriRequest = ({
    itemUri: "/orderable/certificates/CHS00000000000000007"
});

export const itemResourceStub: ItemResource = ({
    company_name: "company name",
    company_number: "00000000",
    customer_reference: "reference",
    description: "description",
    description_identifier: "description identifier",
    description_values: { key: "value" },
    etag: "etag",
    id: "id",
    item_costs: [{
        calculated_cost: "calculated cost",
        discount_applied: "discount applies",
        item_cost: "item cost",
        product_type: "product type"
    }],
    item_options: {
        filing_history_date: "filing history date",
        filing_history_description: "filing history description",
        filing_history_description_values: {
            key_one: "value_one",
            key_two: "value_two"
        },
        filing_history_id: "filing history id",
        filing_history_type: "filing history type",
        filing_history_barcode: "filing history barcode",
        filing_history_cost: "filing history cost",
        filing_history_category: "filing history category"
    } as MissingImageDeliveryItemOptionsResource,
    item_uri: "/orderable/certificates/CHS00000000000000007",
    kind: "item#missing-image-delivery",
    links: { self: "links" },
    postage_cost: "postage cost",
    postal_delivery: true,
    quantity: 1,
    total_item_cost: "total item cost",
    status: "unknown"
});
