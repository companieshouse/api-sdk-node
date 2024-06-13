import { IHttpClient } from "../../../http";
import { CertifiedCopyItem, CertifiedCopyItemPatchRequest } from "./types";
import Resource, { ApiResponse, ApiResult } from "../../resource";
export default class CertifiedCopyService {
    private readonly client;
    private static readonly EXCLUDED_FIELDS;
    constructor(client: IHttpClient);
    getCertifiedCopy(certifiedCopyId: string): Promise<Resource<CertifiedCopyItem>>;
    patchCertifiedCopy(certifiedCopyItemRequest: CertifiedCopyItemPatchRequest, certifiedCopyId: string): Promise<ApiResult<ApiResponse<CertifiedCopyItem>>>;
    private handleResponse;
}
