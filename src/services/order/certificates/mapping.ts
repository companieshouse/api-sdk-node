
import {
    CertificateItem, CertificateItemResource, ItemOptionsResource,
    ItemCostsResource, CertificateItemPostRequest, CertificateItemRequestResource,
    ItemOptionsRequest, CertificateItemPatchRequest, DirectorOrSecretaryDetails, DirectorOrSecretaryDetailsResource,
    RegisteredOfficeAddressDetailsResource, RegisteredOfficeAddressDetails, DirectorOrSecretaryDetailsRequest,
    DesignatedMemberDetails,
    DesignatedMemberDetailsResource,
    GeneralPartnerDetails,
    LimitedPartnerDetailsResource,
    OrdinaryMemberDetailsResource,
    PrinciplePlaceOfBusinessDetailsResource,
    AddressDetailsRequest,
    AddressDetailsResource,
    GeneralPartnerDetailsResource,
    MemberDetails,
    MemberDetailsRequest,
    MemberDetailsResource,
    PartnerDetailsRequest,
    PartnerDetailsResource,
    PartnerDetails,
    PrinciplePlaceOfBusinessDetails,
    OrdinaryMemberDetails,
    LimitedPartnerDetails
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
                this.mapAddressDetailsRequestToAddressDetailsResource(itemOptions.registeredOfficeAddressDetails);

        const principlePlaceOfBusinessDetails: PrinciplePlaceOfBusinessDetailsResource =
                this.mapAddressDetailsRequestToAddressDetailsResource(itemOptions.principlePlaceOfBusinessDetails);

        const designatedMemberDetails: DesignatedMemberDetailsResource =
                this.mapMemberDetailsRequestToMemberDetailsResource(itemOptions.designatedMemberDetails);

        const ordinaryMemberDetails: OrdinaryMemberDetailsResource =
                this.mapMemberDetailsRequestToMemberDetailsResource(itemOptions.memberDetails);

        const generalPartnerDetails: GeneralPartnerDetailsResource =
                this.mapPartnerDetailsRequestToPartnerDetailsResource(itemOptions.generalPartnerDetails);

        const limitedPartnerDetails: LimitedPartnerDetailsResource =
                this.mapPartnerDetailsRequestToPartnerDetailsResource(itemOptions.limitedPartnerDetails);
        return {
            customer_reference: certificateItemRequest.customerReference,
            company_number: certificateItemRequest.companyNumber,
            item_options: {
                certificate_type: itemOptions.certificateType,
                collection_location: itemOptions.collectionLocation,
                contact_number: itemOptions.contactNumber,
                delivery_method: itemOptions.deliveryMethod,
                delivery_timescale: itemOptions.deliveryTimescale,
                designated_member_details: designatedMemberDetails,
                director_details: directorDetails,
                forename: itemOptions.forename,
                general_partner_details: generalPartnerDetails,
                include_company_objects_information: itemOptions.includeCompanyObjectsInformation,
                include_email_copy: itemOptions.includeEmailCopy,
                include_good_standing_information: itemOptions.includeGoodStandingInformation,
                limited_partner_details: limitedPartnerDetails,
                member_details: ordinaryMemberDetails,
                principle_place_of_business_details: principlePlaceOfBusinessDetails,
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
                this.mapAddressDetailsResourceToAddressDetails(io.registered_office_address_details);

        const principlePlaceOfBusinessDetails: PrinciplePlaceOfBusinessDetails =
                this.mapAddressDetailsResourceToAddressDetails(io.principle_place_of_business_details);

        const designatedMemberDetails: DesignatedMemberDetails =
                this.mapMemberDetailsResourceToMemberDetails(io.designated_member_details);

        const ordinaryMemberDetails: OrdinaryMemberDetails =
                this.mapMemberDetailsResourceToMemberDetails(io.member_details);

        const generalPartnerDetails: GeneralPartnerDetails =
                this.mapPartnerDetailsResourceToPartnerDetails(io.general_partner_details);

        const limitedPartnerDetails: LimitedPartnerDetails =
                this.mapPartnerDetailsResourceToPartnerDetails(io.limited_partner_details);

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
                companyType: io.company_type,
                contactNumber: io.contact_number,
                deliveryMethod: io.delivery_method,
                deliveryTimescale: io.delivery_timescale,
                designatedMemberDetails,
                directorDetails,
                forename: io.forename,
                generalPartnerDetails,
                includeCompanyObjectsInformation: io.include_company_objects_information,
                includeEmailCopy: io.include_email_copy,
                includeGoodStandingInformation: io.include_good_standing_information,
                limitedPartnerDetails,
                memberDetails: ordinaryMemberDetails,
                principlePlaceOfBusinessDetails,
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

    private static mapAddressDetailsRequestToAddressDetailsResource (
        request: AddressDetailsRequest): AddressDetailsResource {
        const registeredOfficeAddressDetails: AddressDetailsResource = {
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

    private static mapAddressDetailsResourceToAddressDetails (
        resource: RegisteredOfficeAddressDetailsResource): RegisteredOfficeAddressDetails {
        const registeredOfficeAddressDetails: RegisteredOfficeAddressDetails = {
            includeAddressRecordsType: resource?.include_address_records_type,
            includeDates: resource?.include_dates
        };

        return Object.values(registeredOfficeAddressDetails).some((value) => value !== undefined)
            ? registeredOfficeAddressDetails
            : undefined;
    }

    private static mapMemberDetailsRequestToMemberDetailsResource (request: MemberDetailsRequest): MemberDetailsResource {
        const memberDetailsResource: MemberDetailsResource = {
            include_address: request?.includeAddress,
            include_appointment_date: request?.includeAppointmentDate,
            include_basic_information: request?.includeBasicInformation,
            include_country_of_residence: request?.includeCountryOfResidence,
            include_dob_type: request?.includeDobType
        };
        return Object.values(memberDetailsResource).some((value) => value !== undefined)
            ? memberDetailsResource
            : undefined;
    }

    private static mapMemberDetailsResourceToMemberDetails (resource: MemberDetailsResource): MemberDetails {
        const memberDetails: MemberDetails = {
            includeAddress: resource?.include_address,
            includeAppointmentDate: resource?.include_appointment_date,
            includeBasicInformation: resource?.include_basic_information,
            includeCountryOfResidence: resource?.include_country_of_residence,
            includeDobType: resource?.include_dob_type
        };
        return Object.values(memberDetails).some((value) => value !== undefined)
            ? memberDetails
            : undefined;
    }

    private static mapPartnerDetailsRequestToPartnerDetailsResource (request: PartnerDetailsRequest): PartnerDetailsResource {
        const partnerDetailsResource: PartnerDetailsResource = {
            include_basic_information: request?.includeBasicInformation
        };
        return Object.values(partnerDetailsResource).some((value) => value !== undefined) ? partnerDetailsResource : undefined;
    }

    private static mapPartnerDetailsResourceToPartnerDetails (resource: PartnerDetailsResource): PartnerDetails {
        const partnerDetails: PartnerDetails = {
            includeBasicInformation: resource?.include_basic_information
        };
        return Object.values(partnerDetails).some((value) => value !== undefined) ? partnerDetails : undefined;
    }
}
