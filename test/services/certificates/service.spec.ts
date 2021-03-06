import chai from "chai";
import sinon from "sinon";
import chaiAsPromised from "chai-as-promised";
import chaiHttp from "chai-http";

import CertificateService from "../../../src/services/order/certificates/service";
import { RequestClient, HttpResponse } from "../../../src/http";
import { CertificateItemResource, CertificateItemPostRequest, CertificateItemPatchRequest } from "../../../src/services/order/certificates/types";
const expect = chai.expect;

const requestClient = new RequestClient({ baseUrl: "URL-NOT-USED", oauthToken: "TOKEN-NOT-USED" });

const mockResponseBody : CertificateItemResource = ({
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
        contact_number: "010100",
        delivery_method: "delivery",
        delivery_timescale: "timescale",
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
        include_company_objects_information: true,
        include_email_copy: true,
        include_good_standing_information: true,
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
        surname: "surname"
    },
    kind: "kind",
    links: {
        self: "self"
    },
    postage_cost: "postage cost",
    postal_delivery: true,
    quantity: 1,
    total_item_cost: "total cost"
});

const mockResponseBodyMissingFields : CertificateItemResource = ({
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
        contact_number: "010100",
        delivery_method: "delivery",
        delivery_timescale: "timescale",
        director_details: undefined,
        forename: "name",
        include_company_objects_information: true,
        include_email_copy: true,
        include_good_standing_information: true,
        registered_office_address_details: undefined,
        secretary_details: undefined,
        surname: undefined
    },
    kind: "kind",
    links: {
        self: "self"
    },
    postage_cost: "postage cost",
    postal_delivery: true,
    quantity: 1,
    total_item_cost: "total cost"
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
            error: "An error occurred"
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const certificate: CertificateService = new CertificateService(requestClient);
        const data = await certificate.getCertificate("CERT-ID-NOT-IMPORTANT");

        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    });

    it("maps the certificate field data items correctly", async () => {
        const mockGetResponse = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const certificate: CertificateService = new CertificateService(requestClient);
        const data = await certificate.getCertificate("CERT-ID-NOT-IMPORTANT");
        const resourceItemOptions = data.resource.itemOptions;
        const resourceDirectorDetails = resourceItemOptions.directorDetails;
        const resourceRegisteredOfficeAddressDetails = resourceItemOptions.registeredOfficeAddressDetails;
        const resourceSecretaryDetails = resourceItemOptions.secretaryDetails;
        const resourceItemCosts = data.resource.itemCosts;
        const mockItemOptions = mockResponseBody.item_options;
        const mockDirectorDetails = mockItemOptions.director_details;
        const mockRegisteredOfficeAddressDetails = mockItemOptions.registered_office_address_details;
        const mockSecretaryDetails = mockItemOptions.secretary_details;
        const mockItemCosts = mockResponseBody.item_costs;

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.companyName).to.equal(mockResponseBody.company_name);
        expect(data.resource.companyNumber).to.equal(mockResponseBody.company_number);
        expect(data.resource.customerReference).to.equal(mockResponseBody.customer_reference);
        expect(data.resource.description).to.equal(mockResponseBody.description);
        expect(data.resource.descriptionIdentifier).to.equal(mockResponseBody.description_identifier);
        expect(data.resource.descriptionValues.key).to.equal(mockResponseBody.description_values.key);
        expect(data.resource.etag).to.equal(mockResponseBody.etag);
        expect(data.resource.id).to.equal(mockResponseBody.id);
        expect(resourceItemCosts.length).to.equal(1);
        expect(resourceItemCosts[0].calculatedCost).to.equal(mockItemCosts[0].calculated_cost);
        expect(resourceItemCosts[0].discountApplied).to.equal(mockItemCosts[0].discount_applied);
        expect(resourceItemCosts[0].itemCost).to.equal(mockItemCosts[0].item_cost);
        expect(resourceItemCosts[0].productType).to.equal(mockItemCosts[0].product_type);
        expect(resourceItemOptions.certificateType).to.equal(mockItemOptions.certificate_type);
        expect(resourceItemOptions.collectionLocation).to.equal(mockItemOptions.collection_location);
        expect(resourceItemOptions.contactNumber).to.equal(mockItemOptions.contact_number);
        expect(resourceItemOptions.deliveryMethod).to.equal(mockItemOptions.delivery_method);
        expect(resourceItemOptions.deliveryTimescale).to.equal(mockItemOptions.delivery_timescale);
        expect(resourceDirectorDetails.includeAddress).to.equal(mockDirectorDetails.include_address);
        expect(resourceDirectorDetails.includeAppointmentDate).to.equal(mockDirectorDetails.include_appointment_date);
        expect(resourceDirectorDetails.includeBasicInformation).to.equal(mockDirectorDetails.include_basic_information);
        expect(resourceDirectorDetails.includeCountryOfResidence).to.equal(mockDirectorDetails.include_country_of_residence);
        expect(resourceDirectorDetails.includeDobType).to.equal(mockDirectorDetails.include_dob_type);
        expect(resourceDirectorDetails.includeNationality).to.equal(mockDirectorDetails.include_nationality);
        expect(resourceDirectorDetails.includeOccupation).to.equal(mockDirectorDetails.include_occupation);
        expect(resourceItemOptions.forename).to.equal(mockItemOptions.forename);
        expect(resourceItemOptions.includeCompanyObjectsInformation).to.equal(mockItemOptions.include_company_objects_information);
        expect(resourceItemOptions.includeEmailCopy).to.equal(mockItemOptions.include_email_copy);
        expect(resourceItemOptions.includeGoodStandingInformation).to.equal(mockItemOptions.include_good_standing_information);
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
        expect(data.resource.kind).to.equal(mockResponseBody.kind);
        expect(data.resource.links.self).to.equal(mockResponseBody.links.self);
        expect(data.resource.postageCost).to.equal(mockResponseBody.postage_cost);
        expect(data.resource.postalDelivery).to.equal(mockResponseBody.postal_delivery);
        expect(data.resource.quantity).to.equal(mockResponseBody.quantity);
        expect(data.resource.totalItemCost).to.equal(mockResponseBody.total_item_cost);
    });

    it("maps the certificate field data items correctly when director, secretary and office address details and surname are missing", async () => {
        const mockGetResponse = {
            status: 200,
            body: mockResponseBodyMissingFields
        };

        const mockRequest = sinon.stub(requestClient, "httpGet").resolves(mockGetResponse);
        const certificate: CertificateService = new CertificateService(requestClient);
        const data = await certificate.getCertificate("CERT-ID-NOT-IMPORTANT");
        const resourceItemOptions = data.resource.itemOptions;
        const resourceDirectorDetails = resourceItemOptions.directorDetails;
        const resourceRegisteredOfficeAddressDetails = resourceItemOptions.registeredOfficeAddressDetails;
        const resourceSecretaryDetails = resourceItemOptions.secretaryDetails;
        const resourceItemCosts = data.resource.itemCosts;
        const mockItemOptions = mockResponseBodyMissingFields.item_options;
        const mockItemCosts = mockResponseBodyMissingFields.item_costs;

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.companyName).to.equal(mockResponseBodyMissingFields.company_name);
        expect(data.resource.companyNumber).to.equal(mockResponseBodyMissingFields.company_number);
        expect(data.resource.customerReference).to.equal(mockResponseBodyMissingFields.customer_reference);
        expect(data.resource.description).to.equal(mockResponseBodyMissingFields.description);
        expect(data.resource.descriptionIdentifier).to.equal(mockResponseBodyMissingFields.description_identifier);
        expect(data.resource.descriptionValues.key).to.equal(mockResponseBodyMissingFields.description_values.key);
        expect(data.resource.etag).to.equal(mockResponseBodyMissingFields.etag);
        expect(data.resource.id).to.equal(mockResponseBodyMissingFields.id);
        expect(resourceItemCosts.length).to.equal(1);
        expect(resourceItemCosts[0].calculatedCost).to.equal(mockItemCosts[0].calculated_cost);
        expect(resourceItemCosts[0].discountApplied).to.equal(mockItemCosts[0].discount_applied);
        expect(resourceItemCosts[0].itemCost).to.equal(mockItemCosts[0].item_cost);
        expect(resourceItemCosts[0].productType).to.equal(mockItemCosts[0].product_type);
        expect(resourceItemOptions.certificateType).to.equal(mockItemOptions.certificate_type);
        expect(resourceItemOptions.collectionLocation).to.equal(mockItemOptions.collection_location);
        expect(resourceItemOptions.contactNumber).to.equal(mockItemOptions.contact_number);
        expect(resourceItemOptions.deliveryMethod).to.equal(mockItemOptions.delivery_method);
        expect(resourceItemOptions.deliveryTimescale).to.equal(mockItemOptions.delivery_timescale);
        expect(resourceDirectorDetails?.includeAddress).to.be.undefined;
        expect(resourceDirectorDetails?.includeAppointmentDate).to.be.undefined;
        expect(resourceDirectorDetails?.includeBasicInformation).to.be.undefined;
        expect(resourceDirectorDetails?.includeCountryOfResidence).to.be.undefined;
        expect(resourceDirectorDetails?.includeDobType).to.be.undefined;
        expect(resourceDirectorDetails?.includeNationality).to.be.undefined;
        expect(resourceDirectorDetails?.includeOccupation).to.be.undefined;
        expect(resourceItemOptions.forename).to.equal(mockItemOptions.forename);
        expect(resourceItemOptions.includeCompanyObjectsInformation).to.equal(mockItemOptions.include_company_objects_information);
        expect(resourceItemOptions.includeEmailCopy).to.equal(mockItemOptions.include_email_copy);
        expect(resourceItemOptions.includeGoodStandingInformation).to.equal(mockItemOptions.include_good_standing_information);
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
        expect(data.resource.kind).to.equal(mockResponseBodyMissingFields.kind);
        expect(data.resource.links.self).to.equal(mockResponseBodyMissingFields.links.self);
        expect(data.resource.postageCost).to.equal(mockResponseBodyMissingFields.postage_cost);
        expect(data.resource.postalDelivery).to.equal(mockResponseBodyMissingFields.postal_delivery);
        expect(data.resource.quantity).to.equal(mockResponseBodyMissingFields.quantity);
        expect(data.resource.totalItemCost).to.equal(mockResponseBodyMissingFields.total_item_cost);
    });
});

describe("create a certificate POST", () => {
    const mockRequestBody: CertificateItemPostRequest = ({
        companyNumber: "company number",
        customerReference: "reference",
        itemOptions: {
            certificateType: "cert type",
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
            forename: "forename",
            includeCompanyObjectsInformation: true,
            includeEmailCopy: true,
            includeGoodStandingInformation: true,
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
            surname: "surname"
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
            error: "An error occurred"
        };

        const mockRequest = sinon.stub(requestClient, "httpPost").resolves(mockPostRequest);
        const certificate: CertificateService = new CertificateService(requestClient);
        const data = await certificate.postCertificate(mockRequestBody);

        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    });

    it("maps create a certificate correctly", async () => {
        const mockPostRequest = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpPost").resolves(mockPostRequest);
        const certificate: CertificateService = new CertificateService(requestClient);
        const data = await certificate.postCertificate(mockRequestBody);
        const io = data.resource.itemOptions;
        const mockIo = mockResponseBody.item_options;

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.companyNumber).to.equal(mockResponseBody.company_number);
        expect(data.resource.customerReference).to.equal(mockResponseBody.customer_reference);
        expect(io.certificateType).to.equal(mockIo.certificate_type);
        expect(io.collectionLocation).to.equal(mockIo.collection_location);
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
        expect(io.forename).to.equal(mockIo.forename);
        expect(io.includeCompanyObjectsInformation).to.equal(mockIo.include_company_objects_information);
        expect(io.includeEmailCopy).to.equal(mockIo.include_email_copy);
        expect(io.includeGoodStandingInformation).to.equal(mockIo.include_good_standing_information);
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
        expect(data.resource.quantity).to.equal(mockResponseBody.quantity);
    });

    it("maps create a certificate correctly when director, secretary, registered office address details and surname are missing", async () => {
        const mockPostRequest = {
            status: 200,
            body: mockResponseBodyMissingFields
        };

        const mockRequest = sinon.stub(requestClient, "httpPost").resolves(mockPostRequest);
        const certificate: CertificateService = new CertificateService(requestClient);
        const data = await certificate.postCertificate(mockRequestBody);
        const io = data.resource.itemOptions;
        const mockIo = mockResponseBodyMissingFields.item_options;

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.companyNumber).to.equal(mockResponseBodyMissingFields.company_number);
        expect(data.resource.customerReference).to.equal(mockResponseBodyMissingFields.customer_reference);
        expect(io.certificateType).to.equal(mockIo.certificate_type);
        expect(io.collectionLocation).to.equal(mockIo.collection_location);
        expect(io.contactNumber).to.equal(mockIo.contact_number);
        expect(io.deliveryMethod).to.equal(mockIo.delivery_method);
        expect(io.deliveryTimescale).to.equal(mockIo.delivery_timescale);
        expect(io.directorDetails).to.be.undefined;
        expect(io.forename).to.equal(mockIo.forename);
        expect(io.includeCompanyObjectsInformation).to.equal(mockIo.include_company_objects_information);
        expect(io.includeEmailCopy).to.equal(mockIo.include_email_copy);
        expect(io.includeGoodStandingInformation).to.equal(mockIo.include_good_standing_information);
        expect(io.registeredOfficeAddressDetails).to.be.undefined;
        expect(io.secretaryDetails).to.be.undefined;
        expect(io.surname).to.be.undefined;
        expect(data.resource.quantity).to.equal(mockResponseBodyMissingFields.quantity);
    });
});

describe("update a certificate PATCH", () => {
    const certificateId = "CHS001";
    const mockRequestBody: CertificateItemPatchRequest = ({
        companyNumber: "company number",
        customerReference: "reference",
        itemOptions: {
            certificateType: "cert type",
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
            forename: "forename",
            includeCompanyObjectsInformation: true,
            includeEmailCopy: true,
            includeGoodStandingInformation: true,
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
            surname: "surname"
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
            error: "An error occurred"
        };

        const mockRequest = sinon.stub(requestClient, "httpPatch").resolves(mockPatchRequest);
        const certificate: CertificateService = new CertificateService(requestClient);
        const data = await certificate.patchCertificate(mockRequestBody, certificateId);

        expect(data.httpStatusCode).to.equal(401);
        expect(data.resource).to.be.undefined;
    });

    it("maps patch a certificate correctly", async () => {
        const mockPatchRequest = {
            status: 200,
            body: mockResponseBody
        };

        const mockRequest = sinon.stub(requestClient, "httpPatch").resolves(mockPatchRequest);
        const certificate: CertificateService = new CertificateService(requestClient);
        const data = await certificate.patchCertificate(mockRequestBody, certificateId);
        const io = data.resource.itemOptions;
        const mockIo = mockResponseBody.item_options;

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.companyNumber).to.equal(mockResponseBody.company_number);
        expect(data.resource.customerReference).to.equal(mockResponseBody.customer_reference);
        expect(io.certificateType).to.equal(mockIo.certificate_type);
        expect(io.collectionLocation).to.equal(mockIo.collection_location);
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
        expect(io.forename).to.equal(mockIo.forename);
        expect(io.includeCompanyObjectsInformation).to.equal(mockIo.include_company_objects_information);
        expect(io.includeEmailCopy).to.equal(mockIo.include_email_copy);
        expect(io.includeGoodStandingInformation).to.equal(mockIo.include_good_standing_information);
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
        expect(data.resource.quantity).to.equal(mockResponseBody.quantity);
    });

    it("maps patch a certificate correctly when director, secretary, registered office address details and surname are missing", async () => {
        const mockPatchRequest = {
            status: 200,
            body: mockResponseBodyMissingFields
        };

        const mockRequest = sinon.stub(requestClient, "httpPatch").resolves(mockPatchRequest);
        const certificate: CertificateService = new CertificateService(requestClient);
        const data = await certificate.patchCertificate(mockRequestBody, certificateId);
        const io = data.resource.itemOptions;
        const mockIo = mockResponseBodyMissingFields.item_options;

        expect(data.httpStatusCode).to.equal(200);
        expect(data.resource.companyNumber).to.equal(mockResponseBodyMissingFields.company_number);
        expect(data.resource.customerReference).to.equal(mockResponseBodyMissingFields.customer_reference);
        expect(io.certificateType).to.equal(mockIo.certificate_type);
        expect(io.collectionLocation).to.equal(mockIo.collection_location);
        expect(io.contactNumber).to.equal(mockIo.contact_number);
        expect(io.deliveryMethod).to.equal(mockIo.delivery_method);
        expect(io.deliveryTimescale).to.equal(mockIo.delivery_timescale);
        expect(io.directorDetails).to.be.undefined;
        expect(io.forename).to.equal(mockIo.forename);
        expect(io.includeCompanyObjectsInformation).to.equal(mockIo.include_company_objects_information);
        expect(io.includeEmailCopy).to.equal(mockIo.include_email_copy);
        expect(io.includeGoodStandingInformation).to.equal(mockIo.include_good_standing_information);
        expect(io.registeredOfficeAddressDetails).to.be.undefined;
        expect(io.secretaryDetails).to.be.undefined;
        expect(io.surname).to.be.undefined;
        expect(data.resource.quantity).to.equal(mockResponseBodyMissingFields.quantity);
    });
});
