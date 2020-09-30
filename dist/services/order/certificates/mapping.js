"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CertificateMapping {
    static mapCertificateItemRequestToCertificateItemRequestResource(certificateItemRequest) {
        const itemOptions = certificateItemRequest.itemOptions;
        const directorDetails = this.mapDirectorOrSecretaryDetailsRequestDirectorOrSecretaryDetailsResource(itemOptions.directorDetails);
        const secretaryDetails = this.mapDirectorOrSecretaryDetailsRequestDirectorOrSecretaryDetailsResource(itemOptions.secretaryDetails);
        const registeredOfficeAddressDetails = this.mapRegisteredOfficeRequestToRegisteredOfficeDetails(itemOptions.registeredOfficeAddressDetails);
        return {
            customer_reference: certificateItemRequest.customerReference,
            company_number: certificateItemRequest.companyNumber,
            item_options: {
                certificate_type: itemOptions.certificateType,
                collection_location: itemOptions.collectionLocation,
                contact_number: itemOptions.contactNumber,
                delivery_method: itemOptions.deliveryMethod,
                delivery_timescale: itemOptions.deliveryTimescale,
                director_details: directorDetails,
                forename: itemOptions.forename,
                include_company_objects_information: itemOptions.includeCompanyObjectsInformation,
                include_email_copy: itemOptions.includeEmailCopy,
                include_good_standing_information: itemOptions.includeGoodStandingInformation,
                registered_office_address_details: registeredOfficeAddressDetails,
                secretary_details: secretaryDetails,
                surname: itemOptions.surname
            },
            quantity: certificateItemRequest.quantity
        };
    }
    static mapCertificateItemResourceToCertificateItem(body) {
        const io = body.item_options;
        const directorDetails = this.mapDirectorOrSecretaryDetailsResourceToDirectorOrSecretaryDetails(io.director_details);
        const secretaryDetails = this.mapDirectorOrSecretaryDetailsResourceToDirectorOrSecretaryDetails(io.secretary_details);
        const registeredOfficeAddressDetails = this.mapRegisteredOfficeResourceToRegisteredOffice(io.registered_office_address_details);
        const certificateItem = {
            companyName: body.company_name,
            companyNumber: body.company_number,
            customerReference: body.customer_reference,
            description: body.description,
            descriptionIdentifier: body.description_identifier,
            descriptionValues: body.description_values,
            etag: body.etag,
            id: body.id,
            itemCosts: body.item_costs.map((i) => ({
                calculatedCost: i === null || i === void 0 ? void 0 : i.calculated_cost,
                discountApplied: i === null || i === void 0 ? void 0 : i.discount_applied,
                itemCost: i === null || i === void 0 ? void 0 : i.item_cost,
                productType: i === null || i === void 0 ? void 0 : i.product_type
            })),
            itemOptions: {
                certificateType: io.certificate_type,
                collectionLocation: io.collection_location,
                contactNumber: io.contact_number,
                deliveryMethod: io.delivery_method,
                deliveryTimescale: io.delivery_timescale,
                directorDetails,
                forename: io.forename,
                includeCompanyObjectsInformation: io.include_company_objects_information,
                includeEmailCopy: io.include_email_copy,
                includeGoodStandingInformation: io.include_good_standing_information,
                registeredOfficeAddressDetails,
                secretaryDetails,
                surname: io.surname
            },
            kind: body.kind,
            links: {
                self: body.links.self
            },
            postageCost: body.postage_cost,
            postalDelivery: body.postal_delivery,
            quantity: body.quantity,
            totalItemCost: body.total_item_cost
        };
        const cleanCertificateItem = certificateItem;
        return cleanCertificateItem;
    }
    static mapDirectorOrSecretaryDetailsRequestDirectorOrSecretaryDetailsResource(request) {
        const directorOrSecretaryDetails = {
            include_address: request === null || request === void 0 ? void 0 : request.includeAddress,
            include_appointment_date: request === null || request === void 0 ? void 0 : request.includeAppointmentDate,
            include_basic_information: request === null || request === void 0 ? void 0 : request.includeBasicInformation,
            include_country_of_residence: request === null || request === void 0 ? void 0 : request.includeCountryOfResidence,
            include_dob_type: request === null || request === void 0 ? void 0 : request.includeDobType,
            include_nationality: request === null || request === void 0 ? void 0 : request.includeNationality,
            include_occupation: request === null || request === void 0 ? void 0 : request.includeOccupation
        };
        return Object.values(directorOrSecretaryDetails).some((value) => value !== undefined)
            ? directorOrSecretaryDetails
            : undefined;
    }
    static mapRegisteredOfficeRequestToRegisteredOfficeDetails(request) {
        const registeredOfficeAddressDetails = {
            include_address_records_type: request === null || request === void 0 ? void 0 : request.includeAddressRecordsType,
            include_dates: request === null || request === void 0 ? void 0 : request.includeDates
        };
        return Object.values(registeredOfficeAddressDetails).some((value) => value !== undefined)
            ? registeredOfficeAddressDetails
            : undefined;
    }
    static mapDirectorOrSecretaryDetailsResourceToDirectorOrSecretaryDetails(resource) {
        const directorOrSecretaryDetails = {
            includeAddress: resource === null || resource === void 0 ? void 0 : resource.include_address,
            includeAppointmentDate: resource === null || resource === void 0 ? void 0 : resource.include_appointment_date,
            includeBasicInformation: resource === null || resource === void 0 ? void 0 : resource.include_basic_information,
            includeCountryOfResidence: resource === null || resource === void 0 ? void 0 : resource.include_country_of_residence,
            includeDobType: resource === null || resource === void 0 ? void 0 : resource.include_dob_type,
            includeNationality: resource === null || resource === void 0 ? void 0 : resource.include_nationality,
            includeOccupation: resource === null || resource === void 0 ? void 0 : resource.include_occupation
        };
        return Object.values(directorOrSecretaryDetails).some((value) => value !== undefined)
            ? directorOrSecretaryDetails
            : undefined;
    }
    static mapRegisteredOfficeResourceToRegisteredOffice(resource) {
        const registeredOfficeAddressDetails = {
            includeAddressRecordsType: resource === null || resource === void 0 ? void 0 : resource.include_address_records_type,
            includeDates: resource === null || resource === void 0 ? void 0 : resource.include_dates
        };
        return Object.values(registeredOfficeAddressDetails).some((value) => value !== undefined)
            ? registeredOfficeAddressDetails
            : undefined;
    }
}
exports.default = CertificateMapping;
//# sourceMappingURL=mapping.js.map