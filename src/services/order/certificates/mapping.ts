
import {
    CertificateItem, CertificateItemResource, ItemOptionsResource,
    ItemCostsResource, CertificateItemPostRequest, CertificateItemRequestResource,
    ItemOptionsRequest, CertificateItemPatchRequest, DirectorOrSecretaryDetails, DirectorOrSecretaryDetailsResource,
    RegisteredOfficeAddressDetailsResource, RegisteredOfficeAddressDetails, DirectorOrSecretaryDetailsRequest,
    RegisteredOfficeAddressDetailsRequest
} from "./types";

export default class CertificateMapping {
    public static mapCertificateItemRequestToCertificateItemRequestResource (
        certificateItemRequest: CertificateItemPostRequest | CertificateItemPatchRequest): CertificateItemRequestResource {
        const itemOptions: ItemOptionsRequest = certificateItemRequest.itemOptions;

        const directorDetails: DirectorOrSecretaryDetailsResource =
      this.mapDirectorOrSecretaryDetailsRequestDirectorOrSecretaryDetailsResource(itemOptions.directorDetails);

        const secretaryDetails: DirectorOrSecretaryDetailsResource =
      this.mapDirectorOrSecretaryDetailsRequestDirectorOrSecretaryDetailsResource(itemOptions.secretaryDetails);

        const registeredOfficeAddressDetails: RegisteredOfficeAddressDetailsResource =
      this.mapRegisteredOfficeRequestToRegisteredOfficeDetails(itemOptions.registeredOfficeAddressDetails);

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

    public static mapCertificateItemResourceToCertificateItem (body: CertificateItemResource): CertificateItem {
        const io = body.item_options as ItemOptionsResource;

        const directorDetails: DirectorOrSecretaryDetails =
      this.mapDirectorOrSecretaryDetailsResourceToDirectorOrSecretaryDetails(io.director_details);

        const secretaryDetails: DirectorOrSecretaryDetails =
      this.mapDirectorOrSecretaryDetailsResourceToDirectorOrSecretaryDetails(io.secretary_details);

        const registeredOfficeAddressDetails: RegisteredOfficeAddressDetails =
      this.mapRegisteredOfficeResourceToRegisteredOffice(io.registered_office_address_details);

        const certificateItem: CertificateItem = {
            companyName: body.company_name,
            companyNumber: body.company_number,
            customerReference: body.customer_reference,
            description: body.description,
            descriptionIdentifier: body.description_identifier,
            descriptionValues: body.description_values,
            etag: body.etag,
            id: body.id,
            itemCosts: body.item_costs.map((i: ItemCostsResource) => ({
                calculatedCost: i?.calculated_cost,
                discountApplied: i?.discount_applied,
                itemCost: i?.item_cost,
                productType: i?.product_type
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
        const cleanCertificateItem: CertificateItem = certificateItem;
        return cleanCertificateItem;
    }

    private static mapDirectorOrSecretaryDetailsRequestDirectorOrSecretaryDetailsResource (
        request: DirectorOrSecretaryDetailsRequest): DirectorOrSecretaryDetailsResource {
        const directorOrSecretaryDetails: DirectorOrSecretaryDetailsResource = {
            include_address: request?.includeAddress,
            include_appointment_date: request?.includeAppointmentDate,
            include_basic_information: request?.includeBasicInformation,
            include_country_of_residence: request?.includeCountryOfResidence,
            include_dob_type: request?.includeDobType,
            include_nationality: request?.includeNationality,
            include_occupation: request?.includeOccupation
        };

        return Object.values(directorOrSecretaryDetails).some((value) => value !== undefined)
            ? directorOrSecretaryDetails
            : undefined;
    }

    private static mapRegisteredOfficeRequestToRegisteredOfficeDetails (
        request: RegisteredOfficeAddressDetailsRequest): RegisteredOfficeAddressDetailsResource {
        const registeredOfficeAddressDetails: RegisteredOfficeAddressDetailsResource = {
            include_address_records_type: request?.includeAddressRecordsType,
            include_dates: request?.includeDates
        };

        return Object.values(registeredOfficeAddressDetails).some((value) => value !== undefined)
            ? registeredOfficeAddressDetails
            : undefined;
    }

    private static mapDirectorOrSecretaryDetailsResourceToDirectorOrSecretaryDetails (
        resource: DirectorOrSecretaryDetailsResource): DirectorOrSecretaryDetails {
        const directorOrSecretaryDetails: DirectorOrSecretaryDetails = {
            includeAddress: resource?.include_address,
            includeAppointmentDate: resource?.include_appointment_date,
            includeBasicInformation: resource?.include_basic_information,
            includeCountryOfResidence: resource?.include_country_of_residence,
            includeDobType: resource?.include_dob_type,
            includeNationality: resource?.include_nationality,
            includeOccupation: resource?.include_occupation
        };

        return Object.values(directorOrSecretaryDetails).some((value) => value !== undefined)
            ? directorOrSecretaryDetails
            : undefined;
    }

    private static mapRegisteredOfficeResourceToRegisteredOffice (
        resource: RegisteredOfficeAddressDetailsResource): RegisteredOfficeAddressDetails {
        const registeredOfficeAddressDetails: RegisteredOfficeAddressDetails = {
            includeAddressRecordsType: resource?.include_address_records_type,
            includeDates: resource?.include_dates
        };

        return Object.values(registeredOfficeAddressDetails).some((value) => value !== undefined)
            ? registeredOfficeAddressDetails
            : undefined;
    }
}
