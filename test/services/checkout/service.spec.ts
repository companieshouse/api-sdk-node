import chai from "chai";
import sinon from "sinon";

import CheckoutService from "../../../src/services/order/checkout/service";
import { RequestClient } from "../../../src/http";

import {
    Checkout, CheckoutResource, CertificateItemOptionsResource, CertifiedCopyItemOptionsResource,
    CertificateItemOptions, CertifiedCopyItemOptions, MissingImageDeliveryItemOptionsResource, MissingImageDeliveryItemOptions
} from "../../../src/services/order/checkout";
import { ApiErrorResponse, ApiResponse } from "../../../src/services/resource";
import { Failure, Success } from "../../../src/services/result";
const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

const CERTIFICATE_CHECKOUT_ID = "ORD-123456-123456";
const CERTIFIED_COPY_CHECKOUT_ID = "ORD-1111111-1111111";
const MISSING_IMAGE_DELIVERY_CHECKOUT_ID = "ORD-222222-222222";

const mockCertificateCheckoutResponseBody: CheckoutResource = {
    paid_at: "2020-05-15T08:41:05.798Z",
    checked_out_by: {
        id: "123456",
        email: "email@examlpe.come"
    },
    links: {
        self: `/checkouts/${CERTIFICATE_CHECKOUT_ID}`,
        payment: `/basket/checkouts/${CERTIFICATE_CHECKOUT_ID}/payment`
    },
    status: "paid",
    payment_reference: "1234567",
    etag: "abcdefghijk123456789",
    delivery_details: {
        address_line_1: "address line 1",
        address_line_2: "address line 2",
        country: "country",
        forename: "forename",
        locality: "locality",
        postal_code: "postal code",
        region: "region",
        surname: "surname",
        po_box: "po box"
    },
    items: [{
        id: "CRT-123456-123456",
        company_name: "Company Name",
        company_number: "00000000",
        description: "certificate for company 00000000",
        description_identifier: "certificate",
        description_values: {
            certificate: "certificate for company 00000000",
            company_number: "00000000"
        },
        item_costs: [{
            discount_applied: "0",
            item_cost: "15",
            calculated_cost: "15",
            product_type: "certificate"
        }],
        item_options: {
            company_type: "llp",
            certificate_type: "incorporation-with-all-name-changes",
            delivery_method: "postal",
            delivery_timescale: "standard",
            director_details: {
                include_basic_information: true
            },
            designated_member_details: {
                include_address: true,
                include_appointment_date: false,
                include_basic_information: true,
                include_country_of_residence: false,
                include_dob_type: "partial"
            },
            forename: "forename",
            general_partner_details: {},
            limited_partner_details: {},
            member_details: {
                include_address: false,
                include_appointment_date: false,
                include_basic_information: true,
                include_country_of_residence: false,
                include_dob_type: "partial"
            },
            include_general_nature_of_business_information: true,
            include_good_standing_information: true,
            principal_place_of_business_details: {},
            registered_office_address_details: {},
            secretary_details: {},
            surname: "surname",
            liquidators_details: {},
            company_status: "active",
            administrators_details: {}
        },
        etag: "abcdefg123456",
        kind: "item#certificate",
        links: {
            self: "/orderable/certificates/CRT-123456-123456"
        },
        postal_delivery: true,
        quantity: 1,
        item_uri: "/orderable/certificates/CRT-123456-123456",
        status: "unknown",
        postage_cost: "0",
        total_item_cost: "15",
        customer_reference: "mycert",
        satisfied_at: "2020-05-15T08:41:05.798Z"
    }
    ],
    kind: "order",
    total_order_cost: "15",
    reference: CERTIFICATE_CHECKOUT_ID
};

const mockCertifiedCopyCheckoutResponseBody: CheckoutResource = {
    status: "paid",
    payment_reference: "PN8h8EHBLddO94R",
    etag: "f90bd3844c44b640728be9ee70ffbda8ff5ec316",
    delivery_details: {
        country: "United Kingdom",
        forename: "bob",
        locality: "local",
        postal_code: "postcode",
        region: "region",
        surname: "bob",
        address_line_1: "address line 1",
        address_line_2: "address line 2",
        po_box: "po box"
    },
    items: [
        {
            id: "CCD-123456-123456",
            company_name: "Company Name",
            company_number: "00006400",
            description: "certified copy for company 00000000",
            description_identifier: "certified-copy",
            description_values: {
                company_number: "00000000",
                "certified-copy": "certified copy for company 00000000"
            },
            item_costs: [
                {
                    discount_applied: "0",
                    item_cost: "15",
                    calculated_cost: "15",
                    product_type: "certified-copy"
                },
                {
                    discount_applied: "0",
                    item_cost: "15",
                    calculated_cost: "15",
                    product_type: "certified-copy"
                },
                {
                    discount_applied: "0",
                    item_cost: "15",
                    calculated_cost: "15",
                    product_type: "certified-copy"
                }
            ],
            item_options: {
                delivery_method: "postal",
                delivery_timescale: "standard",
                filing_history_documents: [
                    {
                        filing_history_date: "2010-02-12",
                        filing_history_description: "change-person-director-company-with-change-date",
                        filing_history_description_values: {
                            change_date: "2010-02-12",
                            officer_name: "Thomas David Wheare"
                        },
                        filing_history_id: "MzAwOTM2MDg5OWFkaXF6a2N4",
                        filing_history_type: "CH01",
                        filing_history_cost: "15"
                    },
                    {
                        filing_history_date: "2009-06-23",
                        filing_history_description: "accounts-with-accounts-type-group",
                        filing_history_description_values: {
                            made_up_date: "2008-08-31"
                        },
                        filing_history_id: "MjAzNTYyNTE5M2FkaXF6a2N4",
                        filing_history_type: "AA",
                        filing_history_cost: "15"
                    },
                    {
                        filing_history_date: "2008-02-14",
                        filing_history_description: "legacy",
                        filing_history_description_values: {
                            description: "Return made up to 01/02/08; full list of members"
                        },
                        filing_history_id: "MDE5MjEzMzAxOWFkaXF6a2N4",
                        filing_history_type: "363a",
                        filing_history_cost: "15"
                    }
                ]
            },
            etag: "c7dace439d47fdb78c9c0803c60e6619d9400663",
            kind: "item#certified-copy",
            links: {
                self: "/orderable/certified-copies/CCD-123456-123456"
            },
            quantity: 1,
            item_uri: "/orderable/certified-copies/CCD-123456-123456",
            status: "unknown",
            postage_cost: "0",
            total_item_cost: "45",
            postal_delivery: true
        }
    ],
    kind: "order",
    total_order_cost: "45",
    reference: CERTIFIED_COPY_CHECKOUT_ID,
    paid_at: "2020-08-28T11:43:36.817",
    checked_out_by: {
        email: "example@email.com",
        id: "Y2VkZWVlMzhlZWFjY2M4MzQ3MT"
    },
    links: {
        self: `/checkouts/${CERTIFIED_COPY_CHECKOUT_ID}`,
        payment: `/basket/checkouts/${CERTIFIED_COPY_CHECKOUT_ID}/payment`
    }
}

const mockMissingImageDeliveryCheckoutResponseBody: CheckoutResource = {
    status: "paid",
    payment_reference: "q4nn5UxZiZxVG2e",
    etag: "80bd2953c79729aa0885f6987208690341376db0",
    items: [
        {
            id: "MID-123456-123456",
            company_name: "THE Company",
            company_number: "00000000",
            description: "missing image delivery for company 00000000",
            description_identifier: "missing-image-delivery",
            description_values: {
                company_number: "00000000",
                "missing-image-delivery": "missing image delivery for company 00000000"
            },
            item_costs: [
                {
                    discount_applied: "0",
                    item_cost: "3",
                    calculated_cost: "3",
                    product_type: "missing-image-delivery"
                }
            ],
            item_options: {
                filing_history_date: "2015-05-26",
                filing_history_description: "appoint-person-director-company-with-name",
                filing_history_description_values: {
                    officer_name: "Mr Richard John Harris"
                },
                filing_history_id: "MzEyMzcyNDc2OWFkaXF6a2N4",
                filing_history_type: "AP01"
            },
            etag: "7ae7d006fab4a6bab9fafcfea1eef1b78ffa4e52",
            kind: "item#missing-image-delivery",
            links: {
                self: "/orderable/missing-image-deliveries/MID-123456-123456"
            },
            quantity: 1,
            item_uri: "/orderable/missing-image-deliveries/MID-123456-123456",
            status: "unknown",
            postage_cost: "0",
            total_item_cost: "3",
            postal_delivery: false
        }
    ],
    kind: "order",
    total_order_cost: "3",
    reference: MISSING_IMAGE_DELIVERY_CHECKOUT_ID,
    paid_at: "2020-10-07T11:09:46.196",
    checked_out_by: {
        email: "demo@ch.gov.uk",
        id: "67ZeMsvAEgkBWs7tNKacdrPvOmQ"
    },
    links: {
        self: `/checkouts/${MISSING_IMAGE_DELIVERY_CHECKOUT_ID}`,
        payment: `/basket/checkouts/${MISSING_IMAGE_DELIVERY_CHECKOUT_ID}/payment`
    }
};

describe("checkout", () => {
    describe("get a checkout", () => {
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
            const checkout: CheckoutService = new CheckoutService(requestClient);
            const result = await checkout.getCheckout(CERTIFICATE_CHECKOUT_ID) as Failure<ApiResponse<Checkout>, ApiErrorResponse>;

            expect(result.value.httpStatusCode).to.equal(401);
            expect(result.value.errors[0].error).to.equal("An error occurred");
        });

        it("should map generic fields correctly", async () => {
            const mockGetResponse = {
                status: 200,
                body: mockCertificateCheckoutResponseBody
            };

            const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
            const checkout: CheckoutService = new CheckoutService(requestClient);
            const result = await checkout.getCheckout(CERTIFICATE_CHECKOUT_ID) as Success<ApiResponse<Checkout>, ApiErrorResponse>;
            const data = result.value.resource as Checkout;

            expect(result.value.httpStatusCode).to.equal(200);
            expect(data.paidAt).to.equal(mockCertificateCheckoutResponseBody.paid_at);
            expect(data.checkedOutBy.id).to.equal(mockCertificateCheckoutResponseBody.checked_out_by.id);
            expect(data.checkedOutBy.email).to.equal(mockCertificateCheckoutResponseBody.checked_out_by.email);
            expect(data.links.self).to.equal(mockCertificateCheckoutResponseBody.links.self);
            expect(data.links.payment).to.equal(mockCertificateCheckoutResponseBody.links.payment);
            expect(data.paymentReference).to.equal(mockCertificateCheckoutResponseBody.payment_reference);
            expect(data.status).to.equal(mockCertificateCheckoutResponseBody.status);
            expect(data.etag).to.equal(mockCertificateCheckoutResponseBody.etag);

            expect(data.deliveryDetails.addressLine1).to.equal(mockCertificateCheckoutResponseBody.delivery_details.address_line_1);
            expect(data.deliveryDetails.addressLine2).to.equal(mockCertificateCheckoutResponseBody.delivery_details.address_line_2);
            expect(data.deliveryDetails.country).to.equal(mockCertificateCheckoutResponseBody.delivery_details.country);
            expect(data.deliveryDetails.forename).to.equal(mockCertificateCheckoutResponseBody.delivery_details.forename);
            expect(data.deliveryDetails.locality).to.equal(mockCertificateCheckoutResponseBody.delivery_details.locality);
            expect(data.deliveryDetails.postalCode).to.equal(mockCertificateCheckoutResponseBody.delivery_details.postal_code);
            expect(data.deliveryDetails.region).to.equal(mockCertificateCheckoutResponseBody.delivery_details.region);
            expect(data.deliveryDetails.surname).to.equal(mockCertificateCheckoutResponseBody.delivery_details.surname);
            expect(data.deliveryDetails.poBox).to.equal(mockCertificateCheckoutResponseBody.delivery_details.po_box);
            const item = data.items[0];
            const itemResource = mockCertificateCheckoutResponseBody.items[0];
            expect(item.id).to.equal(itemResource.id);
            expect(item.companyName).to.equal(itemResource.company_name);
            expect(item.companyNumber).to.equal(itemResource.company_number);
            expect(item.description).to.equal(itemResource.description);
            expect(item.descriptionIdentifier).to.equal(itemResource.description_identifier);
            expect(item.descriptionValues.certificate).to.equal(itemResource.description_values.certificate);
            expect(item.descriptionValues.companyNumber).to.equal(itemResource.description_values.company_number);

            expect(item.itemCosts[0].discountApplied).to.equal(itemResource.item_costs[0].discount_applied);
            expect(item.itemCosts[0].itemCost).to.equal(itemResource.item_costs[0].item_cost);
            expect(item.itemCosts[0].calculatedCost).to.equal(itemResource.item_costs[0].calculated_cost);
            expect(item.itemCosts[0].productType).to.equal(itemResource.item_costs[0].product_type);

            expect(item.etag).to.equal(itemResource.etag);
            expect(item.kind).to.equal(itemResource.kind);
            expect(item.links.self).to.equal(itemResource.links.self);
            expect(item.postalDelivery).to.equal(itemResource.postal_delivery);
            expect(item.quantity).to.equal(itemResource.quantity);
            expect(item.itemUri).to.equal(itemResource.item_uri);
            expect(item.status).to.equal(itemResource.status);
            expect(item.postageCost).to.equal(itemResource.postage_cost);
            expect(item.totalItemCost).to.equal(itemResource.total_item_cost);
            expect(item.customerReference).to.equal(itemResource.customer_reference);
            expect(item.satisfiedAt).to.equal(itemResource.satisfied_at);
            expect(data.kind).to.equal(mockCertificateCheckoutResponseBody.kind);
            expect(data.totalOrderCost).to.equal(mockCertificateCheckoutResponseBody.total_order_cost);
            expect(data.reference).to.equal(mockCertificateCheckoutResponseBody.reference);
        });

        it("should map certificate item option fields correctly", async () => {
            const mockGetResponse = {
                status: 200,
                body: mockCertificateCheckoutResponseBody
            };

            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
            const checkout: CheckoutService = new CheckoutService(requestClient);
            const result = await checkout.getCheckout(CERTIFICATE_CHECKOUT_ID) as Success<ApiResponse<Checkout>, ApiErrorResponse>;
            const data = result.value.resource as Checkout;

            const item = data.items[0];
            const itemResource = mockCertificateCheckoutResponseBody.items[0];

            const itemOptionsResource = itemResource.item_options as CertificateItemOptionsResource;
            const itemOptions = item.itemOptions as CertificateItemOptions;

            expect(result.value.httpStatusCode).to.equal(200);
            expect(itemOptions.certificateType).to.equal(itemOptionsResource.certificate_type);
            expect(itemOptions.deliveryMethod).to.equal(itemOptionsResource.delivery_method);
            expect(itemOptions.deliveryTimescale).to.equal(itemOptionsResource.delivery_timescale);
            expect(itemOptions.directorDetails.includeBasicInformation).to.equal(itemOptionsResource.director_details.include_basic_information);
            expect(itemOptions.forename).to.equal(itemOptionsResource.forename);
            expect(itemOptions.includeGeneralNatureOfBusinessInformation).to.equal(itemOptionsResource.include_general_nature_of_business_information);
            expect(itemOptions.includeGoodStandingInformation).to.equal(itemOptionsResource.include_good_standing_information);
            expect(itemOptions.registeredOfficeAddressDetails).to.deep.equal(itemOptionsResource.registered_office_address_details);
            expect(itemOptions.secretaryDetails).to.deep.equal(itemOptionsResource.secretary_details);
            expect(itemOptions.surname).to.equal(itemOptionsResource.surname);
            expect(itemOptions.designatedMemberDetails).to.deep.equal({ includeAddress: true, includeAppointmentDate: false, includeBasicInformation: true, includeCountryOfResidence: false, includeDobType: "partial" })
            expect(itemOptions.memberDetails).to.deep.equal({ includeAddress: false, includeAppointmentDate: false, includeBasicInformation: true, includeCountryOfResidence: false, includeDobType: "partial" })
            expect(itemOptions.companyStatus).to.equal(itemOptionsResource.company_status);
        });

        it("should map certified copy item option fields correctly", async () => {
            const mockGetResponse = {
                status: 200,
                body: mockCertifiedCopyCheckoutResponseBody
            };

            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
            const checkout: CheckoutService = new CheckoutService(requestClient);
            const response = await checkout.getCheckout(CERTIFIED_COPY_CHECKOUT_ID) as Success<ApiResponse<Checkout>, ApiErrorResponse>;
            const data = response.value.resource as Checkout;
            const item = data.items[0];
            const itemResource = mockCertifiedCopyCheckoutResponseBody.items[0];

            const itemOptionsResource = itemResource.item_options as CertifiedCopyItemOptionsResource;
            const itemOptions = item.itemOptions as CertifiedCopyItemOptions

            expect(response.value.httpStatusCode).to.equal(200);
            expect(itemOptions.deliveryMethod).to.equal(itemOptionsResource.delivery_method);
            expect(itemOptions.deliveryTimescale).to.equal(itemOptionsResource.delivery_timescale);
            expect(itemOptions.filingHistoryDocuments[0].filingHistoryDescription).to.equal(itemOptionsResource.filing_history_documents[0].filing_history_description);
            expect(itemOptions.filingHistoryDocuments[0].filingHistoryDate).to.equal(itemOptionsResource.filing_history_documents[0].filing_history_date);
            expect(itemOptions.filingHistoryDocuments[0].filingHistoryId).to.equal(itemOptionsResource.filing_history_documents[0].filing_history_id);
            expect(itemOptions.filingHistoryDocuments[0].filingHistoryType).to.equal(itemOptionsResource.filing_history_documents[0].filing_history_type);
            expect(itemOptions.filingHistoryDocuments[0].filingHistoryDescriptionValues.changeDate).to.equal(itemOptionsResource.filing_history_documents[0].filing_history_description_values.change_date);
            expect(itemOptions.filingHistoryDocuments[0].filingHistoryDescriptionValues.officerName).to.equal(itemOptionsResource.filing_history_documents[0].filing_history_description_values.officer_name);
            expect(itemOptions.filingHistoryDocuments[0].filingHistoryCost).to.equal(itemOptionsResource.filing_history_documents[0].filing_history_cost);
        });

        it("should map missing image delivery item option fields correctly", async () => {
            const mockGetResponse = {
                status: 200,
                body: mockMissingImageDeliveryCheckoutResponseBody
            };

            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
            const checkout: CheckoutService = new CheckoutService(requestClient);
            const result = await checkout.getCheckout(MISSING_IMAGE_DELIVERY_CHECKOUT_ID) as Success<ApiResponse<Checkout>, ApiErrorResponse>;
            const data = result.value.resource as Checkout;

            const item = data.items[0];
            const itemResource = mockMissingImageDeliveryCheckoutResponseBody.items[0];

            const itemOptionsResource = itemResource.item_options as MissingImageDeliveryItemOptionsResource;
            const itemOptions = item.itemOptions as MissingImageDeliveryItemOptions;

            expect(result.value.httpStatusCode).to.equal(200);
            expect(itemOptions.filingHistoryDate).to.equal(itemOptionsResource.filing_history_date);
            expect(itemOptions.filingHistoryDescription).to.equal(itemOptionsResource.filing_history_description);
            expect(itemOptions.filingHistoryDescriptionValues.officerName).to.equal(itemOptionsResource.filing_history_description_values.officer_name);
            expect(itemOptions.filingHistoryId).to.equal(itemOptionsResource.filing_history_id);
            expect(itemOptions.filingHistoryType).to.equal(itemOptionsResource.filing_history_type);
        });
    });
});
