import { CertificateItem, CertificateItemResource, CertificateItemPostRequest, CertificateItemRequestResource, CertificateItemPatchRequest } from "./types";
export default class CertificateMapping {
    static mapCertificateItemRequestToCertificateItemRequestResource(certificateItemRequest: CertificateItemPostRequest | CertificateItemPatchRequest): CertificateItemRequestResource;
    static mapCertificateItemResourceToCertificateItem(body: CertificateItemResource): CertificateItem;
    private static mapDirectorOrSecretaryDetailsRequestDirectorOrSecretaryDetailsResource;
    private static mapAddressDetailsRequestToAddressDetailsResource;
    private static mapDirectorOrSecretaryDetailsResourceToDirectorOrSecretaryDetails;
    private static mapAddressDetailsResourceToAddressDetails;
    private static mapMemberDetailsRequestToMemberDetailsResource;
    private static mapMemberDetailsResourceToMemberDetails;
    private static mapPartnerDetailsRequestToPartnerDetailsResource;
    private static mapPartnerDetailsResourceToPartnerDetails;
    private static mapLiquidatorDetailsResourceToLiquidatorsDetails;
    private static mapLiquidatorDetailsRequestToLiquidatorsDetailsResource;
}
