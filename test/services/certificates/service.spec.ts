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
} from "../../../src/services/order/certificates/types";
import { ApiErrorResponse, ApiResponse } from "../../../src/services/resource";
import { Failure, Success } from "../../../src/services/result";

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

        expect(result.isFailure()).to.be.true;
        expect(result.isSuccess()).to.be.false;
        expect(result.value.httpStatusCode).to.equal(401);
        expect(result.value.errors[0].error).to.equal("An error occurred");
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

        expect(data.value.httpStatusCode).to.equal(200);
        expect(data.value.resource.companyName).to.equal(mockResponseBody.company_name);
        expect(data.value.resource.companyNumber).to.equal(mockResponseBody.company_number);
        expect(data.value.resource.customerReference).to.equal(mockResponseBody.customer_reference);
        expect(data.value.resource.description).to.equal(mockResponseBody.description);
        expect(data.value.resource.descriptionIdentifier).to.equal(mockResponseBody.description_identifier);
        expect(data.value.resource.descriptionValues.key).to.equal(mockResponseBody.description_values.key);
        expect(data.value.resource.etag).to.equal(mockResponseBody.etag);
        expect(data.value.resource.id).to.equal(mockResponseBody.id);
        expect(data.value.resource.userId).to.equal(mockResponseBody.user_id);
        expect(resourceItemCosts.length).to.equal(1);
        expect(resourceItemCosts[0].calculatedCost).to.equal(mockItemCosts[0].calculated_cost);
        expect(resourceItemCosts[0].discountApplied).to.equal(mockItemCosts[0].discount_applied);
        expect(resourceItemCosts[0].itemCost).to.equal(mockItemCosts[0].item_cost);
        expect(resourceItemCosts[0].productType).to.equal(mockItemCosts[0].product_type);
        expect(resourceItemOptions.certificateType).to.equal(mockItemOptions.certificate_type);
        expect(resourceItemOptions.collectionLocation).to.equal(mockItemOptions.collection_location);
        expect(resourceItemOptions.contactNumber).to.equal(mockItemOptions.contact_number);
        expect(resourceItemOptions.companyType).to.equal(mockItemOptions.company_type);
        expect(resourceItemOptions.deliveryMethod).to.equal(mockItemOptions.delivery_method);
        expect(resourceItemOptions.deliveryTimescale).to.equal(mockItemOptions.delivery_timescale);
        expect(resourceDesignatedMemberDetails.includeAddress).to.equal(mockDesignatedMemberDetails.include_address);
        expect(resourceDesignatedMemberDetails.includeAppointmentDate).to.equal(mockDesignatedMemberDetails.include_appointment_date);
        expect(resourceDesignatedMemberDetails.includeBasicInformation).to.equal(mockDesignatedMemberDetails.include_basic_information);
        expect(resourceDesignatedMemberDetails.includeCountryOfResidence).to.equal(mockDesignatedMemberDetails.include_country_of_residence);
        expect(resourceDesignatedMemberDetails.includeDobType).to.equal(mockDesignatedMemberDetails.include_dob_type);
        expect(resourceDirectorDetails.includeAddress).to.equal(mockDirectorDetails.include_address);
        expect(resourceDirectorDetails.includeAppointmentDate).to.equal(mockDirectorDetails.include_appointment_date);
        expect(resourceDirectorDetails.includeBasicInformation).to.equal(mockDirectorDetails.include_basic_information);
        expect(resourceDirectorDetails.includeCountryOfResidence).to.equal(mockDirectorDetails.include_country_of_residence);
        expect(resourceDirectorDetails.includeDobType).to.equal(mockDirectorDetails.include_dob_type);
        expect(resourceDirectorDetails.includeNationality).to.equal(mockDirectorDetails.include_nationality);
        expect(resourceDirectorDetails.includeOccupation).to.equal(mockDirectorDetails.include_occupation);
        expect(resourceGeneralPartnerDetails.includeBasicInformation).to.equal(mockGeneralPartnerDetails.include_basic_information);
        expect(resourceItemOptions.forename).to.equal(mockItemOptions.forename);
        expect(resourceItemOptions.includeCompanyObjectsInformation).to.equal(mockItemOptions.include_company_objects_information);
        expect(resourceItemOptions.includeEmailCopy).to.equal(mockItemOptions.include_email_copy);
        expect(resourceItemOptions.includeGeneralNatureOfBusinessInformation).to.equal(mockItemOptions.include_general_nature_of_business_information);
        expect(resourceItemOptions.includeGoodStandingInformation).to.equal(mockItemOptions.include_good_standing_information);
        expect(resourceLimitedPartnerDetails.includeBasicInformation).to.equal(mockLimitedPartnerDetails.include_basic_information);
        expect(resourceMemberDetails.includeAddress).to.equal(mockMemberDetails.include_address);
        expect(resourceMemberDetails.includeAppointmentDate).to.equal(mockMemberDetails.include_appointment_date);
        expect(resourceMemberDetails.includeBasicInformation).to.equal(mockMemberDetails.include_basic_information);
        expect(resourceMemberDetails.includeCountryOfResidence).to.equal(mockMemberDetails.include_country_of_residence);
        expect(resourceMemberDetails.includeDobType).to.equal(mockMemberDetails.include_dob_type);
        expect(resourcePrincipalPlaceOfBusinessDetails.includeAddressRecordsType).to.equal(mockPrincipalPlaceOfBusinessDetails.include_address_records_type);
        expect(resourcePrincipalPlaceOfBusinessDetails.includeDates).to.equal(mockPrincipalPlaceOfBusinessDetails.include_dates);
        expect(resourceRegisteredOfficeAddressDetails.includeAddressRecordsType).to.equal(mockRegisteredOfficeAddressDetails.include_address_records_type);
        expect(resourceRegisteredOfficeAddressDetails.includeDates).to.equal(mockRegisteredOfficeAddressDetails.include_dates);
        expect(resourceSecretaryDetails.includeAddress).to.equal(mockSecretaryDetails.include_address);
        expect(resourceSecretaryDetails.includeAppointmentDate).to.equal(mockSecretaryDetails.include_appointment_date);
        expect(resourceSecretaryDetails.includeBasicInformation).to.equal(mockSecretaryDetails.include_basic_information);
        expect(resourceSecretaryDetails.includeCountryOfResidence).to.equal(mockSecretaryDetails.include_country_of_residence);
        expect(resourceSecretaryDetails.includeDobType).to.equal(mockSecretaryDetails.include_dob_type);
        expect(resourceSecretaryDetails.includeNationality).to.equal(mockSecretaryDetails.include_nationality);
        expect(resourceSecretaryDetails.includeOccupation).to.equal(mockSecretaryDetails.include_occupation);
        expect(resourceItemOptions.surname).to.equal(mockItemOptions.surname);
        expect(data.value.resource.kind).to.equal(mockResponseBody.kind);
        expect(data.value.resource.links.self).to.equal(mockResponseBody.links.self);
        expect(data.value.resource.postageCost).to.equal(mockResponseBody.postage_cost);
        expect(data.value.resource.postalDelivery).to.equal(mockResponseBody.postal_delivery);
        expect(data.value.resource.quantity).to.equal(mockResponseBody.quantity);
        expect(data.value.resource.totalItemCost).to.equal(mockResponseBody.total_item_cost);
        expect(resourceItemOptions.liquidatorsDetails.includeBasicInformation).to.equal(mockLiquidatorsDetails.include_basic_information);
        expect(resourceItemOptions.companyStatus).to.equal(mockCompanyStatus);
        expect(resourceItemOptions.administratorsDetails.includeBasicInformation).to.equal(mockAdministratorsDetails.include_basic_information);
    });

    it("maps the certificate field data items correctly when director, secretary and office address details and surname are missing", async () => {
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

        expect(data.value.httpStatusCode).to.equal(200);
        expect(data.value.resource.companyName).to.equal(mockResponseBodyMissingFields.company_name);
        expect(data.value.resource.companyNumber).to.equal(mockResponseBodyMissingFields.company_number);
        expect(data.value.resource.customerReference).to.equal(mockResponseBodyMissingFields.customer_reference);
        expect(data.value.resource.description).to.equal(mockResponseBodyMissingFields.description);
        expect(data.value.resource.descriptionIdentifier).to.equal(mockResponseBodyMissingFields.description_identifier);
        expect(data.value.resource.descriptionValues.key).to.equal(mockResponseBodyMissingFields.description_values.key);
        expect(data.value.resource.etag).to.equal(mockResponseBodyMissingFields.etag);
        expect(data.value.resource.id).to.equal(mockResponseBodyMissingFields.id);
        expect(resourceItemCosts.length).to.equal(1);
        expect(resourceItemCosts[0].calculatedCost).to.equal(mockItemCosts[0].calculated_cost);
        expect(resourceItemCosts[0].discountApplied).to.equal(mockItemCosts[0].discount_applied);
        expect(resourceItemCosts[0].itemCost).to.equal(mockItemCosts[0].item_cost);
        expect(resourceItemCosts[0].productType).to.equal(mockItemCosts[0].product_type);
        expect(resourceItemOptions.certificateType).to.equal(mockItemOptions.certificate_type);
        expect(resourceItemOptions.collectionLocation).to.equal(mockItemOptions.collection_location);
        expect(resourceItemOptions.companyType).to.be.undefined;
        expect(resourceItemOptions.contactNumber).to.equal(mockItemOptions.contact_number);
        expect(resourceItemOptions.deliveryMethod).to.equal(mockItemOptions.delivery_method);
        expect(resourceItemOptions.deliveryTimescale).to.equal(mockItemOptions.delivery_timescale);
        expect(resourceDesignatedMemberDetails).to.be.undefined;
        expect(resourceDirectorDetails?.includeAddress).to.be.undefined;
        expect(resourceDirectorDetails?.includeAppointmentDate).to.be.undefined;
        expect(resourceDirectorDetails?.includeBasicInformation).to.be.undefined;
        expect(resourceDirectorDetails?.includeCountryOfResidence).to.be.undefined;
        expect(resourceDirectorDetails?.includeDobType).to.be.undefined;
        expect(resourceDirectorDetails?.includeNationality).to.be.undefined;
        expect(resourceDirectorDetails?.includeOccupation).to.be.undefined;
        expect(resourceGeneralPartnerDetails).to.be.undefined;
        expect(resourceItemOptions.forename).to.equal(mockItemOptions.forename);
        expect(resourceItemOptions.includeCompanyObjectsInformation).to.equal(mockItemOptions.include_company_objects_information);
        expect(resourceItemOptions.includeEmailCopy).to.equal(mockItemOptions.include_email_copy);
        expect(resourceItemOptions.includeGeneralNatureOfBusinessInformation).to.equal(mockItemOptions.include_general_nature_of_business_information);
        expect(resourceItemOptions.includeGoodStandingInformation).to.equal(mockItemOptions.include_good_standing_information);
        expect(resourceLimitedPartnerDetails).to.be.undefined;
        expect(resourceMemberDetails).to.be.undefined;
        expect(resourcePrincipalPlaceOfBusinessDetails).to.be.undefined;
        expect(resourceRegisteredOfficeAddressDetails?.includeAddressRecordsType).to.be.undefined;
        expect(resourceRegisteredOfficeAddressDetails?.includeDates).to.be.undefined;
        expect(resourceSecretaryDetails?.includeAddress).to.be.undefined;
        expect(resourceSecretaryDetails?.includeAppointmentDate).to.be.undefined;
        expect(resourceSecretaryDetails?.includeBasicInformation).to.be.undefined;
        expect(resourceSecretaryDetails?.includeCountryOfResidence).to.be.undefined;
        expect(resourceSecretaryDetails?.includeDobType).to.be.undefined;
        expect(resourceSecretaryDetails?.includeNationality).to.be.undefined;
        expect(resourceSecretaryDetails?.includeOccupation).to.be.undefined;
        expect(resourceItemOptions.surname).to.equal(mockItemOptions.surname);
        expect(data.value.resource.kind).to.equal(mockResponseBodyMissingFields.kind);
        expect(data.value.resource.links.self).to.equal(mockResponseBodyMissingFields.links.self);
        expect(data.value.resource.postageCost).to.equal(mockResponseBodyMissingFields.postage_cost);
        expect(data.value.resource.postalDelivery).to.equal(mockResponseBodyMissingFields.postal_delivery);
        expect(data.value.resource.quantity).to.equal(mockResponseBodyMissingFields.quantity);
        expect(data.value.resource.totalItemCost).to.equal(mockResponseBodyMissingFields.total_item_cost);
        expect(resourceItemOptions.liquidatorsDetails?.includeBasicInformation).to.be.undefined;
        expect(resourceItemOptions.companyStatus).to.be.undefined;
        expect(resourceItemOptions.administratorsDetails?.includeBasicInformation).to.be.undefined;
    });
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

        expect(errResponse.httpStatusCode).to.equal(401);
        expect(errResponse.errors[0].error).to.equal("An error occurred");
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

        expect(data.value.httpStatusCode).to.equal(200);
        expect(certificateItem.companyNumber).to.equal(mockResponseBody.company_number);
        expect(certificateItem.customerReference).to.equal(mockResponseBody.customer_reference);
        expect(io.certificateType).to.equal(mockIo.certificate_type);
        expect(io.collectionLocation).to.equal(mockIo.collection_location);
        expect(io.companyType).to.equal(mockIo.company_type);
        expect(io.contactNumber).to.equal(mockIo.contact_number);
        expect(io.deliveryMethod).to.equal(mockIo.delivery_method);
        expect(io.deliveryTimescale).to.equal(mockIo.delivery_timescale);
        expect(io.directorDetails.includeAddress).to.equal(mockIo.director_details.include_address);
        expect(io.directorDetails.includeAppointmentDate).to.equal(mockIo.director_details.include_appointment_date);
        expect(io.directorDetails.includeBasicInformation).to.equal(mockIo.director_details.include_basic_information);
        expect(io.directorDetails.includeCountryOfResidence).to.equal(mockIo.director_details.include_country_of_residence);
        expect(io.directorDetails.includeDobType).to.equal(mockIo.director_details.include_dob_type);
        expect(io.directorDetails.includeNationality).to.equal(mockIo.director_details.include_nationality);
        expect(io.directorDetails.includeOccupation).to.equal(mockIo.director_details.include_occupation);
        expect(io.designatedMemberDetails.includeAddress).to.equal(mockIo.designated_member_details.include_address);
        expect(io.designatedMemberDetails.includeAppointmentDate).to.equal(mockIo.designated_member_details.include_appointment_date);
        expect(io.designatedMemberDetails.includeBasicInformation).to.equal(mockIo.designated_member_details.include_basic_information);
        expect(io.designatedMemberDetails.includeCountryOfResidence).to.equal(mockIo.designated_member_details.include_country_of_residence);
        expect(io.designatedMemberDetails.includeDobType).to.equal(mockIo.designated_member_details.include_dob_type);
        expect(io.forename).to.equal(mockIo.forename);
        expect(io.generalPartnerDetails.includeBasicInformation).to.equal(mockIo.general_partner_details.include_basic_information);
        expect(io.includeCompanyObjectsInformation).to.equal(mockIo.include_company_objects_information);
        expect(io.includeEmailCopy).to.equal(mockIo.include_email_copy);
        expect(io.includeGeneralNatureOfBusinessInformation).to.equal(mockIo.include_general_nature_of_business_information);
        expect(io.includeGoodStandingInformation).to.equal(mockIo.include_good_standing_information);
        expect(io.limitedPartnerDetails.includeBasicInformation).to.equal(mockIo.limited_partner_details.include_basic_information);
        expect(io.memberDetails.includeAddress).to.equal(mockIo.member_details.include_address);
        expect(io.memberDetails.includeAppointmentDate).to.equal(mockIo.member_details.include_appointment_date);
        expect(io.memberDetails.includeBasicInformation).to.equal(mockIo.member_details.include_basic_information);
        expect(io.memberDetails.includeCountryOfResidence).to.equal(mockIo.member_details.include_country_of_residence);
        expect(io.memberDetails.includeDobType).to.equal(mockIo.member_details.include_dob_type);
        expect(io.principalPlaceOfBusinessDetails.includeAddressRecordsType).to.equal(mockIo.registered_office_address_details.include_address_records_type);
        expect(io.principalPlaceOfBusinessDetails.includeDates).to.equal(mockIo.registered_office_address_details.include_dates);
        expect(io.registeredOfficeAddressDetails.includeAddressRecordsType).to.equal(mockIo.registered_office_address_details.include_address_records_type);
        expect(io.registeredOfficeAddressDetails.includeDates).to.equal(mockIo.registered_office_address_details.include_dates);
        expect(io.secretaryDetails.includeAddress).to.equal(mockIo.secretary_details.include_address);
        expect(io.secretaryDetails.includeAppointmentDate).to.equal(mockIo.secretary_details.include_appointment_date);
        expect(io.secretaryDetails.includeBasicInformation).to.equal(mockIo.secretary_details.include_basic_information);
        expect(io.secretaryDetails.includeCountryOfResidence).to.equal(mockIo.secretary_details.include_country_of_residence);
        expect(io.secretaryDetails.includeDobType).to.equal(mockIo.secretary_details.include_dob_type);
        expect(io.secretaryDetails.includeNationality).to.equal(mockIo.secretary_details.include_nationality);
        expect(io.secretaryDetails.includeOccupation).to.equal(mockIo.secretary_details.include_occupation);
        expect(io.surname).to.equal(mockIo.surname);
        expect(certificateItem.quantity).to.equal(mockResponseBody.quantity);
        expect(io.liquidatorsDetails.includeBasicInformation).to.equal(mockIo.liquidators_details.include_basic_information);
        expect(io.companyStatus).to.equal(mockIo.company_status);
        expect(io.administratorsDetails.includeBasicInformation).to.equal(mockIo.administrators_details.include_basic_information);
    });

    it("maps create a certificate correctly when director, secretary, registered office address details and surname are missing", async () => {
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

        expect(data.value.httpStatusCode).to.equal(200);
        expect(certificateItem.companyNumber).to.equal(mockResponseBodyMissingFields.company_number);
        expect(certificateItem.customerReference).to.equal(mockResponseBodyMissingFields.customer_reference);
        expect(io.certificateType).to.equal(mockIo.certificate_type);
        expect(io.collectionLocation).to.equal(mockIo.collection_location);
        expect(io.contactNumber).to.equal(mockIo.contact_number);
        expect(io.deliveryMethod).to.equal(mockIo.delivery_method);
        expect(io.deliveryTimescale).to.equal(mockIo.delivery_timescale);
        expect(io.directorDetails).to.be.undefined;
        expect(io.forename).to.equal(mockIo.forename);
        expect(io.includeCompanyObjectsInformation).to.equal(mockIo.include_company_objects_information);
        expect(io.includeEmailCopy).to.equal(mockIo.include_email_copy);
        expect(io.includeGeneralNatureOfBusinessInformation).to.equal(mockIo.include_general_nature_of_business_information);
        expect(io.includeGoodStandingInformation).to.equal(mockIo.include_good_standing_information);
        expect(io.registeredOfficeAddressDetails).to.be.undefined;
        expect(io.secretaryDetails).to.be.undefined;
        expect(io.surname).to.be.undefined;
        expect(certificateItem.quantity).to.equal(mockResponseBodyMissingFields.quantity);
        expect(io.liquidatorsDetails).to.be.undefined;
        expect(io.companyStatus).to.be.undefined;
        expect(io.administratorsDetails).to.be.undefined;
    });
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

        expect(data.isFailure()).to.be.true;
        expect(data.isSuccess()).to.be.false;
        expect(data.value.httpStatusCode).to.equal(401);
        expect(data.value.errors[0].error).to.equal("An error occurred");
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

        expect(data.value.httpStatusCode).to.equal(200);
        expect(data.value.resource.companyNumber).to.equal(mockResponseBody.company_number);
        expect(data.value.resource.customerReference).to.equal(mockResponseBody.customer_reference);
        expect(io.certificateType).to.equal(mockIo.certificate_type);
        expect(io.collectionLocation).to.equal(mockIo.collection_location);
        expect(io.companyType).to.equal(mockIo.company_type);
        expect(io.contactNumber).to.equal(mockIo.contact_number);
        expect(io.deliveryMethod).to.equal(mockIo.delivery_method);
        expect(io.deliveryTimescale).to.equal(mockIo.delivery_timescale);
        expect(io.designatedMemberDetails.includeAddress).to.equal(mockIo.designated_member_details.include_address);
        expect(io.designatedMemberDetails.includeAppointmentDate).to.equal(mockIo.designated_member_details.include_appointment_date);
        expect(io.designatedMemberDetails.includeBasicInformation).to.equal(mockIo.designated_member_details.include_basic_information);
        expect(io.designatedMemberDetails.includeCountryOfResidence).to.equal(mockIo.designated_member_details.include_country_of_residence);
        expect(io.designatedMemberDetails.includeDobType).to.equal(mockIo.designated_member_details.include_dob_type);
        expect(io.directorDetails.includeAddress).to.equal(mockIo.director_details.include_address);
        expect(io.directorDetails.includeAppointmentDate).to.equal(mockIo.director_details.include_appointment_date);
        expect(io.directorDetails.includeBasicInformation).to.equal(mockIo.director_details.include_basic_information);
        expect(io.directorDetails.includeCountryOfResidence).to.equal(mockIo.director_details.include_country_of_residence);
        expect(io.directorDetails.includeDobType).to.equal(mockIo.director_details.include_dob_type);
        expect(io.directorDetails.includeNationality).to.equal(mockIo.director_details.include_nationality);
        expect(io.directorDetails.includeOccupation).to.equal(mockIo.director_details.include_occupation);
        expect(io.forename).to.equal(mockIo.forename);
        expect(io.generalPartnerDetails.includeBasicInformation).to.equal(mockIo.general_partner_details.include_basic_information);
        expect(io.includeCompanyObjectsInformation).to.equal(mockIo.include_company_objects_information);
        expect(io.includeEmailCopy).to.equal(mockIo.include_email_copy);
        expect(io.includeGeneralNatureOfBusinessInformation).to.equal(mockIo.include_general_nature_of_business_information);
        expect(io.includeGoodStandingInformation).to.equal(mockIo.include_good_standing_information);
        expect(io.limitedPartnerDetails.includeBasicInformation).to.equal(mockIo.limited_partner_details.include_basic_information);
        expect(io.memberDetails.includeAddress).to.equal(mockIo.member_details.include_address);
        expect(io.memberDetails.includeAppointmentDate).to.equal(mockIo.member_details.include_appointment_date);
        expect(io.memberDetails.includeBasicInformation).to.equal(mockIo.member_details.include_basic_information);
        expect(io.memberDetails.includeCountryOfResidence).to.equal(mockIo.member_details.include_country_of_residence);
        expect(io.memberDetails.includeDobType).to.equal(mockIo.member_details.include_dob_type);
        expect(io.principalPlaceOfBusinessDetails.includeAddressRecordsType).to.equal(mockIo.registered_office_address_details.include_address_records_type);
        expect(io.principalPlaceOfBusinessDetails.includeDates).to.equal(mockIo.registered_office_address_details.include_dates);
        expect(io.registeredOfficeAddressDetails.includeAddressRecordsType).to.equal(mockIo.registered_office_address_details.include_address_records_type);
        expect(io.registeredOfficeAddressDetails.includeDates).to.equal(mockIo.registered_office_address_details.include_dates);
        expect(io.secretaryDetails.includeAddress).to.equal(mockIo.secretary_details.include_address);
        expect(io.secretaryDetails.includeAppointmentDate).to.equal(mockIo.secretary_details.include_appointment_date);
        expect(io.secretaryDetails.includeBasicInformation).to.equal(mockIo.secretary_details.include_basic_information);
        expect(io.secretaryDetails.includeCountryOfResidence).to.equal(mockIo.secretary_details.include_country_of_residence);
        expect(io.secretaryDetails.includeDobType).to.equal(mockIo.secretary_details.include_dob_type);
        expect(io.secretaryDetails.includeNationality).to.equal(mockIo.secretary_details.include_nationality);
        expect(io.secretaryDetails.includeOccupation).to.equal(mockIo.secretary_details.include_occupation);
        expect(io.surname).to.equal(mockIo.surname);
        expect(data.value.resource.quantity).to.equal(mockResponseBody.quantity);
        expect(io.liquidatorsDetails.includeBasicInformation).to.equal(mockIo.liquidators_details.include_basic_information);
        expect(io.companyStatus).to.equal(mockIo.company_status);
        expect(io.administratorsDetails.includeBasicInformation).to.equal(mockIo.administrators_details.include_basic_information);
    });

    it("maps patch a certificate correctly when director, secretary, registered office address details and surname are missing", async () => {
        const mockPatchRequest = {
            status: 200,
            body: mockResponseBodyMissingFields
        };

        sinon.stub(requestClient, "httpPatch").resolves(mockPatchRequest);
        const certificate: CertificateService = new CertificateService(requestClient);
        const data = await certificate.patchCertificate(mockRequestBody, certificateId) as Success<ApiResponse<CertificateItem>, ApiErrorResponse>;
        const io = data.value.resource.itemOptions;
        const mockIo = mockResponseBodyMissingFields.item_options;

        expect(data.value.httpStatusCode).to.equal(200);
        expect(data.value.resource.companyNumber).to.equal(mockResponseBodyMissingFields.company_number);
        expect(data.value.resource.customerReference).to.equal(mockResponseBodyMissingFields.customer_reference);
        expect(io.certificateType).to.equal(mockIo.certificate_type);
        expect(io.collectionLocation).to.equal(mockIo.collection_location);
        expect(io.contactNumber).to.equal(mockIo.contact_number);
        expect(io.deliveryMethod).to.equal(mockIo.delivery_method);
        expect(io.deliveryTimescale).to.equal(mockIo.delivery_timescale);
        expect(io.directorDetails).to.be.undefined;
        expect(io.forename).to.equal(mockIo.forename);
        expect(io.includeCompanyObjectsInformation).to.equal(mockIo.include_company_objects_information);
        expect(io.includeEmailCopy).to.equal(mockIo.include_email_copy);
        expect(io.includeGeneralNatureOfBusinessInformation).to.equal(mockIo.include_general_nature_of_business_information);
        expect(io.includeGoodStandingInformation).to.equal(mockIo.include_good_standing_information);
        expect(io.registeredOfficeAddressDetails).to.be.undefined;
        expect(io.secretaryDetails).to.be.undefined;
        expect(io.surname).to.be.undefined;
        expect(data.value.resource.quantity).to.equal(mockResponseBodyMissingFields.quantity);
        expect(io.liquidatorsDetails).to.be.undefined;
        expect(io.companyStatus).to.be.undefined;
        expect(io.administratorsDetails).to.be.undefined;
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
        expect(data.isFailure()).to.equal(true);
        expect(data.isSuccess()).to.equal(false);
        expect(result.httpStatusCode).to.equal(401);
        expect(result.errors).to.deep.equal([{
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
        expect(result.httpStatusCode).to.equal(201)
        expect(result.resource).to.be.deep.equal({
            id: "CRT-123123-123123",
            companyNumber: "00006400",
            itemOptions: {
                companyStatus: "active",
                companyType: "ltd"
            }
        } as CertificateItem)
    })
})
