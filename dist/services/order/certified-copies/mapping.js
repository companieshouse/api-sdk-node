"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CertifiedCopyMapping {
    static mapCertifiedItemResourceToCertifiedCopyItem(body) {
        const certifiedCopyItem = {
            companyNumber: body.company_number,
            companyName: body.company_name,
            itemOptions: this.mapItemOptionsResourceToItemOptions(body.item_options),
            totalItemCost: body.total_item_cost
        };
        return certifiedCopyItem;
    }
    ;
    static mapItemOptionsResourceToItemOptions(itemOptionsResouce) {
        const itemOptions = {
            deliveryTimescale: itemOptionsResouce.delivery_timescale,
            deliveryMethod: itemOptionsResouce.delivery_method,
            filingHistoryDocuments: itemOptionsResouce.filing_history_documents.map((fhd) => ({
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
}
exports.default = CertifiedCopyMapping;
;
//# sourceMappingURL=mapping.js.map