import { AccountValidatorResponse } from "../account-validator/types";
export declare type AccountsFileValidationResponse = AccountValidatorResponse;
declare const packageTypes: readonly ["uksef", "cic", "welsh", "limited-partnership", "group-package-400", "group-package-401", "overseas", "audit-exempt-subsidiary", "filing-exempt-subsidiary"];
declare type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;
export declare type PackageType = ElementType<typeof packageTypes>;
export declare function isPackageType(o: any): o is PackageType;
export interface AccountsFilingValidationRequest {
    fileId: string;
    accountsFilingId: string;
    transactionId: string;
}
export interface AccountsFilingCompanyResponse {
    accountsFilingId: string;
}
export interface PackageTypeRequest {
    packageType: PackageType;
}
export interface ConfirmCompanyRequest {
    companyName: String;
}
export {};
