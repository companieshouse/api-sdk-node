import { IHttpClient } from "../../../http";
import { CertificateItem, CertificateItemInitialRequest, CertificateItemPatchRequest, CertificateItemPostRequest } from "./types";
import { ApiResponse, ApiResult } from "../../resource";
export default class {
    private readonly client;
    constructor(client: IHttpClient);
    getCertificate(certificateId: string): Promise<ApiResult<ApiResponse<CertificateItem>>>;
    postCertificate(certificateItemRequest: CertificateItemPostRequest): Promise<ApiResult<ApiResponse<CertificateItem>>>;
    postInitialCertificate(certificateItemRequest: CertificateItemInitialRequest): Promise<ApiResult<ApiResponse<CertificateItem>>>;
    patchCertificate(certificateItemRequest: CertificateItemPatchRequest, certificateId: string): Promise<ApiResult<ApiResponse<CertificateItem>>>;
    private handleResponse;
}
