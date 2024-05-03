"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAccountValidatorResponse = void 0;
function isAccountValidatorResponse(object) {
    if (typeof object.status !== "string" ||
        typeof object.fileId !== "string" ||
        typeof object.fileName !== "string") {
        return false;
    }
    if (!["complete", "pending", "error"].includes(object.status)) {
        return false;
    }
    if (typeof object.result !== "object" || object.result === null) {
        return false;
    }
    const { errorMessages, data, validationStatus } = object.result;
    if ((errorMessages !== undefined && !Array.isArray(errorMessages)) ||
        typeof data !== "object" ||
        typeof validationStatus !== "string") {
        return false;
    }
    if (!["OK", "FAILED"].includes(validationStatus)) {
        return false;
    }
    if (typeof data.balance_sheet_date !== "string" ||
        typeof data.accounts_type !== "string" ||
        typeof data.companieshouse_registered_number !== "string") {
        return false;
    }
    for (const errorMessage of errorMessages !== null && errorMessages !== void 0 ? errorMessages : []) {
        if (typeof errorMessage !== "object" || errorMessage === null) {
            return false;
        }
        if (typeof errorMessage.errorMessage !== "string") {
            return false;
        }
    }
    return true;
}
exports.isAccountValidatorResponse = isAccountValidatorResponse;
//# sourceMappingURL=types.js.map