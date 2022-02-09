import { IHttpClient } from "../../../http";
import {
    CertificateItem,
    CertificateItemInitialRequest,
    CertificateItemPatchRequest,
    CertificateItemPostRequest
} from "./types";
import Resource, { ApiResponse, ApiResult } from "../../resource";
import Mapping from "../../../mapping/mapping";
import { failure, success } from "../../result";

export default class {
    constructor (private readonly client: IHttpClient) {
    }

    public async getCertificate (certificateId: string): Promise<Resource<CertificateItem>> {
        const resp = await this.client.httpGet(`/orderable/certificates/${certificateId}`);

        const resource: Resource<CertificateItem> = {
            httpStatusCode: resp.status
        };

        if (!resp.error) {
            resource.resource = Mapping.camelCaseKeys(resp.body);
        }

        return resource;
    }

    // Create a whole certificate item in one invocation
    public async postCertificate (certificateItemRequest: CertificateItemPostRequest): Promise<ApiResult<ApiResponse<CertificateItem>>> {
        return this.postCertificateRequest(certificateItemRequest, "/orderable/certificates");
    }

    /*
     * Create a partial certificate item with an initial request.
     *
     * Note: use patchCertificate to add or amend certificate item properties.
     */
    public async postInitialCertificate (certificateItemRequest: CertificateItemInitialRequest): Promise<ApiResult<ApiResponse<CertificateItem>>> {
        return this.postCertificateRequest(certificateItemRequest, "/orderable/certificates/initial");
    }

    /*
     * Add or amend certificate item properties; there can be one or more patch requests.
     *
     * Note: use this method after a call to postInitialCertificate.
     */
    public async patchCertificate (certificateItemRequest: CertificateItemPatchRequest, certificateId: string): Promise<Resource<CertificateItem>> {
        const patchRequest = Mapping.snakeCaseKeys(certificateItemRequest);

        const additionalHeaders = {
            "Content-Type": "application/merge-patch+json"
        };
        const resp = await this.client.httpPatch(`/orderable/certificates/${certificateId}`,
            patchRequest, additionalHeaders);

        const resource: Resource<CertificateItem> = {
            httpStatusCode: resp.status
        };

        if (!resp.error) {
            resource.resource = Mapping.camelCaseKeys(resp.body);
        }

        return resource;
    }

    private async postCertificateRequest (certificateItemRequest: CertificateItemInitialRequest | CertificateItemPostRequest, url: string): Promise<ApiResult<ApiResponse<CertificateItem>>> {
        const postRequest = Mapping.snakeCaseKeys(certificateItemRequest);

        const serverResponse = await this.client.httpPost(url, postRequest);
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
