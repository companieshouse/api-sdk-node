import { CertifiedCopyItem, CertifiedCopyItemResource, ItemOptions, ItemOptionsResource } from "./types";
export default class CertifiedCopyMapping {
    static mapCertifiedItemResourceToCertifiedCopyItem(body: CertifiedCopyItemResource): CertifiedCopyItem;
    static mapItemOptionsResourceToItemOptions(itemOptionsResouce: ItemOptionsResource): ItemOptions;
}
