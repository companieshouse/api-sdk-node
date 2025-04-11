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
const service_1 = __importDefault(require("../../../src/services/order/mid/service"));
const http_1 = require("../../../src/http");
const expect = chai_1.default.expect;
const requestClient = new http_1.RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
const mockResponseBody = ({
    company_name: "company name",
    company_number: "1471",
    customer_reference: "reference",
    description: "description",
    description_identifier: "desc id",
    description_values: {
        key: "value"
    },
    etag: "etag",
    id: "id",
    item_costs: [{
            calculated_cost: "555",
            discount_applied: "discount",
            item_cost: "item cost",
            product_type: "product type"
        }],
    item_options: {
        filing_history_barcode: "barcode",
        filing_history_category: "category",
        filing_history_cost: "cost",
        filing_history_date: "2010-02-12",
        filing_history_description: "change-person-director-company-with-change-date",
        filing_history_description_values: {
            change_date: "2010-02-12",
            officer_name: "Thomas David Wheare"
        },
        filing_history_id: "MzAwOTM2MDg5OWFkaXF6a2N4",
        filing_history_type: "CH01"
    },
    kind: "kind",
    links: {
        self: "self"
    },
    postage_cost: "postage cost",
    postal_delivery: true,
    quantity: 1,
    total_item_cost: "total cost"
});
describe("create a MID POST", () => {
    const mockRequestBody = ({
        companyNumber: "1471",
        customerReference: "reference",
        itemOptions: {
            filingHistoryId: "MzAwOTM2MDg5OWFkaXF6a2N4"
        },
        quantity: 1
    });
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
        const mockPostRequest = {
            status: 401,
            error: "An error occurred"
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpPost").resolves(mockPostRequest);
        const mid = new service_1.default(requestClient);
        const data = yield mid.postMid(mockRequestBody);
        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    }));
    it("maps create a mid correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPostRequest = {
            status: 200,
            body: mockResponseBody
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpPost").resolves(mockPostRequest);
        const mid = new service_1.default(requestClient);
        const data = yield mid.postMid(mockRequestBody);
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.companyNumber).to.equal(mockResponseBody.company_number);
        expect(data.resource.customerReference).to.equal(mockResponseBody.customer_reference);
        expect(data.resource.itemOptions.filingHistoryId).to.equal(mockResponseBody.item_options.filing_history_id);
        expect(data.resource.quantity).to.equal(mockResponseBody.quantity);
    }));
});
describe("GET missing image delivery", () => {
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
            error: "An error occured"
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const missingImageDelivery = new service_1.default(requestClient);
        const data = yield missingImageDelivery.getMid("MID-ID-NOT-IMPORTANT");
        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    }));
    it("maps the missing image delivery field data items correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };
        const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const missingImageDelivery = new service_1.default(requestClient);
        const data = yield missingImageDelivery.getMid("MID-ID-NOT-IMPORTANT");
        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.companyNumber).to.equal(mockResponseBody.company_number);
        expect(data.resource.companyName).to.equal(mockResponseBody.company_name);
        expect(data.resource.totalItemCost).to.equal(mockResponseBody.total_item_cost);
        const itemOptions = data.resource.itemOptions;
        const itemOptionsResource = mockResponseBody.item_options;
        expect(itemOptions.filingHistoryDate).to.equal(itemOptionsResource.filing_history_date);
        expect(itemOptions.filingHistoryDescription).to.equal(itemOptionsResource.filing_history_description);
        expect(itemOptions.filingHistoryId).to.equal(itemOptionsResource.filing_history_id);
        expect(itemOptions.filingHistoryType).to.equal(itemOptionsResource.filing_history_type);
        expect(itemOptions.filingHistoryDescriptionValues).to.deep.equal(itemOptionsResource.filing_history_description_values);
    }));
});
//# sourceMappingURL=service.spec.js.map