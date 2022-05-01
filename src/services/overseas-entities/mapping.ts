import { BeneficialOwnerCorporate, BeneficialOwnerCorporateResource, BeneficialOwnerGovernmentOrPublicAuthority, BeneficialOwnerGovernmentOrPublicAuthorityResource, BeneficialOwnerIndividual, BeneficialOwnerIndividualResource, OverseasEntity, OverseasEntityResource } from "./types";

export const mapOverseasEntity = (body: OverseasEntity): OverseasEntityResource => {
    return {
        presenter: { ...body.presenter },
        entity: { ...body.entity },
        beneficial_owners_statement: body.beneficial_owners_statement,
        beneficial_owners_individual: mapBeneficialOwnersIndividual(body.beneficial_owners_individual),
        beneficial_owners_corporate: mapBeneficialOwnersCorporate(body.beneficial_owners_corporate),
        beneficial_owners_government_or_public_authority: mapBeneficialOwnersGovernment(body.beneficial_owners_government_or_public_authority)
    };
};

/**
 * Convert the BeneficialOwnerIndividual array data into the Resource format that the API expects
 * (just converting dates currently)
 * @param boIndividuals Array of BeneficialOwnerIndividual objects
 * @returns Array of BeneficialOwnerIndividualResource
 */
const mapBeneficialOwnersIndividual = (boIndividuals: BeneficialOwnerIndividual[] = []): BeneficialOwnerIndividualResource[] => {
    const boIndividualResources: BeneficialOwnerIndividualResource[] = [];
    boIndividuals.forEach(boIndividual => {
        const { date_of_birth, start_date, ...rest } = boIndividual;
        boIndividualResources.push({
            ...rest,
            date_of_birth: convertDateToIsoDateString(date_of_birth.day, date_of_birth.month, date_of_birth.year),
            start_date: convertDateToIsoDateString(start_date.day, start_date.month, start_date.year)
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
const mapBeneficialOwnersCorporate = (boCorporates: BeneficialOwnerCorporate[] = []): BeneficialOwnerCorporateResource[] => {
    const boCorporateResources: BeneficialOwnerCorporateResource[] = [];
    boCorporates.forEach(boCorporate => {
        const { start_date, ...rest } = boCorporate;
        boCorporateResources.push({
            ...rest,
            start_date: convertDateToIsoDateString(start_date.day, start_date.month, start_date.year)
        })
    });
    return boCorporateResources;
}

/**
 * Convert the BeneficialOwnerGovernmentOrPublicAuthority array data into the Resource format that the API expects
 * (just converting dates currently)
 * @param boGovernments Array of BeneficialOwnerGovernmentOrPublicAuthority objects
 * @returns Array of BeneficialOwnerGovernmentOrPublicAuthorityResource
 */
const mapBeneficialOwnersGovernment = (boGovernments: BeneficialOwnerGovernmentOrPublicAuthority[] = []): BeneficialOwnerGovernmentOrPublicAuthorityResource[] => {
    const boGovernmentResources: BeneficialOwnerGovernmentOrPublicAuthorityResource[] = [];
    boGovernments.forEach(boGovernment => {
        const { start_date, ...rest } = boGovernment;
        boGovernmentResources.push({
            ...rest,
            start_date: convertDateToIsoDateString(start_date.day, start_date.month, start_date.year)
        })
    });
    return boGovernmentResources;
}

const convertDateToIsoDateString = (day: string, month: string, year: string): string => {
    return `${year}-${zeroPadNumber(month)}-${zeroPadNumber(day)}`;
}

const zeroPadNumber = (input: string = ""): string => {
    if (input.length === 1) {
        return "0" + input;
    }
    return input;
}
