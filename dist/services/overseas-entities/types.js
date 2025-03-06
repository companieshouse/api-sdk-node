"use strict";
/**
 * Overseas Entity interface used within this SDK
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeBeneficiaryRelevantPeriodType = exports.TrusteeInvolvedRelevantPeriodType = exports.ChangeBoRelevantPeriodType = exports.NatureOfControlJurisdictionType = exports.NatureOfControlType = exports.BeneficialOwnersStatementType = exports.yesNoResponse = void 0;
var yesNoResponse;
(function (yesNoResponse) {
    yesNoResponse[yesNoResponse["No"] = 0] = "No";
    yesNoResponse[yesNoResponse["Yes"] = 1] = "Yes";
})(yesNoResponse = exports.yesNoResponse || (exports.yesNoResponse = {}));
var BeneficialOwnersStatementType;
(function (BeneficialOwnersStatementType) {
    BeneficialOwnersStatementType["ALL_IDENTIFIED_ALL_DETAILS"] = "ALL_IDENTIFIED_ALL_DETAILS";
    BeneficialOwnersStatementType["SOME_IDENTIFIED_ALL_DETAILS"] = "SOME_IDENTIFIED_ALL_DETAILS";
    BeneficialOwnersStatementType["NONE_IDENTIFIED"] = "NONE_IDENTIFIED";
})(BeneficialOwnersStatementType = exports.BeneficialOwnersStatementType || (exports.BeneficialOwnersStatementType = {}));
var NatureOfControlType;
(function (NatureOfControlType) {
    NatureOfControlType["OVER_25_PERCENT_OF_SHARES"] = "OVER_25_PERCENT_OF_SHARES";
    NatureOfControlType["OVER_25_PERCENT_OF_VOTING_RIGHTS"] = "OVER_25_PERCENT_OF_VOTING_RIGHTS";
    NatureOfControlType["APPOINT_OR_REMOVE_MAJORITY_BOARD_DIRECTORS"] = "APPOINT_OR_REMOVE_MAJORITY_BOARD_DIRECTORS";
    NatureOfControlType["SIGNIFICANT_INFLUENCE_OR_CONTROL"] = "SIGNIFICANT_INFLUENCE_OR_CONTROL";
})(NatureOfControlType = exports.NatureOfControlType || (exports.NatureOfControlType = {}));
var NatureOfControlJurisdictionType;
(function (NatureOfControlJurisdictionType) {
    NatureOfControlJurisdictionType["ENGLAND_AND_WALES"] = "ENGLAND_AND_WALES";
    NatureOfControlJurisdictionType["SCOTLAND"] = "SCOTLAND";
    NatureOfControlJurisdictionType["NORTHERN_IRELAND"] = "NORTHERN_IRELAND";
})(NatureOfControlJurisdictionType = exports.NatureOfControlJurisdictionType || (exports.NatureOfControlJurisdictionType = {}));
var ChangeBoRelevantPeriodType;
(function (ChangeBoRelevantPeriodType) {
    ChangeBoRelevantPeriodType["YES"] = "CHANGE_BO_RELEVANT_PERIOD";
    ChangeBoRelevantPeriodType["NO"] = "NO_CHANGE_BO_RELEVANT_PERIOD";
})(ChangeBoRelevantPeriodType = exports.ChangeBoRelevantPeriodType || (exports.ChangeBoRelevantPeriodType = {}));
var TrusteeInvolvedRelevantPeriodType;
(function (TrusteeInvolvedRelevantPeriodType) {
    TrusteeInvolvedRelevantPeriodType["YES"] = "TRUSTEE_INVOLVED_RELEVANT_PERIOD";
    TrusteeInvolvedRelevantPeriodType["NO"] = "NO_TRUSTEE_INVOLVED_RELEVANT_PERIOD";
})(TrusteeInvolvedRelevantPeriodType = exports.TrusteeInvolvedRelevantPeriodType || (exports.TrusteeInvolvedRelevantPeriodType = {}));
var ChangeBeneficiaryRelevantPeriodType;
(function (ChangeBeneficiaryRelevantPeriodType) {
    ChangeBeneficiaryRelevantPeriodType["YES"] = "CHANGE_BENEFICIARY_RELEVANT_PERIOD";
    ChangeBeneficiaryRelevantPeriodType["NO"] = "NO_CHANGE_BENEFICIARY_RELEVANT_PERIOD";
})(ChangeBeneficiaryRelevantPeriodType = exports.ChangeBeneficiaryRelevantPeriodType || (exports.ChangeBeneficiaryRelevantPeriodType = {}));
//# sourceMappingURL=types.js.map