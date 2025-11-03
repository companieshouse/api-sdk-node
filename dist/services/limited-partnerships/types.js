"use strict";
/**
 * Limited Partnership interface types used within this SDK.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Term = exports.Jurisdiction = exports.PartnershipType = exports.NameEndingType = exports.PartnershipKind = exports.PartnerKind = exports.IncorporationKind = void 0;
var IncorporationKind;
(function (IncorporationKind) {
    IncorporationKind["REGISTRATION"] = "limited-partnership-registration";
    IncorporationKind["TRANSITION"] = "limited-partnership-transition";
    IncorporationKind["POST_TRANSITION"] = "limited-partnership-post-transition";
})(IncorporationKind = exports.IncorporationKind || (exports.IncorporationKind = {}));
var PartnerKind;
(function (PartnerKind) {
    PartnerKind["ADD_GENERAL_PARTNER_PERSON"] = "limited-partnership#add-general-partner-person";
    PartnerKind["ADD_GENERAL_PARTNER_LEGAL_ENTITY"] = "limited-partnership#add-general-partner-legal-entity";
    PartnerKind["ADD_LIMITED_PARTNER_PERSON"] = "limited-partnership#add-limited-partner-person";
    PartnerKind["ADD_LIMITED_PARTNER_LEGAL_ENTITY"] = "limited-partnership#add-limited-partner-legal-entity";
    PartnerKind["REMOVE_GENERAL_PARTNER_PERSON"] = "limited-partnership#remove-general-partner-person";
    PartnerKind["REMOVE_GENERAL_PARTNER_LEGAL_ENTITY"] = "limited-partnership#remove-general-partner-legal-entity";
    PartnerKind["REMOVE_LIMITED_PARTNER_PERSON"] = "limited-partnership#remove-limited-partner-person";
    PartnerKind["REMOVE_LIMITED_PARTNER_LEGAL_ENTITY"] = "limited-partnership#remove-limited-partner-legal-entity";
})(PartnerKind = exports.PartnerKind || (exports.PartnerKind = {}));
var PartnershipKind;
(function (PartnershipKind) {
    PartnershipKind["UPDATE_PARTNERSHIP_REGISTERED_OFFICE_ADDRESS"] = "limited-partnership#update-partnership-registered-office-address";
    PartnershipKind["UPDATE_PARTNERSHIP_NAME"] = "limited-partnership#update-partnership-name";
    PartnershipKind["UPDATE_PARTNERSHIP_TERM"] = "limited-partnership#update-partnership-term";
    PartnershipKind["UPDATE_PARTNERSHIP_PRINCIPAL_PLACE_OF_BUSINESS_ADDRESS"] = "limited-partnership#update-partnership-principal-place-of-business-address";
})(PartnershipKind = exports.PartnershipKind || (exports.PartnershipKind = {}));
var NameEndingType;
(function (NameEndingType) {
    NameEndingType["LIMITED_PARTNERSHIP"] = "Limited Partnership";
    NameEndingType["LP"] = "LP";
    NameEndingType["L_DOT_P_DOT"] = "L.P.";
    NameEndingType["PARTNERIAETH_CYFYNGEDIG"] = "Partneriaeth Cyfyngedig";
    NameEndingType["PC"] = "PC";
    NameEndingType["P_DOT_C_DOT"] = "P.C.";
})(NameEndingType = exports.NameEndingType || (exports.NameEndingType = {}));
var PartnershipType;
(function (PartnershipType) {
    PartnershipType["LP"] = "LP";
    PartnershipType["PFLP"] = "PFLP";
    PartnershipType["SLP"] = "SLP";
    PartnershipType["SPFLP"] = "SPFLP";
})(PartnershipType = exports.PartnershipType || (exports.PartnershipType = {}));
var Jurisdiction;
(function (Jurisdiction) {
    Jurisdiction["ENGLAND_AND_WALES"] = "england-wales";
    Jurisdiction["NORTHERN_IRELAND"] = "northern-ireland";
    Jurisdiction["SCOTLAND"] = "scotland";
})(Jurisdiction = exports.Jurisdiction || (exports.Jurisdiction = {}));
var Term;
(function (Term) {
    Term["BY_AGREEMENT"] = "BY_AGREEMENT";
    Term["UNTIL_DISSOLUTION"] = "UNTIL_DISSOLUTION";
    Term["NONE"] = "NONE";
})(Term = exports.Term || (exports.Term = {}));
//# sourceMappingURL=types.js.map