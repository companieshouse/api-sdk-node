import { itemUriRequestStub, itemResourceStub } from "../../stubs/item.stub";

import BasketService from "../../../src/services/order/basket/service";
import { RequestClient } from "../../../src/http";
import { ApiResponse, ApiErrorResponse, ApiResult } from "../../../src/services/resource";
import {
    ItemUriRequest,
    BasketPatchRequest,
    Checkout,
    BasketResource,
    BasketLinksResource
} from "../../../src/services/order/basket/types";
import { ItemOptions as MissingImageDeliveryItemOptions } from "../../../src/services/order/mid";
import { ItemOptions as CertifiedCopyItemOptions, ItemOptionsResource as CertifiedCopyItemOptionsResource } from "../../../src/services/order/certified-copies/types";

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

describe("basket", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    afterEach(done => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
        done();
    });

    describe("add item to basket using a POST request", () => {
        it("returns an error response on failure", async () => {
            const mockPostResponse = {
                status: 401,
                error: "An error occurred"
            };

            const mockRequest = jest.spyOn(requestClient, "httpPost").mockClear().mockResolvedValue(mockPostResponse);
            const basket: BasketService = new BasketService(requestClient);
            const data = await basket.postItemToBasket(itemUriRequestStub);

            expect(data.httpStatusCode).toBe(401);
            expect(data.resource).toBeUndefined();
        });

        it("maps add item to basket correctly", async () => {
            const mockPostResponse = {
                status: 200,
                body: itemResourceStub
            };

            const mockRequest = jest.spyOn(requestClient, "httpPost").mockClear().mockResolvedValue(mockPostResponse);
            const basket: BasketService = new BasketService(requestClient);
            const data = await basket.postItemToBasket(itemUriRequestStub);

            expect(data.httpStatusCode).toBe(200);
            expect(data.resource.companyName).toBe(itemResourceStub.company_name);
            expect(data.resource.companyNumber).toBe(itemResourceStub.company_number);
            expect(data.resource.customerReference).toBe(itemResourceStub.customer_reference);
            expect(data.resource.description).toBe(itemResourceStub.description);
            expect(data.resource.descriptionIdentifier).toBe(itemResourceStub.description_identifier);
            expect(data.resource.descriptionValues).toEqual(itemResourceStub.description_values);
            expect(data.resource.etag).toBe(itemResourceStub.etag);
            expect(data.resource.id).toBe(itemResourceStub.id);
            expect(data.resource.itemCosts[0].calculatedCost).toBe(itemResourceStub.item_costs[0].calculated_cost);
            expect(data.resource.itemCosts[0].discountApplied).toBe(itemResourceStub.item_costs[0].discount_applied);
            expect(data.resource.itemCosts[0].itemCost).toBe(itemResourceStub.item_costs[0].item_cost);
            expect(data.resource.itemCosts[0].productType).toBe(itemResourceStub.item_costs[0].product_type);
            expect(data.resource.itemOptions).toEqual({
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
            } as MissingImageDeliveryItemOptions);
            expect(data.resource.itemUri).toBe(itemResourceStub.item_uri);
            expect(data.resource.kind).toBe(itemResourceStub.kind);
            expect(data.resource.links.self).toBe(itemResourceStub.links.self);
            expect(data.resource.postageCost).toBe(itemResourceStub.postage_cost);
            expect(data.resource.postalDelivery).toBe(itemResourceStub.postal_delivery);
            expect(data.resource.quantity).toBe(itemResourceStub.quantity);
            expect(data.resource.totalItemCost).toBe(itemResourceStub.total_item_cost);
        });
    });

    describe("Append item to basket", () => {
        it("returns an error response on failure", async () => {
            const mockPostResponse = {
                status: 401,
                error: "An error occurred"
            };

            jest.spyOn(requestClient, "httpPost").mockClear().mockResolvedValue(mockPostResponse);
            const basket: BasketService = new BasketService(requestClient);
            const data = await basket.appendItemToBasket(itemUriRequestStub);

            expect(data.httpStatusCode).toBe(401);
            expect(data.resource).toBeUndefined();
        });

        it("appends item to basket correctly", async () => {
            const mockPostResponse = {
                status: 200,
                body: itemResourceStub
            };

            jest.spyOn(requestClient, "httpPost").mockClear().mockResolvedValue(mockPostResponse);
            const basket: BasketService = new BasketService(requestClient);
            const data = await basket.appendItemToBasket(itemUriRequestStub);

            expect(data.httpStatusCode).toBe(200);
            expect(data.resource.companyName).toBe(itemResourceStub.company_name);
            expect(data.resource.companyNumber).toBe(itemResourceStub.company_number);
            expect(data.resource.customerReference).toBe(itemResourceStub.customer_reference);
            expect(data.resource.description).toBe(itemResourceStub.description);
            expect(data.resource.descriptionIdentifier).toBe(itemResourceStub.description_identifier);
            expect(data.resource.descriptionValues).toEqual(itemResourceStub.description_values);
            expect(data.resource.etag).toBe(itemResourceStub.etag);
            expect(data.resource.id).toBe(itemResourceStub.id);
            expect(data.resource.itemCosts[0].calculatedCost).toBe(itemResourceStub.item_costs[0].calculated_cost);
            expect(data.resource.itemCosts[0].discountApplied).toBe(itemResourceStub.item_costs[0].discount_applied);
            expect(data.resource.itemCosts[0].itemCost).toBe(itemResourceStub.item_costs[0].item_cost);
            expect(data.resource.itemCosts[0].productType).toBe(itemResourceStub.item_costs[0].product_type);
            expect(data.resource.itemOptions).toEqual({
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
            } as MissingImageDeliveryItemOptions);
            expect(data.resource.itemUri).toBe(itemResourceStub.item_uri);
            expect(data.resource.kind).toBe(itemResourceStub.kind);
            expect(data.resource.links.self).toBe(itemResourceStub.links.self);
            expect(data.resource.postageCost).toBe(itemResourceStub.postage_cost);
            expect(data.resource.postalDelivery).toBe(itemResourceStub.postal_delivery);
            expect(data.resource.quantity).toBe(itemResourceStub.quantity);
            expect(data.resource.totalItemCost).toBe(itemResourceStub.total_item_cost);
        });
    })

    describe("POST checkout basket", () => {
        it("returns an error response on failure", async () => {
            const mockPostResponse = {
                status: 401,
                error: "An error occurred"
            };

            const mockRequest = jest.spyOn(requestClient, "httpPost").mockClear().mockResolvedValue(mockPostResponse);
            const basket: BasketService = new BasketService(requestClient);
            const response = await basket.checkoutBasket();
            const data = response.value as ApiErrorResponse;

            expect(data.httpStatusCode).toBe(401);
            expect(data.errors).toBe("An error occurred");
        });

        it("maps add item to basket correctly", async () => {
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

            const mockRequest = jest.spyOn(requestClient, "httpPost").mockClear().mockResolvedValue(mockPostResponse);
            const basket: BasketService = new BasketService(requestClient);
            const result = await basket.checkoutBasket() as ApiResult<ApiResponse<Checkout>>;
            const data = result.value as ApiResponse<Checkout>;

            expect(data.httpStatusCode).toBe(200);
            expect(data.headers["X-Payment-Required"]).toBe("http://link-to-payment");
            expect(data.resource.checkedOutBy.email).toBe(mockResponseBody.checked_out_by.email);
            expect(data.resource.checkedOutBy.id).toBe(mockResponseBody.checked_out_by.id);
            expect(data.resource.deliveryDetails.addressLine1).toBe(mockResponseBody.delivery_details.address_line_1);
            expect(data.resource.deliveryDetails.addressLine2).toBe(mockResponseBody.delivery_details.address_line_2);
            expect(data.resource.deliveryDetails.companyName).toBe(mockResponseBody.delivery_details.company_name);
            expect(data.resource.deliveryDetails.country).toBe(mockResponseBody.delivery_details.country);
            expect(data.resource.deliveryDetails.forename).toBe(mockResponseBody.delivery_details.forename);
            expect(data.resource.deliveryDetails.locality).toBe(mockResponseBody.delivery_details.locality);
            expect(data.resource.deliveryDetails.poBox).toBe(mockResponseBody.delivery_details.po_box);
            expect(data.resource.deliveryDetails.postalCode).toBe(mockResponseBody.delivery_details.postal_code);
            expect(data.resource.deliveryDetails.region).toBe(mockResponseBody.delivery_details.region);
            expect(data.resource.deliveryDetails.surname).toBe(mockResponseBody.delivery_details.surname);
            expect(data.resource.etag).toBe(mockResponseBody.etag);
            expect(data.resource.items).toEqual(mockResponseBody.items);
            expect(data.resource.kind).toBe(mockResponseBody.kind);
            expect(data.resource.links.payment).toBe(mockResponseBody.links.payment);
            expect(data.resource.links.self).toBe(mockResponseBody.links.self);
            expect(data.resource.paidAt).toBe(mockResponseBody.paid_at);
            expect(data.resource.paymentReference).toBe(mockResponseBody.payment_reference);
            expect(data.resource.reference).toBe(mockResponseBody.reference);
            expect(data.resource.status).toBe(mockResponseBody.status);
            expect(data.resource.totalOrderCost).toBe(mockResponseBody.total_order_cost);
        });
    });

    describe("GET Basket", () => {
        it("returns an error response on failure", async () => {
            const mockGetResponse = {
                status: 401,
                error: "An error occurred"
            };

            const mockRequest = jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetResponse);
            const basket: BasketService = new BasketService(requestClient);
            const data = await basket.getBasket();

            expect(data.httpStatusCode).toBe(401);
            expect(data.resource).toBeUndefined();
        });

        it("maps the basket data correctly", async () => {
            const mockResponseBody: BasketResource = ({
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
                    } as CertifiedCopyItemOptionsResource,
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

            const mockRequest = jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetResponse);
            const basket: BasketService = new BasketService(requestClient);
            const data = await basket.getBasket();
            const resourceDeliveryDetails = data.resource.deliveryDetails;
            const mockDeliveryDetails = mockResponseBody.delivery_details;
            const resourceItem = data.resource.items[0];
            const mockResourceItem = mockResponseBody.items[0];

            expect(data.httpStatusCode).toBe(200);
            expect(data.resource.enrolled).toBe(true);
            expect(resourceDeliveryDetails.addressLine1).toBe(mockDeliveryDetails.address_line_1);
            expect(resourceDeliveryDetails.addressLine2).toBe(mockDeliveryDetails.address_line_2);
            expect(resourceDeliveryDetails.companyName).toBe(mockDeliveryDetails.company_name);
            expect(resourceDeliveryDetails.country).toBe(mockDeliveryDetails.country);
            expect(resourceDeliveryDetails.forename).toBe(mockDeliveryDetails.forename);
            expect(resourceDeliveryDetails.locality).toBe(mockDeliveryDetails.locality);
            expect(resourceDeliveryDetails.poBox).toBe(mockDeliveryDetails.po_box);
            expect(resourceDeliveryDetails.postalCode).toBe(mockDeliveryDetails.postal_code);
            expect(resourceDeliveryDetails.region).toBe(mockDeliveryDetails.region);
            expect(resourceDeliveryDetails.surname).toBe(mockDeliveryDetails.surname);

            expect(resourceItem.companyName).toBe(mockResourceItem.company_name);
            expect(resourceItem.companyNumber).toBe(mockResourceItem.company_number);
            expect(resourceItem.customerReference).toBe(mockResourceItem.customer_reference);
            expect(resourceItem.description).toBe(mockResourceItem.description);
            expect(resourceItem.descriptionIdentifier).toBe(mockResourceItem.description_identifier);
            expect(resourceItem.descriptionValues).toEqual(mockResourceItem.description_values);
            expect(resourceItem.etag).toBe(mockResourceItem.etag);
            expect(resourceItem.id).toBe(mockResourceItem.id);
            expect(resourceItem.itemCosts[0].calculatedCost).toBe(mockResourceItem.item_costs[0].calculated_cost);
            expect(resourceItem.itemCosts[0].discountApplied).toBe(mockResourceItem.item_costs[0].discount_applied);
            expect(resourceItem.itemCosts[0].itemCost).toBe(mockResourceItem.item_costs[0].item_cost);
            expect(resourceItem.itemCosts[0].productType).toBe(mockResourceItem.item_costs[0].product_type);
            expect(resourceItem.itemOptions).toEqual({
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
            } as CertifiedCopyItemOptions);
            expect(resourceItem.itemUri).toBe(mockResourceItem.item_uri);
            expect(resourceItem.kind).toBe(mockResourceItem.kind);
            expect(resourceItem.links.self).toBe(mockResourceItem.links.self);
            expect(resourceItem.postageCost).toBe(mockResourceItem.postage_cost);
            expect(resourceItem.postalDelivery).toBe(mockResourceItem.postal_delivery);
            expect(resourceItem.quantity).toBe(mockResourceItem.quantity);
            expect(resourceItem.totalItemCost).toBe(mockResourceItem.total_item_cost);
        });

        it("maps the basket data correctly with missing fields", async () => {
            const mockResponseBodyMissingFields: BasketResource = ({
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

            const mockRequest = jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetResponse);
            const basket: BasketService = new BasketService(requestClient);
            const data = await basket.getBasket();
            const resourceDeliveryDetails = data.resource.deliveryDetails;
            const mockDeliveryDetails = mockResponseBodyMissingFields.delivery_details;

            expect(data.httpStatusCode).toBe(200);
            expect(data.resource.enrolled).toBe(false);
            expect(resourceDeliveryDetails.addressLine1).toBe(mockDeliveryDetails.address_line_1);
            expect(resourceDeliveryDetails?.addressLine2).toBeUndefined();
            expect(resourceDeliveryDetails?.companyName).toBeUndefined();
            expect(resourceDeliveryDetails.country).toBe(mockDeliveryDetails.country);
            expect(resourceDeliveryDetails.forename).toBe(mockDeliveryDetails.forename);
            expect(resourceDeliveryDetails.locality).toBe(mockDeliveryDetails.locality);
            expect(resourceDeliveryDetails?.poBox).toBeUndefined();
            expect(resourceDeliveryDetails.postalCode).toBe(mockDeliveryDetails.postal_code);
            expect(resourceDeliveryDetails?.region).toBeUndefined();
            expect(resourceDeliveryDetails.surname).toBe(mockDeliveryDetails.surname);
        });
    });

    describe("PATCH basket", () => {
        const mockRequestBody: BasketPatchRequest = ({
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

        const mockResponseBody: BasketResource = ({
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
                item_options: { key: {} } as any,
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

        const mockResponseBodyMissingFields: BasketResource = ({
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

        it("returns an error response on failure", async () => {
            const mockPatchRequest = {
                status: 401,
                error: "An error occurred"
            };

            const mockRequest = jest.spyOn(requestClient, "httpPatch").mockClear().mockResolvedValue(mockPatchRequest);
            const basket: BasketService = new BasketService(requestClient);
            const data = await basket.patchBasket(mockRequestBody);

            expect(data.httpStatusCode).toBe(401);
            expect(data.resource).toBeUndefined();
        });

        it("maps basket delivery details correctly when PATCH", async () => {
            const mockPatchRequest = {
                status: 200,
                body: mockResponseBody
            };

            const mockRequest = jest.spyOn(requestClient, "httpPatch").mockClear().mockResolvedValue(mockPatchRequest);
            const basket: BasketService = new BasketService(requestClient);
            const data = await basket.patchBasket(mockRequestBody);
            const resourceDeliveryDetails = data.resource.deliveryDetails;
            const mockDeliveryDetails = mockResponseBody.delivery_details;
            const resourceItem = data.resource.items[0];
            const mockResourceItem = mockResponseBody.items[0];

            expect(data.httpStatusCode).toBe(200);
            expect(data.resource.enrolled).toBe(true);
            expect(resourceDeliveryDetails.addressLine1).toBe(mockDeliveryDetails.address_line_1);
            expect(resourceDeliveryDetails.addressLine2).toBe(mockDeliveryDetails.address_line_2);
            expect(resourceDeliveryDetails.companyName).toBe(mockDeliveryDetails.company_name);
            expect(resourceDeliveryDetails.country).toBe(mockDeliveryDetails.country);
            expect(resourceDeliveryDetails.forename).toBe(mockDeliveryDetails.forename);
            expect(resourceDeliveryDetails.locality).toBe(mockDeliveryDetails.locality);
            expect(resourceDeliveryDetails.poBox).toBe(mockDeliveryDetails.po_box);
            expect(resourceDeliveryDetails.postalCode).toBe(mockDeliveryDetails.postal_code);
            expect(resourceDeliveryDetails.region).toBe(mockDeliveryDetails.region);
            expect(resourceDeliveryDetails.surname).toBe(mockDeliveryDetails.surname);
            expect(resourceItem.companyName).toBe(mockResourceItem.company_name);
            expect(resourceItem.companyNumber).toBe(mockResourceItem.company_number);
            expect(resourceItem.customerReference).toBe(mockResourceItem.customer_reference);
            expect(resourceItem.description).toBe(mockResourceItem.description);
            expect(resourceItem.descriptionIdentifier).toBe(mockResourceItem.description_identifier);
            expect(resourceItem.descriptionValues).toEqual(mockResourceItem.description_values);
            expect(resourceItem.etag).toBe(mockResourceItem.etag);
            expect(resourceItem.id).toBe(mockResourceItem.id);
            expect(resourceItem.itemCosts[0].calculatedCost).toBe(mockResourceItem.item_costs[0].calculated_cost);
            expect(resourceItem.itemCosts[0].discountApplied).toBe(mockResourceItem.item_costs[0].discount_applied);
            expect(resourceItem.itemCosts[0].itemCost).toBe(mockResourceItem.item_costs[0].item_cost);
            expect(resourceItem.itemCosts[0].productType).toBe(mockResourceItem.item_costs[0].product_type);
            expect(resourceItem.itemOptions).toEqual(mockResourceItem.item_options);
            expect(resourceItem.itemUri).toBe(mockResourceItem.item_uri);
            expect(resourceItem.kind).toBe(mockResourceItem.kind);
            expect(resourceItem.links.self).toBe(mockResourceItem.links.self);
            expect(resourceItem.postageCost).toBe(mockResourceItem.postage_cost);
            expect(resourceItem.postalDelivery).toBe(mockResourceItem.postal_delivery);
            expect(resourceItem.quantity).toBe(mockResourceItem.quantity);
            expect(resourceItem.totalItemCost).toBe(mockResourceItem.total_item_cost);
        });

        it(
            "maps basket delivery details with missing fields correctly when PATCH",
            async () => {
                const mockPatchRequest = {
                    status: 200,
                    body: mockResponseBodyMissingFields
                };

                const mockRequest = jest.spyOn(requestClient, "httpPatch").mockClear().mockResolvedValue(mockPatchRequest);
                const basket: BasketService = new BasketService(requestClient);
                const data = await basket.patchBasket(mockRequestBody);
                const resourceDeliveryDetails = data.resource.deliveryDetails;
                const mockDeliveryDetails = mockResponseBodyMissingFields.delivery_details;

                expect(data.httpStatusCode).toBe(200);
                expect(data.resource.enrolled).toBe(true);
                expect(resourceDeliveryDetails.addressLine1).toBe(mockDeliveryDetails.address_line_1);
                expect(resourceDeliveryDetails?.addressLine2).toBeUndefined();
                expect(resourceDeliveryDetails?.companyName).toBeUndefined();
                expect(resourceDeliveryDetails.country).toBe(mockDeliveryDetails.country);
                expect(resourceDeliveryDetails.forename).toBe(mockDeliveryDetails.forename);
                expect(resourceDeliveryDetails.locality).toBe(mockDeliveryDetails.locality);
                expect(resourceDeliveryDetails?.poBox).toBeUndefined();
                expect(resourceDeliveryDetails.postalCode).toBe(mockDeliveryDetails.postal_code);
                expect(resourceDeliveryDetails?.region).toBeUndefined();
                expect(resourceDeliveryDetails.surname).toBe(mockDeliveryDetails.surname);
            }
        );
    });

    describe("PUT remove item uri", () => {
        it("return status code 200 on successful call", async () => {
            const mockPutRequest = {
                itemUri: "/orderable/certificates/12345678"
            } as ItemUriRequest;

            const mockResponse = {
                status: 200
            };

            jest.spyOn(requestClient, "httpPut").mockClear().mockResolvedValue(mockResponse);
            const basket: BasketService = new BasketService(requestClient);
            const data = await basket.removeBasketItem(mockPutRequest);

            expect(data.httpStatusCode).toBe(200);
        });
    });

    describe("GET Basket links", () => {
        it("returns an error response on failure", async () => {
            const mockGetResponse = {
                status: 401
            };

            jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetResponse);
            const basket: BasketService = new BasketService(requestClient);
            const data = await basket.getBasketLinks();

            expect(data.httpStatusCode).toBe(401);
        });

        it("maps the basket data correctly", async () => {
            const mockResponseBody: BasketLinksResource = {
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

            jest.spyOn(requestClient, "httpGet").mockClear().mockResolvedValue(mockGetResponse);
            const basket: BasketService = new BasketService(requestClient);
            const data = await basket.getBasketLinks();
            const resourceDeliveryDetails = data.resource.data.deliveryDetails;
            const mockDeliveryDetails = mockResponseBody.data.delivery_details;

            expect(data.httpStatusCode).toBe(200);
            expect(data.resource.data.enrolled).toBe(true);
            expect(resourceDeliveryDetails.addressLine1).toBe(mockDeliveryDetails.address_line_1);
            expect(resourceDeliveryDetails.addressLine2).toBe(mockDeliveryDetails.address_line_2);
            expect(resourceDeliveryDetails.companyName).toBe(mockDeliveryDetails.company_name);
            expect(resourceDeliveryDetails.country).toBe(mockDeliveryDetails.country);
            expect(resourceDeliveryDetails.forename).toBe(mockDeliveryDetails.forename);
            expect(resourceDeliveryDetails.locality).toBe(mockDeliveryDetails.locality);
            expect(resourceDeliveryDetails.poBox).toBe(mockDeliveryDetails.po_box);
            expect(resourceDeliveryDetails.postalCode).toBe(mockDeliveryDetails.postal_code);
            expect(resourceDeliveryDetails.region).toBe(mockDeliveryDetails.region);
            expect(resourceDeliveryDetails.surname).toBe(mockDeliveryDetails.surname);
            expect(data.resource.data.items[0].itemUri).toBe(mockResponseBody.data.items[0].item_uri);
        });
    });
});
