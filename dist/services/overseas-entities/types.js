"use strict";
/**
 * Overseas Entity interface used within this SDK
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NatureOfControlType = exports.BeneficialOwnersStatementType = exports.yesNoResponse = void 0;
var yesNoResponse;
(function (yesNoResponse) {
    yesNoResponse[yesNoResponse["No"] = 0] = "No";
    yesNoResponse[yesNoResponse["Yes"] = 1] = "Yes";
})(yesNoResponse = exports.yesNoResponse || (exports.yesNoResponse = {}));
var presenterRole;
(function (presenterRole) {
    presenterRole["administrator"] = "administrator";
    presenterRole["agent"] = "agent";
    presenterRole["solicitor"] = "solicitor";
    presenterRole["beneficial_owner"] = "beneficial_owner";
    presenterRole["other"] = "other";
})(presenterRole || (presenterRole = {}));
var BeneficialOwnersStatementType;
(function (BeneficialOwnersStatementType) {
    BeneficialOwnersStatementType["ALL_IDENTIFIED_ALL_DETAILS"] = "ALL_IDENTIFIED_ALL_DETAILS";
    BeneficialOwnersStatementType["ALL_IDENTIFIED_SOME_DETAILS"] = "ALL_IDENTIFIED_SOME_DETAILS";
    BeneficialOwnersStatementType["SOME_IDENTIFIED_ALL_DETAILS"] = "SOME_IDENTIFIED_ALL_DETAILS";
    BeneficialOwnersStatementType["SOME_IDENTIFIED_SOME_DETAILS"] = "SOME_IDENTIFIED_SOME_DETAILS";
    BeneficialOwnersStatementType["NONE_IDENTIFIED"] = "NONE_IDENTIFIED";
})(BeneficialOwnersStatementType = exports.BeneficialOwnersStatementType || (exports.BeneficialOwnersStatementType = {}));
var NatureOfControlType;
(function (NatureOfControlType) {
    NatureOfControlType["OVER_25_PERCENT_OF_SHARES"] = "OVER_25_PERCENT_OF_SHARES";
    NatureOfControlType["OVER_25_PERCENT_OF_VOTING_RIGHTS"] = "OVER_25_PERCENT_OF_VOTING_RIGHTS";
    NatureOfControlType["APPOINT_OR_REMOVE_MAJORITY_BOARD_DIRECTORS"] = "APPOINT_OR_REMOVE_MAJORITY_BOARD_DIRECTORS";
    NatureOfControlType["SIGNIFICANT_INFLUENCE_OR_CONTROL"] = "SIGNIFICANT_INFLUENCE_OR_CONTROL";
})(NatureOfControlType = exports.NatureOfControlType || (exports.NatureOfControlType = {}));
//# sourceMappingURL=types.js.map