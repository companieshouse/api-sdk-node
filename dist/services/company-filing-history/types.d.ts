/**
 * CompanyFilingHistoryResource is what is returned from the api.
 */
export interface CompanyFilingHistoryResource {
    etag: string;
    filing_history_status?: string;
    items: FilingHistoryItemResource[];
    items_per_page: number;
    kind: string;
    start_index: number;
    total_count: number;
}
export interface FilingHistoryItemResource {
    annotations?: FilingHistoryItemAnnotationResource[];
    associated_filings?: FilingHistoryItemAssociatedFilingResource[];
    barcode?: string;
    category: string;
    date: string;
    description: string;
    description_values?: FilingHistoryDescriptionValuesResource;
    links?: FilingHistoryItemLinksResource;
    pages?: number;
    paper_filed?: boolean;
    resolutions?: FilingHistoryItemResolutionResource[];
    subcategory?: string;
    transaction_id: string;
    type: string;
}
export interface FilingHistoryItemAnnotationResource {
    annotation?: string;
    category?: string;
    date: string;
    description: string;
    description_values?: FilingHistoryDescriptionValuesResource;
    type?: string;
}
export interface FilingHistoryItemAssociatedFilingResource {
    category?: string;
    date: string;
    description: string;
    description_values?: FilingHistoryDescriptionValuesResource;
    type: string;
}
export interface FilingHistoryDescriptionValuesResource {
    [key: string]: string;
}
export interface FilingHistoryItemLinksResource {
    document_metadata?: string;
    self?: string;
}
export interface FilingHistoryItemResolutionResource {
    category: string;
    description: string;
    description_values?: FilingHistoryDescriptionValuesResource;
    document_id?: string;
    receive_date: string;
    subcategory: string;
    type: string;
}
/**
 * CompanyFilingHistory is the interface used within the sdk
 */
export interface CompanyFilingHistory {
    etag: string;
    filingHistoryStatus?: string;
    items: FilingHistoryItem[];
    itemsPerPage: number;
    kind: string;
    startIndex: number;
    totalCount: number;
}
export interface FilingHistoryItem {
    annotations?: FilingHistoryItemAnnotation[];
    associatedFilings?: FilingHistoryItemAssociatedFiling[];
    barcode?: string;
    category: string;
    date: string;
    description: string;
    descriptionValues?: FilingHistoryDescriptionValues;
    links?: FilingHistoryItemLinks;
    pages?: number;
    paperFiled?: boolean;
    resolutions?: FilingHistoryItemResolution[];
    subcategory?: string;
    transactionId: string;
    type: string;
}
export interface FilingHistoryItemAnnotation {
    annotation?: string;
    category?: string;
    date: string;
    description: string;
    descriptionValues?: FilingHistoryDescriptionValues;
    type?: string;
}
export interface FilingHistoryItemAssociatedFiling {
    category?: string;
    date: string;
    description: string;
    descriptionValues?: FilingHistoryDescriptionValues;
    type: string;
}
export interface FilingHistoryDescriptionValues {
    [key: string]: string;
}
export interface FilingHistoryItemLinks {
    documentMetadata?: string;
    self?: string;
}
export interface FilingHistoryItemResolution {
    category: string;
    description: string;
    descriptionValues?: FilingHistoryDescriptionValues;
    documentId?: string;
    receiveDate: string;
    subcategory: string;
    type: string;
}
