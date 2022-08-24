import sinon from "sinon";
import { IHttpClient, RequestClient } from "../../../src";
import OrderItemService, { OrderItemErrorResponse } from "../../../src/services/order/order-item/service";
import { expect } from "chai";
import { Success } from "../../../src/services/result";
import { Item } from "../../../src/services/order/order";
import { ApiErrorResponse } from "../../../src/services/resource";
import { certifiedCopyItemStub, itemResourceStub } from "../../stubs/item.stub";
import { Failure } from "../../../dist/services/result";

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
const sandbox = sinon.createSandbox();

afterEach(() => {
    sandbox.reset();
    sandbox.restore();
})

describe("OrderItemService", () => {
    describe("getOrderItem", () => {
        it("Maps missing image delivery item to object containing camel case keys", async () => {
            // given
            const serverResponse = {
                status: 200,
                body: itemResourceStub
            };
            sandbox.mock(requestClient)
                .expects("httpGet")
                .once()
                .withArgs("/orders/ORD-123123-123123/items/MID-123123-123123")
                .returns(serverResponse);
            const orderItemService = new OrderItemService(requestClient);

            // when
            const actual = await orderItemService.getOrderItem("ORD-123123-123123", "MID-123123-123123") as Success<Item, ApiErrorResponse>;

            // then
            expect(actual.isSuccess()).to.be.true;
            expect(actual.value).to.deep.equal({
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
            } as Item);
        });

        it("Maps certified copy item to object containing camel case keys", async () => {
            // given
            const serverResponse = {
                status: 200,
                body: certifiedCopyItemStub
            };
            sandbox.mock(requestClient)
                .expects("httpGet")
                .once()
                .withArgs("/orders/ORD-123123-123123/items/CCD-123456-123456")
                .returns(serverResponse);
            const orderItemService = new OrderItemService(requestClient);

            // when
            const actual = await orderItemService.getOrderItem("ORD-123123-123123", "CCD-123456-123456") as Success<Item, ApiErrorResponse>;

            // then
            expect(actual.isSuccess()).to.be.true;
            expect(actual.value).to.deep.equal({
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
            } as Item);
        });

        it("Returns failure with response code attached if error occurs", async () => {
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
            const orderItemService = new OrderItemService(requestClient);

            // when
            const actual = await orderItemService.getOrderItem("ORD-123123-123123", "CCD-123456-123456") as Failure<Item, OrderItemErrorResponse>;

            expect(actual.isFailure()).to.be.true;
            expect(actual.value.httpStatusCode).to.equal(401);
            expect(actual.value.error).to.equal("An error occurred");
        });
    });
});
