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
const sinon_1 = __importDefault(require("sinon"));
const src_1 = require("../../../src");
const service_1 = __importDefault(require("../../../src/services/order/order-item/service"));
const chai_1 = require("chai");
const item_stub_1 = require("../../stubs/item.stub");
const requestClient = new src_1.RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
const sandbox = sinon_1.default.createSandbox();
afterEach(() => {
    sandbox.reset();
    sandbox.restore();
});
describe("OrderItemService", () => {
    describe("getOrderItem", () => {
        it("Maps missing image delivery item to object containing camel case keys", () => __awaiter(void 0, void 0, void 0, function* () {
            // given
            const serverResponse = {
                status: 200,
                body: item_stub_1.itemResourceStub
            };
            sandbox.mock(requestClient)
                .expects("httpGet")
                .once()
                .withArgs("/orders/ORD-123123-123123/items/MID-123123-123123")
                .returns(serverResponse);
            const orderItemService = new service_1.default(requestClient);
            // when
            const actual = yield orderItemService.getOrderItem("ORD-123123-123123", "MID-123123-123123");
            // then
            chai_1.expect(actual.isSuccess()).to.be.true;
            chai_1.expect(actual.value).to.deep.equal({
                companyName: "company name",
                companyNumber: "00000000",
                customerReference: "reference",
                description: "description",
                descriptionIdentifier: "description identifier",
                descriptionValues: {
                    key: "value"
                },
                etag: "etag",
                id: "id",
                itemCosts: [{
                        calculatedCost: "calculated cost",
                        discountApplied: "discount applies",
                        itemCost: "item cost",
                        productType: "product type"
                    }],
                itemOptions: {
                    filingHistoryDate: "filing history date",
                    filingHistoryDescription: "filing history description",
                    filingHistoryDescriptionValues: {
                        key_one: "value_one",
                        key_two: "value_two"
                    },
                    filingHistoryId: "filing history id",
                    filingHistoryType: "filing history type",
                    filingHistoryBarcode: "filing history barcode",
                    filingHistoryCost: "filing history cost",
                    filingHistoryCategory: "filing history category"
                },
                itemUri: "/orderable/certificates/CHS00000000000000007",
                kind: "item#missing-image-delivery",
                links: {
                    self: "links"
                },
                postageCost: "postage cost",
                postalDelivery: true,
                quantity: 1,
                totalItemCost: "total item cost",
                status: "unknown"
            });
        }));
        it("Maps certified copy item to object containing camel case keys", () => __awaiter(void 0, void 0, void 0, function* () {
            // given
            const serverResponse = {
                status: 200,
                body: item_stub_1.certifiedCopyItemStub
            };
            sandbox.mock(requestClient)
                .expects("httpGet")
                .once()
                .withArgs("/orders/ORD-123123-123123/items/CCD-123456-123456")
                .returns(serverResponse);
            const orderItemService = new service_1.default(requestClient);
            // when
            const actual = yield orderItemService.getOrderItem("ORD-123123-123123", "CCD-123456-123456");
            // then
            chai_1.expect(actual.isSuccess()).to.be.true;
            chai_1.expect(actual.value).to.deep.equal({
                id: "CCD-123456-123456",
                companyName: "Company Name",
                companyNumber: "00006400",
                description: "certified copy for company 00000000",
                descriptionIdentifier: "certified-copy",
                descriptionValues: {
                    company_number: "00000000",
                    "certified-copy": "certified copy for company 00000000"
                },
                itemCosts: [
                    {
                        discountApplied: "0",
                        itemCost: "15",
                        calculatedCost: "15",
                        productType: "certified-copy"
                    }
                ],
                itemOptions: {
                    collectionLocation: "london",
                    contactNumber: "0123456789",
                    deliveryMethod: "postal",
                    deliveryTimescale: "standard",
                    filingHistoryDocuments: [
                        {
                            filingHistoryDate: "2010-02-12",
                            filingHistoryDescription: "change-person-director-company-with-change-date",
                            filingHistoryDescriptionValues: {
                                change_date: "2010-02-12",
                                officer_name: "Thomas David Wheare"
                            },
                            filingHistoryId: "MzAwOTM2MDg5OWFkaXF6a2N4",
                            filingHistoryType: "CH01",
                            filingHistoryCost: "15"
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
                itemUri: "/orderable/certified-copies/CCD-123456-123456",
                status: "unknown",
                postageCost: "0",
                totalItemCost: "15",
                postalDelivery: true
            });
        }));
        it("Returns failure with response code attached if error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
            // given
            const serverResponse = {
                status: 401,
                error: {
                    error: "An error occurred"
                }
            };
            sandbox.mock(requestClient)
                .expects("httpGet")
                .once()
                .withArgs("/orders/ORD-123123-123123/items/CCD-123456-123456")
                .returns(serverResponse);
            const orderItemService = new service_1.default(requestClient);
            // when
            const actual = yield orderItemService.getOrderItem("ORD-123123-123123", "CCD-123456-123456");
            chai_1.expect(actual.isFailure()).to.be.true;
            chai_1.expect(actual.value.httpStatusCode).to.equal(401);
            chai_1.expect(actual.value.error).to.equal("An error occurred");
        }));
    });
});
//# sourceMappingURL=service.spec.js.map