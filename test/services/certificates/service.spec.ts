import chai from "chai";
import sinon from "sinon";

import CertificateService from "../../../src/services/order/certificates/service";
import { HttpResponse, RequestClient } from "../../../src/http";
import {
    CertificateItem,
    CertificateItemInitialRequest,
    CertificateItemPatchRequest,
    CertificateItemPostRequest,
    CertificateItemResource
} from "../../../src/services/order/certificates";
import { ApiErrorResponse, ApiResponse } from "../../../src/services/resource";
import { Failure, Success } from "../../../src/services/result";
import nock = require("nock");

const expect = chai.expect;

const requestClient = new RequestClient({
    baseUrl: "URL-NOT-USED",
    oauthToken: "TOKEN-NOT-USED"
});

const mockResponseBody: CertificateItemResource = ({
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
        certificate_type: "cert type",
        collection_location: "location",
        company_type: "llp",
        contact_number: "010100",
        delivery_method: "delivery",
        delivery_timescale: "timescale",
        designated_member_details: {
            include_address: true,
            include_appointment_date: true,
            include_basic_information: true,
            include_country_of_residence: true,
            include_dob_type: "dob"
        },
        director_details: {
            include_address: true,
            include_appointment_date: true,
            include_basic_information: true,
            include_country_of_residence: true,
            include_dob_type: "dob",
            include_nationality: true,
            include_occupation: true
        },
        forename: "forename",
        general_partner_details: {
            include_basic_information: true
        },
        include_company_objects_information: true,
        include_email_copy: true,
        include_general_nature_of_business_information: true,
        include_good_standing_information: true,
        limited_partner_details: {
            include_basic_information: true
        },
        principal_place_of_business_details: {
            include_address_records_type: "include address",
            include_dates: true
        },
        member_details: {
            include_address: true,
            include_appointment_date: true,
            include_basic_information: true,
            include_country_of_residence: true,
            include_dob_type: "dob"
        },
        registered_office_address_details: {
            include_address_records_type: "include address",
            include_dates: true
        },
        secretary_details: {
            include_address: true,
            include_appointment_date: true,
            include_basic_information: true,
            include_country_of_residence: true,
            include_dob_type: "dob",
            include_nationality: true,
            include_occupation: true
        },
        surname: "surname",
        liquidators_details: {
            include_basic_information: true
        },
        company_status: "active",
        administrators_details: {
            include_basic_information: true
        }
    },
    kind: "kind",
    links: {
        self: "self"
    },
    postage_cost: "postage cost",
    postal_delivery: true,
    quantity: 1,
    total_item_cost: "total cost",
    user_id: "user id"
});

const mockResponseBodyMissingFields: CertificateItemResource = ({
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
        certificate_type: "cert type",
        collection_location: "location",
        company_type: undefined,
        designated_member_details: undefined,
        contact_number: "010100",
        delivery_method: "delivery",
        delivery_timescale: "timescale",
        director_details: undefined,
        forename: "name",
        general_partner_details: undefined,
        include_company_objects_information: true,
        include_email_copy: true,
        include_general_nature_of_business_information: true,
        include_good_standing_information: true,
        limited_partner_details: undefined,
        member_details: undefined,
        principal_place_of_business_details: undefined,
        registered_office_address_details: undefined,
        secretary_details: undefined,
        surname: undefined,
        liquidators_details: undefined,
        company_status: undefined,
        administrators_details: undefined
    },
    kind: "kind",
    links: {
        self: "self"
    },
    postage_cost: "postage cost",
    postal_delivery: true,
    quantity: 1,
    total_item_cost: "total cost",
    user_id: "user id"
});

describe("order a certificate GET", () => {
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
            error: {
                errors: [{ error: "An error occurred" }]
            }
        };

        sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const certificate: CertificateService = new CertificateService(requestClient);
        const result = await certificate.getCertificate("CERT-ID-NOT-IMPORTANT") as Failure<ApiResponse<CertificateItem>, ApiErrorResponse>;

        expect(result.isFailure()).toBe(true);
        expect(result.isSuccess()).toBe(false);
        expect(result.value.httpStatusCode).toBe(401);
        expect(result.value.errors[0].error).toBe("An error occurred");
    });

    it("maps the certificate field data items correctly", async () => {
        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };

        sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const certificate: CertificateService = new CertificateService(requestClient);
        const data = await certificate.getCertificate("CERT-ID-NOT-IMPORTANT") as Success<ApiResponse<CertificateItem>, ApiErrorResponse>;
        const resourceItemOptions = data.value.resource.itemOptions;
        const resourceDirectorDetails = resourceItemOptions.directorDetails;
        const resourceDesignatedMemberDetails = resourceItemOptions.designatedMemberDetails;
        const resourcePrincipalPlaceOfBusinessDetails = resourceItemOptions.principalPlaceOfBusinessDetails;
        const resourceMemberDetails = resourceItemOptions.memberDetails;
        const resourceLimitedPartnerDetails = resourceItemOptions.limitedPartnerDetails;
        const resourceGeneralPartnerDetails = resourceItemOptions.generalPartnerDetails;
        const resourceRegisteredOfficeAddressDetails = resourceItemOptions.registeredOfficeAddressDetails;
        const resourceSecretaryDetails = resourceItemOptions.secretaryDetails;
        const resourceItemCosts = data.value.resource.itemCosts;
        const mockItemOptions = mockResponseBody.item_options;
        const mockDirectorDetails = mockItemOptions.director_details;
        const mockRegisteredOfficeAddressDetails = mockItemOptions.registered_office_address_details;
        const mockSecretaryDetails = mockItemOptions.secretary_details;
        const mockItemCosts = mockResponseBody.item_costs;
        const mockDesignatedMemberDetails = mockItemOptions.designated_member_details;
        const mockPrincipalPlaceOfBusinessDetails = mockItemOptions.principal_place_of_business_details;
        const mockMemberDetails = mockItemOptions.member_details;
        const mockLimitedPartnerDetails = mockItemOptions.limited_partner_details;
        const mockGeneralPartnerDetails = mockItemOptions.general_partner_details;
        const mockLiquidatorsDetails = mockItemOptions.liquidators_details;
        const mockCompanyStatus = mockItemOptions.company_status;
        const mockAdministratorsDetails = mockItemOptions.administrators_details;

        expect(data.value.httpStatusCode).toBe(200);
        expect(data.value.resource.companyName).toBe(mockResponseBody.company_name);
        expect(data.value.resource.companyNumber).toBe(mockResponseBody.company_number);
        expect(data.value.resource.customerReference).toBe(mockResponseBody.customer_reference);
        expect(data.value.resource.description).toBe(mockResponseBody.description);
        expect(data.value.resource.descriptionIdentifier).toBe(mockResponseBody.description_identifier);
        expect(data.value.resource.descriptionValues.key).toBe(mockResponseBody.description_values.key);
        expect(data.value.resource.etag).toBe(mockResponseBody.etag);
        expect(data.value.resource.id).toBe(mockResponseBody.id);
        expect(data.value.resource.userId).toBe(mockResponseBody.user_id);
        expect(resourceItemCosts.length).toBe(1);
        expect(resourceItemCosts[0].calculatedCost).toBe(mockItemCosts[0].calculated_cost);
        expect(resourceItemCosts[0].discountApplied).toBe(mockItemCosts[0].discount_applied);
        expect(resourceItemCosts[0].itemCost).toBe(mockItemCosts[0].item_cost);
        expect(resourceItemCosts[0].productType).toBe(mockItemCosts[0].product_type);
        expect(resourceItemOptions.certificateType).toBe(mockItemOptions.certificate_type);
        expect(resourceItemOptions.collectionLocation).toBe(mockItemOptions.collection_location);
        expect(resourceItemOptions.contactNumber).toBe(mockItemOptions.contact_number);
        expect(resourceItemOptions.companyType).toBe(mockItemOptions.company_type);
        expect(resourceItemOptions.deliveryMethod).toBe(mockItemOptions.delivery_method);
        expect(resourceItemOptions.deliveryTimescale).toBe(mockItemOptions.delivery_timescale);
        expect(resourceDesignatedMemberDetails.includeAddress).toBe(mockDesignatedMemberDetails.include_address);
        expect(resourceDesignatedMemberDetails.includeAppointmentDate).toBe(mockDesignatedMemberDetails.include_appointment_date);
        expect(resourceDesignatedMemberDetails.includeBasicInformation).toBe(mockDesignatedMemberDetails.include_basic_information);
        expect(resourceDesignatedMemberDetails.includeCountryOfResidence).toBe(mockDesignatedMemberDetails.include_country_of_residence);
        expect(resourceDesignatedMemberDetails.includeDobType).toBe(mockDesignatedMemberDetails.include_dob_type);
        expect(resourceDirectorDetails.includeAddress).toBe(mockDirectorDetails.include_address);
        expect(resourceDirectorDetails.includeAppointmentDate).toBe(mockDirectorDetails.include_appointment_date);
        expect(resourceDirectorDetails.includeBasicInformation).toBe(mockDirectorDetails.include_basic_information);
        expect(resourceDirectorDetails.includeCountryOfResidence).toBe(mockDirectorDetails.include_country_of_residence);
        expect(resourceDirectorDetails.includeDobType).toBe(mockDirectorDetails.include_dob_type);
        expect(resourceDirectorDetails.includeNationality).toBe(mockDirectorDetails.include_nationality);
        expect(resourceDirectorDetails.includeOccupation).toBe(mockDirectorDetails.include_occupation);
        expect(resourceGeneralPartnerDetails.includeBasicInformation).toBe(mockGeneralPartnerDetails.include_basic_information);
        expect(resourceItemOptions.forename).toBe(mockItemOptions.forename);
        expect(resourceItemOptions.includeCompanyObjectsInformation).toBe(mockItemOptions.include_company_objects_information);
        expect(resourceItemOptions.includeEmailCopy).toBe(mockItemOptions.include_email_copy);
        expect(resourceItemOptions.includeGeneralNatureOfBusinessInformation).toBe(mockItemOptions.include_general_nature_of_business_information);
        expect(resourceItemOptions.includeGoodStandingInformation).toBe(mockItemOptions.include_good_standing_information);
        expect(resourceLimitedPartnerDetails.includeBasicInformation).toBe(mockLimitedPartnerDetails.include_basic_information);
        expect(resourceMemberDetails.includeAddress).toBe(mockMemberDetails.include_address);
        expect(resourceMemberDetails.includeAppointmentDate).toBe(mockMemberDetails.include_appointment_date);
        expect(resourceMemberDetails.includeBasicInformation).toBe(mockMemberDetails.include_basic_information);
        expect(resourceMemberDetails.includeCountryOfResidence).toBe(mockMemberDetails.include_country_of_residence);
        expect(resourceMemberDetails.includeDobType).toBe(mockMemberDetails.include_dob_type);
        expect(resourcePrincipalPlaceOfBusinessDetails.includeAddressRecordsType).toBe(mockPrincipalPlaceOfBusinessDetails.include_address_records_type);
        expect(resourcePrincipalPlaceOfBusinessDetails.includeDates).toBe(mockPrincipalPlaceOfBusinessDetails.include_dates);
        expect(resourceRegisteredOfficeAddressDetails.includeAddressRecordsType).toBe(mockRegisteredOfficeAddressDetails.include_address_records_type);
        expect(resourceRegisteredOfficeAddressDetails.includeDates).toBe(mockRegisteredOfficeAddressDetails.include_dates);
        expect(resourceSecretaryDetails.includeAddress).toBe(mockSecretaryDetails.include_address);
        expect(resourceSecretaryDetails.includeAppointmentDate).toBe(mockSecretaryDetails.include_appointment_date);
        expect(resourceSecretaryDetails.includeBasicInformation).toBe(mockSecretaryDetails.include_basic_information);
        expect(resourceSecretaryDetails.includeCountryOfResidence).toBe(mockSecretaryDetails.include_country_of_residence);
        expect(resourceSecretaryDetails.includeDobType).toBe(mockSecretaryDetails.include_dob_type);
        expect(resourceSecretaryDetails.includeNationality).toBe(mockSecretaryDetails.include_nationality);
        expect(resourceSecretaryDetails.includeOccupation).toBe(mockSecretaryDetails.include_occupation);
        expect(resourceItemOptions.surname).toBe(mockItemOptions.surname);
        expect(data.value.resource.kind).toBe(mockResponseBody.kind);
        expect(data.value.resource.links.self).toBe(mockResponseBody.links.self);
        expect(data.value.resource.postageCost).toBe(mockResponseBody.postage_cost);
        expect(data.value.resource.postalDelivery).toBe(mockResponseBody.postal_delivery);
        expect(data.value.resource.quantity).toBe(mockResponseBody.quantity);
        expect(data.value.resource.totalItemCost).toBe(mockResponseBody.total_item_cost);
        expect(resourceItemOptions.liquidatorsDetails.includeBasicInformation).toBe(mockLiquidatorsDetails.include_basic_information);
        expect(resourceItemOptions.companyStatus).toBe(mockCompanyStatus);
        expect(resourceItemOptions.administratorsDetails.includeBasicInformation).toBe(mockAdministratorsDetails.include_basic_information);
    });

    it(
        "maps the certificate field data items correctly when director, secretary and office address details and surname are missing",
        async () => {
            const mockGetResponse = {
                status: 200,
                body: mockResponseBodyMissingFields
            };

            sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
            const certificate: CertificateService = new CertificateService(requestClient);
            const data = await certificate.getCertificate("CERT-ID-NOT-IMPORTANT") as Success<ApiResponse<CertificateItem>, ApiErrorResponse>;
            const resourceItemOptions = data.value.resource.itemOptions;
            const resourceDirectorDetails = resourceItemOptions.directorDetails;
            const resourceRegisteredOfficeAddressDetails = resourceItemOptions.registeredOfficeAddressDetails;
            const resourceSecretaryDetails = resourceItemOptions.secretaryDetails;
            const resourceDesignatedMemberDetails = resourceItemOptions.designatedMemberDetails;
            const resourcePrincipalPlaceOfBusinessDetails = resourceItemOptions.principalPlaceOfBusinessDetails;
            const resourceMemberDetails = resourceItemOptions.memberDetails;
            const resourceLimitedPartnerDetails = resourceItemOptions.limitedPartnerDetails;
            const resourceGeneralPartnerDetails = resourceItemOptions.generalPartnerDetails;
            const resourceItemCosts = data.value.resource.itemCosts;
            const mockItemOptions = mockResponseBodyMissingFields.item_options;
            const mockItemCosts = mockResponseBodyMissingFields.item_costs;

            expect(data.value.httpStatusCode).toBe(200);
            expect(data.value.resource.companyName).toBe(mockResponseBodyMissingFields.company_name);
            expect(data.value.resource.companyNumber).toBe(mockResponseBodyMissingFields.company_number);
            expect(data.value.resource.customerReference).toBe(mockResponseBodyMissingFields.customer_reference);
            expect(data.value.resource.description).toBe(mockResponseBodyMissingFields.description);
            expect(data.value.resource.descriptionIdentifier).toBe(mockResponseBodyMissingFields.description_identifier);
            expect(data.value.resource.descriptionValues.key).toBe(mockResponseBodyMissingFields.description_values.key);
            expect(data.value.resource.etag).toBe(mockResponseBodyMissingFields.etag);
            expect(data.value.resource.id).toBe(mockResponseBodyMissingFields.id);
            expect(resourceItemCosts.length).toBe(1);
            expect(resourceItemCosts[0].calculatedCost).toBe(mockItemCosts[0].calculated_cost);
            expect(resourceItemCosts[0].discountApplied).toBe(mockItemCosts[0].discount_applied);
            expect(resourceItemCosts[0].itemCost).toBe(mockItemCosts[0].item_cost);
            expect(resourceItemCosts[0].productType).toBe(mockItemCosts[0].product_type);
            expect(resourceItemOptions.certificateType).toBe(mockItemOptions.certificate_type);
            expect(resourceItemOptions.collectionLocation).toBe(mockItemOptions.collection_location);
            expect(resourceItemOptions.companyType).toBeUndefined();
            expect(resourceItemOptions.contactNumber).toBe(mockItemOptions.contact_number);
            expect(resourceItemOptions.deliveryMethod).toBe(mockItemOptions.delivery_method);
            expect(resourceItemOptions.deliveryTimescale).toBe(mockItemOptions.delivery_timescale);
            expect(resourceDesignatedMemberDetails).toBeUndefined();
            expect(resourceDirectorDetails?.includeAddress).toBeUndefined();
            expect(resourceDirectorDetails?.includeAppointmentDate).toBeUndefined();
            expect(resourceDirectorDetails?.includeBasicInformation).toBeUndefined();
            expect(resourceDirectorDetails?.includeCountryOfResidence).toBeUndefined();
            expect(resourceDirectorDetails?.includeDobType).toBeUndefined();
            expect(resourceDirectorDetails?.includeNationality).toBeUndefined();
            expect(resourceDirectorDetails?.includeOccupation).toBeUndefined();
            expect(resourceGeneralPartnerDetails).toBeUndefined();
            expect(resourceItemOptions.forename).toBe(mockItemOptions.forename);
            expect(resourceItemOptions.includeCompanyObjectsInformation).toBe(mockItemOptions.include_company_objects_information);
            expect(resourceItemOptions.includeEmailCopy).toBe(mockItemOptions.include_email_copy);
            expect(resourceItemOptions.includeGeneralNatureOfBusinessInformation).toBe(mockItemOptions.include_general_nature_of_business_information);
            expect(resourceItemOptions.includeGoodStandingInformation).toBe(mockItemOptions.include_good_standing_information);
            expect(resourceLimitedPartnerDetails).toBeUndefined();
            expect(resourceMemberDetails).toBeUndefined();
            expect(resourcePrincipalPlaceOfBusinessDetails).toBeUndefined();
            expect(resourceRegisteredOfficeAddressDetails?.includeAddressRecordsType).toBeUndefined();
            expect(resourceRegisteredOfficeAddressDetails?.includeDates).toBeUndefined();
            expect(resourceSecretaryDetails?.includeAddress).toBeUndefined();
            expect(resourceSecretaryDetails?.includeAppointmentDate).toBeUndefined();
            expect(resourceSecretaryDetails?.includeBasicInformation).toBeUndefined();
            expect(resourceSecretaryDetails?.includeCountryOfResidence).toBeUndefined();
            expect(resourceSecretaryDetails?.includeDobType).toBeUndefined();
            expect(resourceSecretaryDetails?.includeNationality).toBeUndefined();
            expect(resourceSecretaryDetails?.includeOccupation).toBeUndefined();
            expect(resourceItemOptions.surname).toBe(mockItemOptions.surname);
            expect(data.value.resource.kind).toBe(mockResponseBodyMissingFields.kind);
            expect(data.value.resource.links.self).toBe(mockResponseBodyMissingFields.links.self);
            expect(data.value.resource.postageCost).toBe(mockResponseBodyMissingFields.postage_cost);
            expect(data.value.resource.postalDelivery).toBe(mockResponseBodyMissingFields.postal_delivery);
            expect(data.value.resource.quantity).toBe(mockResponseBodyMissingFields.quantity);
            expect(data.value.resource.totalItemCost).toBe(mockResponseBodyMissingFields.total_item_cost);
            expect(resourceItemOptions.liquidatorsDetails?.includeBasicInformation).toBeUndefined();
            expect(resourceItemOptions.companyStatus).toBeUndefined();
            expect(resourceItemOptions.administratorsDetails?.includeBasicInformation).toBeUndefined();
        }
    );
});

describe("create a certificate POST", () => {
    const mockRequestBody: CertificateItemPostRequest = ({
        companyNumber: "company number",
        customerReference: "reference",
        itemOptions: {
            collectionLocation: "location",
            contactNumber: "010100",
            deliveryMethod: "delivery",
            deliveryTimescale: "timescale",
            directorDetails: {
                includeAddress: true,
                includeAppointmentDate: true,
                includeBasicInformation: true,
                includeCountryOfResidence: true,
                includeDobType: "dob",
                includeNationality: true,
                includeOccupation: true
            },
            designatedMemberDetails: {
                includeAddress: true,
                includeAppointmentDate: true,
                includeBasicInformation: true,
                includeCountryOfResidence: true,
                includeDobType: "dob"
            },
            forename: "forename",
            generalPartnerDetails: {
                includeBasicInformation: true
            },
            includeCompanyObjectsInformation: true,
            includeEmailCopy: true,
            includeGeneralNatureOfBusinessInformation: true,
            includeGoodStandingInformation: true,
            limitedPartnerDetails: {
                includeBasicInformation: true
            },
            memberDetails: {
                includeAddress: true,
                includeAppointmentDate: true,
                includeBasicInformation: true,
                includeCountryOfResidence: true,
                includeDobType: "dob"
            },
            principalPlaceOfBusinessDetails: {
                includeAddressRecordsType: "include address",
                includeDates: true
            },
            registeredOfficeAddressDetails: {
                includeAddressRecordsType: "include address",
                includeDates: true
            },
            secretaryDetails: {
                includeAddress: true,
                includeAppointmentDate: true,
                includeBasicInformation: true,
                includeCountryOfResidence: true,
                includeDobType: "dob",
                includeNationality: true,
                includeOccupation: true
            },
            surname: "surname",
            liquidatorsDetails: {
                includeBasicInformation: true
            },
            administratorsDetails: {
                includeBasicInformation: true
            }
        },
        quantity: 1
    });

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
        const mockPostRequest = {
            status: 401,
            error: {
                errors: [{ error: "An error occurred" }]
            }
        };

        sinon.stub(requestClient, "httpPost").resolves(mockPostRequest);
        const certificate: CertificateService = new CertificateService(requestClient);
        const data = await certificate.postCertificate(mockRequestBody) as Failure<ApiResponse<CertificateItem>, ApiErrorResponse>
        const errResponse = data.value

        expect(errResponse.httpStatusCode).toBe(401);
        expect(errResponse.errors[0].error).toBe("An error occurred");
    });

    it("maps create a certificate correctly", async () => {
        const mockPostRequest = {
            status: 200,
            body: mockResponseBody
        };

        sinon.stub(requestClient, "httpPost").resolves(mockPostRequest);
        const certificate: CertificateService = new CertificateService(requestClient);
        const data = await certificate.postCertificate(mockRequestBody) as Success<ApiResponse<CertificateItem>, ApiErrorResponse>
        const certificateItem = data.value.resource
        const io = certificateItem.itemOptions;
        const mockIo = mockResponseBody.item_options;

        expect(data.value.httpStatusCode).toBe(200);
        expect(certificateItem.companyNumber).toBe(mockResponseBody.company_number);
        expect(certificateItem.customerReference).toBe(mockResponseBody.customer_reference);
        expect(io.certificateType).toBe(mockIo.certificate_type);
        expect(io.collectionLocation).toBe(mockIo.collection_location);
        expect(io.companyType).toBe(mockIo.company_type);
        expect(io.contactNumber).toBe(mockIo.contact_number);
        expect(io.deliveryMethod).toBe(mockIo.delivery_method);
        expect(io.deliveryTimescale).toBe(mockIo.delivery_timescale);
        expect(io.directorDetails.includeAddress).toBe(mockIo.director_details.include_address);
        expect(io.directorDetails.includeAppointmentDate).toBe(mockIo.director_details.include_appointment_date);
        expect(io.directorDetails.includeBasicInformation).toBe(mockIo.director_details.include_basic_information);
        expect(io.directorDetails.includeCountryOfResidence).toBe(mockIo.director_details.include_country_of_residence);
        expect(io.directorDetails.includeDobType).toBe(mockIo.director_details.include_dob_type);
        expect(io.directorDetails.includeNationality).toBe(mockIo.director_details.include_nationality);
        expect(io.directorDetails.includeOccupation).toBe(mockIo.director_details.include_occupation);
        expect(io.designatedMemberDetails.includeAddress).toBe(mockIo.designated_member_details.include_address);
        expect(io.designatedMemberDetails.includeAppointmentDate).toBe(mockIo.designated_member_details.include_appointment_date);
        expect(io.designatedMemberDetails.includeBasicInformation).toBe(mockIo.designated_member_details.include_basic_information);
        expect(io.designatedMemberDetails.includeCountryOfResidence).toBe(mockIo.designated_member_details.include_country_of_residence);
        expect(io.designatedMemberDetails.includeDobType).toBe(mockIo.designated_member_details.include_dob_type);
        expect(io.forename).toBe(mockIo.forename);
        expect(io.generalPartnerDetails.includeBasicInformation).toBe(mockIo.general_partner_details.include_basic_information);
        expect(io.includeCompanyObjectsInformation).toBe(mockIo.include_company_objects_information);
        expect(io.includeEmailCopy).toBe(mockIo.include_email_copy);
        expect(io.includeGeneralNatureOfBusinessInformation).toBe(mockIo.include_general_nature_of_business_information);
        expect(io.includeGoodStandingInformation).toBe(mockIo.include_good_standing_information);
        expect(io.limitedPartnerDetails.includeBasicInformation).toBe(mockIo.limited_partner_details.include_basic_information);
        expect(io.memberDetails.includeAddress).toBe(mockIo.member_details.include_address);
        expect(io.memberDetails.includeAppointmentDate).toBe(mockIo.member_details.include_appointment_date);
        expect(io.memberDetails.includeBasicInformation).toBe(mockIo.member_details.include_basic_information);
        expect(io.memberDetails.includeCountryOfResidence).toBe(mockIo.member_details.include_country_of_residence);
        expect(io.memberDetails.includeDobType).toBe(mockIo.member_details.include_dob_type);
        expect(io.principalPlaceOfBusinessDetails.includeAddressRecordsType).toBe(mockIo.registered_office_address_details.include_address_records_type);
        expect(io.principalPlaceOfBusinessDetails.includeDates).toBe(mockIo.registered_office_address_details.include_dates);
        expect(io.registeredOfficeAddressDetails.includeAddressRecordsType).toBe(mockIo.registered_office_address_details.include_address_records_type);
        expect(io.registeredOfficeAddressDetails.includeDates).toBe(mockIo.registered_office_address_details.include_dates);
        expect(io.secretaryDetails.includeAddress).toBe(mockIo.secretary_details.include_address);
        expect(io.secretaryDetails.includeAppointmentDate).toBe(mockIo.secretary_details.include_appointment_date);
        expect(io.secretaryDetails.includeBasicInformation).toBe(mockIo.secretary_details.include_basic_information);
        expect(io.secretaryDetails.includeCountryOfResidence).toBe(mockIo.secretary_details.include_country_of_residence);
        expect(io.secretaryDetails.includeDobType).toBe(mockIo.secretary_details.include_dob_type);
        expect(io.secretaryDetails.includeNationality).toBe(mockIo.secretary_details.include_nationality);
        expect(io.secretaryDetails.includeOccupation).toBe(mockIo.secretary_details.include_occupation);
        expect(io.surname).toBe(mockIo.surname);
        expect(certificateItem.quantity).toBe(mockResponseBody.quantity);
        expect(io.liquidatorsDetails.includeBasicInformation).toBe(mockIo.liquidators_details.include_basic_information);
        expect(io.companyStatus).toBe(mockIo.company_status);
        expect(io.administratorsDetails.includeBasicInformation).toBe(mockIo.administrators_details.include_basic_information);
    });

    it(
        "maps create a certificate correctly when director, secretary, registered office address details and surname are missing",
        async () => {
            const mockPostRequest = {
                status: 200,
                body: mockResponseBodyMissingFields
            };

            sinon.stub(requestClient, "httpPost").resolves(mockPostRequest);
            const certificate: CertificateService = new CertificateService(requestClient);
            const data = await certificate.postCertificate(mockRequestBody) as Success<ApiResponse<CertificateItem>, ApiErrorResponse>
            const certificateItem = data.value.resource
            const io = certificateItem.itemOptions;
            const mockIo = mockResponseBodyMissingFields.item_options;

            expect(data.value.httpStatusCode).toBe(200);
            expect(certificateItem.companyNumber).toBe(mockResponseBodyMissingFields.company_number);
            expect(certificateItem.customerReference).toBe(mockResponseBodyMissingFields.customer_reference);
            expect(io.certificateType).toBe(mockIo.certificate_type);
            expect(io.collectionLocation).toBe(mockIo.collection_location);
            expect(io.contactNumber).toBe(mockIo.contact_number);
            expect(io.deliveryMethod).toBe(mockIo.delivery_method);
            expect(io.deliveryTimescale).toBe(mockIo.delivery_timescale);
            expect(io.directorDetails).toBeUndefined();
            expect(io.forename).toBe(mockIo.forename);
            expect(io.includeCompanyObjectsInformation).toBe(mockIo.include_company_objects_information);
            expect(io.includeEmailCopy).toBe(mockIo.include_email_copy);
            expect(io.includeGeneralNatureOfBusinessInformation).toBe(mockIo.include_general_nature_of_business_information);
            expect(io.includeGoodStandingInformation).toBe(mockIo.include_good_standing_information);
            expect(io.registeredOfficeAddressDetails).toBeUndefined();
            expect(io.secretaryDetails).toBeUndefined();
            expect(io.surname).toBeUndefined();
            expect(certificateItem.quantity).toBe(mockResponseBodyMissingFields.quantity);
            expect(io.liquidatorsDetails).toBeUndefined();
            expect(io.companyStatus).toBeUndefined();
            expect(io.administratorsDetails).toBeUndefined();
        }
    );
});

describe("update a certificate PATCH", () => {
    const certificateId = "CHS001";
    const mockRequestBody: CertificateItemPatchRequest = ({
        customerReference: "reference",
        itemOptions: {
            collectionLocation: "location",
            contactNumber: "010100",
            deliveryMethod: "delivery",
            deliveryTimescale: "timescale",
            directorDetails: {
                includeAddress: true,
                includeAppointmentDate: true,
                includeBasicInformation: true,
                includeCountryOfResidence: true,
                includeDobType: "dob",
                includeNationality: true,
                includeOccupation: true
            },
            designatedMemberDetails: {
                includeAddress: true,
                includeAppointmentDate: true,
                includeBasicInformation: true,
                includeCountryOfResidence: true,
                includeDobType: "dob"
            },
            forename: "forename",
            generalPartnerDetails: {
                includeBasicInformation: true
            },
            includeCompanyObjectsInformation: true,
            includeEmailCopy: true,
            includeGeneralNatureOfBusinessInformation: true,
            includeGoodStandingInformation: true,
            limitedPartnerDetails: {
                includeBasicInformation: true
            },
            memberDetails: {
                includeAddress: true,
                includeAppointmentDate: true,
                includeBasicInformation: true,
                includeCountryOfResidence: true,
                includeDobType: "dob"
            },
            principalPlaceOfBusinessDetails: {
                includeAddressRecordsType: "include address",
                includeDates: true
            },
            registeredOfficeAddressDetails: {
                includeAddressRecordsType: "include address",
                includeDates: true
            },
            secretaryDetails: {
                includeAddress: true,
                includeAppointmentDate: true,
                includeBasicInformation: true,
                includeCountryOfResidence: true,
                includeDobType: "dob",
                includeNationality: true,
                includeOccupation: true
            },
            surname: "surname",
            liquidatorsDetails: {
                includeBasicInformation: true
            },
            administratorsDetails: {
                includeBasicInformation: true
            }
        },
        quantity: 1
    });

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
        const mockPatchRequest = {
            status: 401,
            error: {
                errors: [{
                    error: "An error occurred"
                }]
            }
        };

        sinon.stub(requestClient, "httpPatch").resolves(mockPatchRequest);
        const certificate: CertificateService = new CertificateService(requestClient);
        const data = await certificate.patchCertificate(mockRequestBody, certificateId) as Failure<ApiResponse<CertificateItem>, ApiErrorResponse>;

        expect(data.isFailure()).toBe(true);
        expect(data.isSuccess()).toBe(false);
        expect(data.value.httpStatusCode).toBe(401);
        expect(data.value.errors[0].error).toBe("An error occurred");
    });

    it("maps patch a certificate correctly", async () => {
        const mockPatchRequest = {
            status: 200,
            body: mockResponseBody
        };

        sinon.stub(requestClient, "httpPatch").resolves(mockPatchRequest);
        const certificate: CertificateService = new CertificateService(requestClient);
        const data = await certificate.patchCertificate(mockRequestBody, certificateId) as Success<ApiResponse<CertificateItem>, ApiErrorResponse>;
        const io = data.value.resource.itemOptions;
        const mockIo = mockResponseBody.item_options;

        expect(data.value.httpStatusCode).toBe(200);
        expect(data.value.resource.companyNumber).toBe(mockResponseBody.company_number);
        expect(data.value.resource.customerReference).toBe(mockResponseBody.customer_reference);
        expect(io.certificateType).toBe(mockIo.certificate_type);
        expect(io.collectionLocation).toBe(mockIo.collection_location);
        expect(io.companyType).toBe(mockIo.company_type);
        expect(io.contactNumber).toBe(mockIo.contact_number);
        expect(io.deliveryMethod).toBe(mockIo.delivery_method);
        expect(io.deliveryTimescale).toBe(mockIo.delivery_timescale);
        expect(io.designatedMemberDetails.includeAddress).toBe(mockIo.designated_member_details.include_address);
        expect(io.designatedMemberDetails.includeAppointmentDate).toBe(mockIo.designated_member_details.include_appointment_date);
        expect(io.designatedMemberDetails.includeBasicInformation).toBe(mockIo.designated_member_details.include_basic_information);
        expect(io.designatedMemberDetails.includeCountryOfResidence).toBe(mockIo.designated_member_details.include_country_of_residence);
        expect(io.designatedMemberDetails.includeDobType).toBe(mockIo.designated_member_details.include_dob_type);
        expect(io.directorDetails.includeAddress).toBe(mockIo.director_details.include_address);
        expect(io.directorDetails.includeAppointmentDate).toBe(mockIo.director_details.include_appointment_date);
        expect(io.directorDetails.includeBasicInformation).toBe(mockIo.director_details.include_basic_information);
        expect(io.directorDetails.includeCountryOfResidence).toBe(mockIo.director_details.include_country_of_residence);
        expect(io.directorDetails.includeDobType).toBe(mockIo.director_details.include_dob_type);
        expect(io.directorDetails.includeNationality).toBe(mockIo.director_details.include_nationality);
        expect(io.directorDetails.includeOccupation).toBe(mockIo.director_details.include_occupation);
        expect(io.forename).toBe(mockIo.forename);
        expect(io.generalPartnerDetails.includeBasicInformation).toBe(mockIo.general_partner_details.include_basic_information);
        expect(io.includeCompanyObjectsInformation).toBe(mockIo.include_company_objects_information);
        expect(io.includeEmailCopy).toBe(mockIo.include_email_copy);
        expect(io.includeGeneralNatureOfBusinessInformation).toBe(mockIo.include_general_nature_of_business_information);
        expect(io.includeGoodStandingInformation).toBe(mockIo.include_good_standing_information);
        expect(io.limitedPartnerDetails.includeBasicInformation).toBe(mockIo.limited_partner_details.include_basic_information);
        expect(io.memberDetails.includeAddress).toBe(mockIo.member_details.include_address);
        expect(io.memberDetails.includeAppointmentDate).toBe(mockIo.member_details.include_appointment_date);
        expect(io.memberDetails.includeBasicInformation).toBe(mockIo.member_details.include_basic_information);
        expect(io.memberDetails.includeCountryOfResidence).toBe(mockIo.member_details.include_country_of_residence);
        expect(io.memberDetails.includeDobType).toBe(mockIo.member_details.include_dob_type);
        expect(io.principalPlaceOfBusinessDetails.includeAddressRecordsType).toBe(mockIo.registered_office_address_details.include_address_records_type);
        expect(io.principalPlaceOfBusinessDetails.includeDates).toBe(mockIo.registered_office_address_details.include_dates);
        expect(io.registeredOfficeAddressDetails.includeAddressRecordsType).toBe(mockIo.registered_office_address_details.include_address_records_type);
        expect(io.registeredOfficeAddressDetails.includeDates).toBe(mockIo.registered_office_address_details.include_dates);
        expect(io.secretaryDetails.includeAddress).toBe(mockIo.secretary_details.include_address);
        expect(io.secretaryDetails.includeAppointmentDate).toBe(mockIo.secretary_details.include_appointment_date);
        expect(io.secretaryDetails.includeBasicInformation).toBe(mockIo.secretary_details.include_basic_information);
        expect(io.secretaryDetails.includeCountryOfResidence).toBe(mockIo.secretary_details.include_country_of_residence);
        expect(io.secretaryDetails.includeDobType).toBe(mockIo.secretary_details.include_dob_type);
        expect(io.secretaryDetails.includeNationality).toBe(mockIo.secretary_details.include_nationality);
        expect(io.secretaryDetails.includeOccupation).toBe(mockIo.secretary_details.include_occupation);
        expect(io.surname).toBe(mockIo.surname);
        expect(data.value.resource.quantity).toBe(mockResponseBody.quantity);
        expect(io.liquidatorsDetails.includeBasicInformation).toBe(mockIo.liquidators_details.include_basic_information);
        expect(io.companyStatus).toBe(mockIo.company_status);
        expect(io.administratorsDetails.includeBasicInformation).toBe(mockIo.administrators_details.include_basic_information);
    });

    it(
        "maps patch a certificate correctly when director, secretary, registered office address details and surname are missing",
        async () => {
            const mockPatchRequest = {
                status: 200,
                body: mockResponseBodyMissingFields
            };

            sinon.stub(requestClient, "httpPatch").resolves(mockPatchRequest);
            const certificate: CertificateService = new CertificateService(requestClient);
            const data = await certificate.patchCertificate(mockRequestBody, certificateId) as Success<ApiResponse<CertificateItem>, ApiErrorResponse>;
            const io = data.value.resource.itemOptions;
            const mockIo = mockResponseBodyMissingFields.item_options;

            expect(data.value.httpStatusCode).toBe(200);
            expect(data.value.resource.companyNumber).toBe(mockResponseBodyMissingFields.company_number);
            expect(data.value.resource.customerReference).toBe(mockResponseBodyMissingFields.customer_reference);
            expect(io.certificateType).toBe(mockIo.certificate_type);
            expect(io.collectionLocation).toBe(mockIo.collection_location);
            expect(io.contactNumber).toBe(mockIo.contact_number);
            expect(io.deliveryMethod).toBe(mockIo.delivery_method);
            expect(io.deliveryTimescale).toBe(mockIo.delivery_timescale);
            expect(io.directorDetails).toBeUndefined();
            expect(io.forename).toBe(mockIo.forename);
            expect(io.includeCompanyObjectsInformation).toBe(mockIo.include_company_objects_information);
            expect(io.includeEmailCopy).toBe(mockIo.include_email_copy);
            expect(io.includeGeneralNatureOfBusinessInformation).toBe(mockIo.include_general_nature_of_business_information);
            expect(io.includeGoodStandingInformation).toBe(mockIo.include_good_standing_information);
            expect(io.registeredOfficeAddressDetails).toBeUndefined();
            expect(io.secretaryDetails).toBeUndefined();
            expect(io.surname).toBeUndefined();
            expect(data.value.resource.quantity).toBe(mockResponseBodyMissingFields.quantity);
            expect(io.liquidatorsDetails).toBeUndefined();
            expect(io.companyStatus).toBeUndefined();
            expect(io.administratorsDetails).toBeUndefined();
        }
    );

    it("sets additional header required for PATCH merge", async () => {
        // Given
        const requestClient = new RequestClient({
            baseUrl: "http://localhost",
            oauthToken: "TOKEN-NOT-USED"
        });
        // patchCertificate sets this header, so we expect to see it sent in outgoing HTTP request.
        // Effectively testing both CertificateService and RequestClient.
        const expectedMergePatchHeader = {
            name: "Content-Type",
            value: "application/merge-patch+json"
        }
        const scope = nock(/.*/)
            .patch("/orderable/certificates/CHS001")
            .matchHeader(expectedMergePatchHeader.name, expectedMergePatchHeader.value)
            .reply(200);
        const certificate: CertificateService = new CertificateService(requestClient);

        // When
        const data = await certificate.patchCertificate(mockRequestBody, certificateId) as
            Success<ApiResponse<CertificateItem>, ApiErrorResponse>;

        // Then
        expect(data.value.httpStatusCode).toBe(200);
        scope.done();
    });
});

describe("Create an initial certificate item", () => {
    beforeEach(() => {
        sinon.reset();
        sinon.restore();
    });

    afterEach(done => {
        sinon.reset();
        sinon.restore();
        done();
    });

    const certificateService = new CertificateService(requestClient)

    it("should return error on API failure", async () => {
        // given
        sinon.stub(requestClient, "httpPost").resolves({
            status: 401,
            error: {
                errors: [{
                    error: "company-status-invalid"
                }]
            }
        } as HttpResponse)

        // when
        const data = await certificateService.postInitialCertificate({
            companyNumber: "00006400"
        } as CertificateItemInitialRequest);
        const result = data.value as ApiErrorResponse

        // then
        expect(data.isFailure()).toBe(true);
        expect(data.isSuccess()).toBe(false);
        expect(result.httpStatusCode).toBe(401);
        expect(result.errors).toEqual([{
            error: "company-status-invalid"
        }]);
    })

    it("should create a certificate item", async () => {
        // given
        sinon.stub(requestClient, "httpPost").resolves({
            status: 201,
            body: {
                id: "CRT-123123-123123",
                company_number: "00006400",
                item_options: {
                    company_status: "active",
                    company_type: "ltd"
                }
            }
        } as HttpResponse)

        // when
        const data = await certificateService.postInitialCertificate({
            companyNumber: "00006400"
        } as CertificateItemInitialRequest)
        const result = data.value as ApiResponse<CertificateItem>;

        // then
        expect(result.httpStatusCode).toBe(201)
        expect(result.resource).toEqual({
            id: "CRT-123123-123123",
            companyNumber: "00006400",
            itemOptions: {
                companyStatus: "active",
                companyType: "ltd"
            }
        } as CertificateItem)
    })
})
