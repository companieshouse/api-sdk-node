"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const sinon_1 = __importDefault(require("sinon"));
const service_1 = __importDefault(require("../../../src/services/order/certified-copies/service"));
const http_1 = require("../../../src/http");
const expect = chai_1.default.expect;
const requestClient = new http_1.RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
const mockResponseBody = ({
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
        sinon_1.default.reset();
        sinon_1.default.restore();
    });
    afterEach(done => {
        sinon_1.default.reset();
        sinon_1.default.restore();
        done();
    });
    it("returns an error response on failure", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetResponse = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const certifiedCopy = new service_1.default(requestClient);
        const data = yield certifiedCopy.getCertifiedCopy("CERT-COPY-ID-NOT-IMPORTANT");
        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    }));
    it("maps the certified copy field data items correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const certifiedCopy = new service_1.default(requestClient);
        const data = yield certifiedCopy.getCertifiedCopy("CERT-COPY-ID-NOT-IMPORTANT");
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.companyNumber).to.equal(mockResponseBody.company_number);
        expect(data.resource.companyName).to.equal(mockResponseBody.company_name);
        expect(data.resource.customerReference).to.equal(mockResponseBody.customer_reference);
        expect(data.resource.description).to.equal(mockResponseBody.description);
        expect(data.resource.descriptionIdentifier).to.equal(mockResponseBody.description_identifier);
        expect(data.resource.descriptionValues).to.deep.equal(mockResponseBody.description_values);
        expect(data.resource.etag).to.equal(mockResponseBody.etag);
        expect(data.resource.links).to.deep.equal(mockResponseBody.links);
        expect(data.resource.id).to.equal(mockResponseBody.id);
        expect(data.resource.itemCosts).to.deep.equal([{
                calculatedCost: "calculated cost",
                discountApplied: "discount applied",
                itemCost: "item cost",
                productType: "product type"
            }]);
        expect(data.resource.itemOptions.collectionLocation).to.equal(mockResponseBody.item_options.collection_location);
        expect(data.resource.itemOptions.contactNumber).to.equal(mockResponseBody.item_options.contact_number);
        expect(data.resource.itemOptions.deliveryMethod).to.equal(mockResponseBody.item_options.delivery_method);
        expect(data.resource.itemOptions.deliveryTimescale).to.equal(mockResponseBody.item_options.delivery_timescale);
        expect(data.resource.itemOptions.forename).to.equal(mockResponseBody.item_options.forename);
        expect(data.resource.itemOptions.surname).to.equal(mockResponseBody.item_options.surname);
        expect(data.resource.kind).to.equal(mockResponseBody.kind);
        expect(data.resource.postageCost).to.equal(mockResponseBody.postage_cost);
        expect(data.resource.postalDelivery).to.equal(mockResponseBody.postal_delivery);
        expect(data.resource.quantity).to.equal(mockResponseBody.quantity);
        expect(data.resource.totalItemCost).to.equal(mockResponseBody.total_item_cost);
        const filingHistoryDocument = data.resource.itemOptions.filingHistoryDocuments[0];
        const filingHistoryDocumentResource = mockResponseBody.item_options.filing_history_documents[0];
        expect(filingHistoryDocument.filingHistoryDate).to.equal(filingHistoryDocumentResource.filing_history_date);
        expect(filingHistoryDocument.filingHistoryDescription).to.equal(filingHistoryDocumentResource.filing_history_description);
        expect(filingHistoryDocument.filingHistoryId).to.equal(filingHistoryDocumentResource.filing_history_id);
        expect(filingHistoryDocument.filingHistoryType).to.equal(filingHistoryDocumentResource.filing_history_type);
        expect(filingHistoryDocument.filingHistoryDescriptionValues).to.deep.equal(filingHistoryDocumentResource.filing_history_description_values);
        expect(filingHistoryDocument.filingHistoryCost).to.equal(filingHistoryDocumentResource.filing_history_cost);
    }));
});
//# sourceMappingURL=service.spec.js.map