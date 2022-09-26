import sinon from "sinon";
import { RequestClient } from "../../../src";
import { expect } from "chai";
import { Success, Failure } from "../../../src/services/result";
import { Item } from "../../../src/services/order/order";
import CheckoutItemService, { CheckoutItemErrorResponse } from "../../../src/services/order/checkout-item/service";
import { Checkout } from "../../../src/services/order/checkout";
import {
    CERTIFIED_COPY_CHECKOUT_ID,
    MISSING_IMAGE_DELIVERY_CHECKOUT_ID, mockCertifiedCopyCheckoutResponseBody,
    mockMissingImageDeliveryCheckoutResponseBody
} from "../../stubs/checkout-item.stub";

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });
const sandbox = sinon.createSandbox();

afterEach(() => {
    sandbox.reset();
    sandbox.restore();
})

describe("CheckoutItemService", () => {
    describe("getCheckoutItem", () => {
        it("Maps missing image delivery item to object containing camel case keys", async () => {
            // given
            const serverResponse = {
                status: 200,
                body: mockMissingImageDeliveryCheckoutResponseBody
            };
            sandbox.mock(requestClient)
                .expects("httpGet")
                .once()
                .withArgs("/checkouts/ORD-123123-123123/items/MID-123123-123123")
                .returns(serverResponse);
            const checkoutItemService = new CheckoutItemService(requestClient);

            // when
            const actual = await checkoutItemService.getCheckoutItem("ORD-123123-123123", "MID-123123-123123") as Success<Checkout, CheckoutItemErrorResponse>;

            // then
            expect(actual.isSuccess()).to.be.true;
            expect(actual.value).to.deep.equal({
                status: "paid",
                paymentReference: "q4nn5UxZiZxVG2e",
                etag: "80bd2953c79729aa0885f6987208690341376db0",
                items: [{
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
                } as Item],
                kind: "order",
                totalOrderCost: "3",
                reference: MISSING_IMAGE_DELIVERY_CHECKOUT_ID,
                paidAt: "2020-10-07T11:09:46.196",
                checkedOutBy: {
                    email: "demo@ch.gov.uk",
                    id: "67ZeMsvAEgkBWs7tNKacdrPvOmQ"
                },
                links: {
                    self: `/checkouts/${MISSING_IMAGE_DELIVERY_CHECKOUT_ID}`,
                    payment: `/basket/checkouts/${MISSING_IMAGE_DELIVERY_CHECKOUT_ID}/payment`
                }
            } as Checkout);
        });

        it("Maps certified copy item to object containing camel case keys", async () => {
            // given
            const serverResponse = {
                status: 200,
                body: mockCertifiedCopyCheckoutResponseBody
            };
            sandbox.mock(requestClient)
                .expects("httpGet")
                .once()
                .withArgs("/checkouts/ORD-123123-123123/items/CCD-123456-123456")
                .returns(serverResponse);
            const checkoutItemService = new CheckoutItemService(requestClient);

            // when
            const actual = await checkoutItemService.getCheckoutItem("ORD-123123-123123", "CCD-123456-123456") as Success<Checkout, CheckoutItemErrorResponse>;

            // then
            expect(actual.isSuccess()).to.be.true;
            expect(actual.value).to.deep.equal({
                status: "paid",
                paymentReference: "PN8h8EHBLddO94R",
                etag: "f90bd3844c44b640728be9ee70ffbda8ff5ec316",
                deliveryDetails: {
                    country: "United Kingdom",
                    forename: "bob",
                    locality: "local",
                    postalCode: "postcode",
                    region: "region",
                    surname: "bob",
                    addressLine1: "address line 1",
                    addressLine2: "address line 2",
                    companyName: "company name",
                    poBox: "po box"
                },
                items: [{
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
                } as Item],
                kind: "order",
                totalOrderCost: "45",
                reference: CERTIFIED_COPY_CHECKOUT_ID,
                paidAt: "2020-08-28T11:43:36.817",
                checkedOutBy: {
                    email: "example@email.com",
                    id: "Y2VkZWVlMzhlZWFjY2M4MzQ3MT"
                },
                links: {
                    self: `/checkouts/${CERTIFIED_COPY_CHECKOUT_ID}`,
                    payment: `/basket/checkouts/${CERTIFIED_COPY_CHECKOUT_ID}/payment`
                }
            } as Checkout);
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
                .withArgs("/checkouts/ORD-123123-123123/items/CCD-123456-123456")
                .returns(serverResponse);
            const checkoutItemService = new CheckoutItemService(requestClient);

            // when
            const actual = await checkoutItemService.getCheckoutItem("ORD-123123-123123", "CCD-123456-123456") as Failure<Checkout, CheckoutItemErrorResponse>;

            expect(actual.isFailure()).to.be.true;
            expect(actual.value.httpStatusCode).to.equal(401);
            expect(actual.value.error).to.equal("An error occurred");
        });

        // Returns failure with response code attached if items does not contain exactly one item
        it("test me please", async () => {
            // given
            const serverResponse = {
                status: 200,
                body: { ...mockMissingImageDeliveryCheckoutResponseBody, items: [] }
            };
            sandbox.mock(requestClient)
                .expects("httpGet")
                .once()
                .withArgs("/checkouts/ORD-123123-123123/items/CCD-123456-123456")
                .returns(serverResponse);
            const checkoutItemService = new CheckoutItemService(requestClient);

            // when
            const actual = await checkoutItemService.getCheckoutItem("ORD-123123-123123", "CCD-123456-123456") as Failure<Checkout, CheckoutItemErrorResponse>;

            expect(actual.isFailure()).to.be.true;
            expect(actual.value.httpStatusCode).to.equal(200);
            expect(actual.value.error).to.equal("Expected checkout returned by api to have exactly one embedded item.");
        });
    });
});
