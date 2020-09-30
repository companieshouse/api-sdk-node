import { CertificateItem, CertificateItemResource, CertificateItemPostRequest, CertificateItemRequestResource, CertificateItemPatchRequest } from "./types";
export default class CertificateMapping {
    static mapCertificateItemRequestToCertificateItemRequestResource(certificateItemRequest: CertificateItemPostRequest | CertificateItemPatchRequest): CertificateItemRequestResource;
    static mapCertificateItemResourceToCertificateItem(body: CertificateItemResource): CertificateItem;
    private static mapDirectorOrSecretaryDetailsRequestDirectorOrSecretaryDetailsResource;
    private static mapRegisteredOfficeRequestToRegisteredOfficeDetails;
    private static mapDirectorOrSecretaryDetailsResourceToDirectorOrSecretaryDetails;
    private static mapRegisteredOfficeResourceToRegisteredOffice;
}
