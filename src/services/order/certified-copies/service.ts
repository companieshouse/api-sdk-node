import { HttpResponse, IHttpClient } from "../../../http";
import { CertifiedCopyItem, CertifiedCopyItemResource, CertifiedCopyItemPatchRequest } from "./types";
import Mapping from "../../../mapping/mapping";
import Resource, { ApiResponse, ApiResult } from "../../resource";
import { failure, success } from "../../result";

export default class CertifiedCopyService {
    private static readonly EXCLUDED_FIELDS = {
        deep: true,
        stopPaths: [
            "description_values", // all items
            "item_options.filing_history_documents.filing_history_description_values" // certified copies
        ]
    };

    constructor (private readonly client: IHttpClient) { }

    public async getCertifiedCopy (certifiedCopyId: string): Promise<Resource<CertifiedCopyItem>> {
        const resp = await this.client.httpGet(`/orderable/certified-copies/${certifiedCopyId}`);

        const resource: Resource<CertifiedCopyItem> = {
            httpStatusCode: resp.status
        };

        if (resp.error) {
            return resource;
        }

        const body = resp.body as CertifiedCopyItemResource;

        resource.resource = Mapping.camelCaseKeys(body, CertifiedCopyService.EXCLUDED_FIELDS);
        return resource;
    };

    /*
     * Add or amend certified copy item properties; there can be one or more patch requests.
     *
     * Note: use this method after the certified copy item has been created.
     */
    public async patchCertifiedCopy (certifiedCopyItemRequest: CertifiedCopyItemPatchRequest, certifiedCopyId: string): Promise<ApiResult<ApiResponse<CertifiedCopyItem>>> {
        const additionalHeaders = {
            "Content-Type": "application/merge-patch+json"
        };
        const response = await this.client.httpPatch(`/orderable/certified-copies/${certifiedCopyId}`,
            Mapping.snakeCaseKeys(certifiedCopyItemRequest), additionalHeaders);
        return this.handleResponse(response);
    }

    private handleResponse (serverResponse: HttpResponse): ApiResult<ApiResponse<CertifiedCopyItem>> {
        const response: ApiResponse<CertifiedCopyItem> = {
            httpStatusCode: serverResponse.status
        };

        if (serverResponse.error) {
            return failure({
                httpStatusCode: serverResponse.status,
                errors: serverResponse.error.errors
            });
        } else {
            response.resource = Mapping.camelCaseKeys<CertifiedCopyItem>(serverResponse.body);
            return success(response);
        }
    }
};
