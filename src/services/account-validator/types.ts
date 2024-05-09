import { PackageType } from "../accounts-filing/types";

export interface AccountValidatorRequest {
    fileName: string;
    id: string;
    packageType?: PackageType;
}

export interface Data {
    balanceSheetDate?: string;
    accountsType?: string;
    companieshouseRegisteredNumber?: string;
}

export interface ErrorMessage {
    errorMessage: string;
}

export interface Result {
    errorMessages: ErrorMessage[];
    data?: Data;
    validationStatus: ValidationStatus;
}

export interface AccountValidatorResponse {
    status: RequestStatus;
    result: Result;
    fileId: string;
    fileName: string;
}

type RequestStatus = "complete" | "pending" | "error" ;
type ValidationStatus = "OK" | "FAILED"

export function isAccountValidatorResponse (object: any): object is AccountValidatorResponse {
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

    for (const errorMessage of errorMessages ?? []) {
        if (typeof errorMessage !== "object" || errorMessage === null) {
            return false;
        }
        if (typeof errorMessage.errorMessage !== "string") {
            return false;
        }
    }

    return true;
}
