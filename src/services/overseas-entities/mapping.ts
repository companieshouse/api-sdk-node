import {
    BeneficialOwnerCorporate,
    BeneficialOwnerCorporateResource,
    BeneficialOwnerGovernmentOrPublicAuthority,
    BeneficialOwnerGovernmentOrPublicAuthorityResource,
    BeneficialOwnerIndividual,
    BeneficialOwnerIndividualResource,
    InputDate,
    ManagingOfficerIndividual,
    ManagingOfficerIndividualResource,
    OverseasEntity,
    OverseasEntityDueDiligence,
    OverseasEntityDueDiligenceResource,
    DueDiligence,
    DueDiligenceResource,
    OverseasEntityResource
} from "./types";

export const mapOverseasEntity = (body: OverseasEntity): OverseasEntityResource => {
    return {
        presenter: { ...body.presenter },
        entity: { ...body.entity },
        due_diligence: mapDueDiligence(body.due_diligence),
        overseas_entity_due_diligence: mapOverseasEntityDueDiligence(body.overseas_entity_due_diligence),
        beneficial_owners_statement: body.beneficial_owners_statement,
        beneficial_owners_individual: mapBeneficialOwnersIndividual(body.beneficial_owners_individual),
        beneficial_owners_corporate: mapBeneficialOwnersCorporate(body.beneficial_owners_corporate),
        beneficial_owners_government_or_public_authority: mapBeneficialOwnersGovernment(body.beneficial_owners_government_or_public_authority),
        managing_officers_individual: mapManagingOfficersIndividual(body.managing_officers_individual),
        managing_officers_corporate: body.managing_officers_corporate
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
            date_of_birth: convertDateToIsoDateString(date_of_birth?.day, date_of_birth?.month, date_of_birth?.year),
            start_date: convertDateToIsoDateString(start_date?.day, start_date?.month, start_date?.year)
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
            start_date: convertDateToIsoDateString(start_date?.day, start_date?.month, start_date?.year)
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
            start_date: convertDateToIsoDateString(start_date?.day, start_date?.month, start_date?.year)
        })
    });
    return boGovernmentResources;
}

/**
 * Convert the ManagingOfficerIndividual array data into the Resource format that the API expects
 * (just converting dates currently)
 * @param moIndividuals Array of ManagingOfficerIndividual objects
 * @returns Array of ManagingOfficerIndividualResource
 */
const mapManagingOfficersIndividual = (moIndividuals: ManagingOfficerIndividual[] = []): ManagingOfficerIndividualResource[] => {
    const moIndividualResources: ManagingOfficerIndividualResource[] = [];
    moIndividuals.forEach(moIndividual => {
        const { date_of_birth, ...rest } = moIndividual;
        moIndividualResources.push({
            ...rest,
            date_of_birth: convertDateToIsoDateString(date_of_birth?.day, date_of_birth?.month, date_of_birth?.year)
        })
    });
    return moIndividualResources;
}

/**
 * Convert the Due Diligence object data into the Resource format that the API expects
 * (just converting dates currently)
 * @param DueDiligence object
 * @returns DueDiligenceResource Object
 */
const mapDueDiligence = (dueDiligence: DueDiligence): DueDiligenceResource => {
    if (dueDiligence && Object.keys(dueDiligence).length) {
        const identityDate = dueDiligence.identity_date || {} as InputDate;
        const identity_date = convertDateToIsoDateString(identityDate.day, identityDate.month, identityDate.year);
        return {
            ...dueDiligence,
            identity_date
        }
    }
    return {};
}

/**
 * Convert the Overseas Entity Due Diligence data into the Resource format that the API expects
 * (just converting dates currently)
 * @param oeDueDiligence OverseasEntityDueDiligence objects
 * @returns OverseasEntityDueDiligenceResource
 */
const mapOverseasEntityDueDiligence = (oeDueDiligence: OverseasEntityDueDiligence): OverseasEntityDueDiligenceResource => {
    if (oeDueDiligence && Object.keys(oeDueDiligence).length) {
        const identityDate = oeDueDiligence.identity_date || {} as InputDate;
        const identity_date = convertOptionalDateToIsoDateString(identityDate.day, identityDate.month, identityDate.year);
        return {
            ...oeDueDiligence,
            identity_date
        }
    }
    return {};
}

const convertOptionalDateToIsoDateString = (day: string = "", month: string = "", year: string = ""): string => {
    return (day && month && year) ? convertDateToIsoDateString(day, month, year) : "";
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
