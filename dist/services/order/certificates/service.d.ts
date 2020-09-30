import { IHttpClient } from "../../../http";
import { CertificateItem, CertificateItemPostRequest, CertificateItemPatchRequest } from "./types";
import Resource from "../../resource";
export default class {
    private readonly client;
    constructor(client: IHttpClient);
    getCertificate(certificateId: string): Promise<Resource<CertificateItem>>;
    postCertificate(certificateItemRequest: CertificateItemPostRequest): Promise<Resource<CertificateItem>>;
    patchCertificate(certificateItemRequest: CertificateItemPatchRequest, certificateId: string): Promise<Resource<CertificateItem>>;
}
