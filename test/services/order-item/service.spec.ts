import sinon from "sinon";
import { IHttpClient, RequestClient } from "../../../src";
import OrderItemService from "../../../src/services/order/order-item/service";
import { expect } from "chai";
import { Success } from "../../../src/services/result";
import { Item } from "../../../src/services/order/order";
import { ApiErrorResponse } from "../../../src/services/resource";
import { itemResourceStub } from "../../stubs/item.stub";

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

        });

        it("Returns failure with response code attached if error occurs", async () => {

        });
    });
});
