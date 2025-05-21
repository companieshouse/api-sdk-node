import chai from "chai";
import sinon from "sinon";
import CertifiedCopiesService from "../../../src/services/order/certified-copies/service";
import { RequestClient } from "../../../src/http";
import { CertifiedCopyItemResource, ItemCosts } from "../../../src/services/order/certified-copies/types"

const expect = chai.expect;
const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
const mockResponseBody : CertifiedCopyItemResource = ({
    company_name: "test company",
    company_number: "00000000",
    customer_reference: "customer reference",
    description: "description",
    description_identifier: "description identifier",
    description_values: {
        key_one: "value"
    },
    etag: "etag",
    links: {
        self: "/path/to/certified-copy"
    },
    id: "id",
    item_costs: [{
        calculated_cost: "calculated cost",
        discount_applied: "discount applied",
        item_cost: "item cost",
        product_type: "product type"
    }],
    item_options: {
        collection_location: "collection location",
        contact_number: "contact number",
        delivery_method: "postal",
        delivery_timescale: "same-day",
        filing_history_documents: [{
            filing_history_date: "2010-02-12",
            filing_history_description: "change-person-director-company-with-change-date",
            filing_history_description_values: {
                change_date: "2010-02-12",
                officer_name: "Thomas David Wheare"
            },
            filing_history_id: "MzAwOTM2MDg5OWFkaXF6a2N4",
            filing_history_type: "CH01",
            filing_history_cost: "30"
        }],
        forename: "forename",
        surname: "surname"
    },
    kind: "item#certified-copy",
    postage_cost: "postage cost",
    postal_delivery: true,
    quantity: 1,
    total_item_cost: "30"
});

describe("order a certified copy GET", () => {
    beforeEach(() => {
        sinon.reset();
        sinon.restore();
    });

    afterEach(done => {
        sinon.reset();
        sinon.restore();
        done();
    });

    it("returns an error response on failure", async () => {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const certifiedCopy: CertifiedCopiesService = new CertifiedCopiesService(requestClient);
        const data = await certifiedCopy.getCertifiedCopy("CERT-COPY-ID-NOT-IMPORTANT");

        expect(data.httpStatusCode).toBe(401);
        expect(data.resource).toBeUndefined();
    });

    it("maps the certified copy field data items correctly", async () => {
        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const certifiedCopy: CertifiedCopiesService = new CertifiedCopiesService(requestClient);
        const data = await certifiedCopy.getCertifiedCopy("CERT-COPY-ID-NOT-IMPORTANT");

        expect(data.httpStatusCode).toBe(200);
        expect(data.resource.companyNumber).toBe(mockResponseBody.company_number);
        expect(data.resource.companyName).toBe(mockResponseBody.company_name);
        expect(data.resource.customerReference).toBe(mockResponseBody.customer_reference);
        expect(data.resource.description).toBe(mockResponseBody.description);
        expect(data.resource.descriptionIdentifier).toBe(mockResponseBody.description_identifier);
        expect(data.resource.descriptionValues).toEqual(mockResponseBody.description_values);
        expect(data.resource.etag).toBe(mockResponseBody.etag);
        expect(data.resource.links).toEqual(mockResponseBody.links);
        expect(data.resource.id).toBe(mockResponseBody.id);
        expect(data.resource.itemCosts).toEqual([{
            calculatedCost: "calculated cost",
            discountApplied: "discount applied",
            itemCost: "item cost",
            productType: "product type"
        }] as ItemCosts[]);
        expect(data.resource.itemOptions.collectionLocation).toBe(mockResponseBody.item_options.collection_location);
        expect(data.resource.itemOptions.contactNumber).toBe(mockResponseBody.item_options.contact_number);
        expect(data.resource.itemOptions.deliveryMethod).toBe(mockResponseBody.item_options.delivery_method);
        expect(data.resource.itemOptions.deliveryTimescale).toBe(mockResponseBody.item_options.delivery_timescale);
        expect(data.resource.itemOptions.forename).toBe(mockResponseBody.item_options.forename);
        expect(data.resource.itemOptions.surname).toBe(mockResponseBody.item_options.surname);
        expect(data.resource.kind).toBe(mockResponseBody.kind);
        expect(data.resource.postageCost).toBe(mockResponseBody.postage_cost);
        expect(data.resource.postalDelivery).toBe(mockResponseBody.postal_delivery);
        expect(data.resource.quantity).toBe(mockResponseBody.quantity);
        expect(data.resource.totalItemCost).toBe(mockResponseBody.total_item_cost);

        const filingHistoryDocument = data.resource.itemOptions.filingHistoryDocuments[0];
        const filingHistoryDocumentResource = mockResponseBody.item_options.filing_history_documents[0];
        expect(filingHistoryDocument.filingHistoryDate).toBe(filingHistoryDocumentResource.filing_history_date);
        expect(filingHistoryDocument.filingHistoryDescription).toBe(filingHistoryDocumentResource.filing_history_description);
        expect(filingHistoryDocument.filingHistoryId).toBe(filingHistoryDocumentResource.filing_history_id);
        expect(filingHistoryDocument.filingHistoryType).toBe(filingHistoryDocumentResource.filing_history_type);
        expect(filingHistoryDocument.filingHistoryDescriptionValues).toEqual(filingHistoryDocumentResource.filing_history_description_values);
        expect(filingHistoryDocument.filingHistoryCost).toBe(filingHistoryDocumentResource.filing_history_cost);
    });
});
