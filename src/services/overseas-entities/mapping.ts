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
    OverseasEntityResource,
    Trust,
    TrustResource,
    TrustIndividual,
    TrustIndividualResource,
    TrustHistoricalBeneficialOwner,
    TrustHistoricalBeneficialOwnerResource,
    TrustCorporate,
    TrustCorporateResource
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
        managing_officers_corporate: body.managing_officers_corporate,
        trusts: mapTrusts(body.trusts)
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

    // This object is optionally present - API will ignore it if sent as null but not as {}
    return null;
}

/**
 * Convert the Overseas Entity Due Diligence data into the Resource format that the API expects
 * (just converting dates currently)
 * @param oeDueDiligence OverseasEntityDueDiligence objects
 * @returns OverseasEntityDueDiligenceResource
 */
const mapOverseasEntityDueDiligence = (oeDueDiligence: OverseasEntityDueDiligence): OverseasEntityDueDiligenceResource => {
    if (oeDueDiligence && Object.keys(oeDueDiligence).length) {
        const { identity_date, ...rest } = oeDueDiligence;
        const identityDateResource = convertOptionalDateToIsoDateString(identity_date?.day, identity_date?.month, identity_date?.year);
        return (identityDateResource)
            ? { ...rest, identity_date: identityDateResource }
            : { ...rest };
    }

    // This object is optionally present - API will ignore it if sent as null but not as {}
    return null;
}

/**
 * Convert the Trust Data into the Resource format which the API expects
 * (just converting dates currently)
 * @param  trusts Array of Trust objects
 * @returns Array of TrustResource
 */
const mapTrusts = (trusts: Trust[] = []): TrustResource[] => {
    return trusts.map(trust => {
        const { creation_date_day, creation_date_month, creation_date_year, INDIVIDUALS, HISTORICAL_BO, CORPORATES, unable_to_obtain_all_trust_info, ...rest } = trust;
        return {
            ...rest,
            creation_date: convertOptionalDateToIsoDateString(creation_date_day, creation_date_month, creation_date_year),
            INDIVIDUAL: mapTrustIndividuals(INDIVIDUALS),
            HISTORICAL_BO: mapTrustHistoricalBeneficialOwners(HISTORICAL_BO),
            CORPORATE: mapTrustCorporates(CORPORATES),
            unable_to_obtain_all_trust_info: (unable_to_obtain_all_trust_info === "Yes")
        }
    });
}

/**
 * Convert the Trust Individuals Data into the Resource format which the API expects
 * (just converting dates currently)
 * @param  trustIndividuals Array of TrustIndividuals objects
 * @returns Array of TrustIndividualResource
 */
const mapTrustIndividuals = (trustIndividuals: TrustIndividual[] = []): TrustIndividualResource[] => {
    return trustIndividuals.map(trustIndividual => {
        const { dob_day, dob_month, dob_year, date_became_interested_person_day, date_became_interested_person_month, date_became_interested_person_year, ...rest } = trustIndividual;
        return {
            ...rest,
            date_of_birth: convertOptionalDateToIsoDateString(dob_day, dob_month, dob_year),
            date_became_interested_person: convertOptionalDateToIsoDateString(date_became_interested_person_day, date_became_interested_person_month, date_became_interested_person_year)
        }
    })
}

/**
 * Convert the Trust Historical BO Data into the Resource format which the API expects
 * (just converting dates currently)
 * @param  trustHistoricalBos Array of TrustHistoricalBeneficialOwner objects
 * @returns Array of TrustHistoricalBeneficialOwnerResource
 */
const mapTrustHistoricalBeneficialOwners = (trustHistoricalBos: TrustHistoricalBeneficialOwner[] = []): TrustHistoricalBeneficialOwnerResource[] => {
    return trustHistoricalBos.map(trustHistoricalBo => {
        const { notified_date_day, notified_date_month, notified_date_year, ceased_date_day, ceased_date_month, ceased_date_year, ...rest } = trustHistoricalBo;
        return {
            notified_date: convertOptionalDateToIsoDateString(notified_date_day, notified_date_month, notified_date_year),
            ceased_date: convertOptionalDateToIsoDateString(ceased_date_day, ceased_date_month, ceased_date_year),
            ...rest
        }
    })
}

/**
 * Convert the Trust Corporates Data into the Resource format which the API expects
 * (just converting dates currently)
 * @param  trustCorporates Array of TrustCorporate objects
 * @returns Array of TrustCorporateResource
 */
const mapTrustCorporates = (trustCorporates: TrustCorporate[] = []): TrustCorporateResource[] => {
    return trustCorporates.map(trustCorporate => {
        const { date_became_interested_person_day, date_became_interested_person_month, date_became_interested_person_year, ...rest } = trustCorporate;
        return {
            ...rest,
            date_became_interested_person: convertOptionalDateToIsoDateString(date_became_interested_person_day, date_became_interested_person_month, date_became_interested_person_year)
        }
    })
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
