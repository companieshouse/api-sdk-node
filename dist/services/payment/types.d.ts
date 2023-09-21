/**
 * PaymentResource is what is returned from the api.
 */
export interface PaymentResource {
    amount: string;
    available_payment_methods: string[];
    company_number: string;
    completed_at: string;
    created_at: string;
    created_by: {
        email: string;
        forename: string;
        id: string;
        surname: string;
    };
    description: string;
    etag: string;
    kind: string;
    links: {
        journey: string;
        resource: string;
        self: string;
    };
    payment_method: string;
    reference: string;
    status: string;
}
export interface CreatePaymentRequestResource {
    redirect_uri: string;
    reference: string;
    resource: string;
    state: string;
}
/**
 * Payment is the interface used within this SDK.
 */
export interface Payment {
    amount: string;
    availablePaymentMethods: string[];
    companyNumber: string;
    completedAt: string;
    createdAt: string;
    createdBy: {
        email: string;
        forename: string;
        id: string;
        surname: string;
    };
    description: string;
    etag: string;
    kind: string;
    links: {
        journey: string;
        resource: string;
        self: string;
    };
    paymentMethod: string;
    reference: string;
    status: string;
}
export interface CreatePaymentRequest {
    redirectUri: string;
    reference: string;
    resource: string;
    state: string;
}
