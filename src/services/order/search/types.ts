export interface SearchRequest {
    id?: string;
    email?: string;
    companyNumber?: string;
    pageSize: number;
}

export interface SearchResponse {
    totalOrders: number;
    orderSummaries: CheckoutSummary[];
}

export interface CheckoutSummary {
    id: string;
    email: string;
    companyNumber: string;
    productLine: string;
    orderDate: string;
    paymentStatus: string;
    links: Links;
}

export interface Links {
    self: Link;
    order?: Link;
}

export interface Link {
    link: string;
}
