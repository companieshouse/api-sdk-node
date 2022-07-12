import chai from "chai";
import sinon from "sinon";
import chaiAsPromised from "chai-as-promised";
import chaiHttp from "chai-http";

import BasketService from "../../../src/services/order/basket/service";
import { RequestClient, HttpResponse } from "../../../src/http";
import Resource, { ApiResponse, ApiErrorResponse, ApiResult } from "../../../src/services/resource";
import { ItemUriPostRequest, BasketItemResource, BasketPatchRequest, Checkout, CheckoutResource, BasketResource } from "../../../src/services/order/basket/types";
const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

describe("basket", () => {
    beforeEach(() => {
        sinon.reset();
        sinon.restore();
    });

    afterEach(done => {
        sinon.reset();
        sinon.restore();
        done();
    });

    describe("add item to basket using a POST request", () => {
        const mockRequestBody: ItemUriPostRequest = ({
            itemUri: "/orderable/certificates/CHS00000000000000007"
        });

        const mockResponseBody: BasketItemResource = ({
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
            total_item_cost: "total item cost"
        });

        it("returns an error response on failure", async () => {
            const mockPostResponse = {
                status: 401,
                error: "An error occurred"
            };

            const mockRequest = sinon.stub(requestClient, "httpPost").resolves(mockPostResponse);
            const basket: BasketService = new BasketService(requestClient);
            const data = await basket.postItemToBasket(mockRequestBody);

            expect(data.httpStatusCode).to.equal(401);
            expect(data.resource).to.be.undefined;
        });

        it("maps add item to basket correctly", async () => {
            const mockPostResponse = {
                status: 200,
                body: mockResponseBody
            };

            const mockRequest = sinon.stub(requestClient, "httpPost").resolves(mockPostResponse);
            const basket: BasketService = new BasketService(requestClient);
            const data = await basket.postItemToBasket(mockRequestBody);

            expect(data.httpStatusCode).to.equal(200);
            expect(data.resource.companyName).to.equal(mockResponseBody.company_name);
            expect(data.resource.companyNumber).to.equal(mockResponseBody.company_number);
            expect(data.resource.customerReference).to.equal(mockResponseBody.customer_reference);
            expect(data.resource.description).to.equal(mockResponseBody.description);
            expect(data.resource.descriptionIdentifier).to.equal(mockResponseBody.description_identifier);
            expect(data.resource.descriptionValues).to.equal(mockResponseBody.description_values);
            expect(data.resource.etag).to.equal(mockResponseBody.etag);
            expect(data.resource.id).to.equal(mockResponseBody.id);
            expect(data.resource.itemCosts[0].calculatedCost).to.equal(mockResponseBody.item_costs[0].calculated_cost);
            expect(data.resource.itemCosts[0].discountApplied).to.equal(mockResponseBody.item_costs[0].discount_applied);
            expect(data.resource.itemCosts[0].itemCost).to.equal(mockResponseBody.item_costs[0].item_cost);
            expect(data.resource.itemCosts[0].productType).to.equal(mockResponseBody.item_costs[0].product_type);
            expect(data.resource.itemOptions).to.equal(mockResponseBody.item_options);
            expect(data.resource.itemUri).to.equal(mockResponseBody.item_uri);
            expect(data.resource.kind).to.equal(mockResponseBody.kind);
            expect(data.resource.links.self).to.equal(mockResponseBody.links.self);
            expect(data.resource.postageCost).to.equal(mockResponseBody.postage_cost);
            expect(data.resource.postalDelivery).to.equal(mockResponseBody.postal_delivery);
            expect(data.resource.quantity).to.equal(mockResponseBody.quantity);
            expect(data.resource.totalItemCost).to.equal(mockResponseBody.total_item_cost);
        });
    });

    describe("POST checkout basket", () => {
        it("returns an error response on failure", async () => {
            const mockPostResponse = {
                status: 401,
                error: "An error occurred"
            };

            const mockRequest = sinon.stub(requestClient, "httpPost").resolves(mockPostResponse);
            const basket: BasketService = new BasketService(requestClient);
            const response = await basket.checkoutBasket();
            const data = response.value as ApiErrorResponse;

            expect(data.httpStatusCode).to.equal(401);
            expect(data.errors).to.equal("An error occurred");
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

            const mockRequest = sinon.stub(requestClient, "httpPost").resolves(mockPostResponse);
            const basket: BasketService = new BasketService(requestClient);
            const result = await basket.checkoutBasket() as ApiResult<ApiResponse<Checkout>>;
            const data = result.value as ApiResponse<Checkout>;

            expect(data.httpStatusCode).to.equal(200);
            expect(data.headers["X-Payment-Required"]).to.equal("http://link-to-payment");
            expect(data.resource.checkedOutBy.email).to.equal(mockResponseBody.checked_out_by.email);
            expect(data.resource.checkedOutBy.id).to.equal(mockResponseBody.checked_out_by.id);
            expect(data.resource.deliveryDetails.addressLine1).to.equal(mockResponseBody.delivery_details.address_line_1);
            expect(data.resource.deliveryDetails.addressLine2).to.equal(mockResponseBody.delivery_details.address_line_2);
            expect(data.resource.deliveryDetails.country).to.equal(mockResponseBody.delivery_details.country);
            expect(data.resource.deliveryDetails.forename).to.equal(mockResponseBody.delivery_details.forename);
            expect(data.resource.deliveryDetails.locality).to.equal(mockResponseBody.delivery_details.locality);
            expect(data.resource.deliveryDetails.poBox).to.equal(mockResponseBody.delivery_details.po_box);
            expect(data.resource.deliveryDetails.postalCode).to.equal(mockResponseBody.delivery_details.postal_code);
            expect(data.resource.deliveryDetails.region).to.equal(mockResponseBody.delivery_details.region);
            expect(data.resource.deliveryDetails.surname).to.equal(mockResponseBody.delivery_details.surname);
            expect(data.resource.etag).to.equal(mockResponseBody.etag);
            expect(data.resource.items).to.equal(mockResponseBody.items);
            expect(data.resource.kind).to.equal(mockResponseBody.kind);
            expect(data.resource.links.payment).to.equal(mockResponseBody.links.payment);
            expect(data.resource.links.self).to.equal(mockResponseBody.links.self);
            expect(data.resource.paidAt).to.equal(mockResponseBody.paid_at);
            expect(data.resource.paymentReference).to.equal(mockResponseBody.payment_reference);
            expect(data.resource.reference).to.equal(mockResponseBody.reference);
            expect(data.resource.status).to.equal(mockResponseBody.status);
            expect(data.resource.totalOrderCost).to.equal(mockResponseBody.total_order_cost);
        });
    });

    describe("GET Basket", () => {
        it("returns an error response on failure", async () => {
            const mockGetResponse = {
                status: 401,
                error: "An error occurred"
            };

            const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
            const basket: BasketService = new BasketService(requestClient);
            const data = await basket.getBasket();

            expect(data.httpStatusCode).to.equal(401);
            expect(data.resource).to.be.undefined;
        });

        it("maps the basket data correctly", async () => {
            const mockResponseBody: BasketResource = ({
                delivery_details: {
                    address_line_1: "117 kings road",
                    address_line_2: "canton",
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
                    total_item_cost: "total item cost"
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

            const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
            const basket: BasketService = new BasketService(requestClient);
            const data = await basket.getBasket();
            const resourceDeliveryDetails = data.resource.deliveryDetails;
            const mockDeliveryDetails = mockResponseBody.delivery_details;
            const resourceItem = data.resource.items[0];
            const mockResourceItem = mockResponseBody.items[0];

            expect(data.httpStatusCode).to.equal(200);
            expect(data.resource.enrolled).to.be.true;
            expect(resourceDeliveryDetails.addressLine1).to.equal(mockDeliveryDetails.address_line_1);
            expect(resourceDeliveryDetails.addressLine2).to.equal(mockDeliveryDetails.address_line_2);
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
        });

        it("maps the basket data correctly with missing fields", async () => {
            const mockResponseBodyMissingFields: BasketResource = ({
                delivery_details: {
                    address_line_1: "117 kings road",
                    address_line_2: undefined,
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

            const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
            const basket: BasketService = new BasketService(requestClient);
            const data = await basket.getBasket();
            const resourceDeliveryDetails = data.resource.deliveryDetails;
            const mockDeliveryDetails = mockResponseBodyMissingFields.delivery_details;

            expect(data.httpStatusCode).to.equal(200);
            expect(data.resource.enrolled).to.be.false;
            expect(resourceDeliveryDetails.addressLine1).to.equal(mockDeliveryDetails.address_line_1);
            expect(resourceDeliveryDetails?.addressLine2).to.be.undefined;
            expect(resourceDeliveryDetails.country).to.equal(mockDeliveryDetails.country);
            expect(resourceDeliveryDetails.forename).to.equal(mockDeliveryDetails.forename);
            expect(resourceDeliveryDetails.locality).to.equal(mockDeliveryDetails.locality);
            expect(resourceDeliveryDetails?.poBox).to.be.undefined;
            expect(resourceDeliveryDetails.postalCode).to.equal(mockDeliveryDetails.postal_code);
            expect(resourceDeliveryDetails?.region).to.be.undefined;
            expect(resourceDeliveryDetails.surname).to.equal(mockDeliveryDetails.surname);
        });
    });

    describe("PATCH basket", () => {
        const mockRequestBody: BasketPatchRequest = ({
            deliveryDetails: {
                addressLine1: "117 kings road",
                addressLine2: "canton",
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
                total_item_cost: "total item cost"
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

            const mockRequest = sinon.stub(requestClient, "httpPatch").resolves(mockPatchRequest);
            const basket: BasketService = new BasketService(requestClient);
            const data = await basket.patchBasket(mockRequestBody);

            expect(data.httpStatusCode).to.equal(401);
            expect(data.resource).to.be.undefined;
        });

        it("maps basket delivery details correctly when PATCH", async () => {
            const mockPatchRequest = {
                status: 200,
                body: mockResponseBody
            };

            const mockRequest = sinon.stub(requestClient, "httpPatch").resolves(mockPatchRequest);
            const basket: BasketService = new BasketService(requestClient);
            const data = await basket.patchBasket(mockRequestBody);
            const resourceDeliveryDetails = data.resource.deliveryDetails;
            const mockDeliveryDetails = mockResponseBody.delivery_details;
            const resourceItem = data.resource.items[0];
            const mockResourceItem = mockResponseBody.items[0];

            expect(data.httpStatusCode).to.equal(200);
            expect(data.resource.enrolled).to.be.true;
            expect(resourceDeliveryDetails.addressLine1).to.equal(mockDeliveryDetails.address_line_1);
            expect(resourceDeliveryDetails.addressLine2).to.equal(mockDeliveryDetails.address_line_2);
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
        });

        it("maps basket delivery details with missing fields correctly when PATCH", async () => {
            const mockPatchRequest = {
                status: 200,
                body: mockResponseBodyMissingFields
            };

            const mockRequest = sinon.stub(requestClient, "httpPatch").resolves(mockPatchRequest);
            const basket: BasketService = new BasketService(requestClient);
            const data = await basket.patchBasket(mockRequestBody);
            const resourceDeliveryDetails = data.resource.deliveryDetails;
            const mockDeliveryDetails = mockResponseBodyMissingFields.delivery_details;

            expect(data.httpStatusCode).to.equal(200);
            expect(data.resource.enrolled).to.be.true;
            expect(resourceDeliveryDetails.addressLine1).to.equal(mockDeliveryDetails.address_line_1);
            expect(resourceDeliveryDetails?.addressLine2).to.be.undefined;
            expect(resourceDeliveryDetails.country).to.equal(mockDeliveryDetails.country);
            expect(resourceDeliveryDetails.forename).to.equal(mockDeliveryDetails.forename);
            expect(resourceDeliveryDetails.locality).to.equal(mockDeliveryDetails.locality);
            expect(resourceDeliveryDetails?.poBox).to.be.undefined;
            expect(resourceDeliveryDetails.postalCode).to.equal(mockDeliveryDetails.postal_code);
            expect(resourceDeliveryDetails?.region).to.be.undefined;
            expect(resourceDeliveryDetails.surname).to.equal(mockDeliveryDetails.surname);
        });
    });
});
