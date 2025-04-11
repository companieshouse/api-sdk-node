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
const item_stub_1 = require("../../stubs/item.stub");
const service_1 = __importDefault(require("../../../src/services/order/basket/service"));
const http_1 = require("../../../src/http");
const expect = chai_1.default.expect;
const requestClient = new http_1.RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
describe("basket", () => {
    beforeEach(() => {
        sinon_1.default.reset();
        sinon_1.default.restore();
    });
    afterEach(done => {
        sinon_1.default.reset();
        sinon_1.default.restore();
        done();
    });
    describe("add item to basket using a POST request", () => {
        it("returns an error response on failure", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockPostResponse = {
                status: 401,
                error: "An error occurred"
            };
            const mockRequest = sinon_1.default.stub(requestClient, "httpPost").resolves(mockPostResponse);
            const basket = new service_1.default(requestClient);
            const data = yield basket.postItemToBasket(item_stub_1.itemUriRequestStub);
            expect(data.httpStatusCode).to.equal(401);
            expect(data.resource).to.be.undefined;
        }));
        it("maps add item to basket correctly", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockPostResponse = {
                status: 200,
                body: item_stub_1.itemResourceStub
            };
            const mockRequest = sinon_1.default.stub(requestClient, "httpPost").resolves(mockPostResponse);
            const basket = new service_1.default(requestClient);
            const data = yield basket.postItemToBasket(item_stub_1.itemUriRequestStub);
            expect(data.httpStatusCode).to.equal(200);
            expect(data.resource.companyName).to.equal(item_stub_1.itemResourceStub.company_name);
            expect(data.resource.companyNumber).to.equal(item_stub_1.itemResourceStub.company_number);
            expect(data.resource.customerReference).to.equal(item_stub_1.itemResourceStub.customer_reference);
            expect(data.resource.description).to.equal(item_stub_1.itemResourceStub.description);
            expect(data.resource.descriptionIdentifier).to.equal(item_stub_1.itemResourceStub.description_identifier);
            expect(data.resource.descriptionValues).to.deep.equal(item_stub_1.itemResourceStub.description_values);
            expect(data.resource.etag).to.equal(item_stub_1.itemResourceStub.etag);
            expect(data.resource.id).to.equal(item_stub_1.itemResourceStub.id);
            expect(data.resource.itemCosts[0].calculatedCost).to.equal(item_stub_1.itemResourceStub.item_costs[0].calculated_cost);
            expect(data.resource.itemCosts[0].discountApplied).to.equal(item_stub_1.itemResourceStub.item_costs[0].discount_applied);
            expect(data.resource.itemCosts[0].itemCost).to.equal(item_stub_1.itemResourceStub.item_costs[0].item_cost);
            expect(data.resource.itemCosts[0].productType).to.equal(item_stub_1.itemResourceStub.item_costs[0].product_type);
            expect(data.resource.itemOptions).to.deep.equal({
                filingHistoryDate: "filing history date",
                filingHistoryDescription: "filing history description",
                filingHistoryDescriptionValues: {
                    key_one: "value_one",
                    key_two: "value_two"
                },
                filingHistoryId: "filing history id",
                filingHistoryType: "filing history type",
                filingHistoryBarcode: "filing history barcode",
                filingHistoryCategory: "filing history category",
                filingHistoryCost: "filing history cost"
            });
            expect(data.resource.itemUri).to.equal(item_stub_1.itemResourceStub.item_uri);
            expect(data.resource.kind).to.equal(item_stub_1.itemResourceStub.kind);
            expect(data.resource.links.self).to.equal(item_stub_1.itemResourceStub.links.self);
            expect(data.resource.postageCost).to.equal(item_stub_1.itemResourceStub.postage_cost);
            expect(data.resource.postalDelivery).to.equal(item_stub_1.itemResourceStub.postal_delivery);
            expect(data.resource.quantity).to.equal(item_stub_1.itemResourceStub.quantity);
            expect(data.resource.totalItemCost).to.equal(item_stub_1.itemResourceStub.total_item_cost);
        }));
    });
    describe("Append item to basket", () => {
        it("returns an error response on failure", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockPostResponse = {
                status: 401,
                error: "An error occurred"
            };
            sinon_1.default.stub(requestClient, "httpPost").resolves(mockPostResponse);
            const basket = new service_1.default(requestClient);
            const data = yield basket.appendItemToBasket(item_stub_1.itemUriRequestStub);
            expect(data.httpStatusCode).to.equal(401);
            expect(data.resource).to.be.undefined;
        }));
        it("appends item to basket correctly", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockPostResponse = {
                status: 200,
                body: item_stub_1.itemResourceStub
            };
            sinon_1.default.stub(requestClient, "httpPost").resolves(mockPostResponse);
            const basket = new service_1.default(requestClient);
            const data = yield basket.appendItemToBasket(item_stub_1.itemUriRequestStub);
            expect(data.httpStatusCode).to.equal(200);
            expect(data.resource.companyName).to.equal(item_stub_1.itemResourceStub.company_name);
            expect(data.resource.companyNumber).to.equal(item_stub_1.itemResourceStub.company_number);
            expect(data.resource.customerReference).to.equal(item_stub_1.itemResourceStub.customer_reference);
            expect(data.resource.description).to.equal(item_stub_1.itemResourceStub.description);
            expect(data.resource.descriptionIdentifier).to.equal(item_stub_1.itemResourceStub.description_identifier);
            expect(data.resource.descriptionValues).to.deep.equal(item_stub_1.itemResourceStub.description_values);
            expect(data.resource.etag).to.equal(item_stub_1.itemResourceStub.etag);
            expect(data.resource.id).to.equal(item_stub_1.itemResourceStub.id);
            expect(data.resource.itemCosts[0].calculatedCost).to.equal(item_stub_1.itemResourceStub.item_costs[0].calculated_cost);
            expect(data.resource.itemCosts[0].discountApplied).to.equal(item_stub_1.itemResourceStub.item_costs[0].discount_applied);
            expect(data.resource.itemCosts[0].itemCost).to.equal(item_stub_1.itemResourceStub.item_costs[0].item_cost);
            expect(data.resource.itemCosts[0].productType).to.equal(item_stub_1.itemResourceStub.item_costs[0].product_type);
            expect(data.resource.itemOptions).to.deep.equal({
                filingHistoryDate: "filing history date",
                filingHistoryDescription: "filing history description",
                filingHistoryDescriptionValues: {
                    key_one: "value_one",
                    key_two: "value_two"
                },
                filingHistoryId: "filing history id",
                filingHistoryType: "filing history type",
                filingHistoryBarcode: "filing history barcode",
                filingHistoryCategory: "filing history category",
                filingHistoryCost: "filing history cost"
            });
            expect(data.resource.itemUri).to.equal(item_stub_1.itemResourceStub.item_uri);
            expect(data.resource.kind).to.equal(item_stub_1.itemResourceStub.kind);
            expect(data.resource.links.self).to.equal(item_stub_1.itemResourceStub.links.self);
            expect(data.resource.postageCost).to.equal(item_stub_1.itemResourceStub.postage_cost);
            expect(data.resource.postalDelivery).to.equal(item_stub_1.itemResourceStub.postal_delivery);
            expect(data.resource.quantity).to.equal(item_stub_1.itemResourceStub.quantity);
            expect(data.resource.totalItemCost).to.equal(item_stub_1.itemResourceStub.total_item_cost);
        }));
    });
    describe("POST checkout basket", () => {
        it("returns an error response on failure", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockPostResponse = {
                status: 401,
                error: "An error occurred"
            };
            const mockRequest = sinon_1.default.stub(requestClient, "httpPost").resolves(mockPostResponse);
            const basket = new service_1.default(requestClient);
            const response = yield basket.checkoutBasket();
            const data = response.value;
            expect(data.httpStatusCode).to.equal(401);
            expect(data.errors).to.equal("An error occurred");
        }));
        it("maps add item to basket correctly", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockResponseBody = {
                checked_out_by: {
                    email: "email",
                    id: "id"
                },
                delivery_details: {
                    address_line_1: "address_line_1",
                    address_line_2: "address_line_2",
                    company_name: "company_name",
                    country: "country",
                    forename: "forename",
                    locality: "locality",
                    po_box: "po_box",
                    postal_code: "postal_code",
                    region: "region",
                    surname: "surname"
                },
                etag: "etag",
                items: [{ test: "test" }],
                kind: "kind",
                links: {
                    payment: "payment",
                    self: "self"
                },
                paid_at: "paid_at",
                payment_reference: "payment_reference",
                reference: "reference",
                status: "status",
                total_order_cost: "total_order_cost"
            };
            const mockPostResponse = {
                status: 200,
                body: mockResponseBody,
                headers: {
                    "X-Payment-Required": "http://link-to-payment"
                }
            };
            const mockRequest = sinon_1.default.stub(requestClient, "httpPost").resolves(mockPostResponse);
            const basket = new service_1.default(requestClient);
            const result = yield basket.checkoutBasket();
            const data = result.value;
            expect(data.httpStatusCode).to.equal(200);
            expect(data.headers["X-Payment-Required"]).to.equal("http://link-to-payment");
            expect(data.resource.checkedOutBy.email).to.equal(mockResponseBody.checked_out_by.email);
            expect(data.resource.checkedOutBy.id).to.equal(mockResponseBody.checked_out_by.id);
            expect(data.resource.deliveryDetails.addressLine1).to.equal(mockResponseBody.delivery_details.address_line_1);
            expect(data.resource.deliveryDetails.addressLine2).to.equal(mockResponseBody.delivery_details.address_line_2);
            expect(data.resource.deliveryDetails.companyName).to.equal(mockResponseBody.delivery_details.company_name);
            expect(data.resource.deliveryDetails.country).to.equal(mockResponseBody.delivery_details.country);
            expect(data.resource.deliveryDetails.forename).to.equal(mockResponseBody.delivery_details.forename);
            expect(data.resource.deliveryDetails.locality).to.equal(mockResponseBody.delivery_details.locality);
            expect(data.resource.deliveryDetails.poBox).to.equal(mockResponseBody.delivery_details.po_box);
            expect(data.resource.deliveryDetails.postalCode).to.equal(mockResponseBody.delivery_details.postal_code);
            expect(data.resource.deliveryDetails.region).to.equal(mockResponseBody.delivery_details.region);
            expect(data.resource.deliveryDetails.surname).to.equal(mockResponseBody.delivery_details.surname);
            expect(data.resource.etag).to.equal(mockResponseBody.etag);
            expect(data.resource.items).to.deep.equal(mockResponseBody.items);
            expect(data.resource.kind).to.equal(mockResponseBody.kind);
            expect(data.resource.links.payment).to.equal(mockResponseBody.links.payment);
            expect(data.resource.links.self).to.equal(mockResponseBody.links.self);
            expect(data.resource.paidAt).to.equal(mockResponseBody.paid_at);
            expect(data.resource.paymentReference).to.equal(mockResponseBody.payment_reference);
            expect(data.resource.reference).to.equal(mockResponseBody.reference);
            expect(data.resource.status).to.equal(mockResponseBody.status);
            expect(data.resource.totalOrderCost).to.equal(mockResponseBody.total_order_cost);
        }));
    });
    describe("GET Basket", () => {
        it("returns an error response on failure", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockGetResponse = {
                status: 401,
                error: "An error occurred"
            };
            const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
            const basket = new service_1.default(requestClient);
            const data = yield basket.getBasket();
            expect(data.httpStatusCode).to.equal(401);
            expect(data.resource).to.be.undefined;
        }));
        it("maps the basket data correctly", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockResponseBody = ({
                delivery_details: {
                    address_line_1: "117 kings road",
                    address_line_2: "canton",
                    company_name: "Company Name",
                    country: "wales",
                    forename: "John",
                    locality: "Cardiff",
                    po_box: "po box",
                    postal_code: "CF5 3NB",
                    region: "Glamorgan",
                    surname: "Smith"
                },
                enrolled: true,
                etag: "etag",
                items: [{
                        company_name: "company name",
                        company_number: "00000000",
                        customer_reference: "reference",
                        description: "description",
                        description_identifier: "description identifier",
                        description_values: {
                            key_one: "value one",
                            key_two: "value two"
                        },
                        etag: "etag",
                        id: "id",
                        item_costs: [{
                                calculated_cost: "calculated cost",
                                discount_applied: "discount applies",
                                item_cost: "item cost",
                                product_type: "product type"
                            }],
                        item_options: {
                            collection_location: "collection location",
                            contact_number: "contact number",
                            delivery_method: "delivery method",
                            delivery_timescale: "delivery timescale",
                            filing_history_documents: [{
                                    filing_history_date: "filing history date",
                                    filing_history_description: "filing history description",
                                    filing_history_id: "filing history id",
                                    filing_history_type: "filing history type",
                                    filing_history_description_values: {
                                        key_one: "value one",
                                        key_two: "value two"
                                    },
                                    filing_history_cost: "filing history cost"
                                }],
                            forename: "forename",
                            surname: "surname"
                        },
                        item_uri: "/orderable/certificates/CHS00000000000000007",
                        kind: "item#certificate",
                        links: { self: "links" },
                        postage_cost: "postage cost",
                        postal_delivery: true,
                        quantity: 1,
                        total_item_cost: "total item cost",
                        status: "unknown"
                    }],
                kind: "kind",
                links: {
                    self: "self"
                },
                total_basket_cost: "5"
            });
            const mockGetResponse = {
                status: 200,
                body: mockResponseBody
            };
            const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
            const basket = new service_1.default(requestClient);
            const data = yield basket.getBasket();
            const resourceDeliveryDetails = data.resource.deliveryDetails;
            const mockDeliveryDetails = mockResponseBody.delivery_details;
            const resourceItem = data.resource.items[0];
            const mockResourceItem = mockResponseBody.items[0];
            expect(data.httpStatusCode).to.equal(200);
            expect(data.resource.enrolled).to.be.true;
            expect(resourceDeliveryDetails.addressLine1).to.equal(mockDeliveryDetails.address_line_1);
            expect(resourceDeliveryDetails.addressLine2).to.equal(mockDeliveryDetails.address_line_2);
            expect(resourceDeliveryDetails.companyName).to.equal(mockDeliveryDetails.company_name);
            expect(resourceDeliveryDetails.country).to.equal(mockDeliveryDetails.country);
            expect(resourceDeliveryDetails.forename).to.equal(mockDeliveryDetails.forename);
            expect(resourceDeliveryDetails.locality).to.equal(mockDeliveryDetails.locality);
            expect(resourceDeliveryDetails.poBox).to.equal(mockDeliveryDetails.po_box);
            expect(resourceDeliveryDetails.postalCode).to.equal(mockDeliveryDetails.postal_code);
            expect(resourceDeliveryDetails.region).to.equal(mockDeliveryDetails.region);
            expect(resourceDeliveryDetails.surname).to.equal(mockDeliveryDetails.surname);
            expect(resourceItem.companyName).to.equal(mockResourceItem.company_name);
            expect(resourceItem.companyNumber).to.equal(mockResourceItem.company_number);
            expect(resourceItem.customerReference).to.equal(mockResourceItem.customer_reference);
            expect(resourceItem.description).to.equal(mockResourceItem.description);
            expect(resourceItem.descriptionIdentifier).to.equal(mockResourceItem.description_identifier);
            expect(resourceItem.descriptionValues).to.deep.equal(mockResourceItem.description_values);
            expect(resourceItem.etag).to.equal(mockResourceItem.etag);
            expect(resourceItem.id).to.equal(mockResourceItem.id);
            expect(resourceItem.itemCosts[0].calculatedCost).to.equal(mockResourceItem.item_costs[0].calculated_cost);
            expect(resourceItem.itemCosts[0].discountApplied).to.equal(mockResourceItem.item_costs[0].discount_applied);
            expect(resourceItem.itemCosts[0].itemCost).to.equal(mockResourceItem.item_costs[0].item_cost);
            expect(resourceItem.itemCosts[0].productType).to.equal(mockResourceItem.item_costs[0].product_type);
            expect(resourceItem.itemOptions).to.deep.equal({
                collectionLocation: "collection location",
                contactNumber: "contact number",
                deliveryMethod: "delivery method",
                deliveryTimescale: "delivery timescale",
                filingHistoryDocuments: [{
                        filingHistoryDate: "filing history date",
                        filingHistoryDescription: "filing history description",
                        filingHistoryId: "filing history id",
                        filingHistoryType: "filing history type",
                        filingHistoryDescriptionValues: {
                            key_one: "value one",
                            key_two: "value two"
                        },
                        filingHistoryCost: "filing history cost"
                    }],
                forename: "forename",
                surname: "surname"
            });
            expect(resourceItem.itemUri).to.equal(mockResourceItem.item_uri);
            expect(resourceItem.kind).to.equal(mockResourceItem.kind);
            expect(resourceItem.links.self).to.equal(mockResourceItem.links.self);
            expect(resourceItem.postageCost).to.equal(mockResourceItem.postage_cost);
            expect(resourceItem.postalDelivery).to.equal(mockResourceItem.postal_delivery);
            expect(resourceItem.quantity).to.equal(mockResourceItem.quantity);
            expect(resourceItem.totalItemCost).to.equal(mockResourceItem.total_item_cost);
        }));
        it("maps the basket data correctly with missing fields", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockResponseBodyMissingFields = ({
                delivery_details: {
                    address_line_1: "117 kings road",
                    address_line_2: undefined,
                    company_name: undefined,
                    country: "wales",
                    forename: "John",
                    locality: "Cardiff",
                    po_box: undefined,
                    postal_code: "CF5 3NB",
                    region: undefined,
                    surname: "Smith"
                },
                enrolled: false
            });
            const mockGetResponse = {
                status: 200,
                body: mockResponseBodyMissingFields
            };
            const mockRequest = sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
            const basket = new service_1.default(requestClient);
            const data = yield basket.getBasket();
            const resourceDeliveryDetails = data.resource.deliveryDetails;
            const mockDeliveryDetails = mockResponseBodyMissingFields.delivery_details;
            expect(data.httpStatusCode).to.equal(200);
            expect(data.resource.enrolled).to.be.false;
            expect(resourceDeliveryDetails.addressLine1).to.equal(mockDeliveryDetails.address_line_1);
            expect(resourceDeliveryDetails === null || resourceDeliveryDetails === void 0 ? void 0 : resourceDeliveryDetails.addressLine2).to.be.undefined;
            expect(resourceDeliveryDetails === null || resourceDeliveryDetails === void 0 ? void 0 : resourceDeliveryDetails.companyName).to.be.undefined;
            expect(resourceDeliveryDetails.country).to.equal(mockDeliveryDetails.country);
            expect(resourceDeliveryDetails.forename).to.equal(mockDeliveryDetails.forename);
            expect(resourceDeliveryDetails.locality).to.equal(mockDeliveryDetails.locality);
            expect(resourceDeliveryDetails === null || resourceDeliveryDetails === void 0 ? void 0 : resourceDeliveryDetails.poBox).to.be.undefined;
            expect(resourceDeliveryDetails.postalCode).to.equal(mockDeliveryDetails.postal_code);
            expect(resourceDeliveryDetails === null || resourceDeliveryDetails === void 0 ? void 0 : resourceDeliveryDetails.region).to.be.undefined;
            expect(resourceDeliveryDetails.surname).to.equal(mockDeliveryDetails.surname);
        }));
    });
    describe("PATCH basket", () => {
        const mockRequestBody = ({
            deliveryDetails: {
                addressLine1: "117 kings road",
                addressLine2: "canton",
                companyName: "Company Name",
                country: "wales",
                forename: "John",
                locality: "Cardiff",
                poBox: "po box",
                postalCode: "CF5 3NB",
                region: "Glamorgan",
                surname: "Smith"
            }
        });
        const mockResponseBody = ({
            delivery_details: {
                address_line_1: "117 kings road",
                address_line_2: "canton",
                company_name: "Company Name",
                country: "wales",
                forename: "John",
                locality: "Cardiff",
                po_box: "po box",
                postal_code: "CF5 3NB",
                region: "Glamorgan",
                surname: "Smith"
            },
            enrolled: true,
            etag: "etag",
            items: [{
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
                    item_options: { key: {} },
                    item_uri: "/orderable/certificates/CHS00000000000000007",
                    kind: "kind",
                    links: { self: "links" },
                    postage_cost: "postage cost",
                    postal_delivery: true,
                    quantity: 1,
                    total_item_cost: "total item cost",
                    status: "unknown"
                }],
            kind: "kind",
            links: {
                self: "self"
            },
            total_basket_cost: "5"
        });
        const mockResponseBodyMissingFields = ({
            delivery_details: {
                address_line_1: "117 kings road",
                address_line_2: undefined,
                company_name: undefined,
                country: "wales",
                forename: "John",
                locality: "Cardiff",
                po_box: undefined,
                postal_code: "CF5 3NB",
                region: undefined,
                surname: "Smith"
            },
            enrolled: true
        });
        it("returns an error response on failure", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockPatchRequest = {
                status: 401,
                error: "An error occurred"
            };
            const mockRequest = sinon_1.default.stub(requestClient, "httpPatch").resolves(mockPatchRequest);
            const basket = new service_1.default(requestClient);
            const data = yield basket.patchBasket(mockRequestBody);
            expect(data.httpStatusCode).to.equal(401);
            expect(data.resource).to.be.undefined;
        }));
        it("maps basket delivery details correctly when PATCH", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockPatchRequest = {
                status: 200,
                body: mockResponseBody
            };
            const mockRequest = sinon_1.default.stub(requestClient, "httpPatch").resolves(mockPatchRequest);
            const basket = new service_1.default(requestClient);
            const data = yield basket.patchBasket(mockRequestBody);
            const resourceDeliveryDetails = data.resource.deliveryDetails;
            const mockDeliveryDetails = mockResponseBody.delivery_details;
            const resourceItem = data.resource.items[0];
            const mockResourceItem = mockResponseBody.items[0];
            expect(data.httpStatusCode).to.equal(200);
            expect(data.resource.enrolled).to.be.true;
            expect(resourceDeliveryDetails.addressLine1).to.equal(mockDeliveryDetails.address_line_1);
            expect(resourceDeliveryDetails.addressLine2).to.equal(mockDeliveryDetails.address_line_2);
            expect(resourceDeliveryDetails.companyName).to.equal(mockDeliveryDetails.company_name);
            expect(resourceDeliveryDetails.country).to.equal(mockDeliveryDetails.country);
            expect(resourceDeliveryDetails.forename).to.equal(mockDeliveryDetails.forename);
            expect(resourceDeliveryDetails.locality).to.equal(mockDeliveryDetails.locality);
            expect(resourceDeliveryDetails.poBox).to.equal(mockDeliveryDetails.po_box);
            expect(resourceDeliveryDetails.postalCode).to.equal(mockDeliveryDetails.postal_code);
            expect(resourceDeliveryDetails.region).to.equal(mockDeliveryDetails.region);
            expect(resourceDeliveryDetails.surname).to.equal(mockDeliveryDetails.surname);
            expect(resourceItem.companyName).to.equal(mockResourceItem.company_name);
            expect(resourceItem.companyNumber).to.equal(mockResourceItem.company_number);
            expect(resourceItem.customerReference).to.equal(mockResourceItem.customer_reference);
            expect(resourceItem.description).to.equal(mockResourceItem.description);
            expect(resourceItem.descriptionIdentifier).to.equal(mockResourceItem.description_identifier);
            expect(resourceItem.descriptionValues).to.deep.equal(mockResourceItem.description_values);
            expect(resourceItem.etag).to.equal(mockResourceItem.etag);
            expect(resourceItem.id).to.equal(mockResourceItem.id);
            expect(resourceItem.itemCosts[0].calculatedCost).to.equal(mockResourceItem.item_costs[0].calculated_cost);
            expect(resourceItem.itemCosts[0].discountApplied).to.equal(mockResourceItem.item_costs[0].discount_applied);
            expect(resourceItem.itemCosts[0].itemCost).to.equal(mockResourceItem.item_costs[0].item_cost);
            expect(resourceItem.itemCosts[0].productType).to.equal(mockResourceItem.item_costs[0].product_type);
            expect(resourceItem.itemOptions).to.deep.equal(mockResourceItem.item_options);
            expect(resourceItem.itemUri).to.equal(mockResourceItem.item_uri);
            expect(resourceItem.kind).to.equal(mockResourceItem.kind);
            expect(resourceItem.links.self).to.equal(mockResourceItem.links.self);
            expect(resourceItem.postageCost).to.equal(mockResourceItem.postage_cost);
            expect(resourceItem.postalDelivery).to.equal(mockResourceItem.postal_delivery);
            expect(resourceItem.quantity).to.equal(mockResourceItem.quantity);
            expect(resourceItem.totalItemCost).to.equal(mockResourceItem.total_item_cost);
        }));
        it("maps basket delivery details with missing fields correctly when PATCH", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockPatchRequest = {
                status: 200,
                body: mockResponseBodyMissingFields
            };
            const mockRequest = sinon_1.default.stub(requestClient, "httpPatch").resolves(mockPatchRequest);
            const basket = new service_1.default(requestClient);
            const data = yield basket.patchBasket(mockRequestBody);
            const resourceDeliveryDetails = data.resource.deliveryDetails;
            const mockDeliveryDetails = mockResponseBodyMissingFields.delivery_details;
            expect(data.httpStatusCode).to.equal(200);
            expect(data.resource.enrolled).to.be.true;
            expect(resourceDeliveryDetails.addressLine1).to.equal(mockDeliveryDetails.address_line_1);
            expect(resourceDeliveryDetails === null || resourceDeliveryDetails === void 0 ? void 0 : resourceDeliveryDetails.addressLine2).to.be.undefined;
            expect(resourceDeliveryDetails === null || resourceDeliveryDetails === void 0 ? void 0 : resourceDeliveryDetails.companyName).to.be.undefined;
            expect(resourceDeliveryDetails.country).to.equal(mockDeliveryDetails.country);
            expect(resourceDeliveryDetails.forename).to.equal(mockDeliveryDetails.forename);
            expect(resourceDeliveryDetails.locality).to.equal(mockDeliveryDetails.locality);
            expect(resourceDeliveryDetails === null || resourceDeliveryDetails === void 0 ? void 0 : resourceDeliveryDetails.poBox).to.be.undefined;
            expect(resourceDeliveryDetails.postalCode).to.equal(mockDeliveryDetails.postal_code);
            expect(resourceDeliveryDetails === null || resourceDeliveryDetails === void 0 ? void 0 : resourceDeliveryDetails.region).to.be.undefined;
            expect(resourceDeliveryDetails.surname).to.equal(mockDeliveryDetails.surname);
        }));
    });
    describe("PUT remove item uri", () => {
        it("return status code 200 on successful call", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockPutRequest = {
                itemUri: "/orderable/certificates/12345678"
            };
            const mockResponse = {
                status: 200
            };
            sinon_1.default.stub(requestClient, "httpPut").resolves(mockResponse);
            const basket = new service_1.default(requestClient);
            const data = yield basket.removeBasketItem(mockPutRequest);
            expect(data.httpStatusCode).to.equal(200);
        }));
    });
    describe("GET Basket links", () => {
        it("returns an error response on failure", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockGetResponse = {
                status: 401
            };
            sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
            const basket = new service_1.default(requestClient);
            const data = yield basket.getBasketLinks();
            expect(data.httpStatusCode).to.equal(401);
        }));
        it("maps the basket data correctly", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockResponseBody = {
                id: "id",
                created_at: "createdAt",
                updated_at: "updatedAt",
                data: {
                    delivery_details: {
                        address_line_1: "117 kings road",
                        address_line_2: "canton",
                        company_name: "Company Name",
                        country: "wales",
                        forename: "John",
                        locality: "Cardiff",
                        po_box: "po box",
                        postal_code: "CF5 3NB",
                        region: "Glamorgan",
                        surname: "Smith"
                    },
                    items: [{
                            item_uri: "/orderable/certificates/CHS00000000000000007"
                        }],
                    enrolled: true
                }
            };
            const mockGetResponse = {
                status: 200,
                body: mockResponseBody
            };
            sinon_1.default.stub(requestClient, "httpGet").resolves(mockGetResponse);
            const basket = new service_1.default(requestClient);
            const data = yield basket.getBasketLinks();
            const resourceDeliveryDetails = data.resource.data.deliveryDetails;
            const mockDeliveryDetails = mockResponseBody.data.delivery_details;
            expect(data.httpStatusCode).to.equal(200);
            expect(data.resource.data.enrolled).to.be.true;
            expect(resourceDeliveryDetails.addressLine1).to.equal(mockDeliveryDetails.address_line_1);
            expect(resourceDeliveryDetails.addressLine2).to.equal(mockDeliveryDetails.address_line_2);
            expect(resourceDeliveryDetails.companyName).to.equal(mockDeliveryDetails.company_name);
            expect(resourceDeliveryDetails.country).to.equal(mockDeliveryDetails.country);
            expect(resourceDeliveryDetails.forename).to.equal(mockDeliveryDetails.forename);
            expect(resourceDeliveryDetails.locality).to.equal(mockDeliveryDetails.locality);
            expect(resourceDeliveryDetails.poBox).to.equal(mockDeliveryDetails.po_box);
            expect(resourceDeliveryDetails.postalCode).to.equal(mockDeliveryDetails.postal_code);
            expect(resourceDeliveryDetails.region).to.equal(mockDeliveryDetails.region);
            expect(resourceDeliveryDetails.surname).to.equal(mockDeliveryDetails.surname);
            expect(data.resource.data.items[0].itemUri).to.equal(mockResponseBody.data.items[0].item_uri);
        }));
    });
});
//# sourceMappingURL=service.spec.js.map