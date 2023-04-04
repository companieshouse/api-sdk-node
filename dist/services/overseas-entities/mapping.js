"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapOverseasEntityResource = exports.mapOverseasEntity = void 0;
const mapOverseasEntity = (body) => {
    return {
        entity_name: (body.entity_name) ? { name: body.entity_name } : null,
        entity_number: (body.entity_number) ? body.entity_number : null,
        presenter: (body.presenter && Object.keys(body.presenter).length) ? Object.assign({}, body.presenter) : null,
        entity: (body.entity && Object.keys(body.entity).length) ? Object.assign({}, body.entity) : null,
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
exports.mapOverseasEntity = mapOverseasEntity;
const mapOverseasEntityResource = (body) => {
    var _a, _b;
    return {
        entity_name: (body.entity_name) ? body.entity_name.name : null,
        entity_number: body.entity_number,
        presenter: Object.assign({}, body.presenter),
        entity: Object.assign({}, body.entity),
        due_diligence: (body.due_diligence && Object.keys(body.due_diligence).length) ? Object.assign(Object.assign({}, body.due_diligence), { identity_date: mapIsoDate((_a = body.due_diligence) === null || _a === void 0 ? void 0 : _a.identity_date) }) : {},
        overseas_entity_due_diligence: (body.overseas_entity_due_diligence && Object.keys(body.overseas_entity_due_diligence).length) ? Object.assign(Object.assign({}, body.overseas_entity_due_diligence), { identity_date: mapIsoDate((_b = body.overseas_entity_due_diligence) === null || _b === void 0 ? void 0 : _b.identity_date) }) : {},
        beneficial_owners_statement: body.beneficial_owners_statement,
        beneficial_owners_individual: (body.beneficial_owners_individual || []).map(boi => {
            return Object.assign(Object.assign({}, boi), { start_date: mapIsoDate(boi.start_date), date_of_birth: mapIsoDate(boi.date_of_birth) });
        }),
        beneficial_owners_corporate: (body.beneficial_owners_corporate || []).map(boc => {
            return Object.assign(Object.assign({}, boc), { start_date: mapIsoDate(boc.start_date) });
        }),
        beneficial_owners_government_or_public_authority: (body.beneficial_owners_government_or_public_authority || []).map(bog => {
            return Object.assign(Object.assign({}, bog), { start_date: mapIsoDate(bog.start_date) });
        }),
        managing_officers_individual: (body.managing_officers_individual || []).map(moi => {
            return Object.assign(Object.assign({}, moi), { date_of_birth: mapIsoDate(moi.date_of_birth) });
        }),
        managing_officers_corporate: body.managing_officers_corporate || [],
        trusts: mapTrustsResource(body.trusts)
    };
};
exports.mapOverseasEntityResource = mapOverseasEntityResource;
/**
* Convert the Trust Data Resource format coming from the API to WEB Trust
* @param  trusts Array of TrustResource objects
* @returns Array of Trust objects
*/
const mapTrustsResource = (trusts = []) => {
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
                const { date_of_birth, date_became_interested_person } = trustInd, rest = __rest(trustInd, ["date_of_birth", "date_became_interested_person"]);
                const dobDate = mapIsoDate(date_of_birth);
                const dbipDate = mapIsoDate(date_became_interested_person);
                return Object.assign(Object.assign({}, rest), { dob_day: dobDate.day, dob_month: dobDate.month, dob_year: dobDate.year, date_became_interested_person_day: dbipDate.day, date_became_interested_person_month: dbipDate.month, date_became_interested_person_year: dbipDate.year });
            }),
            // Convert the Trust Historical BO Resource Data into the format that the WEB expects
            HISTORICAL_BO: (trust.HISTORICAL_BO || []).map(trustHist => {
                const { notified_date, ceased_date } = trustHist, rest = __rest(trustHist, ["notified_date", "ceased_date"]);
                const notifiedDate = mapIsoDate(notified_date);
                const ceasedDate = mapIsoDate(ceased_date);
                return Object.assign(Object.assign({}, rest), { notified_date_day: notifiedDate.day, notified_date_month: notifiedDate.month, notified_date_year: notifiedDate.year, ceased_date_day: ceasedDate.day, ceased_date_month: ceasedDate.month, ceased_date_year: ceasedDate.year });
            }),
            // Convert the Trust Corporates Resource Data into the format that the WEB expects
            CORPORATES: (trust.CORPORATE || []).map(trustCorp => {
                const { date_became_interested_person } = trustCorp, rest = __rest(trustCorp, ["date_became_interested_person"]);
                const dbipDate = mapIsoDate(date_became_interested_person);
                return Object.assign(Object.assign({}, rest), { date_became_interested_person_day: dbipDate.day, date_became_interested_person_month: dbipDate.month, date_became_interested_person_year: dbipDate.year });
            })
        };
    });
};
/**
 * Convert the BeneficialOwnerIndividual array data into the Resource format that the API expects
 * (just converting dates currently)
 * @param boIndividuals Array of BeneficialOwnerIndividual objects
 * @returns Array of BeneficialOwnerIndividualResource
 */
const mapBeneficialOwnersIndividual = (boIndividuals = []) => {
    const boIndividualResources = [];
    boIndividuals.forEach(boIndividual => {
        const { date_of_birth, start_date } = boIndividual, rest = __rest(boIndividual, ["date_of_birth", "start_date"]);
        boIndividualResources.push(Object.assign(Object.assign({}, rest), { date_of_birth: convertDateToIsoDateString(date_of_birth === null || date_of_birth === void 0 ? void 0 : date_of_birth.day, date_of_birth === null || date_of_birth === void 0 ? void 0 : date_of_birth.month, date_of_birth === null || date_of_birth === void 0 ? void 0 : date_of_birth.year), start_date: convertDateToIsoDateString(start_date === null || start_date === void 0 ? void 0 : start_date.day, start_date === null || start_date === void 0 ? void 0 : start_date.month, start_date === null || start_date === void 0 ? void 0 : start_date.year) }));
    });
    return boIndividualResources;
};
/**
 * Convert the BeneficialOwnerCorporate array data into the Resource format that the API expects
 * (just converting dates currently)
 * @param boCorporates Array of BeneficialOwnerCorporate objects
 * @returns Array of BeneficialOwnerCorporateResource
 */
const mapBeneficialOwnersCorporate = (boCorporates = []) => {
    const boCorporateResources = [];
    boCorporates.forEach(boCorporate => {
        const { start_date } = boCorporate, rest = __rest(boCorporate, ["start_date"]);
        boCorporateResources.push(Object.assign(Object.assign({}, rest), { start_date: convertDateToIsoDateString(start_date === null || start_date === void 0 ? void 0 : start_date.day, start_date === null || start_date === void 0 ? void 0 : start_date.month, start_date === null || start_date === void 0 ? void 0 : start_date.year) }));
    });
    return boCorporateResources;
};
/**
 * Convert the BeneficialOwnerGovernmentOrPublicAuthority array data into the Resource format that the API expects
 * (just converting dates currently)
 * @param boGovernments Array of BeneficialOwnerGovernmentOrPublicAuthority objects
 * @returns Array of BeneficialOwnerGovernmentOrPublicAuthorityResource
 */
const mapBeneficialOwnersGovernment = (boGovernments = []) => {
    const boGovernmentResources = [];
    boGovernments.forEach(boGovernment => {
        const { start_date } = boGovernment, rest = __rest(boGovernment, ["start_date"]);
        boGovernmentResources.push(Object.assign(Object.assign({}, rest), { start_date: convertDateToIsoDateString(start_date === null || start_date === void 0 ? void 0 : start_date.day, start_date === null || start_date === void 0 ? void 0 : start_date.month, start_date === null || start_date === void 0 ? void 0 : start_date.year) }));
    });
    return boGovernmentResources;
};
/**
 * Convert the ManagingOfficerIndividual array data into the Resource format that the API expects
 * (just converting dates currently)
 * @param moIndividuals Array of ManagingOfficerIndividual objects
 * @returns Array of ManagingOfficerIndividualResource
 */
const mapManagingOfficersIndividual = (moIndividuals = []) => {
    const moIndividualResources = [];
    moIndividuals.forEach(moIndividual => {
        const { date_of_birth } = moIndividual, rest = __rest(moIndividual, ["date_of_birth"]);
        moIndividualResources.push(Object.assign(Object.assign({}, rest), { date_of_birth: convertDateToIsoDateString(date_of_birth === null || date_of_birth === void 0 ? void 0 : date_of_birth.day, date_of_birth === null || date_of_birth === void 0 ? void 0 : date_of_birth.month, date_of_birth === null || date_of_birth === void 0 ? void 0 : date_of_birth.year) }));
    });
    return moIndividualResources;
};
/**
 * Convert the Due Diligence object data into the Resource format that the API expects
 * (just converting dates currently)
 * @param DueDiligence object
 * @returns DueDiligenceResource Object
 */
const mapDueDiligence = (dueDiligence) => {
    if (dueDiligence && Object.keys(dueDiligence).length) {
        const identityDate = dueDiligence.identity_date || {};
        const identity_date = convertDateToIsoDateString(identityDate.day, identityDate.month, identityDate.year);
        return Object.assign(Object.assign({}, dueDiligence), { identity_date });
    }
    // This object is optionally present - API will ignore it if sent as null but not as {}
    return null;
};
/**
 * Convert the Overseas Entity Due Diligence data into the Resource format that the API expects
 * (just converting dates currently)
 * @param oeDueDiligence OverseasEntityDueDiligence objects
 * @returns OverseasEntityDueDiligenceResource
 */
const mapOverseasEntityDueDiligence = (oeDueDiligence) => {
    if (oeDueDiligence && Object.keys(oeDueDiligence).length) {
        const { identity_date } = oeDueDiligence, rest = __rest(oeDueDiligence, ["identity_date"]);
        const identityDateResource = convertOptionalDateToIsoDateString(identity_date === null || identity_date === void 0 ? void 0 : identity_date.day, identity_date === null || identity_date === void 0 ? void 0 : identity_date.month, identity_date === null || identity_date === void 0 ? void 0 : identity_date.year);
        return (identityDateResource)
            ? Object.assign(Object.assign({}, rest), { identity_date: identityDateResource }) : Object.assign({}, rest);
    }
    // This object is optionally present - API will ignore it if sent as null but not as {}
    return null;
};
/**
 * Convert the Trust Data into the Resource format which the API expects
 * (just converting dates currently)
 * @param  trusts Array of Trust objects
 * @returns Array of TrustResource
 */
const mapTrusts = (trusts = []) => {
    return trusts.map(trust => {
        const { creation_date_day, creation_date_month, creation_date_year, INDIVIDUALS, HISTORICAL_BO, CORPORATES, unable_to_obtain_all_trust_info } = trust, rest = __rest(trust, ["creation_date_day", "creation_date_month", "creation_date_year", "INDIVIDUALS", "HISTORICAL_BO", "CORPORATES", "unable_to_obtain_all_trust_info"]);
        return Object.assign(Object.assign({}, rest), { creation_date: convertOptionalDateToIsoDateString(creation_date_day, creation_date_month, creation_date_year), INDIVIDUAL: mapTrustIndividuals(INDIVIDUALS), HISTORICAL_BO: mapTrustHistoricalBeneficialOwners(HISTORICAL_BO), CORPORATE: mapTrustCorporates(CORPORATES), unable_to_obtain_all_trust_info: (unable_to_obtain_all_trust_info === "Yes") });
    });
};
/**
 * Convert the Trust Individuals Data into the Resource format which the API expects
 * (just converting dates currently)
 * @param  trustIndividuals Array of TrustIndividuals objects
 * @returns Array of TrustIndividualResource
 */
const mapTrustIndividuals = (trustIndividuals = []) => {
    return trustIndividuals.map(trustIndividual => {
        const { dob_day, dob_month, dob_year, date_became_interested_person_day, date_became_interested_person_month, date_became_interested_person_year } = trustIndividual, rest = __rest(trustIndividual, ["dob_day", "dob_month", "dob_year", "date_became_interested_person_day", "date_became_interested_person_month", "date_became_interested_person_year"]);
        return Object.assign(Object.assign({}, rest), { date_of_birth: convertOptionalDateToIsoDateString(dob_day, dob_month, dob_year), date_became_interested_person: convertOptionalDateToIsoDateString(date_became_interested_person_day, date_became_interested_person_month, date_became_interested_person_year) });
    });
};
/**
 * Convert the Trust Historical BO Data into the Resource format which the API expects
 * (just converting dates currently)
 * @param  trustHistoricalBos Array of TrustHistoricalBeneficialOwner objects
 * @returns Array of TrustHistoricalBeneficialOwnerResource
 */
const mapTrustHistoricalBeneficialOwners = (trustHistoricalBos = []) => {
    return trustHistoricalBos.map(trustHistoricalBo => {
        const { notified_date_day, notified_date_month, notified_date_year, ceased_date_day, ceased_date_month, ceased_date_year } = trustHistoricalBo, rest = __rest(trustHistoricalBo, ["notified_date_day", "notified_date_month", "notified_date_year", "ceased_date_day", "ceased_date_month", "ceased_date_year"]);
        return Object.assign({ notified_date: convertOptionalDateToIsoDateString(notified_date_day, notified_date_month, notified_date_year), ceased_date: convertOptionalDateToIsoDateString(ceased_date_day, ceased_date_month, ceased_date_year) }, rest);
    });
};
/**
 * Convert the Trust Corporates Data into the Resource format which the API expects
 * (just converting dates currently)
 * @param  trustCorporates Array of TrustCorporate objects
 * @returns Array of TrustCorporateResource
 */
const mapTrustCorporates = (trustCorporates = []) => {
    return trustCorporates.map(trustCorporate => {
        const { date_became_interested_person_day, date_became_interested_person_month, date_became_interested_person_year } = trustCorporate, rest = __rest(trustCorporate, ["date_became_interested_person_day", "date_became_interested_person_month", "date_became_interested_person_year"]);
        return Object.assign(Object.assign({}, rest), { date_became_interested_person: convertOptionalDateToIsoDateString(date_became_interested_person_day, date_became_interested_person_month, date_became_interested_person_year) });
    });
};
const mapIsoDate = (date) => {
    const mapDate = date || "--";
    // Remove leading zeros, split and init variables
    const [year, month, day] = mapDate.replace(/\b0/g, "").split("-");
    return { day, month, year };
};
const convertOptionalDateToIsoDateString = (day = "", month = "", year = "") => {
    return (day && month && year) ? convertDateToIsoDateString(day, month, year) : "";
};
const convertDateToIsoDateString = (day, month, year) => {
    return `${year}-${zeroPadNumber(month)}-${zeroPadNumber(day)}`;
};
const zeroPadNumber = (input = "") => {
    if (input.length === 1) {
        return "0" + input;
    }
    return input;
};
//# sourceMappingURL=mapping.js.map