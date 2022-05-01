/**
 * CertifiedCopyItemResource is what is returned from the api.
 */
export interface CertifiedCopyItemResource {
    company_name: string;
    company_number: string;
    item_options: ItemOptionsResource;
    total_item_cost: string;
}
export interface ItemOptionsResource {
    delivery_method: string;
    delivery_timescale: string;
    filing_history_documents: FilingHistoryDocumentsResource[];
}
export interface FilingHistoryDocumentsResource {
    filing_history_date: string;
    filing_history_description: string;
    filing_history_id: string;
    filing_history_type: string;
    filing_history_description_values?: Record<string, any>;
    filing_history_cost: string;
}
/**
* CertifiedCopyItem is the interface used within this SDK.
*/
export interface CertifiedCopyItem {
    companyName: string;
    companyNumber: string;
    itemOptions: ItemOptions;
    totalItemCost: string;
}
export interface ItemOptions {
    deliveryMethod: string;
    deliveryTimescale: string;
    filingHistoryDocuments: FilingHistoryDocuments[];
}
export interface FilingHistoryDocuments {
    filingHistoryDate: string;
    filingHistoryDescription: string;
    filingHistoryId: string;
    filingHistoryType: string;
    filingHistoryDescriptionValues?: Record<string, any>;
    filingHistoryCost: string;
}
