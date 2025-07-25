/**
 * The late filing penalty
 */
export interface Penalty {
    id: string;
    etag: string;
    kind: string;
    isPaid: boolean;
    isDCA: boolean;
    dueDate: string;
    madeUpDate: string;
    transactionDate: string;
    originalAmount: number;
    outstandingAmount: number;
    type: string;
}
/**
 * The root object on the response for getting a list of late filing penalties
 */
export interface PenaltyList {
    etag: string;
    itemsPerPage: number;
    startIndex: number;
    totalResults: number;
    items: Penalty[];
}
