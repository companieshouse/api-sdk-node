import {
    CertifiedCopyItem, CertifiedCopyItemResource, ItemOptions, ItemOptionsResource,
    FilingHistoryDocumentsResource, FilingHistoryDocuments
} from "./types";

export default class CertifiedCopyMapping {
    public static mapCertifiedItemResourceToCertifiedCopyItem (body: CertifiedCopyItemResource): CertifiedCopyItem {
        const certifiedCopyItem: CertifiedCopyItem = {
            companyNumber: body.company_number,
            companyName: body.company_name,
            itemOptions: this.mapItemOptionsResourceToItemOptions(body.item_options),
            totalItemCost: body.total_item_cost
        };
        return certifiedCopyItem;
    };

    public static mapItemOptionsResourceToItemOptions (itemOptionsResouce: ItemOptionsResource): ItemOptions {
        const itemOptions: ItemOptions = {
            deliveryTimescale: itemOptionsResouce.delivery_timescale,
            deliveryMethod: itemOptionsResouce.delivery_method,
            filingHistoryDocuments: itemOptionsResouce.filing_history_documents.map((fhd: FilingHistoryDocumentsResource) => ({
                filingHistoryDate: fhd.filing_history_date,
                filingHistoryDescription: fhd.filing_history_description,
                filingHistoryId: fhd.filing_history_id,
                filingHistoryType: fhd.filing_history_type,
                filingHistoryDescriptionValues: fhd.filing_history_description_values,
                filingHistoryCost: fhd.filing_history_cost
            }))
        };
        return itemOptions;
    }
};
