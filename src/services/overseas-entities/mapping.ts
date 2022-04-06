import {
    Entity,
    EntityResource,
    OverseasEntity,
    OverseasEntityResource,
    Presenter,
    PresenterResource
} from "./types";

export const mapOverseasEntity = (body: OverseasEntity): OverseasEntityResource => {
    return {
        presenter: { ...mapPresenter(body.presenter) },
        entity: { ...mapEntity(body.entity) }
    };
};

const mapPresenter = (body: Presenter): PresenterResource => {
    return {
        full_name: body.fullName,
        phone_number: body.phoneNumber,
        role: body.role,
        role_title: body.roleTitle,
        anti_money_laundering_registration_number: body.registrationNumber
    }
};

const mapEntity = (body: Entity): EntityResource => {
    return {
        name: body.overseasEntityName,
        incorporation_country: body.incorporationCountry,
        principal_address: body.principalAddress,
        is_service_address_same_as_principal_address: body.isAddressSameAsPrincipalAddress,
        service_address: body.serviceAddress,
        email: body.email,
        legal_form: body.legalForm,
        law_governed: body.governedLaw,
        public_register_entity_registered_on: body.publicRegister,
        registration_number: "" + body.registrationNumber
    }
};
