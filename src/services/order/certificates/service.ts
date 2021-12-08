import {IHttpClient} from "../../../http";
import {
    CertificateItem,
    CertificateItemInitialRequest,
    CertificateItemPatchRequest,
    CertificateItemPostRequest
} from "./types";
import Resource from "../../resource";
import Mapping from "../../../mapping/mapping";

export default class {
    constructor(private readonly client: IHttpClient) {
    }

    public async getCertificate(certificateId: string): Promise<Resource<CertificateItem>> {
        const resp = await this.client.httpGet(`/orderable/certificates/${certificateId}`);

        const resource: Resource<CertificateItem> = {
            httpStatusCode: resp.status
        };

        if (!resp.error) {
            resource.resource = Mapping.camelCaseKeys(resp.body);
        }

        return resource;
    }

    public async postCertificateInitialRequest(certificateItemRequest: CertificateItemInitialRequest): Promise<Resource<CertificateItem>> {
        return this.postCertificateRequest(certificateItemRequest, "/orderable/certificates/initial");
    }

    public async postCertificate(certificateItemRequest: CertificateItemPostRequest): Promise<Resource<CertificateItem>> {
        return this.postCertificateRequest(certificateItemRequest, "/orderable/certificates");
    }

    private async postCertificateRequest(certificateItemRequest: CertificateItemInitialRequest | CertificateItemPostRequest, url: string): Promise<Resource<CertificateItem>> {
        const postRequest = Mapping.snakeCaseKeys(certificateItemRequest);

        const resp = await this.client.httpPost(url, postRequest);

        const resource: Resource<CertificateItem> = {
            httpStatusCode: resp.status
        };

        if (!resp.error) {
            resource.resource = Mapping.camelCaseKeys(resp.body);
        }

        return resource;
    }

    public async patchCertificate(certificateItemRequest: CertificateItemPatchRequest, certificateId: string):
        Promise<Resource<CertificateItem>> {
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
}
