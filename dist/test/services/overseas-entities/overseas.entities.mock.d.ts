import { RequestClient } from "../../../src";
import { CreatePaymentRequest } from "../../../src/services/payment/types";
import { Address, BeneficialOwnerCorporate, BeneficialOwnerCorporateResource, BeneficialOwnerGovernmentOrPublicAuthority, BeneficialOwnerGovernmentOrPublicAuthorityResource, BeneficialOwnerIndividual, BeneficialOwnerIndividualResource, DueDiligence, DueDiligenceResource, Entity, EntityName, ManagingOfficerCorporate, ManagingOfficerCorporateResource, ManagingOfficerIndividual, ManagingOfficerIndividualResource, OverseasEntity, OverseasEntityCreated, OverseasEntityDueDiligence, OverseasEntityDueDiligenceResource, OverseasEntityResource, Presenter, Trust, TrustResource, TrustIndividual, TrustIndividualResource, TrustCorporate, TrustCorporateResource, TrustHistoricalBeneficialOwner, TrustHistoricalBeneficialOwnerResource, Update, UpdateResource, OverseasEntityExtraDetails, BeneficialOwnerPrivateDataResource, TrustToReviewResource, TrustToReview, Remove, RemoveResource } from "../../../src/services/overseas-entities";
export declare const ADDRESS: Address;
export declare const PRIVATE_ADDRESS_MOCK: {
    addressLine1: string;
    addressLine2: string;
    careOf: string;
    country: string;
    locality: string;
    poBox: string;
    postalCode: string;
    premises: string;
    region: string;
};
export declare const BENEFICIAL_OWNER_PRIVATE_DATA_RESOURCE_MOCK: {
    hashedId: string;
    dateBecameRegistrable: string;
    isServiceAddressSameAsUsualAddress: string;
    dateOfBirth: string;
    usualResidentialAddress: {
        addressLine1: string;
        addressLine2: string;
        careOf: string;
        country: string;
        locality: string;
        poBox: string;
        postalCode: string;
        premises: string;
        region: string;
    };
    principalAddress: {
        addressLine1: string;
        addressLine2: string;
        careOf: string;
        country: string;
        locality: string;
        poBox: string;
        postalCode: string;
        premises: string;
        region: string;
    };
}[];
export declare const MANAGING_OFFICERS_PRIVATE_DATA_MOCK: {
    managingOfficerAppointmentId: string;
    residentialAddress: {
        addressLine1: string;
        addressLine2: string;
        careOf: string;
        country: string;
        locality: string;
        poBox: string;
        postalCode: string;
        premises: string;
        region: string;
    };
    principalAddress: {
        addressLine1: string;
        addressLine2: string;
        careOf: string;
        country: string;
        locality: string;
        poBox: string;
        postalCode: string;
        premises: string;
        region: string;
    };
    dateOfBirth: string;
    contactNameFull: string;
    contactEmailAddress: string;
    hashedId: string;
}[];
export declare const ENTITY_NAME_BLOCK_MOCK: EntityName;
export declare const ENTITY_NAME_FIELD_MOCK = "Entity Name";
export declare const ENTITY_NUMBER_MOCK = "Entity Number";
export declare const PRESENTER_OBJECT_MOCK: Presenter;
export declare const PAYMENT_OBJECT_MOCK: CreatePaymentRequest;
export declare enum ENTITY_WHO_IS_REGISTERING {
    AGENT = "agent",
    SOMEONE_ELSE = "someone_else"
}
export declare const ENTITY_OBJECT_MOCK: Entity;
export declare const BENEFICIAL_OWNER_INDIVIDUAL_MOCK_LIST: BeneficialOwnerIndividual[];
export declare const BENEFICIAL_OWNER_INDIVIDUAL_RESOURCE_MOCK_LIST: BeneficialOwnerIndividualResource[];
export declare const BENEFICIAL_OWNER_CORPORATE_MOCK_LIST: BeneficialOwnerCorporate[];
export declare const BENEFICIAL_OWNER_CORPORATE_RESOURCE_MOCK_LIST: BeneficialOwnerCorporateResource[];
export declare const BENEFICIAL_OWNER_GOVERNMENT_MOCK_LIST: BeneficialOwnerGovernmentOrPublicAuthority[];
export declare const BENEFICIAL_OWNER_GOVERNMENT_RESOURCE_MOCK_LIST: BeneficialOwnerGovernmentOrPublicAuthorityResource[];
export declare const MANAGING_OFFICERS_INDIVIDUAL_MOCK_LIST: ManagingOfficerIndividual[];
export declare const MANAGING_OFFICERS_INDIVIDUAL_RESOURCE_MOCK_LIST: ManagingOfficerIndividualResource[];
export declare const MANAGING_OFFICERS_CORPORATE_MOCK_LIST: ManagingOfficerCorporate[];
export declare const MANAGING_OFFICERS_CORPORATE_RESOURCE_MOCK_LIST: ManagingOfficerCorporateResource[];
export declare const DUE_DILIGENCE_MOCK: DueDiligence;
export declare const DUE_DILIGENCE_RESOURCE_MOCK: DueDiligenceResource;
export declare const OE_DUE_DILIGENCE_MOCK: OverseasEntityDueDiligence;
export declare const OE_DUE_DILIGENCE_RESOURCE_MOCK: OverseasEntityDueDiligenceResource;
export declare const TRUST_INDIVIDUALS_MOCK: TrustIndividual[];
export declare const TRUST_CORPORATES_MOCK: TrustCorporate[];
export declare const TRUST_HISTORICAL_BOS_MOCK: TrustHistoricalBeneficialOwner[];
export declare const TRUSTS_MOCK: Trust[];
export declare const REVIEW_TRUSTS_MOCK: TrustToReview[];
export declare const UPDATE_OBJECT_MOCK: Update;
export declare const REMOVE_OBJECT_MOCK: Remove;
export declare const OVERSEAS_ENTITY_OBJECT_MOCK: OverseasEntity;
export declare const OVERSEAS_ENTITY_EXTRA_DETAILS_OBJECT_MOCK: OverseasEntityExtraDetails;
export declare const BENEFICIAL_OWNER_PRIVATE_DATA_OBJECT_MOCK: BeneficialOwnerPrivateDataResource;
export declare const TRUST_INDIVIDUALS_RESOURCE_MOCK: TrustIndividualResource[];
export declare const TRUST_CORPORATES_RESOURCE_MOCK: TrustCorporateResource[];
export declare const TRUST_HISTORICAL_BOS_RESOURCE_MOCK: TrustHistoricalBeneficialOwnerResource[];
export declare const TRUSTS_RESOURCE_MOCK: TrustResource[];
export declare const REVIEW_TRUSTS_RESOURCE_MOCK: TrustToReviewResource[];
export declare const UPDATE_RESOURCE_MOCK: UpdateResource;
export declare const REMOVE_RESOURCE_MOCK: RemoveResource;
export declare const OVERSEAS_ENTITY_RESOURCE_OBJECT_MOCK: OverseasEntityResource;
export declare const OVERSEAS_ENTITY_EXTRA_DETAILS_RESOURCE_MOCK: OverseasEntityExtraDetails;
export declare const requestClient: RequestClient;
export declare const TRANSACTION_ID = "12345";
export declare const OVERSEAS_ENTITY_ID = "00112233";
export declare const UNAUTHORISED = "Unauthorised";
export declare const BAD_REQUEST = "Bad Request";
export declare const mockOverseasEntityCreatedResource: OverseasEntityCreated;
export declare const mockPostOverseasEntityResponse: {
    201: {
        status: number;
        body: OverseasEntityCreated;
    };
    400: {
        status: number;
        error: string;
    };
    401: {
        status: number;
        error: string;
    };
};
export declare const mockPutOverseasEntityResponse: {
    200: {
        status: number;
    };
    400: {
        status: number;
        error: string;
    };
};
export declare const mockGetOverseasEntityResponse: {
    200: {
        status: number;
        body: OverseasEntityResource;
    };
    400: {
        status: number;
        error: string;
    };
};
export declare const mockGetOverseasEntityExtraDetailsResponse: {
    200: {
        status: number;
        body: OverseasEntityExtraDetails;
    };
    400: {
        status: number;
        error: string;
    };
};
export declare const mockBeneficialOwnerPrivateDataResponse: {
    200: {
        status: number;
        body: {
            hashedId: string;
            dateBecameRegistrable: string;
            isServiceAddressSameAsUsualAddress: string;
            dateOfBirth: string;
            usualResidentialAddress: {
                addressLine1: string;
                addressLine2: string;
                careOf: string;
                country: string;
                locality: string;
                poBox: string;
                postalCode: string;
                premises: string;
                region: string;
            };
            principalAddress: {
                addressLine1: string;
                addressLine2: string;
                careOf: string;
                country: string;
                locality: string;
                poBox: string;
                postalCode: string;
                premises: string;
                region: string;
            };
        }[];
    };
    400: {
        status: number;
        error: string;
    };
};
export declare const mockBeneficialOwnerPrivateDataUndefinedResponse: {
    200: {
        status: number;
        body: any;
    };
};
export declare const PRIVATE_TRUSTS_DATA_ID_MOCK = "123";
export declare const PRIVATE_TRUSTS_DATA_MOCK: {
    hashedTrustId: string;
    trustName: string;
    creationDate: string;
    ceasedDate: string;
    trustStillInvolvedInOverseasEntityIndicator: boolean;
    unableToObtainAllTrustInfoIndicator: boolean;
}[];
export declare const PRIVATE_TRUSTS_DATA_RESOURCE_MOCK: {
    hashed_trust_id: string;
    trust_name: string;
    creation_date: string;
    ceased_date: string;
    trust_still_involved_in_overseas_entity_indicator: boolean;
    unable_to_obtain_all_trust_info_indicator: boolean;
}[];
export declare const PRIVATE_TRUSTS_NOT_CEASED_DATA_MOCK: {
    hashedTrustId: string;
    trustName: string;
    creationDate: string;
    unableToObtainAllTrustInfoIndicator: boolean;
}[];
export declare const PRIVATE_TRUSTS_NOT_CEASED_DATA_RESOURCE_MOCK: {
    hashed_trust_id: string;
    trust_name: string;
    creation_date: string;
    unable_to_obtain_all_trust_info_indicator: boolean;
}[];
export declare const TRUST_LINKS_MOCK: {
    hashedTrustId: string;
    hashedCorporateBodyAppointmentId: string;
}[];
export declare const TRUST_LINKS_RESOURCE_MOCK: {
    hashed_trust_id: string;
    hashed_corporate_body_appointment_id: string;
}[];
export declare const INDIVIDUAL_TRUSTEES_DATA_MOCK: {
    hashedTrusteeId: string;
    trusteeForename1: string;
    trusteeForename2: string;
    trusteeSurname: string;
    dateOfBirth: string;
    nationality: string;
    corporateIndicator: string;
    trusteeTypeId: string;
    appointmentDate: string;
    ceasedDate: string;
    serviceAddress: {
        addressLine1: string;
        addressLine2: string;
        careOf: string;
        country: string;
        locality: string;
        poBox: string;
        postalCode: string;
        premises: string;
        region: string;
    };
    usualResidentialAddress: {
        addressLine1: string;
        addressLine2: string;
        careOf: string;
        country: string;
        locality: string;
        poBox: string;
        postalCode: string;
        premises: string;
        region: string;
    };
}[];
export declare const INDIVIDUAL_TRUSTEES_DATA_RESOURCE_MOCK: {
    hashed_trustee_id: string;
    trustee_forename_1: string;
    trustee_forename_2: string;
    trustee_surname: string;
    date_of_birth: string;
    nationality: string;
    corporate_indicator: string;
    trustee_type_id: string;
    appointment_date: string;
    ceased_date: string;
    service_address: {
        address_line_1: string;
        address_line_2: string;
        care_of: string;
        country: string;
        locality: string;
        po_box: string;
        postal_code: string;
        premises: string;
        region: string;
    };
    usual_residential_address: {
        address_line_1: string;
        address_line_2: string;
        care_of: string;
        country: string;
        locality: string;
        po_box: string;
        postal_code: string;
        premises: string;
        region: string;
    };
}[];
export declare const CORPORATE_TRUSTEES_DATA_MOCK: {
    hashedTrusteeId: string;
    trusteeName: string;
    registerLocation: string;
    registrationNumber: string;
    lawGoverned: string;
    legalForm: string;
    onRegisterInCountryFormedIn: string;
    corporateIndicator: string;
    trusteeTypeId: string;
    appointmentDate: string;
    ceasedDate: string;
    serviceAddress: {
        addressLine1: string;
        addressLine2: string;
        careOf: string;
        country: string;
        locality: string;
        poBox: string;
        postalCode: string;
        premises: string;
        region: string;
    };
    registeredOfficeAddress: {
        addressLine1: string;
        addressLine2: string;
        careOf: string;
        country: string;
        locality: string;
        poBox: string;
        postalCode: string;
        premises: string;
        region: string;
    };
}[];
export declare const CORPORATE_TRUSTEES_DATA_RESOURCE_MOCK: {
    hashed_trustee_id: string;
    trustee_name: string;
    register_location: string;
    registration_number: string;
    law_governed: string;
    legal_form: string;
    on_register_in_country_formed_in: string;
    corporate_indicator: string;
    trustee_type_id: string;
    appointment_date: string;
    ceased_date: string;
    service_address: {
        address_line_1: string;
        address_line_2: string;
        care_of: string;
        country: string;
        locality: string;
        po_box: string;
        postal_code: string;
        premises: string;
        region: string;
    };
    registered_office_address: {
        address_line_1: string;
        address_line_2: string;
        care_of: string;
        country: string;
        locality: string;
        po_box: string;
        postal_code: string;
        premises: string;
        region: string;
    };
}[];
