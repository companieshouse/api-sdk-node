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
        beneficial_owners_statement: body.beneficial_owners_statement,
        beneficial_owners_individual: mapBeneficialOwnersIndividual(body.beneficial_owners_individual),
        beneficial_owners_corporate: mapBeneficialOwnersCorporate(body.beneficial_owners_corporate),
        beneficial_owners_government_or_public_authority: mapBeneficialOwnersGovernment(body.beneficial_owners_government_or_public_authority)
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
        boIndividualResources.push(Object.assign(Object.assign({}, rest), { date_of_birth: convertDateToIsoDateString(date_of_birth.day, date_of_birth.month, date_of_birth.year), start_date: convertDateToIsoDateString(start_date.day, start_date.month, start_date.year) }));
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
        boCorporateResources.push(Object.assign(Object.assign({}, rest), { start_date: convertDateToIsoDateString(start_date.day, start_date.month, start_date.year) }));
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
        boGovernmentResources.push(Object.assign(Object.assign({}, rest), { start_date: convertDateToIsoDateString(start_date.day, start_date.month, start_date.year) }));
    });
    return boGovernmentResources;
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