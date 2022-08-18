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

export const certifiedCopyItemStub: ItemResource = {
    id: "CCD-123456-123456",
    company_name: "Company Name",
    company_number: "00006400",
    description: "certified copy for company 00000000",
    description_identifier: "certified-copy",
    description_values: {
        company_number: "00000000",
        "certified-copy": "certified copy for company 00000000"
    },
    item_costs: [
        {
            discount_applied: "0",
            item_cost: "15",
            calculated_cost: "15",
            product_type: "certified-copy"
        }
    ],
    item_options: {
        collection_location: "london",
        contact_number: "0123456789",
        delivery_method: "postal",
        delivery_timescale: "standard",
        filing_history_documents: [
            {
                filing_history_date: "2010-02-12",
                filing_history_description: "change-person-director-company-with-change-date",
                filing_history_description_values: {
                    change_date: "2010-02-12",
                    officer_name: "Thomas David Wheare"
                },
                filing_history_id: "MzAwOTM2MDg5OWFkaXF6a2N4",
                filing_history_type: "CH01",
                filing_history_cost: "15"
            }
        ],
        forename: "forename",
        surname: "surname"
    },
    etag: "c7dace439d47fdb78c9c0803c60e6619d9400663",
    kind: "item#certified-copy",
    links: {
        self: "/orderable/certified-copies/CCD-123456-123456"
    },
    quantity: 1,
    item_uri: "/orderable/certified-copies/CCD-123456-123456",
    status: "unknown",
    postage_cost: "0",
    total_item_cost: "15",
    postal_delivery: true
}
