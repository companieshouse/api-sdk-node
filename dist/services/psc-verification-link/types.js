"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PscVerificationStatus = exports.VerificationStatementEnum = exports.NameMismatchReasonEnum = void 0;
;
;
;
;
;
;
;
;
;
;
;
;
;
var NameMismatchReasonEnum;
(function (NameMismatchReasonEnum) {
    NameMismatchReasonEnum["PREFERRED_NAME"] = "PREFERRED_NAME";
    NameMismatchReasonEnum["LEGAL_NAME_CHANGE"] = "LEGAL_NAME_CHANGE";
    NameMismatchReasonEnum["DIFFERENT_NAMING_CONVENTION"] = "DIFFERENT_NAMING_CONVENTION";
    NameMismatchReasonEnum["PUBLIC_REGISTER_ERROR"] = "PUBLIC_REGISTER_ERROR";
    NameMismatchReasonEnum["PREFER_NOT_TO_SAY"] = "PREFER_NOT_TO_SAY";
})(NameMismatchReasonEnum = exports.NameMismatchReasonEnum || (exports.NameMismatchReasonEnum = {}));
var VerificationStatementEnum;
(function (VerificationStatementEnum) {
    VerificationStatementEnum["INDIVIDUAL_VERIFIED"] = "INDIVIDUAL_VERIFIED";
})(VerificationStatementEnum = exports.VerificationStatementEnum || (exports.VerificationStatementEnum = {}));
var PscVerificationStatus;
(function (PscVerificationStatus) {
    PscVerificationStatus["UNVERIFIED"] = "UNVERIFIED";
    PscVerificationStatus["VERIFIED"] = "VERIFIED";
    PscVerificationStatus["PENDING"] = "PENDING";
})(PscVerificationStatus = exports.PscVerificationStatus || (exports.PscVerificationStatus = {}));
//# sourceMappingURL=types.js.map