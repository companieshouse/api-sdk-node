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
exports.mapOverseasEntity = void 0;
const mapOverseasEntity = (body) => {
    return {
        presenter: Object.assign({}, body.presenter),
        entity: Object.assign({}, body.entity),
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