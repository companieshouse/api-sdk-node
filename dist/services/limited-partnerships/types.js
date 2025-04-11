"use strict";
/**
 * Limited Partnership interface types used within this SDK.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Term = exports.Jurisdiction = exports.PartnershipType = exports.NameEndingType = exports.IncorporationKind = void 0;
var IncorporationKind;
(function (IncorporationKind) {
    IncorporationKind["REGISTRATION"] = "limited-partnership-registration";
    IncorporationKind["TRANSITION"] = "limited-partnership-transition";
})(IncorporationKind = exports.IncorporationKind || (exports.IncorporationKind = {}));
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
    Jurisdiction["ENGLAND_AND_WALES"] = "England and Wales";
    Jurisdiction["NORTHERN_IRELAND"] = "Northern Ireland";
    Jurisdiction["SCOTLAND"] = "Scotland";
})(Jurisdiction = exports.Jurisdiction || (exports.Jurisdiction = {}));
var Term;
(function (Term) {
    Term["BY_AGREEMENT"] = "BY_AGREEMENT";
    Term["UNTIL_DISSOLUTION"] = "UNTIL_DISSOLUTION";
    Term["NONE"] = "NONE";
})(Term = exports.Term || (exports.Term = {}));
//# sourceMappingURL=types.js.map