import { AccountValidatorResponse } from "../account-validator/types";

export type AccountsFileValidationResponse = AccountValidatorResponse;

const packageTypes = [
    "uksef",
    "cic",
    "welsh",
    "limited-partnership",
    "group-package-400",
    "group-package-401",
    "overseas",
    "audit-exempt-subsidiary",
    "filing-exempt-subsidiary"
] as const;

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
    infer ElementType
>
    ? ElementType
    : never;

export type PackageType = ElementType<typeof packageTypes>;

export function isPackageType (o: any): o is PackageType {
    return packageTypes.includes(o);
}

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
