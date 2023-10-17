"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EligibilityStatusCode = exports.SectionStatus = void 0;
var SectionStatus;
(function (SectionStatus) {
    SectionStatus["CONFIRMED"] = "CONFIRMED";
    SectionStatus["NOT_CONFIRMED"] = "NOT_CONFIRMED";
    SectionStatus["RECENT_FILING"] = "RECENT_FILING";
})(SectionStatus = exports.SectionStatus || (exports.SectionStatus = {}));
var EligibilityStatusCode;
(function (EligibilityStatusCode) {
    // Note use of String enums to ensure that correct status values are mapped to/from API calls
    // Otherwise, the enums translate to a number representing their position in the enum list
    EligibilityStatusCode["COMPANY_NOT_FOUND"] = "COMPANY_NOT_FOUND";
    EligibilityStatusCode["COMPANY_VALID_FOR_SERVICE"] = "COMPANY_VALID_FOR_SERVICE";
    EligibilityStatusCode["INVALID_COMPANY_APPOINTMENTS_INVALID_NUMBER_OF_OFFICERS"] = "INVALID_COMPANY_APPOINTMENTS_INVALID_NUMBER_OF_OFFICERS";
    EligibilityStatusCode["INVALID_COMPANY_APPOINTMENTS_MORE_THAN_FIVE_OFFICERS"] = "INVALID_COMPANY_APPOINTMENTS_MORE_THAN_FIVE_OFFICERS";
    EligibilityStatusCode["INVALID_COMPANY_APPOINTMENTS_MORE_THAN_ONE_PSC"] = "INVALID_COMPANY_APPOINTMENTS_MORE_THAN_ONE_PSC";
    EligibilityStatusCode["INVALID_COMPANY_APPOINTMENTS_MORE_THAN_FIVE_PSCS"] = "INVALID_COMPANY_APPOINTMENTS_MORE_THAN_FIVE_PSCS";
    EligibilityStatusCode["INVALID_COMPANY_APPOINTMENTS_MORE_THAN_ONE_SHAREHOLDER"] = "INVALID_COMPANY_APPOINTMENTS_MORE_THAN_ONE_SHAREHOLDER";
    EligibilityStatusCode["INVALID_COMPANY_STATUS"] = "INVALID_COMPANY_STATUS";
    EligibilityStatusCode["INVALID_COMPANY_TRADED_STATUS_USE_WEBFILING"] = "INVALID_COMPANY_TRADED_STATUS_USE_WEBFILING";
    EligibilityStatusCode["INVALID_COMPANY_TYPE_CS01_FILING_NOT_REQUIRED"] = "INVALID_COMPANY_TYPE_CS01_FILING_NOT_REQUIRED";
    EligibilityStatusCode["INVALID_COMPANY_TYPE_PAPER_FILING_ONLY"] = "INVALID_COMPANY_TYPE_PAPER_FILING_ONLY";
    EligibilityStatusCode["INVALID_COMPANY_TYPE_USE_WEB_FILING"] = "INVALID_COMPANY_TYPE_USE_WEB_FILING";
    EligibilityStatusCode["INVALID_OFFICER_COUNT"] = "INVALID_OFFICER_COUNT";
})(EligibilityStatusCode = exports.EligibilityStatusCode || (exports.EligibilityStatusCode = {}));
//# sourceMappingURL=types.js.map