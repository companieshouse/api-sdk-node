import { BeneficialOwnerCorporate, BeneficialOwnerCorporateResource, BeneficialOwnerIndividual, BeneficialOwnerIndividualResource, OverseasEntity, OverseasEntityResource } from "./types";

export const mapOverseasEntity = (body: OverseasEntity): OverseasEntityResource => {
    return {
        presenter: { ...body.presenter },
        entity: { ...body.entity },
        beneficial_owners_statement: body.beneficial_owners_statement,
        beneficial_owners_individual: mapBeneficialOwnersIndividual(body.beneficial_owners_individual),
        beneficial_owners_corporate: mapBeneficialOwnersCorporate(body.beneficial_owners_corporate),
        beneficial_owners_government_or_public_authority: { ...body.beneficial_owners_government_or_public_authority }
    };
};

/**
 * Convert the BeneficialOwnerIndividual array data into the Resource format that the API expects
 * (just converting dates currently)
 * @param boIndividuals Array of BeneficialOwnerIndividual objects
 * @returns Array of BeneficialOwnerIndividualResource
 */
const mapBeneficialOwnersIndividual = (boIndividuals?: BeneficialOwnerIndividual[]): BeneficialOwnerIndividualResource[] => {
    if (!boIndividuals) {
        return {} as BeneficialOwnerIndividualResource[];
    }

    const boIndividualResources: BeneficialOwnerIndividualResource[] = [];
    boIndividuals.forEach(boIndividual => {
        const { date_of_birth, start_date, ...rest } = boIndividual;
        const dobAsString = `${date_of_birth.year}-${date_of_birth.month}-${date_of_birth.day}`;
        const startDateAsString = `${start_date.year}-${start_date.month}-${start_date.day}`;
        boIndividualResources.push({
            date_of_birth: dobAsString,
            start_date: startDateAsString,
            ...rest
        })
    });
    return boIndividualResources;
}

/**
 * Convert the BeneficialOwnerCorporate array data into the Resource format that the API expects
 * (just converting dates currently)
 * @param boCorporates Array of BeneficialOwnerCorporate objects
 * @returns Array of BeneficialOwnerCorporateResource
 */
const mapBeneficialOwnersCorporate = (boCorporates?: BeneficialOwnerCorporate[]): BeneficialOwnerCorporateResource[] => {
    if (!boCorporates) {
        return {} as BeneficialOwnerCorporateResource[];
    }

    const boCorporateResources: BeneficialOwnerCorporateResource[] = [];
    boCorporates.forEach(boCorporate => {
        const { start_date, ...rest } = boCorporate;
        const startDateAsString = `${start_date.year}-${start_date.month}-${start_date.day}`;
        boCorporateResources.push({
            start_date: startDateAsString,
            ...rest
        })
    });
    return boCorporateResources;
}
