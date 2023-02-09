export interface AccountValidatorRequest {
    fileName: string;
    id: string;
}
export interface AccountValidatorResponse {
    requestStatus: RequestStatus 
}

export interface RequestStatus {
    fileId: string;
    status: string;
    result: ValidationResult; 
}

export interface ValidationResult {
    errorMessages: string[];
    data: string;
    validationStatus: ValidationStatus; 
}

type ValidationStatus = "OK" | "FAILED";