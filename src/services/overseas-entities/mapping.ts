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
    ManagingOfficerCorporate,
    ManagingOfficerCorporateResource,
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
    TrustCorporateResource,
    Update,
    UpdateResource,
    OverseasEntityExtraDetails,
    TrustToReviewResource,
    TrustToReview
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
        trusts: mapTrusts(body.trusts),
        update: mapUpdate(body.update)
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
        update: mapUpdateResource(body.update)
    };
};

export const mapOverseasEntityExtraDetails = (body: OverseasEntityExtraDetails): OverseasEntityExtraDetails => {
    return {
        email_address: (body.email_address)
    };
};

const mapBoiResource = boi => {
    return { ...boi, start_date: mapIsoDate(boi.start_date), ceased_date: mapOptionalIsoDate(boi.ceased_date), date_of_birth: mapIsoDate(boi.date_of_birth) };
};

const mapBocResource = boc => {
    return { ...boc, start_date: mapIsoDate(boc.start_date), ceased_date: mapOptionalIsoDate(boc.ceased_date) };
};

const mapBogResource = bog => {
    return { ...bog, start_date: mapIsoDate(bog.start_date), ceased_date: mapOptionalIsoDate(bog.ceased_date) };
};

const mapMoiResource = moi => {
    return { ...moi, date_of_birth: mapIsoDate(moi.date_of_birth), start_date: mapOptionalIsoDate(moi.start_date), resigned_on: mapOptionalIsoDate(moi.resigned_on) };
};

const mapMocResource = moc => {
    return { ...moc, start_date: mapOptionalIsoDate(moc.start_date), resigned_on: mapOptionalIsoDate(moc.resigned_on) };
};

/**
* Convert the Trust Data Resource format coming from the API to WEB Trust
* @param  trusts Array of TrustResource objects
* @returns Array of Trust objects
*/
const mapTrustsResource = (trusts: TrustResource[] = []): Trust[] => {
    return (trusts || []).map(trust => mapToTrust(trust));
}

/**
* Convert the TrustToReview Data Resource format coming from the API to WEB TrustToReview
* @param  trusts Array of TrustToReviewResource objects
* @returns Array of TrustToReview objects
*/
const mapTrustsToReviewResource = (trusts: TrustToReviewResource[] = []): TrustToReview[] => {
    return (trusts || []).map(trust => mapToTrustToReview(trust));
}

const mapToTrust = (trust: TrustResource): Trust => {
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
}

const mapToTrustToReview = (trust: TrustToReviewResource): TrustToReview => {
    return {
        ...mapToTrust(trust),
        review_status: trust.review_status
    };
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
            ceased_date: convertOptionalInputDate(ceased_date)
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
            ceased_date: convertOptionalInputDate(ceased_date)
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
            ceased_date: convertOptionalInputDate(ceased_date)
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
        const { date_of_birth, start_date, resigned_on, ...rest } = moIndividual;
        moIndividualResources.push({
            ...rest,
            date_of_birth: convertDateToIsoDateString(date_of_birth?.day, date_of_birth?.month, date_of_birth?.year),
            start_date: convertOptionalInputDate(start_date),
            resigned_on: convertOptionalInputDate(resigned_on)
        })
    });
    return moIndividualResources;
}

/**
 * Convert the ManagingOfficerCorporate array data into the Resource format that the API expects
 * (just converting dates currently)
 * @param moCorporates Array of ManagingOfficerCorporate objects
 * @returns Array of ManagingOfficerCorporateResource
 */
const mapManagingOfficersCorporate = (moCorporates: ManagingOfficerCorporate[] = []): ManagingOfficerCorporateResource[] => {
    const moCorporateResources: ManagingOfficerCorporateResource[] = [];
    moCorporates.forEach(moCorporate => {
        const { start_date, resigned_on, ...rest } = moCorporate;
        moCorporateResources.push({
            ...rest,
            start_date: convertOptionalInputDate(start_date),
            resigned_on: convertOptionalInputDate(resigned_on)
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
    return trusts.map(trust => mapTrust(trust));
}

/**
 * Convert the TrustToReview Data into the Resource format which the API expects
 * (just converting dates currently)
 * @param trusts Array of TrustToReview objects
 * @returns Array of TrustToReviewResource
 */
const mapTrustsToReview = (trusts: TrustToReview[] = []): TrustToReviewResource[] => {
    return trusts.map(trust => mapTrustToReview(trust));
}

const mapTrust = (trust: Trust): TrustResource => {
    const { creation_date_day, creation_date_month, creation_date_year, INDIVIDUALS, HISTORICAL_BO, CORPORATES, unable_to_obtain_all_trust_info, ...rest } = trust;
    return {
        ...rest,
        creation_date: convertOptionalDateToIsoDateString(creation_date_day, creation_date_month, creation_date_year),
        INDIVIDUAL: mapTrustIndividuals(INDIVIDUALS),
        HISTORICAL_BO: mapTrustHistoricalBeneficialOwners(HISTORICAL_BO),
        CORPORATE: mapTrustCorporates(CORPORATES),
        unable_to_obtain_all_trust_info: (unable_to_obtain_all_trust_info === "Yes")
    };
}

const mapTrustToReview = (trust: TrustToReview): TrustToReviewResource => {
    return {
        ...mapTrust(trust),
        review_status: trust.review_status
    };
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

const mapUpdate = (update: Update): UpdateResource => {
    if (update && Object.keys(update).length) {
        const resource: UpdateResource = {
            date_of_creation: convertOptionalDateToIsoDateString(update.date_of_creation?.day, update.date_of_creation?.month, update.date_of_creation?.year),
            filing_date: convertOptionalDateToIsoDateString(update.filing_date?.day, update.filing_date?.month, update.filing_date?.year),
            bo_mo_data_fetched: update.bo_mo_data_fetched,
            registrable_beneficial_owner: update.registrable_beneficial_owner,
            no_change: update.no_change,
            trust_data_fetched: update.trust_data_fetched
        };
        const beneficial_owners_individual = mapBeneficialOwnersIndividual(update.review_beneficial_owners_individual);
        if (beneficial_owners_individual.length !== 0) {
            resource.review_beneficial_owners_individual = beneficial_owners_individual;
        }
        const beneficial_owners_corporate = mapBeneficialOwnersCorporate(update.review_beneficial_owners_corporate);
        if (beneficial_owners_corporate.length !== 0) {
            resource.review_beneficial_owners_corporate = beneficial_owners_corporate;
        }
        const beneficial_owners_government = mapBeneficialOwnersGovernment(update.review_beneficial_owners_government_or_public_authority);
        if (beneficial_owners_government.length !== 0) {
            resource.review_beneficial_owners_government_or_public_authority = beneficial_owners_government;
        }
        const managing_officers_individual = mapManagingOfficersIndividual(update.review_managing_officers_individual);
        if (managing_officers_individual.length !== 0) {
            resource.review_managing_officers_individual = managing_officers_individual;
        }
        const managing_officers_corporate = mapManagingOfficersCorporate(update.review_managing_officers_corporate);
        if (managing_officers_corporate.length !== 0) {
            resource.review_managing_officers_corporate = managing_officers_corporate;
        }
        if (update.review_trusts) {
            const review_trusts = mapTrustsToReview(update.review_trusts);
            if (review_trusts.length !== 0) {
                resource.review_trusts = review_trusts;
            }
        }
        return resource;
    }
    return {};
}

const mapUpdateResource = (updateResource: UpdateResource): Update => {
    if (updateResource && Object.keys(updateResource).length) {
        const update: Update = {
            date_of_creation: mapOptionalIsoDate(updateResource.date_of_creation),
            filing_date: mapOptionalIsoDate(updateResource.filing_date),
            bo_mo_data_fetched: updateResource.bo_mo_data_fetched,
            registrable_beneficial_owner: updateResource.registrable_beneficial_owner,
            no_change: updateResource.no_change,
            trust_data_fetched: updateResource.trust_data_fetched
        };
        const beneficial_owners_individual = (updateResource.review_beneficial_owners_individual || []).map(mapBoiResource);
        if (beneficial_owners_individual.length !== 0) {
            update.review_beneficial_owners_individual = beneficial_owners_individual;
        }
        const beneficial_owners_corporate = (updateResource.review_beneficial_owners_corporate || []).map(mapBocResource);
        if (beneficial_owners_corporate.length !== 0) {
            update.review_beneficial_owners_corporate = beneficial_owners_corporate;
        }
        const beneficial_owners_government = (updateResource.review_beneficial_owners_government_or_public_authority || []).map(mapBogResource);
        if (beneficial_owners_government.length !== 0) {
            update.review_beneficial_owners_government_or_public_authority = beneficial_owners_government;
        }
        const managing_officers_individual = (updateResource.review_managing_officers_individual || []).map(mapMoiResource);
        if (managing_officers_individual.length !== 0) {
            update.review_managing_officers_individual = managing_officers_individual;
        }
        const managing_officers_corporate = (updateResource.review_managing_officers_corporate || []).map(mapMocResource);
        if (managing_officers_corporate.length !== 0) {
            update.review_managing_officers_corporate = managing_officers_corporate;
        }
        if (updateResource.review_trusts) {
            const review_trusts = mapTrustsToReviewResource(updateResource.review_trusts);
            if (review_trusts.length !== 0) {
                update.review_trusts = review_trusts;
            }
        }
        return update
    }
    return {};
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

const convertOptionalInputDate = (date: InputDate): string | undefined => {
    return date !== undefined && Object.keys(date).length > 0 ? convertOptionalDateToIsoDateString(date.day, date.month, date.year) : undefined;
}

const zeroPadNumber = (input: string = ""): string => {
    if (input.length === 1) {
        return "0" + input;
    }
    return input;
}
