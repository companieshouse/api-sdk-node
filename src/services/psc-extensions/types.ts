
export interface ExtensionDetails {
    extensionReason: string;
    extensionStatus?: string;
    extensionRequestDate?: string;
};

export interface ExtensionDetailsResource {
    extension_reason: string;
    extension_status: string;
    extension_request_date: string;
}

export interface PscExtensionsData {
    companyNumber: string;
    pscNotificationId: string;
    extensionDetails: ExtensionDetails;
}

export interface PscExtensionsDataResource {
    company_number: string;
    psc_notification_id: string;
    extension_details: ExtensionDetailsResource;
}

export interface PscExtensionResponse {
    etag: string;
    kind: string;
    links: {};
    data: PscExtensionsData;
}

export interface PscExtensionResponseResource {
    etag: string;
    kind: string;
    links: {};
    data: PscExtensionsDataResource;
}
