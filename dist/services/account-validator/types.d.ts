import { PackageType } from "../accounts-filing/types";
export interface AccountValidatorRequest {
    fileName: string;
    id: string;
    packageType?: PackageType;
    companyNumber?: string;
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
declare type RequestStatus = "complete" | "pending" | "error";
declare type ValidationStatus = "OK" | "FAILED";
export declare function isAccountValidatorResponse(object: any): object is AccountValidatorResponse;
export {};
