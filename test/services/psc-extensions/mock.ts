import { RequestClient } from "../../../src";

export const NOT_FOUND = "Not Found";
export const INTERNAL_SERVER_ERROR = "Internal server error"
export const TRANSACTION_ID = "12345";

export const requestClient = new RequestClient({
    baseUrl: "URL_NOT_USED",
    oauthToken: "TOKEN_NOT_USED"
});

const mockPscExtensionResponseResource = {
    etag: "abc123def456",
    kind: "psc-extension",
    links: {},
    data: {
        company_number: "12345678",
        psc_notification_id: "psc-12345",
        extension_details: {
            extension_reason: "Awaiting additional documentation",
            extension_status: "PENDING",
            extension_request_date: "2024-01-15"
        }
    }
}

export const mockPostPscExtensionResponse = {
    201: { status: 201, body: mockPscExtensionResponseResource },
    400: {
        status: 400,
        error: {
            errors: [
                {
                    error: "validation-error",
                    error_description: "The company number is required",
                    location: "company_number",
                    location_type: "json-path",
                    type: "ch:validation"
                },
                {
                    error: "validation-error",
                    error_description: "The id is required",
                    location: "id",
                    location_type: "json-path",
                    type: "ch:validation"
                }
            ]
        }
    },
    500: {
        status: 500,
        error: {
            errors: [
                {
                    error: "validation-error",
                    error_description: "The company number is required",
                    location: "company_number",
                    location_type: "json-path",
                    type: "ch:validation"
                }
            ]
        }
    }
};
