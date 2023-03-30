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
    Update,
    UpdateResource,
    Trust,
    TrustResource,
    TrustIndividual,
    TrustIndividualResource,
    TrustHistoricalBeneficialOwner,
    TrustHistoricalBeneficialOwnerResource,
    TrustCorporate,
    TrustCorporateResource,
    ManagingOfficerCorporate,
    ManagingOfficerCorporateResource
} from "./types";

export const mapOverseasEntity = (body: OverseasEntity): OverseasEntityResource => {
    return {
        entity_name: (body.entity_name) ? { name: body.entity_name } : null,
        entity_number: (body.entity_number) ? body.entity_number : null,
        presenter: (body.presenter && Object.keys(body.presenter).length) ? { ...body.presenter } : null,
        entity: (body.entity && Object.keys(body.entity).length) ? { ...body.entity } : null,
        due_diligence: mapDueDiligence(body.due_diligence),
        overseas_entity_due_diligence: mapOverseasEntityDueDiligence(body.overseas_entity_due_diligence),
        beneficial_owners_statement: body.beneficial_owners_statement,
        beneficial_owners_individual: mapBeneficialOwnersIndividual(body.beneficial_owners_individual),
        beneficial_owners_corporate: mapBeneficialOwnersCorporate(body.beneficial_owners_corporate),
        beneficial_owners_government_or_public_authority: mapBeneficialOwnersGovernment(body.beneficial_owners_government_or_public_authority),
        managing_officers_individual: mapManagingOfficersIndividual(body.managing_officers_individual),
        managing_officers_corporate: mapManagingOfficersCorporate(body.managing_officers_corporate),
        update: mapUpdate(body.update ?? {}),
        trusts: mapTrusts(body.trusts)
    };
};

export const mapOverseasEntityResource = (body: OverseasEntityResource): OverseasEntity => {
    return {
        entity_name: (body.entity_name) ? body.entity_name.name : null,
        entity_number: body.entity_number,
        presenter: { ...body.presenter },
        entity: { ...body.entity },
        due_diligence: (body.due_diligence && Object.keys(body.due_diligence).length) ? {
            ...body.due_diligence,
            identity_date: mapIsoDate(body.due_diligence?.identity_date)
        } : {},
        overseas_entity_due_diligence: (body.overseas_entity_due_diligence && Object.keys(body.overseas_entity_due_diligence).length) ? {
            ...body.overseas_entity_due_diligence,
            identity_date: mapIsoDate(body.overseas_entity_due_diligence?.identity_date)
        } : {},
        beneficial_owners_statement: body.beneficial_owners_statement,
        beneficial_owners_individual: (body.beneficial_owners_individual || []).map(mapBoiResource),
        beneficial_owners_corporate: (body.beneficial_owners_corporate || []).map(mapBocResource),
        beneficial_owners_government_or_public_authority: (body.beneficial_owners_government_or_public_authority || []).map(mapBogResource),
        managing_officers_individual: (body.managing_officers_individual || []).map(mapMoiResource),
        managing_officers_corporate: (body.managing_officers_corporate || []).map(mapMocResource),
        trusts: mapTrustsResource(body.trusts),
        update: mapUpdateResource(body.update ?? {})
    };
};

const mapBoiResource = boi => {
    return { ...boi, start_date: mapIsoDate(boi.start_date), ceased_date: mapIsoDate(boi.ceased_date), date_of_birth: mapIsoDate(boi.date_of_birth) };
};

const mapBocResource = boc => {
    return { ...boc, start_date: mapIsoDate(boc.start_date), ceased_date: mapIsoDate(boc.ceased_date) };
};

const mapBogResource = bog => {
    return { ...bog, start_date: mapIsoDate(bog.start_date), ceased_date: mapIsoDate(bog.ceased_date) };
};

const mapMoiResource = moi => {
    return { ...moi, date_of_birth: mapIsoDate(moi.date_of_birth), resigned_on: mapIsoDate(moi.resigned_on) };
};

const mapMocResource = moc => {
    return { ...moc, resigned_on: mapIsoDate(moc.resigned_on) };
};

/**
* Convert the Trust Data Resource format coming from the API to WEB Trust
* @param  trusts Array of TrustResource objects
* @returns Array of Trust objects
*/
const mapTrustsResource = (trusts: TrustResource[] = []): Trust[] => {
    return (trusts || []).map(trust => {
        const creationDate = mapIsoDate(trust.creation_date);
        return {
            trust_id: trust.trust_id,
            trust_name: trust.trust_name,
            creation_date_day: creationDate.day,
            creation_date_month: creationDate.month,
            creation_date_year: creationDate.year,
            unable_to_obtain_all_trust_info: (trust.unable_to_obtain_all_trust_info) ? "Yes" : "No",
            // Convert the Trust Individuals Resource Data into the format that the WEB expects
            INDIVIDUALS: (trust.INDIVIDUAL || []).map(trustInd => {
                const { date_of_birth, date_became_interested_person, ...rest } = trustInd;
                const dobDate = mapIsoDate(date_of_birth);
                const dbipDate = mapIsoDate(date_became_interested_person);
                return {
                    ...rest,
                    dob_day: dobDate.day,
                    dob_month: dobDate.month,
                    dob_year: dobDate.year,
                    date_became_interested_person_day: dbipDate.day,
                    date_became_interested_person_month: dbipDate.month,
                    date_became_interested_person_year: dbipDate.year
                }
            }),
            // Convert the Trust Historical BO Resource Data into the format that the WEB expects
            HISTORICAL_BO: (trust.HISTORICAL_BO || []).map(trustHist => {
                const { notified_date, ceased_date, ...rest } = trustHist;
                const notifiedDate = mapIsoDate(notified_date);
                const ceasedDate = mapIsoDate(ceased_date);
                return {
                    ...rest,
                    notified_date_day: notifiedDate.day,
                    notified_date_month: notifiedDate.month,
                    notified_date_year: notifiedDate.year,
                    ceased_date_day: ceasedDate.day,
                    ceased_date_month: ceasedDate.month,
                    ceased_date_year: ceasedDate.year
                }
            }),
            // Convert the Trust Corporates Resource Data into the format that the WEB expects
            CORPORATES: (trust.CORPORATE || []).map(trustCorp => {
                const { date_became_interested_person, ...rest } = trustCorp;
                const dbipDate = mapIsoDate(date_became_interested_person);
                return {
                    ...rest,
                    date_became_interested_person_day: dbipDate.day,
                    date_became_interested_person_month: dbipDate.month,
                    date_became_interested_person_year: dbipDate.year
                }
            })
        }
    });
}

/**
 * Convert the BeneficialOwnerIndividual array data into the Resource format that the API expects
 * (just converting dates currently)
 * @param boIndividuals Array of BeneficialOwnerIndividual objects
 * @returns Array of BeneficialOwnerIndividualResource
 */
const mapBeneficialOwnersIndividual = (boIndividuals: BeneficialOwnerIndividual[] = []): BeneficialOwnerIndividualResource[] => {
    const boIndividualResources: BeneficialOwnerIndividualResource[] = [];
    boIndividuals.forEach(boIndividual => {
        const { date_of_birth, start_date, ceased_date, ...rest } = boIndividual;
        boIndividualResources.push({
            ...rest,
            date_of_birth: convertDateToIsoDateString(date_of_birth?.day, date_of_birth?.month, date_of_birth?.year),
            start_date: convertDateToIsoDateString(start_date?.day, start_date?.month, start_date?.year),
            ceased_date: convertDateToIsoDateString(ceased_date?.day, ceased_date?.month, ceased_date?.year)
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
        const { start_date, ceased_date, ...rest } = boCorporate;
        boCorporateResources.push({
            ...rest,
            start_date: convertDateToIsoDateString(start_date?.day, start_date?.month, start_date?.year),
            ceased_date: convertDateToIsoDateString(ceased_date?.day, ceased_date?.month, ceased_date?.year)
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
        const { start_date, ceased_date, ...rest } = boGovernment;
        boGovernmentResources.push({
            ...rest,
            start_date: convertDateToIsoDateString(start_date?.day, start_date?.month, start_date?.year),
            ceased_date: convertDateToIsoDateString(ceased_date?.day, ceased_date?.month, ceased_date?.year)
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
        const { date_of_birth, resigned_on, ...rest } = moIndividual;
        moIndividualResources.push({
            ...rest,
            date_of_birth: convertDateToIsoDateString(date_of_birth?.day, date_of_birth?.month, date_of_birth?.year),
            resigned_on: convertDateToIsoDateString(resigned_on?.day, resigned_on?.month, resigned_on?.year)
        })
    });
    return moIndividualResources;
}

/**
 * Convert the ManagingOfficerCorporate array data into the Resource format that the API expects
 * (just converting dates currently)
 * @param moCorporates Array of ManagingOfficerCorporate objects
 * @returns Array of ManagingOfficerIndividualResource
 */
const mapManagingOfficersCorporate = (moCorporates: ManagingOfficerCorporate[] = []): ManagingOfficerCorporateResource[] => {
    const moCorporateResources: ManagingOfficerCorporateResource[] = [];
    moCorporates.forEach(moIndividual => {
        const { resigned_on, ...rest } = moIndividual;
        moCorporateResources.push({
            ...rest,
            resigned_on: convertDateToIsoDateString(resigned_on?.day, resigned_on?.month, resigned_on?.year)
        })
    });
    return moCorporateResources;
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

export const mapUpdate = (body: Update): UpdateResource => {
    return {
        date_of_creation: convertOptionalDateToIsoDateString(body.date_of_creation?.day, body.date_of_creation?.month, body.date_of_creation?.year),
        date_of_ceasation: convertOptionalDateToIsoDateString(body.date_of_ceasation?.day, body.date_of_ceasation?.month, body.date_of_ceasation?.year),
        date_of_filing: convertOptionalDateToIsoDateString(body.date_of_filing?.day, body.date_of_filing?.month, body.date_of_filing?.year),
        next_filing_due: convertOptionalDateToIsoDateString(body.next_filing_due?.day, body.next_filing_due?.month, body.next_filing_due?.year),
        registrable_beneficial_owner: body.registrable_beneficial_owner,
        any_beneficial_owners_ceased_or_added: body.any_beneficial_owners_ceased_or_added,
        bo_mo_data_fetched: body.bo_mo_data_fetched,
        review_beneficial_owners_individual: mapBeneficialOwnersIndividual(body.review_beneficial_owners_individual),
        review_beneficial_owners_corporate: mapBeneficialOwnersCorporate(body.review_beneficial_owners_corporate),
        review_beneficial_owners_government_or_public_authority: mapBeneficialOwnersGovernment(body.review_beneficial_owners_government_or_public_authority),
        review_managing_officers_individual: mapManagingOfficersIndividual(body.review_managing_officers_individual),
        review_managing_officers_corporate: mapManagingOfficersCorporate(body.review_managing_officers_corporate)
    };
}

export const mapUpdateResource = (body: UpdateResource): Update => {
    return {
        date_of_creation: mapOptionalIsoDate(body.date_of_creation),
        date_of_ceasation: mapOptionalIsoDate(body.date_of_ceasation),
        date_of_filing: mapOptionalIsoDate(body.date_of_filing),
        next_filing_due: mapOptionalIsoDate(body.next_filing_due),
        registrable_beneficial_owner: body.registrable_beneficial_owner,
        any_beneficial_owners_ceased_or_added: body.any_beneficial_owners_ceased_or_added,
        bo_mo_data_fetched: body.bo_mo_data_fetched,
        review_beneficial_owners_individual: (body.review_beneficial_owners_individual || []).map(mapBoiResource),
        review_beneficial_owners_corporate: (body.review_beneficial_owners_corporate || []).map(mapBocResource),
        review_beneficial_owners_government_or_public_authority: (body.review_beneficial_owners_government_or_public_authority || []).map(mapBogResource),
        review_managing_officers_individual: (body.review_managing_officers_individual || []).map(mapMoiResource),
        review_managing_officers_corporate: (body.review_managing_officers_corporate || []).map(mapMocResource)
    };
}

const mapOptionalIsoDate = (date: string | undefined): InputDate | undefined => {
    return date ? mapIsoDate(date) : undefined;
}

const mapIsoDate = (date: string): InputDate => {
    const mapDate = date || "--";
    // Remove leading zeros, split and init variables
    const [year, month, day] = mapDate.replace(/\b0/g, "").split("-");
    return { day, month, year }
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
