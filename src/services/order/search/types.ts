export interface SearchRequest {
    orderNumber?: string;
    email?: string;
    companyNumber?: string;
}

export interface SearchResponse {
    totalOrders: number;
    orderSummaries: OrderSummary[];
}

export interface OrderSummary {
    id: string;
    email: string;
    companyNumber: string;
    productLine: string;
    orderDate: string;
    paymentStatus: string;
    resourceLink: string;
}
