import { HttpResponse, IHttpClient } from "../../../http";
import {
    CertificateItem,
    CertificateItemInitialRequest,
    CertificateItemPatchRequest,
    CertificateItemPostRequest
} from "./types";
import { ApiResponse, ApiResult } from "../../resource";
import Mapping from "../../../mapping/mapping";
import { failure, success } from "../../result";

export default class CertificateService {
    constructor (private readonly client: IHttpClient) {
    }

    public async getCertificate (certificateId: string): Promise<ApiResult<ApiResponse<CertificateItem>>> {
        const response = await this.client.httpGet(`/orderable/certificates/${certificateId}`);
        return this.handleResponse(response);
    }

    // Create a whole certificate item in one invocation
    public async postCertificate (certificateItemRequest: CertificateItemPostRequest): Promise<ApiResult<ApiResponse<CertificateItem>>> {
        const response = await this.client.httpPost("/orderable/certificates", Mapping.snakeCaseKeys(certificateItemRequest))
        return this.handleResponse(response);
    }

    /*
     * Create a partial certificate item with an initial request.
     *
     * Note: use patchCertificate to add or amend certificate item properties.
     */
    public async postInitialCertificate (certificateItemRequest: CertificateItemInitialRequest): Promise<ApiResult<ApiResponse<CertificateItem>>> {
        const response = await this.client.httpPost("/orderable/certificates/initial", Mapping.snakeCaseKeys(certificateItemRequest))
        return this.handleResponse(response);
    }

    /*
     * Add or amend certificate item properties; there can be one or more patch requests.
     *
     * Note: use this method after a call to postInitialCertificate.
     */
    public async patchCertificate (certificateItemRequest: CertificateItemPatchRequest, certificateId: string): Promise<ApiResult<ApiResponse<CertificateItem>>> {
        const additionalHeaders = {
            "Content-Type": "application/merge-patch+json"
        };
        const response = await this.client.httpPatch(`/orderable/certificates/${certificateId}`,
            Mapping.snakeCaseKeys(certificateItemRequest), additionalHeaders);
        return this.handleResponse(response);
    }

    private handleResponse (serverResponse: HttpResponse): ApiResult<ApiResponse<CertificateItem>> {
        const response: ApiResponse<CertificateItem> = {
            httpStatusCode: serverResponse.status
        };

        if (serverResponse.error) {
            return failure({
                httpStatusCode: serverResponse.status,
                errors: serverResponse.error.errors
            });
        } else {
            response.resource = Mapping.camelCaseKeys<CertificateItem>(serverResponse.body);
            return success(response);
        }
    }
}
